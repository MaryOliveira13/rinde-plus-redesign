import React from 'react';
import {createRoot} from 'react-dom/client';
import {GradientShimmer} from './components/ui/gradient-shimmer';

async function start(){
  await document.fonts.ready;
  const host=document.querySelector<HTMLElement>('.hero-wordmark');
  if(!host)return;
  const mount=document.createElement('div');mount.className='shimmer-wordmark';
  host.append(mount);
  const root=createRoot(mount);
  root.render(<GradientShimmer
    baseColor="#f3f2e9"
    gradient={[
      {position:0,color:'#e7e8dc'},
      {position:0.3,color:'#d7e0cf'},
      {position:0.6,color:'#eee4d5'},
      {position:1,color:'#fffdf4'},
    ]}
    duration={7} spread={0.65} angle={105} easing="smooth"
    pauseBetween={5000} pauseOnScroll pauseWhenOffscreen
    style={{font:'inherit',letterSpacing:'inherit',lineHeight:'inherit',textShadow:'none'}}
  >RINDE PLUS</GradientShimmer>);
  const ready=new MutationObserver(()=>{
    if(mount.firstElementChild){host.classList.add('has-shimmer');ready.disconnect()}
  });ready.observe(mount,{childList:true});
}
start();
