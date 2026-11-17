(()=>{
 const hero=document.querySelector('.rp-home__hero');
 if(!hero)return;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const mobile=matchMedia('(max-width:767px)');
 let frame=0;
 const update=()=>{
  frame=0;
  const rect=hero.getBoundingClientRect();
  if(motion.matches){hero.style.removeProperty('--parallax-scroll');return}
  const offset=Math.min(Math.max(-rect.top,0),rect.height);
  hero.style.setProperty('--parallax-scroll',`${offset*(mobile.matches ? .45 : 1)}px`);
 };
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule,{passive:true});
 motion.addEventListener('change',schedule);update();
})();
