#!/usr/bin/env python3
"""Capture frozen Aster32 and Lantern32 in real Chrome on r25 without mock embeddings.

Requires Python >=3.10 and Playwright Python: pip install playwright; python -m playwright install chromium
Usage: python run_r25_capture.py --benchmark path/to/Lantern32-r22-FROZEN-firstlook.zip
       python run_r25_capture.py --benchmark path/to/zip --project path/to/r24/checkout
       python run_r25_capture.py --benchmark path/to/zip --check-pack-only

Scores are provisional checklist signals; a human must apply the frozen rubric.
The original frozen ZIP is never modified or uploaded to the app, and only its 4 TXT sources
are browser-uploaded. Actual source evidence is logged for manual grading.
"""
import argparse
import contextlib
import hashlib
import http.server
import json
import os
from pathlib import Path
import re
import shutil
import socket
import socketserver
import subprocess
import sys
import tempfile
import threading
from datetime import datetime, timezone
from urllib.parse import urljoin
from zipfile import ZipFile

REPO = 'https://github.com/arjun9669/GroundedDesk-AI.git'
BRANCH = 'fix-r25-subject-clause-coverage'
EXPECTED_BUILD = '2026-10-12-r25'
EXPECTED_COMMIT = '20e1954f8f6da0ccbd19d55a0dc2cec469c6a381'
# The manifest selects the exact frozen source prefix; source bytes and rubrics are not altered.


def unpack_and_verify(zip_path: Path, target: Path):
    with ZipFile(zip_path) as archive:
        names = set(archive.namelist())
        prefixes = [n[:-len('freeze-manifest.json')] for n in names if n.endswith('freeze-manifest.json')]
        if len(prefixes) != 1 or prefixes[0] not in ('LANTERN32_firstlook/', 'ASTER32_firstlook/'):
            raise RuntimeError('Unexpected frozen benchmark prefix')
        prefix = prefixes[0]
        manifest = json.loads(archive.read(prefix + 'freeze-manifest.json'))
        for item, expected_sha in manifest['sha256_files'].items():
            name = prefix + item
            if name not in names:
                raise RuntimeError(f'Frozen pack missing: {name}')
            actual_sha = hashlib.sha256(archive.read(name)).hexdigest()
            if actual_sha != expected_sha:
                raise RuntimeError(f'Frozen hash mismatch for {item}: {actual_sha}')
        for name in names:
            if not name.startswith(prefix) or name.endswith('/'):
                continue
            dest = (target / name[len(prefix):]).resolve()
            if not dest.is_relative_to(target.resolve()):
                raise RuntimeError(f'Unsafe path in ZIP: {name}')
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(archive.read(name))
    cases = json.loads((target / 'frozen-answer-key.json').read_text(encoding='utf-8'))['cases']
    docs = sorted((target / 'source_docs').glob('*.txt'))
    if len(cases) != 32 or len(docs) != 4 or [c['id'] for c in cases] != [f'H{i:02}' for i in range(1,27)] + [f'X{i:02}' for i in range(27,33)]:
        raise RuntimeError('Invalid frozen 32-case question/document inventory')
    return cases, docs, manifest


