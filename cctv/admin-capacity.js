(() => {
    const section = document.getElementById('adminCapacitySection');
    const status = document.getElementById('adminCapacityStatus');
    const dataNode = document.getElementById('adminCapacityData');
    const reposNode = document.getElementById('adminCapacityRepos');
    const estimate = document.getElementById('adminCapacityEstimate');
    const proposal = document.getElementById('adminCapacityProposal');
    const bucketTarget = document.getElementById('adminCapacityBucketTarget');
    const bucketChart = document.getElementById('adminCapacityBucketChart');
    const number = new Intl.NumberFormat('ru', { maximumFractionDigits: 2 });
    const mib = 1024 * 1024;
    const formatBytes = bytes => number.format(bytes / mib) + ' МиБ';
    let generation = 0;
    let capacity = null;

    function node(tag, text) {
        const element = document.createElement(tag);
        element.textContent = text;
        return element;
    }

    function meter(label, used, limit, detail, color = '') {
        const item = node('div', '');
        item.className = 'quota-meter';
        const ratio = limit > 0 ? used / limit : 0;
        item.dataset.level = ratio >= 1 ? 'full' : ratio >= .8 ? 'near' : 'available';
        if (color) item.style.setProperty('--program-color', color);
        const heading = node('div', '');
        heading.className = 'quota-meter-heading';
        heading.append(node('strong', label), node('span', number.format(ratio * 100) + '%'));
        const bar = node('progress', '');
        bar.max = limit || 1;
        bar.value = Math.min(used, bar.max);
        bar.setAttribute('aria-label', `${label} · ${detail}`);
        item.append(heading, bar, node('p', detail));
        return item;
    }

    function renderBucketTarget() {
        bucketChart.replaceChildren();
        const target = bucketTarget.valueAsNumber * 1024 * mib;
        if (!capacity?.usage || !bucketTarget.validity.valid || !Number.isFinite(target) || target <= 0) return;
        const used = capacity.usage.bytes;
        bucketChart.append(meter('Мой ориентир для бакета', used, target,
            `${formatBytes(used)} из ${formatBytes(target)} · ` + (used <= target
                ? `до ориентира ${formatBytes(target - used)}` : `превышение на ${formatBytes(used - target)}`)));
    }

    function renderEstimate() {
        if (!capacity) { estimate.textContent = ''; return; }
        const requested = proposal.valueAsNumber;
        if (!proposal.validity.valid || !Number.isInteger(requested)) { estimate.textContent = ''; return; }
        const maximum = requested * capacity.editors.length * capacity.maxProjectBytes;
        const current = capacity.projectLimit * capacity.editors.length * capacity.maxProjectBytes;
        estimate.textContent = `До ${formatBytes(maximum)} на аккаунт во всех редакторах. `
            + (maximum >= current ? `Рост потолка на ${formatBytes(maximum - current)}.` : `Снижение потолка на ${formatBytes(current - maximum)}.`);
    }

    function renderCapacity(data) {
        capacity = data;
        const usage = data.usage
            ? `${formatBytes(data.usage.bytes)} в бакете ${data.bucketName}. Данные Monitoring на ${new Date(data.usage.reportedAt).toLocaleString('ru')}.`
            : 'Объём бакета не получен из Cloud Monitoring. Откройте «Использование Storage».';
        const total = data.editors.length * data.projectLimit;
        const free = data.editors.reduce((sum, editor) => sum + editor.available, 0);
        const measured = data.editors.reduce((sum, editor) => sum + editor.bytes, 0);
        const unknown = data.editors.reduce((sum, editor) => sum + editor.unmeasured, 0);
        const list = node('div', '');
        list.className = 'quota-editor-list';
        const colors = {PZTS:'#4b8521', EPS:'#c95043', CCTV:'#8051bc', SK:'#128198'};
        for (const editor of data.editors) {
            const unknownBytes = editor.unmeasured ? ` · без размера у ${editor.unmeasured}` : '';
            list.append(meter(editor.application, editor.used, data.projectLimit,
                `Занято ${editor.used} из ${data.projectLimit} · свободно ${editor.available} · ${formatBytes(editor.bytes)}${unknownBytes}`, colors[editor.application]));
        }
        const summary = node('div', '');
        summary.className = 'quota-summary';
        const ring = node('div', '');
        ring.className = 'quota-ring';
        ring.style.setProperty('--used', `${((total - free) / (total || 1)) * 100}%`);
        ring.dataset.level = !free ? 'full' : free <= total * .2 ? 'near' : 'available';
        ring.append(node('strong', `${free}/${total}`), node('small', 'свободно'));
        const stats = node('div', '');
        stats.append(node('strong', 'Мои проекты GooM'), node('p', `Известный объём файлов ${formatBytes(measured)}${unknown ? ` · без размера у ${unknown}` : ''}`),
            node('p', `До ${formatBytes(data.maxProjectBytes)} на файл. Слоты учитывают незавершённые загрузки.`));
        summary.append(ring, stats);
        dataNode.replaceChildren(node('p', usage), summary, list);
        renderBucketTarget();
        renderEstimate();
    }

    async function repoSize(repo) {
        const response = await fetch(`https://api.github.com/repos/olehbibik-beep/${repo}`, { signal: AbortSignal.timeout(8000) });
        if (!response.ok) throw Error('GitHub API unavailable');
        const { size } = await response.json();
        if (!Number.isFinite(size) || size < 0) throw Error('Missing repository size');
        return size * 1024;
    }

    async function siteSize() {
        const response = await fetch('../site-build.json', {signal:AbortSignal.timeout(8000), cache:'no-cache'});
        if (!response.ok) throw Error('Published manifest unavailable');
        const { bytes, files } = await response.json();
        if (!Number.isSafeInteger(bytes) || bytes <= 0 || !Number.isSafeInteger(files) || files <= 0) throw Error('Invalid manifest size');
        return {bytes, files};
    }

    window.clearGoomInfrastructureCapacity = () => {
        generation++;
        capacity = null;
        dataNode.replaceChildren();
        reposNode.replaceChildren();
        estimate.textContent = '';
        bucketChart.replaceChildren();
        section.hidden = true;
    };

    window.loadGoomInfrastructureCapacity = async user => {
        const request = ++generation;
        status.textContent = 'Запрашиваем данные…';
        const [firebase, github, site] = await Promise.allSettled([(async () => {
            const token = await user.getIdToken();
            const response = await fetch('https://europe-west1-pztsepscctv.cloudfunctions.net/goomAdmin', {
                method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                body: JSON.stringify({ data: { action: 'capacity' } }), signal: AbortSignal.timeout(20000)
            });
            const { result } = await response.json();
            if (!response.ok || !Array.isArray(result?.editors)) throw Error('Capacity unavailable');
            return result;
        })(), repoSize('goom'), siteSize()]);
        if (request !== generation) return;
        if (firebase.status === 'fulfilled') renderCapacity(firebase.value);
        else {
            capacity = null;
            dataNode.replaceChildren(node('p', 'Не удалось получить данные проекта Firebase. Откройте консоль или обновите этот раздел.'));
            renderEstimate();
            renderBucketTarget();
        }
        const repoTarget = 1_000_000_000;
        reposNode.replaceChildren(github.status === 'fulfilled'
            ? meter('olehbibik-beep/goom', github.value, repoTarget,
                `${formatBytes(github.value)} · ${formatBytes(Math.max(0, repoTarget - github.value))} до ориентира 1 ГБ`)
            : node('p', 'Размер основного репозитория GitHub недоступен.'));
        if (site.status === 'fulfilled') {
            const {bytes, files} = site.value;
            reposNode.append(meter('Файлы выпуска Pages', bytes, repoTarget,
                `${number.format(files)} файлов · ${formatBytes(bytes)} · ${formatBytes(Math.max(0, repoTarget - bytes))} до 1 ГБ`));
        }
        status.textContent = '';
    };
    proposal.addEventListener('input', renderEstimate);
    bucketTarget.addEventListener('input', renderBucketTarget);
})();
