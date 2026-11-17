"use client";

import React, { useEffect, useState } from "react";
import { GemSmoke, type GemSmokeProps } from "@paper-design/shaders-react";

type LiquidTextProps = {
  text: string;
  fontSize?: number;
  padding?: number;
  width?: number;
  height?: number;
  fontFamily?: string;
  letterSpacing?: number;
} & Omit<GemSmokeProps, "width" | "height">;

// Same GemSmoke shader and settings supplied in the brief. A canvas mask
// preserves the homepage's locally hosted font and responsive letter spacing.
export function LiquidText({ text, fontSize = 82, padding = 0, width, height,
  fontFamily = 'Inter, Arial, sans-serif', letterSpacing = 0, ...shaderProps }: LiquidTextProps) {
  const [box, setBox] = useState<{w:number;h:number;mask:string}|null>(null);
  useEffect(() => {
    const canvas=document.createElement('canvas');
    const ctx=canvas.getContext('2d'); if(!ctx)return;
    ctx.font=`900 ${fontSize}px ${fontFamily}`;
    ctx.letterSpacing=`${letterSpacing}px`;
    const metrics=ctx.measureText(text);
    const w=Math.ceil(width??metrics.width+padding*2);
    const h=Math.ceil(height??metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent+padding*2);
    canvas.width=w; canvas.height=h;
    ctx.font=`900 ${fontSize}px ${fontFamily}`; ctx.letterSpacing=`${letterSpacing}px`;
    ctx.fillStyle='white';ctx.textAlign='center';
    ctx.fillText(text,w/2,(h+metrics.actualBoundingBoxAscent-metrics.actualBoundingBoxDescent)/2);
    setBox({w,h,mask:`url("${canvas.toDataURL()}")`});
  },[text,fontSize,padding,width,height,fontFamily,letterSpacing]);
  if(!box)return null;
  return <div style={{width:box.w,height:box.h,WebkitMaskImage:box.mask,maskImage:box.mask,WebkitMaskRepeat:'no-repeat',maskRepeat:'no-repeat',WebkitMaskSize:'100% 100%',maskSize:'100% 100%'}}>
    <GemSmoke width={box.w} height={box.h} image="./assets/liquid-source.svg"
      colors={['#fff']} colorBack="#f0efea" colorInner="#333333"
      shape="metaballs" innerDistortion={0.5} outerDistortion={0}
      outerGlow={0.51} innerGlow={1} offset={0} angle={152} size={0.35}
      speed={1} scale={4} maxPixelCount={700000} {...shaderProps}/>
  </div>;
}
export default LiquidText;
