// Keep each requested editorial line together, rather than letting it wrap again.
(()=>{
 let timer;
 const fit=()=>{
  document.querySelectorAll('.rp-benefit-slider__slide h3,.rp-benefit-slider__slide p').forEach(el=>{
   if(!el.textContent.includes('\n')&&!el.dataset.fixedLines)return;
   if(!el.dataset.fixedLines){
    el.dataset.fixedLines='true';const text=el.textContent;
    const fragment=document.createDocumentFragment();text.split('\n').forEach((line,i)=>{const span=document.createElement('span');span.className='benefit-fixed-line';span.textContent=line;fragment.append(span)});el.replaceChildren(fragment);
   }
   el.style.removeProperty('font-size');
   const available=el.clientWidth;if(!available)return;
   const base=parseFloat(getComputedStyle(el).fontSize);
   const width=Math.max(...[...el.children].map(line=>line.scrollWidth));
   if(width>available)el.style.setProperty('font-size',`${base*available/width}px`,'important');
  });
 };
 const queue=()=>{clearTimeout(timer);timer=setTimeout(fit,700)};
 new MutationObserver(queue).observe(document.querySelector('main'),{childList:true,subtree:true});
 addEventListener('resize',queue,{passive:true});document.fonts.ready.then(queue);queue();
})();
