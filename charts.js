(()=>{
 const section=document.querySelector('.rp-fx-section');if(!section)return;
 const ns='http://www.w3.org/2000/svg';const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const create=(name,attrs)=>{const e=document.createElementNS(ns,name);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));return e};
 let visible=false,last=null,scheduled=false;
 const animate=()=>{
  const panel=section.querySelector('.rp-fx__panel.is-active');if(!visible||!panel||panel===last)return;last=panel;
  if(reduced)return;
  const svg=panel.querySelector('.rp-fx__chart');
  svg.querySelectorAll('[class*="fx-a-"]').forEach((e,i)=>{
   let frames=[{opacity:0},{opacity:1}],duration=650;
   const delay=Math.min(parseFloat(e.style.getPropertyValue('--d'))||0,1.1)*600;
   if(e.classList.contains('fx-a-crece-y')){e.style.transformBox='fill-box';e.style.transformOrigin='center bottom';frames=[{transform:'scaleY(0)',opacity:.2},{transform:'scaleY(1)',opacity:1}];duration=1050}
   else if(e.classList.contains('fx-a-crece-x')){e.style.transformBox='fill-box';e.style.transformOrigin='left center';frames=[{transform:'scaleX(0)',opacity:.2},{transform:'scaleX(1)',opacity:1}];duration=1100}
   else if(e.classList.contains('fx-a-trazo')){frames=[{strokeDasharray:'1',strokeDashoffset:'1',opacity:.5},{strokeDasharray:'1',strokeDashoffset:'0',opacity:1}];duration=1550}
   else if(e.classList.contains('fx-a-punto')){e.style.transformBox='fill-box';e.style.transformOrigin='center';frames=[{transform:'scale(.65)',opacity:0},{transform:'scale(1)',opacity:1}];duration=650}
   // Keep each bar's original opacity throughout its growth; no end-of-animation color jump.
   if(['rp-fx-panel-planificar','rp-fx-panel-cerrar'].includes(panel.id)&&e.matches('rect.fx-f1,rect.fx-f-neutral'))frames=frames.map(({opacity,...frame})=>frame);
   e.getAnimations().forEach(a=>a.cancel());
   e.animate(frames,{duration,delay,easing:'cubic-bezier(.2,.7,.3,1)',fill:'backwards'});
  });
 };
 const init=()=>{
  if(scheduled||section.closest('astro-island')?.hasAttribute('ssr'))return;scheduled=true;
  setTimeout(()=>{
   section.querySelectorAll('.rp-fx__chart').forEach((svg,index)=>{
    const defs=create('defs',{});
    [['primary','#72a36b','#245b3d'],['neutral','#b9c8ad','#7c9575']].forEach(([name,light,dark])=>{
     const id=`polished-chart-${index}-${name}`;
     const gradient=create('linearGradient',{id,x1:'0',y1:'0',x2:'0',y2:'1'});
     gradient.append(create('stop',{offset:'0%','stop-color':light}),create('stop',{offset:'100%','stop-color':dark}));defs.append(gradient);
    });svg.prepend(defs);
    // Grid is decorative; original coordinates, shapes and labels stay intact.
    if(index!==4){const grid=create('g',{'aria-hidden':'true'});[36,64,84].forEach(y=>grid.append(create('line',{x1:16,x2:186,y1:y,y2:y,class:'chart-guide'})));defs.after(grid)}
    svg.querySelectorAll('rect.fx-f1,rect.fx-f-neutral').forEach(rect=>{
     const primary=rect.classList.contains('fx-f1');
     rect.style.fill=`url(#polished-chart-${index}-${primary?'primary':'neutral'})`;
     rect.setAttribute('rx','3.5');
     const label=rect.parentElement.querySelector('text')?.textContent;
     if(label){const title=create('title',{});title.textContent=label;rect.append(title)}
    });
    svg.classList.add('chart-upgraded');
   });
   const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;animate()},{threshold:.2});observer.observe(section.querySelector('.rp-fx'));
   new MutationObserver(animate).observe(section.querySelector('.rp-fx__panels'),{subtree:true,attributes:true,attributeFilter:['class']});
  },650);
 };
 const island=section.closest('astro-island');if(island){const observer=new MutationObserver(()=>{if(!island.hasAttribute('ssr')){observer.disconnect();init()}});observer.observe(island,{attributes:true,attributeFilter:['ssr']})}init();
})();
