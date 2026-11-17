// Native equivalent of the supplied HighlightText clip-path reveal.
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let timer;
 const mount=()=>{
  const badge=document.querySelector('.rp-benefit-slider__rotulo');if(!badge||badge.dataset.clipReveal||badge.closest('astro-island')?.hasAttribute('ssr'))return;
  badge.dataset.clipReveal='true';
  const reveal=()=>{badge.classList.add('badge-revealed');if(!reduced)badge.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)'}],{duration:1500,easing:'ease-in-out',fill:'backwards'})};
  if(reduced){reveal();return}
  const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){reveal();io.disconnect()}},{threshold:.2});io.observe(badge);
 };
 const queue=()=>{clearTimeout(timer);timer=setTimeout(mount,500)};
 new MutationObserver(queue).observe(document.querySelector('main'),{childList:true,subtree:true,attributes:true,attributeFilter:['ssr']});queue();
})();
