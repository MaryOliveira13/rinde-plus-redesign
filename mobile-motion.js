(()=>{
 const phone=matchMedia('(max-width:767px)');
 if(!phone.matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const seen=new WeakSet();
 const counters=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;counters.unobserve(entry.target);
  const strong=entry.target;
  const nodes=[];
  const visit=e=>e.childNodes.forEach(n=>{if(n.nodeType===3)nodes.push({node:n,text:n.data});else if(n.nodeType===1&&n.tagName!=='SMALL')visit(n)});visit(strong);
  const raw=nodes.map(n=>n.text).join('');const total=Number(raw.replace(/\D/g,''));if(!total||!nodes.length)return;
  const prefix=raw.match(/^[^\d]*/)?.[0]||'';const separator=strong.querySelector('.rp-impact__sep')?.textContent||'.';
  const format=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,separator);
  const start=performance.now();nodes.slice(1).forEach(n=>n.node.data='');nodes[0].node.data=prefix+'0';
  strong.animate([{opacity:.5,scale:'.92'},{opacity:1,scale:'1'}],{duration:650,easing:'ease-out'});
  const frame=now=>{const p=Math.min(1,(now-start)/900),eased=1-Math.pow(1-p,3);nodes[0].node.data=prefix+format(Math.round(total*eased));if(p<1)requestAnimationFrame(frame);else nodes.forEach(n=>n.node.data=n.text)};requestAnimationFrame(frame);
 }),{threshold:.5});
 const scan=()=>{
  document.querySelectorAll('#impacto .rp-impact__ind strong').forEach(e=>{
   if(seen.has(e)||e.closest('astro-island')?.hasAttribute('ssr'))return;
   seen.add(e);counters.observe(e);
  });
 };
 let timer;const schedule=()=>{clearTimeout(timer);timer=setTimeout(scan,500)};
 new MutationObserver(schedule).observe(document.querySelector('main'),{subtree:true,childList:true,attributes:true,attributeFilter:['ssr']});schedule();
})();
