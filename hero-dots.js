(() => {
  const hero=document.getElementById('heroDotted'),canvas=document.getElementById('heroDots');if(!hero||!canvas)return;
  const ctx=canvas.getContext('2d'),motion=matchMedia('(prefers-reduced-motion: reduce)');
  let width=0,height=0,ratio=1,pointer=null,position=null,frame=0,visible=true;
  function draw(){
    frame=0;ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,width,height);
    if(motion.matches)position=null;
    else if(pointer){if(!position)position={...pointer};position.x+=(pointer.x-position.x)*.24;position.y+=(pointer.y-position.y)*.24;}
    else if(position){position.strength=(position.strength??1)*.78;if(position.strength<.01)position=null;}
    const strength=position?(pointer?1:position.strength??1):0;
    for(let x=14;x<width;x+=28)for(let y=14;y<height;y+=28){const dx=position?x-position.x:0,dy=position?y-position.y:0,distance=position?Math.hypot(dx,dy):Infinity,proximity=Math.max(0,1-distance/78),ease=proximity*proximity*(3-2*proximity)*strength,displacement=distance>0?14*ease/distance:0;
      ctx.globalAlpha=Math.max(.82,Math.min(1,(distance-2)/8));ctx.fillStyle='#111115';ctx.beginPath();ctx.arc(x+dx*displacement,y+dy*displacement,1.7+2.2*ease,0,Math.PI*2);ctx.fill();
    }ctx.globalAlpha=1;
    if(visible&&!document.hidden&&!motion.matches&&(pointer&&position&&(Math.abs(pointer.x-position.x)+Math.abs(pointer.y-position.y)>.2)||!pointer&&position))schedule();
  }
  function schedule(){if(!frame&&visible&&!document.hidden)frame=requestAnimationFrame(draw);}
  function resize(){const rect=hero.getBoundingClientRect();width=rect.width;height=rect.height;ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);draw();}
  hero.addEventListener('pointermove',event=>{if(motion.matches||event.pointerType==='touch')return;const rect=hero.getBoundingClientRect();pointer={x:event.clientX-rect.left,y:event.clientY-rect.top};schedule();});
  hero.addEventListener('pointerleave',()=>{pointer=null;schedule();});hero.addEventListener('pointercancel',()=>{pointer=null;schedule();});
  new ResizeObserver(resize).observe(hero);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else if(frame){cancelAnimationFrame(frame);frame=0;}},{threshold:0}).observe(hero);
  motion.addEventListener('change',()=>{pointer=null;position=null;schedule();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}else schedule();});resize();
})();
