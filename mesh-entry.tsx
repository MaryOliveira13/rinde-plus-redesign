import React from 'react';
import {createRoot} from 'react-dom/client';
import {ShaderBackground} from './components/ui/dwd';

const section=document.querySelector<HTMLElement>('.rp-fx-section');
if(section){
 const island=section.closest('astro-island');let scheduled=false;
 const mount=()=>{
  if(scheduled||island?.hasAttribute('ssr'))return;
  scheduled=true;
  setTimeout(()=>{
   const layer=document.createElement('div');layer.className='campaign-mesh';
   layer.setAttribute('aria-hidden','true');section.prepend(layer);
   createRoot(layer).render(<ShaderBackground/>);
  },500);
 };
 if(island){const observer=new MutationObserver(()=>{if(!island.hasAttribute('ssr')){observer.disconnect();mount()}});observer.observe(island,{attributes:true,attributeFilter:['ssr']})}
 mount();
}
