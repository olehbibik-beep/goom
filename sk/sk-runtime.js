// SK UI and original device symbols. Executed before the common engine binds controls.
(() => {
    const baseTr=window.tr;
    const extra={"Poplachový zabezpečovací a tísňový systém":["Strukturovaná kabeláž a internet","Structured cabling and internet","Strukturierte Verkabelung und Internet","Структурированные кабельные сети и интернет"],"Ústředna SK":["Datový rozvaděč","Network cabinet","Netzwerkschrank","Сетевой шкаф"],"Ústředna":["Datový rozvaděč","Network cabinet","Netzwerkschrank","Сетевой шкаф"],"Smyčka":["Skupina","Group","Gruppe","Группа"],"Sběrnice":["Skupina","Group","Gruppe","Группа"],"Sběrnice {0}":["Skupina {0}","Group {0}","Gruppe {0}","Группа {0}"],"Smyčka {0}":["Skupina {0}","Group {0}","Gruppe {0}","Группа {0}"],"Detektory":["Síťové body","Network points","Netzwerkpunkte","Сетевые точки"],"Detektory: {0}":["Síťové body: {0}","Network points: {0}","Netzwerkpunkte: {0}","Сетевые точки: {0}"],"Najít detektor":["Najít síťový bod","Find network point","Netzwerkpunkt suchen","Найти сетевую точку"],"Číslo detektoru":["Číslo síťového bodu","Network point number","Netzwerkpunktnummer","Номер сетевой точки"],"Velikost ikon detektorů":["Velikost značek","Symbol size","Symbolgröße","Размер обозначений"],"Ikona detektoru":["Ikona síťového prvku","Network device icon","Netzwerkgerätesymbol","Значок сетевого устройства"],"Ovládání detektoru":["Ovládání síťového prvku","Network device controls","Netzwerkgerät-Steuerung","Управление сетевым устройством"],"Vyhledávání detektorů ve všech podlažích":["Vyhledávání síťových bodů ve všech podlažích","Find network points across all floors","Netzwerkpunkte auf allen Etagen suchen","Поиск сетевых точек на всех этажах"],"Hlavní ústředna":["Hlavní rozvaděč","Main network cabinet","Hauptnetzwerkschrank","Главный сетевой шкаф"],"Hlavní ústředna: {0}":["Hlavní rozvaděč: {0}","Main cabinet: {0}","Hauptnetzwerkschrank: {0}","Главный шкаф: {0}"],"Bez ústředny":["Bez rozvaděče","No cabinet","Kein Netzwerkschrank","Нет сетевого шкафа"],"Ústředna není umístěna":["Rozvaděč není umístěn","No network cabinet placed","Kein Netzwerkschrank platziert","Сетевой шкаф не установлен"],"Ústředny: {0}":["Rozvaděče: {0}","Cabinets: {0}","Netzwerkschränke: {0}","Шкафы: {0}"],"detektor":["síťový bod","network point","Netzwerkpunkt","сетевая точка"],"detektory":["síťové body","network points","Netzwerkpunkte","сетевые точки"],"detektorů":["síťových bodů","network points","Netzwerkpunkte","сетевых точек"],"Bez zón":["Bez adres bodů","No point addresses","Keine Punktadressen","Нет адресов точек"],"Zóny: {0}":["Adresy: {0}","Addresses: {0}","Adressen: {0}","Адреса: {0}"],"Předplatné SK zatím nelze zakoupit.":["Předplatné SK zatím nelze zakoupit.","SK subscriptions are not available for purchase yet.","SK-Abonnements sind noch nicht zum Kauf verfügbar.","Покупка подписки SK пока не подключена."]};
    for(const d of SK_CATALOG){if(d.labels.length===4)d.labels.push(window.goomPolish(d.labels[1]));extra[d.labels[0]]=d.labels;}
    for(const words of Object.values(extra))if(words.length===4)words.push(window.goomPolish(words[1]));
    window.tr=function(source,...values){const key=Array.isArray(source)?source.map((part,i)=>part+(i<values.length?`{${i}}`:'')).join(''):source;const words=extra[key];return words?words[({cs:0,en:1,de:2,ru:3,pl:4})[document.documentElement.lang]??0].replace(/\{(\d+)\}/g,(_,n)=>String(values[Number(n)]??'')):baseTr(source,...values);};
    const palette=document.getElementById('deviceSetTools'),textTools=document.getElementById('textTools');
    palette.replaceChildren();
    for(const d of SK_CATALOG){const button=document.createElement('button');button.type='button';button.className='device-btn';button.dataset.type=d.type;button.title=tr(d.labels[0]);button.setAttribute('aria-label',button.title);const image=document.createElement('img');image.src=`assets/devices/${d.type}.svg`;image.width=26;image.height=26;image.alt='';button.append(image);palette.append(button);}
    palette.append(textTools);
    document.getElementById('btnIntroPlay').hidden=false;
    document.getElementById('togglePirCoverage')?.setAttribute('hidden','');
    document.getElementById('btnDetectionSettings')?.removeAttribute('hidden');
    const art=document.querySelector('#welcomeModal .welcome-art-space img');
    const finishArt=()=>document.getElementById('welcomeModal').classList.remove('is-art-loading');
    if(art.complete)finishArt();else{art.addEventListener('load',finishArt,{once:true});art.addEventListener('error',finishArt,{once:true});}
    function updateLanguage(){
        const language=document.documentElement.lang,index=({cs:0,en:1,de:2,ru:3,pl:4})[language]??0;
        document.querySelector('.welcome-system-name').textContent=extra['Poplachový zabezpečovací a tísňový systém'][index];
        document.querySelector('.welcome-brand').textContent='SK';
        for(const d of SK_CATALOG){const button=palette.querySelector(`[data-type="${d.type}"]`);if(button){button.title=d.labels[index];button.setAttribute('aria-label',button.title);}}
        document.title='GooM SK — '+extra['Poplachový zabezpečovací a tísňový systém'][index];
    }
    window.addEventListener('goom-language-changed',updateLanguage);updateLanguage();window.localizeGoom?.();
})();

