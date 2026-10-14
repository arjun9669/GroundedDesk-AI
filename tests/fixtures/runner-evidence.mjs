// Engineering capture utilities. Never alter keys, score results or replay queries.
import fs from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';

export const displayQuestion=q=>String(q).replace(/\r\n?/g,'\n').trim();
const basename=name=>{if(!/^[A-Za-z0-9_.-]+$/.test(name)||name==='.'||name==='..')throw new Error('Evidence filename must be a safe basename');return name;};
export async function openEvidenceLedger(directory){
 await fs.mkdir(directory,{recursive:true});
 if((await fs.readdir(directory)).length)throw new Error('Evidence directory must be empty; never overwrite');
 const root=path.resolve(directory);let sequence=0,checkpoint=0;
 const writeJSON=async(name,data)=>fs.writeFile(path.join(root,basename(name)),JSON.stringify(data,null,2),{flag:'wx'});
 await fs.writeFile(path.join(root,'run-events.jsonl'),'',{flag:'wx'});
 return {writeJSON,
  async event(type,details={}){const row={sequence:++sequence,utc:new Date().toISOString(),type,...details};await fs.appendFile(path.join(root,'run-events.jsonl'),JSON.stringify(row)+'\n');return row;},
  async checkpoint(data){const name=`checkpoint-${String(++checkpoint).padStart(5,'0')}.json`;await writeJSON(name,{utc:new Date().toISOString(),...data});return name;}
 };
}

export async function prepareQuestion(page,question){
 const original=String(question),token='groundeddesk_capture_'+randomUUID();
 if(!displayQuestion(original))throw new Error('Question is empty after display normalization; no submission');
 await page.locator('#query-input').fill(original);
 const browserInput=await page.locator('#query-input').inputValue();
 // Textareas normalize CR/LF; do not collapse internal spaces or rewrite the original key.
 if(browserInput!==original.replace(/\r\n?/g,'\n'))throw new Error('Browser input differs beyond textarea newline normalization');
 await page.evaluate(token=>{window[token]={previousQuestion:document.querySelector('.question-text')};},token);
 return {token,original_question:original,browser_input:browserInput,expected_display:displayQuestion(browserInput)};
}
export async function waitForAnswer(page,receipt,{timeout=120000}={}){
 await page.waitForFunction(({token,expected})=>{
  const node=document.querySelector('.question-text'),view=document.querySelector('#answer-result');
  return Boolean(window[token]&&node&&node!==window[token].previousQuestion&&view&&!view.hidden&&
   !document.querySelector('#ask-button')?.disabled&&node.textContent===expected);
 },{token:receipt.token,expected:receipt.expected_display},{timeout});
}
export async function readUIEvidence(page,receipt){
 return page.evaluate(({token,expected,original})=>{
  const get=s=>document.querySelector(s)?.textContent??null;
  const node=document.querySelector('.question-text'),view=document.querySelector('#answer-result');
  const quotes=[...document.querySelectorAll('.answer-box .cited-answer-paragraph')].map(e=>e.textContent);
  const sources=[...document.querySelectorAll('.source-card')].map((card,i)=>({filename:card.querySelector('strong')?.textContent??null,excerpt:card.querySelector('.source-excerpt')?.textContent??null,quote:quotes[i]?.replace(/^\[\d+\]\s*/,'')??null}));
  return {original_question:original,expected_display:expected,rendered_question:node?.textContent??null,
   matches_expected:node?.textContent===expected,fresh_result:Boolean(window[token]&&node&&node!==window[token].previousQuestion),
   result_visible:Boolean(view&&!view.hidden),button_disabled:document.querySelector('#ask-button')?.disabled??null,
   retrieval_mode:document.querySelector('#retrieval-mode')?.value??null,answer_mode:document.querySelector('#answer-mode')?.value??null,
   build:get('#retrieval-build'),semantic_status:get('#semantic-status'),answer:document.querySelector('.answer-box')?.innerText??null,
   sources,displayed:view?.innerText??null,
   comparison:{title:get('#research-result-title'),displayed:document.querySelector('#research-result-body')?.innerText??null,
    sources:[...document.querySelectorAll('.research-evidence')].map(card=>({filename:card.querySelector('h4')?.textContent??null,quote:card.querySelector('.research-evidence-text')?.textContent??null}))}};
 },{token:receipt?.token,expected:receipt?.expected_display,original:receipt?.original_question});
}
export async function preserveFailure(page,directory,{prefix='run-failure',error,receipt,context={}}){
 basename(prefix);const saved=[],collection_errors=[];
 const attempt=async(label,fn)=>{try{await fn();saved.push(label);}catch(e){collection_errors.push({artifact:label,error:String(e)});}};
 await attempt(prefix+'-dom.json',async()=>fs.writeFile(path.join(directory,prefix+'-dom.json'),JSON.stringify(await readUIEvidence(page,receipt),null,2),{flag:'wx'}));
 // Buffer first, then exclusive write: screenshot APIs otherwise overwrite files silently.
 await attempt(prefix+'.png',async()=>fs.writeFile(path.join(directory,prefix+'.png'),await page.screenshot({fullPage:true,timeout:10000}),{flag:'wx'}));
 const record={status:'BLOCKED',utc:new Date().toISOString(),error:error?.stack??String(error),context,
  receipt,saved,collection_errors,scoring_warning:'Failure snapshots are diagnostic, not automatically scored; verify question identity, freshness and actual retrieval mode.'};
 await fs.writeFile(path.join(directory,prefix+'.json'),JSON.stringify(record,null,2),{flag:'wx'});
 return record;
}
