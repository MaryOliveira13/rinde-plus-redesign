(()=>{
 const section=document.querySelector('#instalar');if(!section)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const title=section.querySelector('.rp-install__title');
 const reveal=()=>{
  title.classList.add('install-title-running');document.documentElement.classList.remove('install-title-await');if(reduced)return;
  title.setAttribute('aria-label',[...title.children].map(line=>line.textContent).join(' '));
  let i=0;
  [...title.children].forEach(line=>{line.setAttribute('aria-hidden','true');const fragment=document.createDocumentFragment();line.textContent.split(/(\s+)/).forEach(word=>{if(/^\s+$/.test(word)){fragment.append(document.createTextNode(word));return}const span=document.createElement('span');span.style.display='inline-block';span.textContent=word;span.dataset.order=String(i++);fragment.append(span)});line.replaceChildren(fragment)});
  title.querySelectorAll('[data-order]').forEach(span=>span.animate([{opacity:0,filter:'blur(12px)',transform:'translateY(20px)'},{opacity:1,filter:'blur(0)',transform:'translateY(0)'}],{duration:900,delay:Number(span.dataset.order)*90,easing:'cubic-bezier(.2,.65,.3,1)',fill:'backwards'}));
  section.querySelector('.rp-install__subtitle').animate([{opacity:0,translate:'0 15px'},{opacity:1,translate:'0 0'}],{duration:700,delay:400,easing:'ease-out',fill:'backwards'});
 };
 const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){reveal();io.disconnect()}},{threshold:.35,rootMargin:'0px 0px -60px 0px'});io.observe(title);
 const footer=document.querySelector('.rp-footer__main');
 if(footer&&!document.querySelector('.finale-wordmark')){const mark=document.createElement('div');mark.className='finale-wordmark';mark.textContent='RINDE PLUS';mark.setAttribute('aria-hidden','true');footer.after(mark);if(!reduced){const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){mark.animate([{opacity:0,translate:'0 24px'},{opacity:1,translate:'0 0'}],{duration:1000,easing:'ease-out'});observer.disconnect()}},{threshold:.2});observer.observe(mark)}}
})();
