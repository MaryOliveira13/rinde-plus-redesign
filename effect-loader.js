// Load costly decorative effects only for the surfaces that can display them.
(()=>{
 const near=(selector,load)=>{const element=document.querySelector(selector);if(!element)return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();load()}},{rootMargin:'300px 0px'});observer.observe(element)};
 if(matchMedia('(min-width:768px)').matches){
  const shimmer=()=>import('./assets/optimized/shimmer-entry.js');
  if('requestIdleCallback'in window)requestIdleCallback(shimmer,{timeout:900});else setTimeout(shimmer,250);
 }
 import('./assets/optimized/mesh-entry.js');import('./topo-lines.js');
})();
