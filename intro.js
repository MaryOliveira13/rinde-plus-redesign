(()=>{
 document.documentElement.classList.add('intro-active');
 if('scrollRestoration'in history)history.scrollRestoration='manual';
 const boot=()=>{
  const lang=document.documentElement.lang;
  const overlay=document.createElement('div');overlay.className='site-intro';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-label',lang.startsWith('pt')?'Introdução Rinde Plus':lang.startsWith('en')?'Rinde Plus introduction':'Introducción Rinde Plus');
  const video=document.createElement('video');video.muted=true;video.autoplay=true;video.playsInline=true;video.preload='auto';video.defaultPlaybackRate=1.5;video.playbackRate=1.5;video.src='./assets/brand-intro.mp4?v=faststart-2';video.setAttribute('aria-label','Rinde Plus');
  const skip=document.createElement('button');skip.type='button';skip.textContent=lang.startsWith('pt')?'Pular intro':lang.startsWith('en')?'Skip intro':'Saltar intro';overlay.append(video,skip);document.body.append(overlay);
  let done=false,lastProgress=performance.now(),lastTime=0;
  const watchdog=setInterval(()=>{if(video.currentTime>lastTime){lastTime=video.currentTime;lastProgress=performance.now()}else if(performance.now()-lastProgress>4500)finish()},500);
  const finish=async()=>{
   if(done)return;done=true;clearTimeout(fallback);clearInterval(watchdog);video.pause();
   try{sessionStorage.removeItem('rp-idioma-scroll')}catch{}
   history.replaceState(null,'',location.pathname+location.search+'#top');window.scrollTo({top:0,behavior:'instant'});
   const reveal=()=>{document.documentElement.classList.remove('intro-active');overlay.remove()};
   const releaseTimer=setTimeout(reveal,2200);
   for(const pending of document.querySelectorAll('script[data-intro-src]')){
    await new Promise(resolve=>{const script=document.createElement('script');script.src=pending.dataset.introSrc;if(pending.dataset.introModule)script.type='module';const timeout=setTimeout(resolve,1500);script.onload=script.onerror=()=>{clearTimeout(timeout);resolve()};pending.after(script)});
   }
   const images=[...document.querySelectorAll('.hero-scene img')];
   await Promise.race([Promise.all(images.map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,1800))]);
   window.scrollTo({top:0,behavior:'instant'});
   clearTimeout(releaseTimer);reveal();
   window.dispatchEvent(new Event('scroll'));window.dispatchEvent(new CustomEvent('rinde:intro-complete'));
  };
  const fallback=setTimeout(finish,12000);
  video.addEventListener('ended',finish,{once:true});video.addEventListener('error',finish,{once:true});skip.onclick=finish;
  video.addEventListener('loadedmetadata',()=>{video.playbackRate=1.5},{once:true});
  video.play().catch(finish);
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
