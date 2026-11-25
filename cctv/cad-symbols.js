// Alternate drawing symbols keep the device type used for addressing and coverage.
const cadCatalog = {
    PZTS: { panel: ['PZTS', 'box'], expander: ['EXP', 'box'], keypad: ['KEY', 'box'],
        pir: ['PIR', 'direction'], magnet: ['MK', 'contact'],
        glassbreak: ['GB', 'circle'], siren: ['SIR', 'horn'], acs_reader: ['ACS', 'box'], smoke: ['S', 'circle'] },
    EPS: { panel: ['EPS', 'box'], eps_smoke: ['S', 'circle'], eps_heat: ['T', 'circle'],
        eps_manual: ['M', 'box'], eps_sounder: ['SIR', 'horn'], eps_io: ['I/O', 'box'] },
    CCTV: { cctv_bullet: ['C', 'camera'], cctv_dome: ['D', 'circle'], cctv_ptz: ['PTZ', 'direction'],
        cctv_nvr: ['NVR', 'box'], cctv_poe: ['PoE', 'box'] },
    SK: { panel: ['RACK', 'box'], sk_switch: ['SW', 'box'], sk_patch_panel: ['PP', 'box'],
        sk_access_point: ['AP', 'circle'], sk_outlet: ['RJ45', 'outlet'], sk_fiber_outlet: ['FO', 'outlet'] }
};

function drawCadSymbol(ctx, type, scale, theme) {
    const catalog = cadCatalog[APP_PRODUCT];
    if (!catalog || !Object.hasOwn(catalog, type)) return false;
    const [label, shape] = catalog[type];
    ctx.save();
    ctx.scale(scale, scale);
    ctx.strokeStyle = ctx.fillStyle = theme === 'dark' ? '#f1f5f9' : '#171e25';
    ctx.lineWidth = 1.6;
    ctx.lineJoin = 'round';
    const polygon = points => {
        ctx.moveTo(...points[0]);
        for (const point of points.slice(1)) ctx.lineTo(...point);
        ctx.closePath();
    };
    const rectangle = (x, y, width, height) => polygon([[x,y], [x+width,y], [x+width,y+height], [x,y+height]]);
    ctx.beginPath();
    if (shape === 'circle') ctx.arc(0, 0, 13, 0, 2 * Math.PI);
    else if (shape === 'direction') polygon([[-16, -11], [8, -11], [17, 0], [8, 11], [-16, 11]]);
    else if (shape === 'horn') polygon([[-15, -9], [4, -9], [16, -14], [16, 14], [4, 9], [-15, 9]]);
    else if (shape === 'contact') { rectangle(-16, -8, 21, 16); rectangle(9, -8, 6, 16); }
    else if (shape === 'camera') { rectangle(-16, -9, 22, 18); polygon([[6, -4], [16, -10], [16, 10], [6, 4]]); }
    else if (shape === 'outlet') polygon([[-16,-10], [16,-10], [16,4], [7,4], [7,11], [-7,11], [-7,4], [-16,4]]);
    else rectangle(-16, -10, 32, 20);
    ctx.stroke();
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, ['contact', 'camera'].includes(shape) ? -5 : 0, shape === 'outlet' ? -2 : 0);
    ctx.restore();
    return true;
}


const isDrawingToolbarMenu = menu => menu?.id === "drawing";
function drawingToolbarMenuName() {
    return window.goomUI("Výkres", "Drawing", "Planzeichen", "Чертёж", "Rysunek");
}
