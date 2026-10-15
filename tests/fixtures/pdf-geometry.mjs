// Let viewport/media-query layout settle, then sample both boxes in one task.
// Fixed frame count: never wait until a failing geometry assertion turns green.
export async function readPDFGeometry(page){
 return page.evaluate(async()=>{
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  const stage=document.querySelector('.pdf-page-stage'),overlay=document.querySelector('.pdf-highlight-overlay');
  if(!stage||!overlay)throw new Error('PDF stage or overlay disappeared during resize');
  const box=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
  return {stage:box(stage),overlay:box(overlay),viewport:{width:innerWidth,height:innerHeight},sampled_same_task:true,settle_frames:2};
 });
}
