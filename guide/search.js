(() => {
    const search = document.getElementById('guideSearch');
    const topics = [...document.querySelectorAll('main article')];
    const groups = [...document.querySelectorAll('section .topics')];
    const catalog = document.getElementById('catalog');
    const elements = [...catalog.querySelectorAll('details')];
    const tags = [...document.querySelectorAll('.quick-tags button')];
    const normalize = value => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    search.addEventListener('input', () => {
        for (const tag of tags) tag.setAttribute('aria-pressed', String(search.value === tag.dataset.term));
        const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
        const matches = text => terms.every(term => normalize(text).includes(term));
        for (const topic of topics) topic.hidden = !matches(topic.textContent);
        for (const group of groups) group.closest('section').hidden = [...group.children].every(topic => topic.hidden);
        for (const details of elements) {
            const rows = [...details.querySelectorAll('li')];
            const program = details.querySelector('summary').textContent;
            for (const row of rows) row.hidden = !matches(program + ' ' + row.textContent);
            details.hidden = rows.every(row => row.hidden);
            if (terms.length && !details.hidden) details.open = true;
        }
        catalog.hidden = elements.every(details => details.hidden);
        document.getElementById('guideEmpty').hidden = !catalog.hidden || topics.some(topic => !topic.hidden);
    });
    for (const tag of tags) tag.onclick = () => {
        search.value = search.value === tag.dataset.term ? '' : tag.dataset.term;
        search.dispatchEvent(new Event('input'));
    };
})();
