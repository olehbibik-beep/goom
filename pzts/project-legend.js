// A floor annotation in world coordinates; the same vectors are used on screen and on paper.
const legendDeviceTypes = new Set(APP_PRODUCT === 'CCTV' ? Object.keys(CCTV_DEVICE_LABELS) :
    ['panel','expander','abax','keypad','pir','pir_wl','magnet','magnet_wl','glassbreak','panic','siren', ...NEW_TOOLBAR_DEVICE_TYPES]);
legendDeviceTypes.add('floorPassage');
legendDeviceTypes.add('trunkTool');
let selectedProjectLegend = null;
let projectLegendDrag = null;
const projectLegendLayouts = new WeakMap();

function sanitizeProjectLegend(value) {
    if (!value || typeof value !== 'object' || !Array.isArray(value.entries)) return null;
    const finite = (n, fallback, min, max) => Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;
    return {
        visible: value.visible !== false,
        x: finite(value.x, 0, -1e7, 1e7), y: finite(value.y, 0, -1e7, 1e7),
        scale: finite(value.scale, 1, .01, 1000),
        entries: value.entries.slice(0, 100).filter(entry => entry && legendDeviceTypes.has(entry.type)).map(entry => ({
            type: entry.type, ...(entry.cadSymbol === true ? {cadSymbol: true} : {}), label: typeof entry.label === 'string' ? entry.label.slice(0, 160) : entry.type,
            // Keep the snapshot even during early startup, before the icon editor has loaded.
            shapes: Array.isArray(entry.shapes) ? entry.shapes.slice(0, 100).filter(s => s && typeof s === 'object').map(s => ({
                kind:s.kind,x:s.x,y:s.y,size:s.size,rotation:s.rotation,color:s.color,fill:s.fill,fillColor:s.fillColor,stroke:s.stroke,fontWeight:s.fontWeight,
                ...(Number.isFinite(s.height) ? {height:s.height} : {}),
                ...(s.kind==='stockIcon' ? {stockType:s.stockType} : {}),
                ...(s.kind==='stockIcon' && s.cadSymbol === true ? {cadSymbol:true} : {}),
                ...(Number.isFinite(s.routeWidth) ? {routeWidth:s.routeWidth} : {}),
                ...(typeof s.routeColor==='string' ? {routeColor:s.routeColor} : {}),
                text:typeof s.text==='string'?s.text.slice(0,8):''
            })) : []
        }))
    };
}
function makeProjectLegendEntry(symbol, icons = customDeviceIcons) {
    const {type, cadSymbol} = symbol;
    if (cadSymbol) {
        const name = typeof deviceBriefName === 'function' ? deviceBriefName(symbol) : type;
        return {type, cadSymbol: true, label: name + ' · CAD', shapes: []};
    }
    const label = typeof toolbarMenuTypes === 'undefined' ? null : toolbarMenuTypes.find(item => item.type === type)?.title;
    const shapes = typeof sanitizeIconShapes === 'function' ? sanitizeIconShapes(icons[type]) : [];
    return {type, label: label || (typeof deviceBriefName === 'function' ? deviceBriefName(symbol) : type), shapes};
}
function getProjectLegendEntries(floor, symbols = floorLegendSymbols(floor, APP_PRODUCT)) {
    const entries = [];
    const seen = new Set();
    for (const entry of floor.legend.entries) {
        const key = floorLegendSymbolKey(entry);
        if (symbols.has(key) && !seen.has(key)) {
            entries.push(entry);
            seen.add(key);
        }
    }
    for (const [key, symbol] of symbols) {
        if (!seen.has(key) && legendDeviceTypes.has(symbol.type)) entries.push(makeProjectLegendEntry(symbol));
    }
    return entries;
}
function updateProjectLegendsFromMenu(menu) {
    let changed = false;
    for (const floor of floors) {
        if (!floor.legend) continue;
        const entries = getProjectLegendEntries(floor).map(entry => makeProjectLegendEntry(entry, menu.icons || {}));
        if (JSON.stringify(floor.legend.entries) === JSON.stringify(entries)) continue;
        floor.legend.entries = entries;
        changed = true;
    }
    if (!changed) return;
    requestRedraw();
    if (isSystemReady) triggerAutoSave();
}
function projectLegendLayout(floor) {
    const legend = floor.legend;
    const language = getGoomLanguage();
    const iconsReady = typeof sanitizeIconShapes === 'function';
    const toolbarReady = typeof toolbarMenuTypes !== 'undefined';
    const symbols = floorLegendSymbols(floor, APP_PRODUCT);
    const symbolKeys = JSON.stringify([...symbols.keys()]);
    const cached = projectLegendLayouts.get(legend);
    if (cached?.language === language && cached.snapshot === legend.entries && cached.symbolKeys === symbolKeys
        && cached.iconsReady === iconsReady && cached.toolbarReady === toolbarReady && cached.icons === customDeviceIcons) return cached;
    const entries = getProjectLegendEntries(floor, symbols);
    ctx.save(); ctx.font = '13px sans-serif';
    const labels = entries.map(entry => `— ${tr(entry.label)}`);
    const width = Math.max(170, ...labels.map(label => 56 + ctx.measureText(label).width));
    ctx.restore();
    const shapes = entries.map(entry => iconsReady ? sanitizeIconShapes(entry.shapes) : []);
    const layout = {language, iconsReady, toolbarReady, icons:customDeviceIcons, snapshot:legend.entries, symbolKeys, entries, labels, shapes, width, height:34 + entries.length * 28};
    projectLegendLayouts.set(legend, layout);
    return layout;
}
function getProjectLegendBounds(floor, layout) {
    const legend = floor?.legend;
    if (!legend?.visible) return null;
    layout ??= projectLegendLayout(floor);
    if (!layout.entries.length) return null;
    return {minX:legend.x, minY:legend.y, width:layout.width * legend.scale, height:layout.height * legend.scale};
}
function drawProjectLegend(target, floor, editing, theme) {
    const legend = floor.legend;
    if (!legend?.visible) return;
    const layout = projectLegendLayout(floor), bounds = getProjectLegendBounds(floor, layout);
    if (!bounds) return;
    target.save(); target.translate(legend.x, legend.y); target.scale(legend.scale, legend.scale);
    target.textAlign = 'left'; target.textBaseline = 'middle';
    target.fillStyle = theme === 'dark' ? '#f4f4f5' : '#171719'; target.font = '16px sans-serif';
    target.fillText(tr('Legenda:'), 0, 12);
    layout.entries.forEach((entry, index) => {
        const y = 46 + index * 28;
        target.save(); target.translate(20, y);
        const shapes = layout.shapes[index];
        if (shapes.length) {
            target.scale(.075, .075); target.translate(-200, -200);
            shapes.forEach(shape => drawEditorShape(target, shape));
        } else drawDevice(target, {type:entry.type, cadSymbol:entry.cadSymbol, x:0, y:0}, true, theme, {baseSize:10, defaultIcon:true});
        target.restore();
        target.fillStyle = theme === 'dark' ? '#f4f4f5' : '#171719';
        target.font = '13px sans-serif'; target.textAlign = 'left'; target.textBaseline = 'middle';
        target.fillText(layout.labels[index], 48, y);
    });
    target.restore();
    // The only editing mark is a small corner grip. It never reaches an export.
    if (editing && selectedProjectLegend === legend) {
        const x = bounds.minX + bounds.width, y = bounds.minY + bounds.height, unit = 1 / scale;
        target.save(); target.strokeStyle = theme === 'dark' ? '#a1a1aa' : '#52525b'; target.lineWidth = 1.5 * unit;
        target.beginPath(); target.moveTo(x-12*unit,y);target.lineTo(x,y-12*unit);
        target.moveTo(x-6*unit,y);target.lineTo(x,y-6*unit);target.stroke();target.restore();
    }
}
function projectLegendHit(x, y) {
    const floor = floors[currentFloorIndex], bounds = getProjectLegendBounds(floor);
    if (!bounds) return null;
    const right = bounds.minX + bounds.width, bottom = bounds.minY + bounds.height;
    if (selectedProjectLegend === floor.legend && Math.hypot(x-right,y-bottom) <= 22 / scale) return 'resize';
    return x >= bounds.minX && x <= right && y >= bounds.minY && y <= bottom ? 'move' : null;
}
function beginProjectLegendDrag(event, x, y) {
    const mode = projectLegendHit(x, y);
    if (!mode) { selectedProjectLegend = null; requestRedraw(); return false; }
    const legend = floors[currentFloorIndex].legend;
    selectedProjectLegend = legend; activeDeviceIds.clear(); window.clearGoomTooltips?.();
    projectLegendDrag = {legend, mode, pointerId:event.pointerId, x, y, startX:legend.x, startY:legend.y, startScale:legend.scale, changed:false};
    container.setPointerCapture(event.pointerId); event.preventDefault(); requestRedraw(); return true;
}
function moveProjectLegend(event, x, y) {
    const drag = projectLegendDrag;
    if (!drag || drag.pointerId !== event.pointerId) return false;
    if (floors[currentFloorIndex]?.legend !== drag.legend) { finishProjectLegendDrag(); return true; }
    if (drag.mode === 'move') { drag.legend.x = drag.startX + x-drag.x; drag.legend.y = drag.startY + y-drag.y; }
    else {
        const layout = projectLegendLayout(floors[currentFloorIndex]), w = layout.width, h = layout.height;
        const dx = x-drag.x, dy = y-drag.y;
        drag.legend.scale = Math.max(.01, Math.min(1000, drag.startScale + (dx*w+dy*h)/(w*w+h*h)));
    }
    drag.changed = drag.legend.x !== drag.startX || drag.legend.y !== drag.startY || drag.legend.scale !== drag.startScale;
    container.style.cursor = drag.mode === 'resize' ? 'nwse-resize' : 'grabbing'; requestRedraw(); return true;
}
function finishProjectLegendDrag(event) {
    const drag = projectLegendDrag;
    if (!drag || (event && event.pointerId !== drag.pointerId)) return false;
    projectLegendDrag = null;
    if (container.hasPointerCapture(drag.pointerId)) container.releasePointerCapture(drag.pointerId);
    if (drag.changed) { saveStateToHistory(); triggerAutoSave(); }
    requestRedraw(); return true;
}
function hoverProjectLegend(x,y) {
    const mode = projectLegendHit(x,y);
    if (!mode) return false;
    window.clearGoomTooltips?.(); container.style.cursor = mode === 'resize' ? 'nwse-resize' : 'move'; return true;
}
function toggleProjectLegend() {
    const floor = floors[currentFloorIndex];
    if (!floor || !isSystemReady || isOverviewMode) return;
    finishProjectLegendDrag();
    if (floor.legend) floor.legend.visible = !floor.legend.visible;
    else {
        const legend = {visible:true,x:0,y:0,scale:1,entries:[]};
        floor.legend = legend;
        legend.entries = getProjectLegendEntries(floor);
        const layout = projectLegendLayout(floor), width = planCanvasWidth(), height = planCanvasHeight();
        const displayScale = Math.min(1, width*.38/layout.width, height*.65/layout.height);
        legend.scale = Math.max(.01, Math.min(1000, displayScale / scale));
        legend.x = (width - 28 - layout.width*legend.scale*scale - offsetX)/scale;
        legend.y = (28-offsetY)/scale;
    }
    selectedProjectLegend = getProjectLegendBounds(floor) ? floor.legend : null;
    activeDeviceIds.clear(); resetPlacementTool();
    saveStateToHistory(); triggerAutoSave(); requestRedraw(); updateProjectLegendButton();
}
function updateProjectLegendButton() {
    const button = document.getElementById('btnToggleLegend');
    const visible = !!floors[currentFloorIndex]?.legend?.visible;
    const label = tr(visible ? 'Skrýt legendu' : 'Zobrazit legendu');
    button.setAttribute('aria-pressed', String(visible));
    button.title = label;
    button.setAttribute('aria-label', label);
}
document.getElementById('btnToggleLegend').addEventListener('click', toggleProjectLegend);
window.addEventListener('goom-language-changed', () => {updateProjectLegendButton();requestRedraw();});
// Keyboard precision also makes resizing discoverable without a mouse grip.
window.addEventListener('keydown', event => {
    const legend = floors[currentFloorIndex]?.legend;
    if (!legend?.visible || selectedProjectLegend !== legend || isOverviewMode ||
        !getProjectLegendBounds(floors[currentFloorIndex]) ||
        event.target.closest?.('input,textarea,select,[contenteditable="true"]') ||
        [...document.querySelectorAll('.modal')].some(modal => getComputedStyle(modal).display !== 'none')) return;
    const key = event.key;
    if (!['+','=','-','_','Escape','Delete','Backspace','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) return;
    event.preventDefault();event.stopImmediatePropagation();
    if (key === 'Escape') selectedProjectLegend = null;
    else {
        if (key === 'Delete' || key === 'Backspace') {legend.visible = false;selectedProjectLegend = null;}
        else if (key.startsWith('Arrow')) {const step=(event.shiftKey?10:1)/scale;legend.x+=(key==='ArrowRight'?step:key==='ArrowLeft'?-step:0);legend.y+=(key==='ArrowDown'?step:key==='ArrowUp'?-step:0);}
        else legend.scale = Math.max(.01,Math.min(1000,legend.scale * ((key==='-' || key==='_') ? .9 : 1.1)));
        saveStateToHistory();triggerAutoSave();
    }
    updateProjectLegendButton();requestRedraw();
},true);