function paintSkParts(ctx,parts,color,theme){
    ctx.lineWidth=2;ctx.lineJoin='round';ctx.lineCap='round';
    for(const[tag,a,text]of parts){
        ctx.strokeStyle=theme==='mono'?'#222':a.stroke||color;
        ctx.fillStyle=a.fill==='white'?'#fff':a.fill==='none'?'transparent':a.fill||color;
        if(tag==='text'){ctx.font=`${a['font-weight']||700} ${a['font-size']||12}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,Number(a.x),Number(a.y));continue;}
        ctx.beginPath();
        if(tag==='circle')ctx.arc(+a.cx,+a.cy,+a.r,0,Math.PI*2);
        else if(tag==='rect')ctx.roundRect(+a.x,+a.y,+a.width,+a.height,+a.rx||0);
        else if(tag==='line'){ctx.moveTo(+a.x1,+a.y1);ctx.lineTo(+a.x2,+a.y2);}
        else if(tag==='polyline'||tag==='polygon'){const nums=a.points.trim().split(/[\s,]+/).map(Number);for(let i=0;i<nums.length;i+=2)ctx[i?'lineTo':'moveTo'](nums[i],nums[i+1]);if(tag==='polygon')ctx.closePath();}
        if(a.fill&&a.fill!=='none')ctx.fill();if(a.stroke!=='none')ctx.stroke();
    }
}
function drawSkDevice(ctx,type,scale,theme){
    const device=SK_CATALOG.find(d=>d.type===type);if(!device)return;
    ctx.save();ctx.scale(scale*.75,scale*.75);ctx.translate(-24,-24);
    const asset=window.skSymbolAssets?.get(type);
    if(asset?.image && !(typeof DXFPlanContext!=='undefined'&&ctx instanceof DXFPlanContext))ctx.drawImage(asset.image,0,0,48,48);
    else paintSkParts(ctx,asset?.parts||SK_SYMBOL_PARTS[type],device.color,theme);
    ctx.restore();
}

// The manifest is the only asset mapping. Flat SVG primitives remain vectors in DXF/SVG.
// PNG/JPEG overrides are embedded for portable SVG; DXF retains the stock vector symbol.
window.skSymbolAssets=new Map();
window.skAssetsReady=(async()=>{
    let manifest;try{const response=await fetch('assets/devices/manifest.json',{cache:'no-cache'});if(!response.ok)throw new Error(response.status);manifest=await response.json();}catch(error){console.warn('SK assets: stock symbols retained.',error);return;}
    const supported=new Set(['circle','rect','line','polyline','polygon','text']);
    await Promise.all(SK_CATALOG.map(async device=>{
        try{
            const filename=manifest[device.type];if(typeof filename!=='string'||!/^[a-zA-Z0-9_-]+\.(svg|png|jpe?g)$/i.test(filename))return;
            const response=await fetch('assets/devices/'+filename,{cache:'no-cache'});if(!response.ok)throw new Error(response.status);
            if(/\.svg$/i.test(filename)){
                const parsed=new DOMParser().parseFromString(await response.text(),'image/svg+xml'),svg=parsed.documentElement;
                if(svg.tagName!=='svg'||svg.getAttribute('viewBox')!=='0 0 48 48'||parsed.querySelector('parsererror'))throw new Error('Expected a flat 48×48 SVG');
                const parts=[...svg.children].filter(el=>!['title','desc'].includes(el.tagName)).map(el=>{if(!supported.has(el.tagName)||el.children.length)throw new Error('Use flat SVG primitives or PNG');const attrs=Object.fromEntries([...el.attributes].filter(a=>!/^on|href|style/i.test(a.name)).map(a=>[a.name,a.value]));if(Object.values(attrs).some(v=>/url\(|javascript:/i.test(v)))throw new Error('External SVG references are not supported');return[el.tagName,attrs,el.textContent.slice(0,12)];});
                for(const[,attrs]of parts)for(const [name,value]of Object.entries(attrs))if(['x','y','cx','cy','r','width','height','rx','x1','y1','x2','y2','font-size'].includes(name)&&(!Number.isFinite(+value)||Math.abs(+value)>500))throw new Error('Invalid symbol coordinate');
                for(const[tag,attrs]of parts){if(['polyline','polygon'].includes(tag)){const points=String(attrs.points||'').trim().split(/[\s,]+/).map(Number);if(points.length<4||points.length>400||points.length%2||points.some(n=>!Number.isFinite(n)||Math.abs(n)>500))throw new Error('Invalid symbol points');}if(['r','width','height','rx'].some(key=>attrs[key]!==undefined&&Number(attrs[key])<0))throw new Error('Invalid symbol dimensions');}
                if(parts.length<1||parts.length>100)throw new Error('Invalid symbol size');window.skSymbolAssets.set(device.type,{parts});
            }else{
                const blob=await response.blob();if(blob.size>2*1024*1024)throw new Error('Image must be under 2 MB');
                const src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});
                const image=new Image();image.src=src;await image.decode();window.skSymbolAssets.set(device.type,{image});
            }
        }catch(error){console.warn(`SK symbol ${device.type}: using stock vector.`,error);}
    }));
    // Refresh toolbar previews after the common icon/menu initialization has finished.
    window.dispatchEvent(new CustomEvent('sk-assets-ready'));
})();
