(()=>{
 document.documentElement.classList.remove('client-card-await');
 if(matchMedia('(max-width:767px)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const seen=new WeakSet();
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;observer.unobserve(entry.target);entry.target.classList.add('mobile-logo-revealed');
  entry.target.animate([{opacity:0,translate:'0 18px',scale:'.92'},{opacity:1,translate:'0 0',scale:'1'}],{duration:425,delay:250+Number(entry.target.dataset.logoOrder||0)*35,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
 }),{threshold:.01});
 const scan=()=>document.querySelectorAll('.rp-home__hero-clientes .company-logo').forEach((e,i)=>{if(seen.has(e)||e.closest('astro-island')?.hasAttribute('ssr'))return;seen.add(e);e.dataset.logoOrder=String(i%4);observer.observe(e)});
 let timer;const queue=()=>{clearTimeout(timer);timer=setTimeout(scan,500)};
 new MutationObserver(queue).observe(document.querySelector('main'),{childList:true,subtree:true,attributes:true,attributeFilter:['ssr']});queue();
})();