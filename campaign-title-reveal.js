// Native adaptation of the supplied TextReveal demo: per="word",
// preset="fade-in-blur", speedReveal=1.2. No extra runtime dependency.
(()=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const title=document.querySelector('.rp-fx__title');if(!title)return;
 const island=title.closest('astro-island');
 let scheduled=false;
 const prepare=()=>{
  if(scheduled||island?.hasAttribute('ssr'))return;
  scheduled=true;
  setTimeout(()=>{
   const io=new IntersectionObserver(entries=>{
    if(!entries.some(e=>e.isIntersecting))return;
    io.disconnect();
    const text=title.textContent;
    title.setAttribute('aria-label',text);
    const fragment=document.createDocumentFragment();let index=0;
    text.split(/(\s+)/).forEach(segment=>{
     if(/^\s+$/.test(segment)){fragment.append(document.createTextNode(segment));return}
     const span=document.createElement('span');span.textContent=segment;
     span.setAttribute('aria-hidden','true');span.style.display='inline-block';
     fragment.append(span);
     span.dataset.revealIndex=String(index++);
    });
    title.replaceChildren(fragment);
    title.classList.add('campaign-title-running');
    document.documentElement.classList.remove('campaign-title-await');
    title.querySelectorAll('span').forEach(span=>span.animate([
     {opacity:0,filter:'blur(12px)',transform:'translateY(20px)'},
     {opacity:1,filter:'blur(0px)',transform:'translateY(0)'},
    ],{duration:900,delay:Number(span.dataset.revealIndex)*90,easing:'cubic-bezier(.2,.65,.3,1)',fill:'both'}));
   },{threshold:.35,rootMargin:'0px 0px -60px 0px'});io.observe(title);
  },500);
 };
 if(island){const observer=new MutationObserver(()=>{if(!island.hasAttribute('ssr')){observer.disconnect();prepare()}});observer.observe(island,{attributes:true,attributeFilter:['ssr']})}
 prepare();
})();
