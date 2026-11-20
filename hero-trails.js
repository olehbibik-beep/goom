(() => {
  const hero=document.getElementById('heroDotted'),canvas=document.getElementById('heroDots');if(!hero||!canvas)return;
  const ctx=canvas.getContext('2d'),grid=document.createElement('canvas'),gridContext=grid.getContext('2d');
  const motion=matchMedia('(prefers-reduced-motion: reduce)'),video=document.getElementById('heroVideo'),toggle=document.getElementById('heroMotion');
  const spacing=28,lifetime=1850;let width=0,height=0,ratio=1,frame=0,visible=true,anchor=null,segments=[],manualPause=false;
  const paused=()=>motion.matches||manualPause;
  function paint(now=performance.now()){
    frame=0;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(grid,0,0);ctx.setTransform(ratio,0,0,ratio,0,0);
    segments=segments.filter(segment=>now-segment.time<lifetime);
    if(!paused())for(const segment of segments){
      const age=Math.max(0,now-segment.time),opacity=Math.min(1,age/80)*(1-age/lifetime)**1.5,reveal=Math.min(1,age/190);
      ctx.strokeStyle=`rgba(190,234,204,${opacity*.8})`;ctx.lineWidth=1.35;ctx.lineCap='round';ctx.lineJoin='round';ctx.setLineDash([segment.length+1,segment.length+1]);ctx.lineDashOffset=(segment.length+1)*(1-reveal);
      ctx.beginPath();ctx.moveTo(segment.a.x,segment.a.y);ctx.lineTo(segment.corner.x,segment.corner.y);ctx.lineTo(segment.b.x,segment.b.y);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle=`rgba(195,239,177,${opacity*.9})`;ctx.beginPath();ctx.arc(segment.b.x,segment.b.y,2.4,0,Math.PI*2);ctx.fill();
    }
    if(segments.length&&!paused())schedule();
  }
  function schedule(){if(!frame&&visible&&!document.hidden)frame=requestAnimationFrame(paint);}
  function resize(){const rect=hero.getBoundingClientRect();width=rect.width;height=rect.height;ratio=Math.min(devicePixelRatio||1,2);canvas.width=grid.width=Math.round(width*ratio);canvas.height=grid.height=Math.round(height*ratio);gridContext.setTransform(ratio,0,0,ratio,0,0);gridContext.fillStyle='rgba(10,14,17,.73)';for(let x=14;x<width;x+=spacing)for(let y=14;y<height;y+=spacing){gridContext.beginPath();gridContext.arc(x,y,1.55,0,Math.PI*2);gridContext.fill();}anchor=null;segments=[];paint();}
  function trace(event){
    if(paused()||event.target.closest?.('a,button,select,input,label')){anchor=null;return;}
    const rect=hero.getBoundingClientRect(),source=event.touches?.[0]||event;
    const point={x:14+Math.round((source.clientX-rect.left-14)/spacing)*spacing,y:14+Math.round((source.clientY-rect.top-14)/spacing)*spacing};
    if(!Number.isFinite(point.x)||point.x<0||point.y<0||point.x>width||point.y>height)return;
    if(!anchor||Math.hypot(point.x-anchor.x,point.y-anchor.y)>420){anchor=point;return;}
    if(point.x===anchor.x&&point.y===anchor.y)return;
    const corner=Math.abs(point.x-anchor.x)>=Math.abs(point.y-anchor.y)?{x:point.x,y:anchor.y}:{x:anchor.x,y:point.y};
    segments.push({a:anchor,corner,b:point,time:performance.now(),length:Math.abs(point.x-anchor.x)+Math.abs(point.y-anchor.y)});
    if(segments.length>140)segments.shift();anchor=point;schedule();
  }
  for(const event of ['pointerdown','pointermove','touchstart','touchmove'])hero.addEventListener(event,trace,{passive:true});
  for(const event of ['pointerleave','pointercancel','touchend','touchcancel'])hero.addEventListener(event,()=>{anchor=null;},{passive:true});
  const labels={cs:['Pozastavit animaci pozadí','Spustit animaci pozadí'],en:['Pause background animation','Play background animation'],de:['Hintergrundanimation anhalten','Hintergrundanimation starten'],ru:['Приостановить анимацию фона','Включить анимацию фона']};
  function label(){if(!toggle)return;const text=(labels[document.documentElement.lang]||labels.cs)[paused()?1:0];toggle.setAttribute('aria-label',text);toggle.title=text;toggle.setAttribute('aria-pressed',String(paused()));toggle.classList.toggle('is-paused',paused());}
  function syncVideo(){
    label();if(!video)return;
    if(toggle)toggle.hidden=motion.matches||!!navigator.connection?.saveData||!video.classList.contains('ready');
    if(paused()||!visible||document.hidden||navigator.connection?.saveData){video.pause();return;}
    if(!video.src){video.muted=true;video.src=video.dataset.src;video.load();}
    video.defaultPlaybackRate=.55;video.playbackRate=.55;video.play().catch(()=>{if(toggle)toggle.hidden=true;});
  }
  video?.addEventListener('loadeddata',()=>{video.classList.add('ready');if(toggle)toggle.hidden=motion.matches||!!navigator.connection?.saveData;label();});
  video?.addEventListener('timeupdate',()=>{if(Number.isFinite(video.duration)){const fade=Math.min(1,video.currentTime/.65,(video.duration-video.currentTime)/.65);video.style.setProperty('--scene-opacity',String(Math.max(0,fade)*.55));}});
  video?.addEventListener('error',()=>{video.classList.remove('ready');if(toggle)toggle.hidden=true;});
  toggle?.addEventListener('click',()=>{manualPause=!manualPause;anchor=null;segments=[];paint();syncVideo();});
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){schedule();syncVideo();}else{if(frame)cancelAnimationFrame(frame);frame=0;segments=[];video?.pause();}},{threshold:0}).observe(hero);
  motion.addEventListener('change',()=>{anchor=null;segments=[];paint();syncVideo();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){if(frame)cancelAnimationFrame(frame);frame=0;anchor=null;segments=[];video?.pause();}else{schedule();syncVideo();}});
  new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});resize();syncVideo();
})();
