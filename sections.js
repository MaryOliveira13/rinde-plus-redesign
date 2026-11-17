// Adapts Animated Tabs' sliding selection and +/-8px directional transition,
// and Scroll Reveal's {opacity:0,y:24} / easeOut entry to the original DOM.
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let lastTab=null;
 const initialize=()=>{
  const tabs=document.querySelector('.rp-fx__tabs');
  if(tabs&&!tabs.closest('astro-island')?.hasAttribute('ssr')&&!tabs.dataset.enhanced){
   tabs.dataset.enhanced='true';
   const selection=document.createElement('div');selection.className='section-tab-selection';selection.setAttribute('aria-hidden','true');tabs.append(selection);
   const update=()=>{
    const active=tabs.querySelector('[aria-selected="true"]');if(!active)return;
    selection.style.width=`${active.offsetWidth}px`;selection.style.transform=`translateX(${active.offsetLeft}px)`;
    if(lastTab&&lastTab!==active&&!reduced&&!matchMedia('(max-width:767px)').matches){
     const all=[...tabs.querySelectorAll('[role=tab]')];const direction=all.indexOf(active)>all.indexOf(lastTab)?1:-1;
     const panel=document.getElementById(active.getAttribute('aria-controls'));
     panel?.animate([{opacity:.55,translate:`${direction*8}px 0`},{opacity:1,translate:'0 0'}],{duration:450,easing:'cubic-bezier(.2,.7,.3,1)'});
     if(innerWidth<900){const l=active.offsetLeft,r=l+active.offsetWidth;if(l<tabs.scrollLeft||r>tabs.scrollLeft+tabs.clientWidth)tabs.scrollTo({left:l-8,behavior:reduced?'instant':'smooth'})}
    }
    lastTab=active;
   };
   new MutationObserver(update).observe(tabs,{subtree:true,attributes:true,attributeFilter:['aria-selected']});
   new ResizeObserver(update).observe(tabs);update();
  }
  const slider=document.querySelector('.rp-benefit-slider');
  if(slider&&!slider.closest('astro-island')?.hasAttribute('ssr')&&!slider.dataset.enhanced){
   slider.dataset.enhanced='true';
   const map=document.querySelector('.rp-lote__map');
   if(map){const visual=document.createElement('div');visual.className='benefit-map reference-orbit';visual.setAttribute('aria-hidden','true');visual.innerHTML='<img class="orbit-photo" src="./assets/orbit-field.webp" alt=""><img class="orbit-pie" src="./assets/orbit-pie.svg" alt=""><span class="orbit-leaf orbit-brand"><img src="./assets/rinde-r-icon.svg" alt=""></span><img class="orbit-bars" src="./assets/orbit-bars.svg" alt="">';slider.insertBefore(visual,slider.querySelector('.rp-fieldbg__nav'))}
   const labelButtons=()=>slider.querySelectorAll('.rp-fieldbg__dot').forEach((b,i)=>{
    if(b.querySelector('.benefit-nav-label'))return;
    const label=document.createElement('span');label.className='benefit-nav-label';
    const num=document.createElement('small');num.textContent=`0${i+1}`;label.append(num,document.createTextNode(b.getAttribute('aria-label').replace(/^Punto \d+: /,'')));b.append(label);
   });labelButtons();
   new MutationObserver(labelButtons).observe(slider.querySelector('.rp-fieldbg__nav'),{subtree:true,childList:true});
   let previous=slider.querySelector('.rp-benefit-slider__slide.is-active');
   new MutationObserver(()=>{const active=slider.querySelector('.rp-benefit-slider__slide.is-active');if(active===previous)return;previous=active;if(!active||reduced)return;active.querySelectorAll('h3,p').forEach((e,i)=>e.animate([{opacity:0,translate:'0 20px'},{opacity:1,translate:'0 0'}],{duration:600,delay:i*90,easing:'ease-out',fill:'backwards'}))}).observe(slider.querySelector('.rp-benefit-slider__stage'),{subtree:true,attributes:true,attributeFilter:['class']});
  }
 };
 setTimeout(initialize,600);
 // Deferred Astro islands can mount when they enter the viewport.
 let mountTimer;const mounts=new MutationObserver(()=>{clearTimeout(mountTimer);mountTimer=setTimeout(initialize,500)});mounts.observe(document.querySelector('main'),{childList:true,subtree:true,attributes:true,attributeFilter:['ssr']});

})();

(()=>{const sync=()=>document.documentElement.classList.toggle('page-scrolled',scrollY>50);addEventListener('scroll',sync,{passive:true});sync()})();

(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){if(e.target.id!=='funcionalidades')e.target.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'ease-out'});io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.rp-fx-section,.rp-home__section--field,.rp-install__grid').forEach(e=>io.observe(e))})();
