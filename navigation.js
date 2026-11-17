(()=>{
 const header=document.querySelector('.header');if(!header)return;
 try{localStorage.setItem('rp-theme','light')}catch{}document.documentElement.setAttribute('data-rp-theme','light');
 document.addEventListener('click',event=>{
  if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const a=event.target.closest('a[href]');if(!a)return;
  const url=new URL(a.href,location.href);
  if(url.origin!==location.origin&&url.hostname!=='rindeplus.com')return;
  const routes={'/':'/index.html','/en/':'/index-en.html','/en':'/index-en.html','/pt/':'/index-pt.html','/pt':'/index-pt.html'};
  const file=routes[url.pathname];if(!file)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(a.closest('.header-lang,.header-nav__lang-opciones')){
   try{sessionStorage.removeItem('rp-idioma-scroll')}catch{}
   location.assign(file+'?intro='+Date.now()+'#top');return;
  }
  if(location.pathname===file&&url.hash){location.hash=url.hash;return}
  location.assign(file+(url.hash||location.hash));
 },true);
 let timer;
 const apply=()=>{
  if(header.closest('astro-island')?.hasAttribute('ssr'))return;
  header.querySelectorAll('.header-nav a.menu-item,.header-paginas a.menu-item').forEach(a=>{
   if(a.classList.contains('nav-variable-hover')||a.querySelector('svg'))return;
   const text=a.textContent;a.setAttribute('aria-label',text);a.classList.add('nav-variable-hover');
   const frag=document.createDocumentFragment(),chars=[...text],center=(chars.length-1)/2;
   chars.forEach((char,i)=>{const wrap=document.createElement('span');wrap.className='nav-hover-char';wrap.dataset.char=char;wrap.setAttribute('aria-hidden','true');wrap.style.setProperty('--char-delay',`${Math.abs(i-center)*30}ms`);const letter=document.createElement('span');letter.className='char-content';letter.textContent=char;wrap.append(letter);frag.append(wrap)});a.replaceChildren(frag);
  });
 };
 const schedule=()=>{clearTimeout(timer);timer=setTimeout(apply,600)};
 new MutationObserver(schedule).observe(header,{childList:true,subtree:true});
 const island=header.closest('astro-island');if(island)new MutationObserver(schedule).observe(island,{attributes:true,attributeFilter:['ssr']});schedule();
})();
