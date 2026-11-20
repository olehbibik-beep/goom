(() => {
    const root=document.getElementById('communityStats');if(!root)return;
    let data=null,loading=false;
    function render(){if(!data)return;const locale=document.documentElement.lang||'cs',number=new Intl.NumberFormat(locale,{maximumFractionDigits:0}),hours=new Intl.NumberFormat(locale,{maximumFractionDigits:1});root.querySelector('[data-stat=projects]').textContent=number.format(data.projectsCreated);root.querySelector('[data-stat=hours]').textContent=hours.format(data.activeSeconds/3600);root.dataset.state='ready';}
    async function refresh(){if(loading||document.hidden)return;loading=true;try{const response=await fetch('https://europe-west1-pztsepscctv.cloudfunctions.net/goomPublicStats',{credentials:'omit',signal:AbortSignal.timeout(12000)});if(!response.ok)throw Error();const next=await response.json();if(!Number.isFinite(next.projectsCreated)||next.projectsCreated<0||!Number.isFinite(next.activeSeconds)||next.activeSeconds<0)throw Error();data=next;render();}catch{if(!data)root.dataset.state='unavailable';}finally{loading=false;}}
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});void refresh();setInterval(()=>void refresh(),60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)void refresh();});
})();
