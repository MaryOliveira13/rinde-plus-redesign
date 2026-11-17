(()=>{
 if(!matchMedia('(max-width:767px)').matches)return;
 let timer;
 const mount=()=>{
  const root=document.querySelector('.rp-fx');
  if(!root||root.dataset.mobileControls||root.closest('astro-island')?.hasAttribute('ssr'))return;
  root.dataset.mobileControls='true';
  const track=root.querySelector('.rp-fx__panels'),cards=[...track.children];
  const clone=card=>{const c=card.cloneNode(true);c.removeAttribute('id');c.querySelectorAll('[id]').forEach(e=>{const old=e.id,next='loop-'+card.id+'-'+old;e.id=next;c.querySelectorAll('*').forEach(n=>[...n.attributes].forEach(a=>{if(a.value.includes('#'+old))n.setAttribute(a.name,a.value.replaceAll('#'+old,'#'+next))}))});c.removeAttribute('inert');c.setAttribute('aria-hidden','true');c.dataset.loopCopy='true';return c};
  track.prepend(clone(cards.at(-1)));track.append(clone(cards[0]));
  let visible=false,drag=null,auto,settle,position=1,ignoreClickUntil=0;
  const step=()=>cards[1].offsetLeft-cards[0].offsetLeft;
  const jump=p=>{track.style.setProperty('scroll-snap-type','none','important');track.scrollTo({left:p*step(),behavior:'instant'});requestAnimationFrame(()=>{if(!drag)track.style.removeProperty('scroll-snap-type')})};
  const activate=()=>cards.forEach((c,i)=>{c.classList.toggle('is-active',i===position-1);c.removeAttribute('inert');c.setAttribute('aria-hidden',i===position-1?'false':'true')});
  const normalize=()=>{if(drag)return;position=Math.round(track.scrollLeft/step());if(position===0){position=cards.length;jump(position)}else if(position===cards.length+1){position=1;jump(position)}activate();track.style.removeProperty('scroll-snap-type')};
  // Own the mobile scroll state so React cannot pull the strip back to a tab.
  track.addEventListener('scroll',e=>{e.stopPropagation();clearTimeout(settle);settle=setTimeout(normalize,120)},{capture:true});
  const play=()=>{clearInterval(auto);if(visible&&!document.hidden&&!drag)auto=setInterval(()=>{position=Math.round(track.scrollLeft/step())+1;track.scrollTo({left:position*step(),behavior:'smooth'})},10000)};
  new IntersectionObserver(([e])=>{visible=e.isIntersecting;play()},{threshold:.25}).observe(root);
  document.addEventListener('visibilitychange',play);
  track.addEventListener('pointerdown',e=>{clearInterval(auto);if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,left:track.scrollLeft,moved:false};track.style.setProperty('scroll-snap-type','none','important')});
  track.addEventListener('pointermove',e=>{if(!drag)return;if(Math.abs(drag.x-e.clientX)>5){drag.moved=true;if(!track.hasPointerCapture(e.pointerId))track.setPointerCapture(e.pointerId);ignoreClickUntil=performance.now()+500}track.scrollLeft=drag.left+drag.x-e.clientX});
  const finish=e=>{if(drag){const moved=drag.moved;drag=null;if(!moved){const hit=document.elementFromPoint(e.clientX,e.clientY)?.closest('.rp-fx__panel');const target=hit?[...track.children].indexOf(hit):-1;if(target>=0&&target!==position){position=target;track.scrollTo({left:target*step(),behavior:'smooth'});ignoreClickUntil=performance.now()+500}}if(moved){position=Math.round(track.scrollLeft/step());track.scrollTo({left:position*step(),behavior:'smooth'})}else track.style.removeProperty('scroll-snap-type');if(track.hasPointerCapture(e.pointerId))track.releasePointerCapture(e.pointerId)}play()};
  track.addEventListener('pointerup',finish);track.addEventListener('pointercancel',finish);
  track.addEventListener('click',e=>{if(performance.now()<ignoreClickUntil)return;const card=e.target.closest('.rp-fx__panel');if(!card)return;const p=[...track.children].indexOf(card);if(p!==position){position=p;track.style.setProperty('scroll-snap-type','none','important');track.scrollTo({left:p*step(),behavior:'smooth'});play()}});
  new ResizeObserver(()=>jump(position)).observe(track);
  jump(1);activate();
 };
 const queue=()=>{clearTimeout(timer);timer=setTimeout(mount,600)};
 new MutationObserver(queue).observe(document.querySelector('main'),{subtree:true,childList:true,attributes:true,attributeFilter:['ssr']});queue();
})();
