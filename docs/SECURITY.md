# Security and privacy boundaries

GroundedDesk is a **public educational static app**, not a security-certified document service.

## Trust boundary

Uploaded documents are untrusted text. The interface renders their filenames, excerpts, questions, and research outputs through DOM `textContent`/text nodes instead of interpreting document strings as HTML. The default retrieval engine searches content locally; it does not obey instructions embedded in the source. The optional Qwen generator receives excerpts within a prompt warning that source text is untrusted, but prompt injection can still affect language-model output. Citation-number validation is not a semantic entailment proof.

## Data flow

- **Browser session:** files are read into in-memory JavaScript objects. Adding/removing files updates the index and clears answers/evaluation displays so stale citations are not shown.
- **Optional dependencies:** the PDF.js library and Transformers.js/model weights are requested from public CDNs/model hosting. Such downloads reveal routine connection metadata to providers. Do not describe this initial download as offline.
- **Optional local inference:** MiniLM and Qwen inference is designed to run on device with supported WASM/WebGPU; no paid remote inference API is called by the app.
- **Exports:** copying/downloading reports writes possibly sensitive text to the system clipboard or device disk. Review before sharing.
- **External components:** browser extensions, hosting logs, device malware and network intermediaries are beyond the app's guarantees.

## Verifiable checks and limits

`quality.mjs` verifies document identity, citation sequence, nonduplicated document IDs, exact quote-within-excerpt, and excerpt-within-normalized-source relationships. If any check fails, the UI withholds the answer. This is provenance integrity, **not** correctness, trustworthiness or permission auditing. The 4.0 warning list detects a few familiar prompt-injection patterns; it has both false positives and false negatives.

PDF.js parses text-based PDFs only; users should avoid untrusted PDFs when source-library security or update policy is unknown. The application does not provide antivirus scanning, document malware removal, authentication, encryption at rest, OCR, or regulatory compliance guarantees.

## Reporting

Open an issue in [this repository](https://github.com/arjun9669/GroundedDesk-AI/issues) without attaching confidential document text, tokens or private account data. For personal documents and production integration, perform an independent review first.

## Quick guide preference

The optional first-use guide stores only `groundeddesk-guide-dismissed-v1` with the value `1` in this site’s browser localStorage when dismissed or closed. Documents, quotations and questions are not stored with this preference. The guide remains usable if storage is blocked. Model/dependency caches are separate from this preference; existing document-memory boundaries remain unchanged.
