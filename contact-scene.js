(()=>{
 const section=document.querySelector('#contacto');if(!section)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const image=document.createElement('img');image.className='contact-parallax-image';image.loading='lazy';image.fetchPriority='low';image.srcset='./assets/contact-field-mobile.webp 760w, ./assets/contact-field.webp 1440w';image.sizes='100vw';image.src='./assets/contact-field.webp';image.alt='';image.setAttribute('aria-hidden','true');image.decoding='async';section.prepend(image);
 let frame=0,position=0;
 const render=()=>{
  frame=0;const r=section.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
  const limit=r.height*.25;
  const target=reduced.matches?0:Math.max(-limit,Math.min(limit,(innerHeight/2-r.top-r.height/2)*.5));
  position+= (target-position)*.12;image.style.transform=`translateY(${position}px)`;
  if(Math.abs(position-target)>.1)frame=requestAnimationFrame(render);
 };
 const request=()=>{if(!frame)frame=requestAnimationFrame(render)};
 addEventListener('scroll',request,{passive:true});addEventListener('resize',request,{passive:true});reduced.addEventListener('change',request);request();
 const reveal=()=>{
  document.documentElement.classList.remove('contact-await');if(reduced.matches)return;
  const title=section.querySelector('.rp-home__cta-title');const text=title.textContent;title.setAttribute('aria-label',text);
  const fragment=document.createDocumentFragment();let i=0;
  text.split(/(\s+)/).forEach(word=>{if(/^\s+$/.test(word)){fragment.append(document.createTextNode(word));return}const span=document.createElement('span');span.style.display='inline-block';span.setAttribute('aria-hidden','true');span.textContent=word;span.dataset.index=String(i++);fragment.append(span)});title.replaceChildren(fragment);
  title.querySelectorAll('span').forEach(span=>span.animate([{opacity:0,filter:'blur(12px)',transform:'translateY(20px)'},{opacity:1,filter:'blur(0)',transform:'translateY(0)'}],{duration:900,delay:Number(span.dataset.index)*90,easing:'cubic-bezier(.2,.65,.3,1)',fill:'backwards'}));
  [['.rp-home__cta-vision',500],['.rp-home__cta-btn',1150],['.rp-home__cta-hint',1450]].forEach(([selector,delay])=>section.querySelector(selector).animate([{opacity:0,filter:'blur(7px)',translate:'0 16px'},{opacity:1,filter:'blur(0)',translate:'0 0'}],{duration:750,delay,easing:'ease-out',fill:'backwards'}));
 };
 const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){reveal();io.disconnect()}},{threshold:.25,rootMargin:'0px 0px -40px 0px'});io.observe(section);
})();
