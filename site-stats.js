(() => {
    const root=document.getElementById('communityStats');if(!root)return;
    function layoutGauges(){for(const gauge of root.querySelectorAll('.community-gauge')){
        const{width,height}=gauge.getBoundingClientRect();if(!width||!height)continue;
        const hours=gauge.dataset.gauge==='hours',x=width*(hours?130:150)/280;
        gauge.setAttribute('viewBox',`0 0 ${width} ${height}`);
        const path=`M${x} ${height*240/260} A${width*110/280} ${height*110/260} 0 0 ${hours?0:1} ${x} ${height*20/260}`;
        for(const item of gauge.querySelectorAll('path'))item.setAttribute('d',path);
    }}
    new ResizeObserver(layoutGauges).observe(root);layoutGauges();
    const palettes={hours:[['#d0f5a5','#b9ed72'],['#b9ed72','#8bd368'],['#9bdd7a','#55b58c'],['#8bdbad','#3baf9c'],['#a8e6bd','#63bf80']],projects:[['#c2e8f6','#8dcee7'],['#9ed6ed','#61b4d9'],['#83c9e8','#4a94cc'],['#96bee8','#657dc4'],['#b0cced','#7a99d6']]};
    function gradient(gauge,id,colors){const ns='http://www.w3.org/2000/svg';let defs=gauge.querySelector('defs');if(!defs){defs=document.createElementNS(ns,'defs');gauge.prepend(defs);}let g=defs.querySelector('#'+id);if(!g){g=document.createElementNS(ns,'linearGradient');g.id=id;g.setAttribute('x1','0');g.setAttribute('y1','1');g.setAttribute('x2','1');g.setAttribute('y2','0');for(const offset of ['0%','100%']){const stop=document.createElementNS(ns,'stop');stop.setAttribute('offset',offset);g.append(stop);}defs.append(g);}Array.from(g.children).forEach((stop,i)=>stop.setAttribute('stop-color',colors[i]));return 'url(#'+id+')';}
    function paintGauge(gauge,key,value){let lower=0,upper=50,stage=0;while(value>=upper&&stage<40){lower=upper;upper*=2;stage++;}const colors=palettes[key],current=colors[stage%colors.length],previous=colors[(stage+colors.length-1)%colors.length];gauge.querySelector('.gauge-track').style.stroke=stage?gradient(gauge,'stats-'+key+'-previous',previous):'#495257';gauge.querySelector('.gauge-fill').style.stroke=gradient(gauge,'stats-'+key+'-current',current);gauge.querySelector('.gauge-fill').style.strokeDashoffset=String(100*(1-Math.min(1,(value-lower)/(upper-lower))));gauge.dataset.stage=stage;gauge.dataset.stageFrom=lower;gauge.dataset.stageTo=upper;gauge.setAttribute('aria-valuemin',lower);gauge.setAttribute('aria-valuemax',upper);gauge.setAttribute('aria-valuenow',value);return upper;}
    let data=null,loading=false;
    function render(){if(!data)return;const locale=document.documentElement.lang||'cs',number=new Intl.NumberFormat(locale,{maximumFractionDigits:0}),whole=value=>number.format(Math.floor(value))+(value%1>0?'+':'');
        for(const[key,value,format,minimum]of[['hours',(data.historicalTotals?data.activeSeconds:Math.max(144000,data.activeSeconds+140386))/3600,{format:whole},50],['projects',data.historicalTotals?data.projectsCreated:Math.max(100,data.projectsCreated+96),{format:value=>number.format(Math.floor(value/100)*100)+'+'},100]]){
            const element=root.querySelector(`[data-stat=${key}]`),gauge=root.querySelector(`[data-gauge=${key}]`),text=format.format(value);
            element.textContent=text;element.style.setProperty('--stat-size',Math.min(36,Math.max(20,180/text.length))+'px');
            if(gauge){const goal=paintGauge(gauge,key,value);gauge.setAttribute('aria-label',root.querySelector(`[data-i18n=${key==='hours'?'statsHours':'statsProjects'}]`).textContent);gauge.querySelector('title').textContent=`${text} / ${format.format(goal)}`;}
        }root.dataset.state='ready';}
    async function refresh(){if(loading||document.hidden)return;loading=true;try{const response=await fetch('https://europe-west1-pztsepscctv.cloudfunctions.net/goomPublicStats',{credentials:'omit',signal:AbortSignal.timeout(12000)});if(!response.ok)throw Error();const next=await response.json();if(!Number.isFinite(next.projectsCreated)||next.projectsCreated<0||!Number.isFinite(next.activeSeconds)||next.activeSeconds<0)throw Error();data=next;render();}catch{if(!data)root.dataset.state='unavailable';}finally{loading=false;}}
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});void refresh();setInterval(()=>void refresh(),60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)void refresh();});
})();