def start_server(root: Path):
    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(root), **kwargs)
        def log_message(self, *args):
            pass
    class Server(socketserver.ThreadingTCPServer):
        allow_reuse_address = True
        daemon_threads = True
    server = Server(('127.0.0.1', 0), QuietHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server, f'http://127.0.0.1:{server.server_address[1]}/'


def norm(s):
    return re.sub(r'\s+', ' ', str(s)).strip()


def extract_hybrid(page, case, texts):
    page.locator('#query-input').fill(case['question'])
    page.locator('#ask-button').click()
    page.locator('#answer-result:not([hidden])').wait_for(timeout=60000)
    page.wait_for_function('(q) => document.querySelector("#answer-result .question-text")?.textContent === q', arg=case['question'], timeout=60000)
    # Wait for the async semantic embedding to complete; a fallback must fail the run.
    page.wait_for_function('!document.querySelector("#ask-button").disabled', timeout=120000)
    state = page.evaluate('''() => ({
      question: document.querySelector('#answer-result .question-text')?.textContent || '',
      heading: document.querySelector('#answer-result .result-heading span')?.textContent || '',
      answer: document.querySelector('#answer-result .answer-box')?.innerText || '',
      quotes: [...document.querySelectorAll('#answer-result .cited-answer-paragraph')].map(p => p.innerText.replace(/^\\[\\d+\\]\\s*/, '')),
      sources: [...document.querySelectorAll('#answer-result .source-card')].map(x=>({
        filename: x.querySelector('.source-top strong')?.textContent || '',
        excerpt: x.querySelector('p')?.innerText || ''
      })),
      semantic_status: document.querySelector('#semantic-status')?.innerText || '',
      retrieval_mode: document.querySelector('#retrieval-mode')?.value || '',
      generation_mode: document.querySelector('#answer-mode')?.value || ''
    })''')
    if state['question'] != case['question']:
        raise RuntimeError(f'Question mismatch at {case["id"]}')
    if state['retrieval_mode'] != 'hybrid' or 'Hybrid' not in state['semantic_status']:
        raise RuntimeError(f'Actual MiniLM Hybrid unavailable at {case["id"]}: {state["semantic_status"]}')
    state['source_exact'] = [bool(source['filename'] in texts and norm(source['excerpt']) in norm(texts[source['filename']])) for source in state['sources']]
    state['quote_in_source'] = [bool(source['filename'] in texts and norm(quote) in norm(texts[source['filename']]))
                                for quote,source in zip(state['quotes'],state['sources'])]
    state['quote_in_excerpt'] = [bool(norm(quote) in norm(source['excerpt']))
                                 for quote,source in zip(state['quotes'],state['sources'])]
    return state


def extract_comparison(page, case, texts):
    expect = case['expected_documents']
    if len(expect) != 2:
        raise RuntimeError('Comparison case must name exactly two documents')
    for selector, filename in (('#compare-left', expect[0]), ('#compare-right', expect[1])):
        page.locator(selector).select_option(label=filename)
    page.locator('#compare-topic').fill(case['question'])
    page.locator('#run-comparison').click()
    page.locator('#research-results:not([hidden])').wait_for(timeout=30000)
    result = page.evaluate('''() => ({
      title: document.querySelector('#research-result-title')?.textContent || '',
      sources: [...document.querySelectorAll('#research-result-body article.research-evidence')].map(x=>({
        filename: (x.querySelector('h4')?.textContent || '').replace(/^\\[\\d+\\]\\s*/, ''),
        excerpt: x.querySelector('.research-evidence-text')?.textContent || ''
      }))
    })''')
    result['source_exact'] = [bool(s['filename'] in texts and norm(s['excerpt']) in norm(texts[s['filename']])) for s in result['sources']]
    return result


def run():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--benchmark', type=Path, required=True)
    parser.add_argument('--project', type=Path, help='Existing checkout of the EXACT r25 commit; otherwise clone it')
    parser.add_argument('--check-pack-only', action='store_true')
    parser.add_argument('--headed', action='store_true')
    parser.add_argument('--browser', choices=['chrome','chromium'], default='chrome', help='Use installed real Google Chrome by default')
    parser.add_argument('--output', type=Path, default=Path('r25-raw-browser-capture.json'))
    parser.add_argument('--evidence-dir',type=Path,default=Path('r25-browser-evidence'),help='Screenshots and browser events')
    args = parser.parse_args()
    if not args.benchmark.is_file():
        parser.error(f'Missing ZIP: {args.benchmark}')

    with tempfile.TemporaryDirectory(prefix='groundeddesk_r25_') as scratch:
        work = Path(scratch)
        cases, docs, manifest = unpack_and_verify(args.benchmark, work / 'frozen')
        print('Frozen hashes: 6/6 PASS. Documents: 4. Questions: 32.',flush=True)
        if args.check_pack_only:
            print('Integrity check finished. No model or browser evaluation attempted.')
            return
        if args.project:
            project = args.project.resolve()
        else:
            project = work / 'GroundedDesk-AI'
            subprocess.run(['git','clone','--depth','1','--branch',BRANCH,REPO,str(project)],check=True)
        if not (project / 'index.html').is_file() or not (project / 'retrieval.mjs').is_file():
            raise RuntimeError(f'Invalid app root: {project}')
        build = re.search(r'RETRIEVAL_BUILD\s*=\s*[\'"]([^\'"]+)', (project / 'retrieval.mjs').read_text())
        if not build or build.group(1) != EXPECTED_BUILD:
            raise RuntimeError(f'Expected {EXPECTED_BUILD}; found {build.group(1) if build else "UNKNOWN"}')
        if (project / '.git').exists():
            commit = subprocess.run(['git','-C',str(project),'rev-parse','HEAD'],capture_output=True,text=True,check=True).stdout.strip()
            if commit != EXPECTED_COMMIT:
                raise RuntimeError(f'Exact r25 commit mismatch: expected {EXPECTED_COMMIT}, got {commit}')
        import playwright.sync_api as pw
        texts = {p.name: p.read_text(encoding='utf-8') for p in docs}
        server, url = start_server(project)
        records = []
        browser_events = []
        try:
            with pw.sync_playwright() as p:
                browser = p.chromium.launch(channel='chrome',headless=not args.headed) if args.browser=='chrome' else p.chromium.launch(headless=not args.headed)
                context = browser.new_context(accept_downloads=True)
                page = context.new_page()
                page.on('console', lambda msg: browser_events.append({'type':'console','level':msg.type,'text':msg.text[:300]}))
                page.on('pageerror', lambda err: browser_events.append({'type':'pageerror','text':str(err)[:400]}))
                page.on('requestfailed', lambda req: browser_events.append({'type':'requestfailed','url':req.url[:300]}))
                page.set_default_timeout(60000)
                page.goto(url, wait_until='domcontentloaded')
                # The app preloads bundled examples. Do NOT contaminate the frozen corpus.
                page.wait_for_function('''() => /sample documents ready|Some samples could not load/.test(document.querySelector('#alert')?.textContent || '')''', timeout=20000)
                page.locator('#clear-docs').click()
                page.wait_for_function('document.querySelector("#doc-count")?.textContent?.trim() === "0"',timeout=20000)
                page.locator('#file-input').set_input_files([str(x) for x in docs])
                page.wait_for_function('document.querySelector("#doc-count")?.textContent?.trim() === "4"',timeout=20000)
                page.locator('#enable-semantic').click()
                page.wait_for_function('''() => /Hybrid ready: indexed/.test(document.querySelector('#semantic-status')?.textContent || '')''',timeout=360000)
                if page.locator('#retrieval-mode').input_value()!='hybrid':
                    raise RuntimeError('Hybrid mode was not enabled by actual MiniLM')
                page.locator('#answer-mode').select_option('extractive')
                model_ready_status=page.locator('#semantic-status').inner_text()
                if 'Xenova/all-MiniLM-L6-v2' not in model_ready_status:
                    raise RuntimeError('Expected Xenova/all-MiniLM-L6-v2 confirmation; got '+model_ready_status)
                # WebGPU availability may change the status wording; the actual
                # extractive-only select state is the relevant invariant.
                if page.locator('#answer-mode').input_value()!='extractive':
                    raise RuntimeError('Extractive-only mode not enabled')
                args.evidence_dir.mkdir(parents=True,exist_ok=True)
                print('Real MiniLM ready. Beginning 26 Hybrid and 6 lexical Comparison cases.',flush=True)
                for case in cases:
                    state = extract_hybrid(page,case,texts) if case['workflow']=='hybrid' else extract_comparison(page,case,texts)
                    picture = args.evidence_dir / (case['id']+'.png')
                    page.screenshot(path=str(picture), full_page=True)
                    rec = {'id':case['id'],'workflow':case['workflow'],'question':case['question'],
                           'captured':state,'screenshot':str(picture)}
                    records.append(rec)
                    print(f'{case["id"]} captured: {len(state.get("sources", []))} displayed citations',flush=True)
                    # Preserve incomplete progress if browser/model fails midway.
                    args.output.parent.mkdir(parents=True,exist_ok=True)
                    args.output.write_text(json.dumps({'status':'PARTIAL_CAPTURE_NOT_SCORED',
                        'retrieval_build':EXPECTED_BUILD,'commit_sha':EXPECTED_COMMIT,
                        'benchmark_id':manifest['benchmark_id'],'model_ready_status':model_ready_status,'browser_events':browser_events,'cases':records},ensure_ascii=False,indent=2),encoding='utf-8')
                footer=page.locator('#retrieval-build').inner_text()
                browser.close()
        finally:
            server.shutdown()
            server.server_close()
        if EXPECTED_BUILD not in footer:
            raise RuntimeError(f'UI footer build mismatch: {footer}')
        output = {'name':manifest['benchmark_id']+' on r25 in-sample regression raw evidence',
                  'generated_at':datetime.now(timezone.utc).isoformat(),'model':'Xenova/all-MiniLM-L6-v2',
                  'retrieval_build':EXPECTED_BUILD,'commit_sha':EXPECTED_COMMIT,'browser':args.browser,'freeze_id':manifest['benchmark_id'],
                  'freeze_hashes_verified':True,'source_files_uploaded_to_app':[p.name for p in docs],
                  'method_note':'Actual MiniLM Chrome Hybrid Q&A; lexical Comparison. No grading performed by capture runner.',
                  'model_ready_status':model_ready_status,'browser_events':browser_events,'cases':records}
        args.output.parent.mkdir(parents=True,exist_ok=True)
        args.output.write_text(json.dumps(output,ensure_ascii=False,indent=2),encoding='utf-8')
        (args.evidence_dir / 'browser-events.json').write_text(json.dumps(browser_events,indent=2),encoding='utf-8')
        print(f'All 32 cases captured once. Raw evidence: {args.output.resolve()}',flush=True)
        print('Raw capture only; grade AFTER all captures with unchanged frozen answer key/rubric.',flush=True)


if __name__ == '__main__':
    try:
        run()
    except Exception as e:
        print(f'BENCHMARK INCOMPLETE — {type(e).__name__}: {e}',file=sys.stderr,flush=True)
        sys.exit(1)
