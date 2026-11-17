// Contour shader adapted from the supplied TopoField (MengTo/threeui, MIT).
// Transparent output preserves the existing Mesh Drift colors underneath.
(()=>{
 const section=document.querySelector('.rp-fx-section');if(!section)return;
 const island=section.closest('astro-island');let scheduled=false;
 const init=()=>{
  if(scheduled||island?.hasAttribute('ssr'))return;scheduled=true;
  setTimeout(async()=>{
   const canvas=document.createElement('canvas');canvas.className='campaign-topo';canvas.setAttribute('aria-hidden','true');
   const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false,depth:false});if(!gl)return;
   const response=await fetch('./assets/topo-lines.frag');if(!response.ok)return;
   const frag=await response.text();
   const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s};
   const vertex=compile(gl.VERTEX_SHADER,'attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.,1.);}');
   const fragment=compile(gl.FRAGMENT_SHADER,frag);const program=gl.createProgram();gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
   gl.useProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);
   const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
   const pos=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
   const resolution=gl.getUniformLocation(program,'u_resolution'),time=gl.getUniformLocation(program,'u_time'),dpr=gl.getUniformLocation(program,'u_dpr');
   section.prepend(canvas);
   let frame=0,inView=false,elapsed=0,last=0;const motion=matchMedia('(prefers-reduced-motion: reduce)');
   const render=now=>{
    frame=0;if(!inView||document.hidden){last=0;return}
    if(last&&!motion.matches)elapsed+=Math.min(now-last,100)*.00045;last=now;
    gl.uniform1f(time,elapsed);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    if(!motion.matches)frame=requestAnimationFrame(render);
   };
   const request=()=>{if(!frame)frame=requestAnimationFrame(render)};
   const resize=()=>{
    const box=section.getBoundingClientRect();const scale=Math.min(devicePixelRatio||1,1.5,Math.sqrt(1000000/Math.max(1,box.width*box.height)));
    canvas.width=Math.max(1,Math.round(box.width*scale));canvas.height=Math.max(1,Math.round(box.height*scale));gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(resolution,canvas.width,canvas.height);gl.uniform1f(dpr,scale);request();
   };
   new ResizeObserver(resize).observe(section);resize();
   new IntersectionObserver(([e])=>{inView=e.isIntersecting;if(inView)request();else{cancelAnimationFrame(frame);frame=0;last=0}}).observe(section);
   document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;last=0}else request()});motion.addEventListener('change',request);
  },650);
 };
 if(island){const observer=new MutationObserver(()=>{if(!island.hasAttribute('ssr')){observer.disconnect();init()}});observer.observe(island,{attributes:true,attributeFilter:['ssr']})}init();
})();
