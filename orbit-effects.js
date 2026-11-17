(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let source;
 const enhance=async()=>{
  const host=document.querySelector('.reference-orbit');if(!host||host.dataset.effects)return;host.dataset.effects='true';
  try{
   source??=fetch('./assets/orbit-bars.svg').then(r=>r.text());
   const svg=new DOMParser().parseFromString(await source,'image/svg+xml').documentElement;
   svg.removeAttribute('width');svg.removeAttribute('height');svg.setAttribute('class','orbit-bars orbit-growing');
   svg.querySelectorAll('path').forEach((p,i)=>p.style.setProperty('--bar-delay',`${.34+i*.06}s`));
   host.querySelector('.orbit-bars').replaceWith(document.importNode(svg,true));
   const clip=document.createElement('div');clip.className='orbit-white-clip';
   const white=document.importNode(svg,true);white.classList.add('orbit-white-bars');clip.append(white);host.append(clip);
  }catch{ /* Keep the original artwork if enhancement cannot load. */ }
  const reveal=()=>{host.classList.add('orbit-arrived');host.closest('.rp-benefit-slider')?.classList.add('benefits-arrived')};
  if(reduced){reveal();return}
  const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){reveal();io.disconnect()}},{threshold:.2});io.observe(host);
 };
 new MutationObserver(enhance).observe(document.querySelector('main'),{subtree:true,childList:true});enhance();
})();
