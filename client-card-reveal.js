(()=>{
 document.documentElement.classList.remove('client-card-await');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let triggered=false;
 const reveal=()=>{
  document.querySelectorAll('.rp-home__hero-clientes .company-logo:not(.mobile-logo-revealed)').forEach(e=>{
   if(e.closest('astro-island')?.hasAttribute('ssr'))return;
   e.classList.add('mobile-logo-revealed');e.style.removeProperty('opacity');
   if(!reduced)e.animate([{opacity:0,translate:'0 12px',filter:'blur(3px)'},{opacity:1,translate:'0 0',filter:'blur(0px)'}],{duration:600,delay:0,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'});
  });
 };
 const onScroll=()=>{if(document.documentElement.classList.contains('intro-active')||scrollY<=2)return;triggered=true;reveal()};
 window.addEventListener('scroll',onScroll,{passive:true});
 new MutationObserver(()=>{if(triggered)reveal()}).observe(document.querySelector('main'),{childList:true,subtree:true,attributes:true,attributeFilter:['ssr']});
 onScroll();
})();
