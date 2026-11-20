(() => {
    const params=new URLSearchParams(location.search),langs=['cs','en','de','ru'],ui=window.goomUI;
    let locale=params.get('lang');if(!langs.includes(locale)){try{locale=localStorage.getItem('goom.site.language')||localStorage.getItem('goom.language');}catch{}}if(!langs.includes(locale))locale='cs';document.documentElement.lang=locale;
    window.goomProduct=params.get('app')==='CCTV'?'CCTV':'PZTS';
    const language=document.getElementById('guideLanguage'),app=document.getElementById('guideApp');language.value=locale;app.value=window.goomProduct;
    const data=document.createElement('script');data.src='/pzts/guide-steps.js?v=20261120-experience-1';data.onload=render;document.head.append(data);
    function render(){
        const titles=[ui('Příručka krok za krokem','Step-by-step manual','Schritt-für-Schritt-Anleitung','Пошаговое руководство'),ui('Od prvního projektu až po uložení a export. Stejný průvodce můžete kdykoli spustit v programu přes tlačítko ?. Na telefonu jsou dostupné cloudové plány pro prohlížení a hledání.','From your first project to saving and export. Replay this guide inside the app using ?. Phones support viewing and searching cloud plans.','Vom ersten Projekt bis zum Speichern und Export. Den Rundgang jederzeit in der Anwendung unter ? starten. Telefone unterstützen Ansicht und Suche in Cloud-Plänen.','От первого проекта до сохранения и экспорта. Этот же тур можно в любой момент открыть в программе через «?». На телефоне доступны просмотр и поиск в облачных планах.')];
        document.title=`${titles[0]} · GooM ${window.goomProduct}`;document.getElementById('guideTitle').textContent=titles[0];document.getElementById('guideIntro').textContent=titles[1];document.getElementById('guideHome').textContent=ui('Na úvod','Home','Startseite','На главную');document.getElementById('guideAppLabel').textContent=ui('Program','App','Programm','Программа');
        const open=document.getElementById('guideOpenApp');open.href=`/${window.goomProduct.toLowerCase()}/`;open.textContent=ui('Otevřít ','Open ','Öffnen: ','Открыть ')+window.goomProduct;
        const nav=document.getElementById('guideContents'),article=document.getElementById('guideChapters');nav.replaceChildren();article.replaceChildren();
        window.goomGuideSteps.forEach((step,i)=>{const section=document.createElement('section');section.id=`step-${i+1}`;const h=document.createElement('h2'),number=document.createElement('span');number.textContent=String(i+1).padStart(2,'0');h.append(number,step[2]());const p=document.createElement('p');p.textContent=step[3]();section.append(h,p);article.append(section);const link=document.createElement('a');link.href='#'+section.id;link.textContent=`${i+1}. ${step[2]()}`;nav.append(link);});
    }
    function update(){const url=new URL(location.href);url.searchParams.set('lang',language.value);url.searchParams.set('app',app.value);location.assign(url);}
    language.addEventListener('change',update);app.addEventListener('change',update);
})();
