// Unrelated synthetic fixtures only. No study question or candidate/planner imports.
import test from 'node:test';
import assert from 'node:assert/strict';
import {sha,validateDraft} from '../eval/nextconfirm64/validate-draft.mjs';
function fixture(){
 const texts={},sources=Array.from({length:8},(_,i)=>{const id='D'+String(i+1).padStart(2,'0'),name=String(i+1).padStart(2,'0')+'_Synthetic.txt',body=`Synthetic component ${i+1} has a labelled surface.\n`;texts[id]=body;return {id,name,path:'eval/nextconfirm64/source_docs/'+name,bytes:Buffer.byteLength(body),sha256:sha(body),author:'Synthetic author',provenance:'Unrelated fixture'};});
 const categories=['object_location','causal_explanation','event_actor_publication','policy_completeness','clock_ticket_roles','numeric_metric_unit','missing_fact','wrong_object_location','ambiguous_reference','unsupported_policy_boundary','monthly_explicit_location','ordinal_event_object','departure_cutoff_hold','comparison_missing_location','comparison_missing_month','comparison_wrong_event_object','comparison_missing_hold'];
 const ends=[6,12,20,28,34,40,44,48,52,56,58,59,60,61,62,63,64];
 const cases=Array.from({length:64},(_,i)=>({id:'NC'+String(i+1).padStart(2,'0'),question:`Unrelated synthetic fixture ${i+1}?`,workflow:i<56?'hybrid':'comparison',category:categories[ends.findIndex(n=>i<n)],selected_documents:(i<56?sources:sources.slice(0,2)).map(s=>s.id)}));
 const keys=cases.map((c,i)=>{const unsupported=(i>=40&&i<56)||i>=60,es=unsupported?[]:(i<56?sources.slice(0,1):sources.slice(0,2)).map(s=>({filename:s.name,context:texts[s.id].trim(),groups:[['labelled surface']]}));return {...c,unsupported,expected_sources:es,expected_documents:es.map(e=>e.filename)};});
 const key_file_sha256=sha(JSON.stringify(keys));
 const notes=cases.map((c,i)=>({id:c.id,answerability:keys[i].unsupported?'unsupported':'supported',rationale:'Synthetic rationale only',author:'Synthetic author',selected_documents:c.selected_documents,review_status:'PENDING_INDEPENDENT_REVIEW'}));
 const open={outcome:'OPEN',reviewer:null,reviewed_at:null,findings:[]};
 const review={checklist_id:'NEXTCONFIRM64-REVIEW-20261025',status:'PENDING_INDEPENDENT_REVIEW',reviewer:null,reviewed_at:null,signed_off_commit:null,sign_off:null,findings:[],source_reviews:sources.map(s=>({...open,id:s.id,name:s.name,sha256:s.sha256})),cases:cases.map((c,i)=>({...open,id:c.id,question_sha256:sha(c.question),key_file_sha256,key_index:i,selected_documents:c.selected_documents.map(d=>{const s=sources.find(s=>s.id===d);return {id:s.id,name:s.name,sha256:s.sha256};}),answerability:null,requested_facets:null,expected_sources_review:null,absence_review:null}))};
 const authorship={protocol_id:'NEXTCONFIRM64-INPUT-20261025',independent_reviewer:null,independent_input_review:'PENDING',candidate_or_planner_invocations_on_pack:0,input_freeze:'ABSENT',execution_readiness:'NOT READY',phase2:'HOLD'};
 return {data:{sources,cases,keys,notes,review,authorship,key_file_sha256},texts};
}
test('static draft validation accepts synthetic inventory while review and readiness stay pending',()=>{const {data,texts}=fixture(),r=validateDraft(data,texts);assert.equal(r.static_validation,'PASS');assert.match(r.independent_review,/PENDING/);assert.equal(r.input_freeze,'ABSENT');assert.equal(r.execution,'NOT READY / NOT RUN');});
for(const [name,mutate] of Object.entries({
 'changed source bytes':(d,t)=>t.D01+='altered',
 'source path escape':d=>d.sources[0].path='../outside',
 'duplicate question':d=>d.cases[1].question=d.cases[0].question,
 'wrong ID order':d=>d.cases[1].id='NC03',
 'category count drift':d=>d.cases[0].category='missing_fact',
 'Hybrid corpus substitution':d=>d.cases[0].selected_documents=['D01'],
 'unknown Comparison side':d=>d.cases[56].selected_documents=['D01','D99'],
 'one-sided supported Comparison key':d=>{d.keys[56].expected_sources.pop();d.keys[56].expected_documents.pop();},
 'missing literal context':d=>d.keys[0].expected_sources[0].context='Invented paragraph',
 'missing gold group':d=>d.keys[0].expected_sources[0].groups.push(['absent assertion']),
 'unsupported case carrying evidence':d=>d.keys[40].expected_sources=d.keys[0].expected_sources,
 'key/question misalignment':d=>d.keys[0].question='Different question',
 'review key identity drift':d=>d.review.cases[0].key_file_sha256='wrong',
 'invented independent review':d=>d.review.cases[0].outcome='VERIFIED',
 'exposed candidate inputs':d=>d.authorship.candidate_or_planner_invocations_on_pack=1,
 'invented input freeze':d=>d.authorship.input_freeze='READY'
}))test('draft guard rejects '+name,()=>{const {data,texts}=fixture();mutate(data,texts);assert.throws(()=>validateDraft(data,texts));});
