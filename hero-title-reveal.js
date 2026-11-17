// Supplied TextReveal preset: word-by-word fade-in-blur, speedReveal 1.2.
(()=>{
 const title=document.querySelector('.rp-home__hero-title');if(!title)return;
 const lines=[...title.children];
 title.setAttribute('aria-label',lines.map(e=>e.textContent).join(' '));
 let index=0;
 lines.forEach(line=>{
  line.setAttribute('aria-hidden','true');
  const fragment=document.createDocumentFragment();
  line.textContent.split(/(\s+)/).forEach(word=>{
   if(/^\s+$/.test(word)){fragment.append(document.createTextNode(word));return}
   const span=document.createElement('span');span.className='hero-reveal-word';
   span.textContent=word;span.style.setProperty('--word-delay',`${.2+index++*(.05/1.2)}s`);fragment.append(span);
  });line.replaceChildren(fragment);
 });
})();
