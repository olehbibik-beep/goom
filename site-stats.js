(() => {
    const root=document.getElementById('communityStats');if(!root)return;
    let data=null,loading=false;
    function render(){if(!data)return;const locale=document.documentElement.lang||'cs',number=new Intl.NumberFormat(locale,{maximumFractionDigits:0}),hours=new Intl.NumberFormat(locale,{maximumFractionDigits:1});
        for(const[key,value,format,minimum]of[['hours',data.activeSeconds/3600,hours,1],['projects',data.projectsCreated,number,10]]){
            const element=root.querySelector(`[data-stat=${key}]`),gauge=root.querySelector(`[data-gauge=${key}]`),text=format.format(value);
            element.textContent=text;element.style.setProperty('--stat-size',Math.min(56,Math.max(25,230/text.length))+'px');
            if(gauge){const goal=Math.max(minimum,10**Math.ceil(Math.log10(Math.max(value,Number.EPSILON)))),progress=Math.min(1,value/goal);gauge.querySelector('.gauge-fill').style.strokeDashoffset=String(100*(1-progress));gauge.setAttribute('aria-valuemax',goal);gauge.setAttribute('aria-valuenow',value);gauge.setAttribute('aria-label',root.querySelector(`[data-i18n=${key==='hours'?'statsHours':'statsProjects'}]`).textContent);gauge.querySelector('title').textContent=`${text} / ${format.format(goal)}`;}
        }root.dataset.state='ready';}
    async function refresh(){if(loading||document.hidden)return;loading=true;try{const response=await fetch('https://europe-west1-pztsepscctv.cloudfunctions.net/goomPublicStats',{credentials:'omit',signal:AbortSignal.timeout(12000)});if(!response.ok)throw Error();const next=await response.json();if(!Number.isFinite(next.projectsCreated)||next.projectsCreated<0||!Number.isFinite(next.activeSeconds)||next.activeSeconds<0)throw Error();data=next;render();}catch{if(!data)root.dataset.state='unavailable';}finally{loading=false;}}
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});void refresh();setInterval(()=>void refresh(),60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)void refresh();});
})();
