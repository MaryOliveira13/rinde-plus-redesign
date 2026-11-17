// Keep the original interactive components; add only presentation behavior.
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const hero=document.querySelector('.rp-home__hero');
if(hero){
 const scene=document.createElement('div');scene.className='hero-scene';scene.setAttribute('aria-hidden','true');
 scene.innerHTML='<picture><source media="(max-width:767px)" srcset="./assets/hero-mobile-landscape.webp"><img class="hero-landscape" src="./assets/hero-landscape.webp" alt="" fetchpriority="high" decoding="async"></picture><div class="hero-wordmark"><span>RINDE</span> <span>PLUS</span></div><picture><source media="(max-width:767px)" srcset="./assets/hero-mobile-tractor.webp"><img class="hero-tractor" src="./assets/hero-tractor.webp" alt="" fetchpriority="high" decoding="async"></picture><div class="hero-shade"></div>';
 hero.prepend(scene);
 if(!reduced&&matchMedia('(pointer:fine)').matches){
  let frame;hero.addEventListener('pointermove',event=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=hero.getBoundingClientRect();scene.style.setProperty('--name-x',`${(event.clientX/r.width-.5)*14}px`);scene.style.setProperty('--name-y',`${((event.clientY-r.top)/r.height-.5)*8}px`)})});
  hero.addEventListener('pointerleave',()=>{scene.style.setProperty('--name-x','0px');scene.style.setProperty('--name-y','0px')});
 }
}
const header=document.querySelector('.header');
const updateHeader=()=>header?.classList.toggle('design-scrolled',scrollY>50);
addEventListener('scroll',updateHeader,{passive:true});updateHeader();
if(!reduced){
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pending');observer.unobserve(e.target)}}),{threshold:.08});
 document.querySelectorAll('.rp-impact__head,.rp-fx__head,.rp-install__header,.rp-home__cta-panel').forEach(e=>{e.classList.add('design-reveal','pending');observer.observe(e)});
}
const note=document.createElement('p');note.className='concept-note';note.textContent=document.documentElement.lang.startsWith('pt')?'Proposta conceitual independente · Redesign de apresentação':document.documentElement.lang.startsWith('en')?'Independent concept · Presentation redesign':'Propuesta conceptual independiente · Rediseño de presentación';document.querySelector('.rp-footer__inner')?.append(note);
