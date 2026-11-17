import React from 'react';
import {createRoot} from 'react-dom/client';
import {LiquidText} from './components/ui/liquid-text';

async function start(){
  await document.fonts.ready;
  const host=document.querySelector<HTMLElement>('.hero-wordmark');
  if(!host || matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(!document.createElement('canvas').getContext('webgl2'))return;
  const mount=document.createElement('div');mount.className='liquid-wordmark';
  host.append(mount);const root=createRoot(mount);
  let frame:number;
  const render=()=>{const style=getComputedStyle(host);root.render(<LiquidText text="RINDE PLUS"
    fontSize={parseFloat(style.fontSize)} letterSpacing={parseFloat(style.letterSpacing)||0}
    fontFamily={style.fontFamily} width={host.clientWidth} height={host.clientHeight}/>)};
  const observer=new ResizeObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(render)});
  observer.observe(host);render();
  const ready=new MutationObserver(()=>{if(mount.querySelector('canvas')){host.classList.add('has-liquid');ready.disconnect()}});
  ready.observe(mount,{childList:true,subtree:true});
  const visibility=new IntersectionObserver(([entry])=>{mount.style.visibility=entry.isIntersecting?'visible':'hidden'});visibility.observe(host);
}
start();
