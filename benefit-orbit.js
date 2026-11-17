// Circular composition: starts at 0 degrees; rotation follows section scroll.
// power1.out easing and overlapping circular-photo / static icon composition.
(()=>{
 const section=document.querySelector('#beneficios');if(!section)return;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');let visual,photo,frame=0;
 const update=()=>{
  frame=0;if(!visual)return;
  const bounds=document.querySelector('#beneficios').getBoundingClientRect();
  const progress=Math.min(1,Math.max(0,-bounds.top/Math.max(bounds.height,1)));
  photo.style.setProperty('transform',"rotate("+(motion.matches?0:progress*50)+"deg)",'important');
 };
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
 const mount=()=>{
  const target=document.querySelector('#beneficios .benefit-map');if(!target||target.closest('astro-island')?.hasAttribute('ssr')||target.dataset.orbit)return;
  target.dataset.orbit='true';target.classList.add('reference-orbit');
  if(!target.querySelector('.orbit-photo'))target.innerHTML='<img class="orbit-photo" src="./assets/orbit-field.webp" alt=""><img class="orbit-pie" src="./assets/orbit-pie.svg" alt=""><span class="orbit-leaf orbit-brand"><img src="./assets/rinde-r-icon.svg" alt=""></span><img class="orbit-bars" src="./assets/orbit-bars.svg" alt="">';
  visual=target;photo=target.querySelector('.orbit-photo');
  const slider=target.closest('.rp-benefit-slider');
  const images=['./assets/orbit-field.webp','./assets/soja-atardecer.CQTKi0dY.webp','./assets/girasol-tormenta.CZDsdYof.webp','./assets/cosecha-soja.DhaELixS.webp'];
  let current=-1,request=0;
  const syncImage=async()=>{
   const slides=[...slider.querySelectorAll('.rp-benefit-slider__slide')];
   const index=slides.findIndex(slide=>slide.classList.contains('is-active'));
   if(index<0||index===current)return;current=index;const token=++request;
   const image=new Image();image.src=images[index];
   try{await image.decode()}catch{return}
   if(token!==request)return;
   photo.src=images[index];
   if(!motion.matches&&target.classList.contains('orbit-arrived'))photo.animate([{opacity:.4},{opacity:1}],{duration:450,easing:'ease-out'});
  };
  new MutationObserver(syncImage).observe(slider.querySelector('.rp-benefit-slider__stage'),{subtree:true,attributes:true,attributeFilter:['class']});
  syncImage();
  new ResizeObserver(schedule).observe(target);schedule();
 };
 let mountTimer;const queueMount=()=>{clearTimeout(mountTimer);mountTimer=setTimeout(mount,600)};new MutationObserver(queueMount).observe(document.querySelector('main'),{childList:true,subtree:true,attributes:true,attributeFilter:['ssr']});queueMount();
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});motion.addEventListener('change',schedule);
})();
