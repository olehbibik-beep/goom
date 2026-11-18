let cameraPlacementOptions = { megapixels: 4, lensId: '2.8' };

function readCameraFields(prefix) {
    const resolution = Number(document.getElementById(`${prefix}Resolution`).value);
    return {
        megapixels: CCTV_CAMERA_RESOLUTIONS.includes(resolution) ? resolution : null,
        lensId: document.getElementById(`${prefix}Lens`).value
    };
}

function setCameraEditFields(device) {
    document.getElementById('editCameraType').value = device.type;
    document.getElementById('editCameraResolution').value = CCTV_CAMERA_RESOLUTIONS.includes(device.megapixels)
        ? String(device.megapixels) : '';
    document.getElementById('editCameraLens').value = getCameraLens(device.lensId)?.id ?? '';
    window.refreshGoomSelects?.();
}

(() => {
    const tools = document.getElementById('deviceSetTools');
    const presetTools = document.getElementById('cameraPresetTools');
    const picker = document.getElementById('btnCameraPicker');
    for (const [type, label] of Object.entries(CCTV_DEVICE_LABELS)) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'device-btn';
        button.dataset.type = type;
        button.title = label;
        button.setAttribute('aria-label', label);
        if (Object.hasOwn(CCTV_CAMERAS, type)) presetTools.append(button);
        else tools.insertBefore(button, picker);
    }

    for (const prefix of ['newCamera', 'editCamera']) {
        const resolution = document.getElementById(`${prefix}Resolution`);
        const lens = document.getElementById(`${prefix}Lens`);
        if (prefix === 'editCamera') resolution.add(new Option(tr('Nespecifikováno'), ''));
        for (const mp of CCTV_CAMERA_RESOLUTIONS) resolution.add(new Option(mp === 8 ? '8 MP / 4K' : `${mp} MP`, String(mp)));
        lens.add(new Option(tr('Výchozí zorný úhel'), ''));
        for (const entry of CCTV_CAMERA_LENSES) lens.add(new Option(entry.label, entry.id));
    }
    const editType = document.getElementById('editCameraType');
    for (const [type, camera] of Object.entries(CCTV_CAMERAS)) editType.add(new Option(tr(camera.label), type));

    const modal = document.getElementById('cameraSettingsModal');
    const form = document.getElementById('cameraPickerForm');
    const cards = [...form.querySelectorAll('[data-camera-type]')];
    const lensInput = document.getElementById('newCameraLens');
    const summary = document.getElementById('cameraLensSummary');
    const defaultLens = type => type === 'cctv_ptz' ? '' : '2.8';
    let lastType = 'cctv_bullet';
    let cameraType = lastType;

    function syncCameraOptions() {
        form.querySelectorAll('.camera-options input').forEach(input => {
            input.checked = input.value === document.getElementById(input.dataset.select).value;
        });
    }

    for (const [selectId, containerId] of [['newCameraResolution', 'cameraResolutionOptions'], ['newCameraLens', 'cameraLensOptions']]) {
        const select = document.getElementById(selectId);
        const container = document.getElementById(containerId);
        for (const option of select.options) {
            const label = document.createElement('label');
            label.className = 'camera-option';
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = selectId;
            input.value = option.value;
            input.dataset.select = selectId;
            const toggle = document.createElement('span');
            toggle.className = 'camera-switch';
            toggle.setAttribute('aria-hidden', 'true');
            const text = document.createElement('span');
            text.textContent = option.textContent;
            input.addEventListener('change', () => {
                select.value = input.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
            });
            label.append(input, toggle, text);
            container.append(label);
        }
        select.addEventListener('change', syncCameraOptions);
    }

    function updateSummary() {
        const lens = getCameraLens(lensInput.value);
        const angle = getCameraLensAngle(cameraType, lensInput.value);
        const angleText = tr('Zorný úhel na výkresu: {0}°', angle);
        summary.textContent = lens ? `${angleText}\n${tr('Katalogové dosahy při 4 MP: {0} m', lens.ranges.join(' / '))}` : angleText;
    }

    function selectType(type) {
        cameraType = type;
        cards.forEach(card => card.setAttribute('aria-pressed', String(card.dataset.cameraType === type)));
        updateSummary();
    }

    function closePicker() {
        modal.style.display = 'none';
        picker.focus();
    }

    picker.addEventListener('click', () => {
        const available = cards.filter(card => {
            const presetButton = presetTools.querySelector(`[data-type="${card.dataset.cameraType}"]`);
            card.hidden = presetButton.hidden;
            return !card.hidden;
        });
        const card = available.find(item => item.dataset.cameraType === lastType) ?? available[0];
        if (!card) return;
        const type = card.dataset.cameraType;
        document.getElementById('newCameraResolution').value = String(cameraPlacementOptions.megapixels);
        lensInput.value = type === lastType ? cameraPlacementOptions.lensId : defaultLens(type);
        selectType(type);
        syncCameraOptions();
        window.refreshGoomSelects?.();
        modal.style.display = 'flex';
        card.focus();
    });

    cards.forEach(card => card.addEventListener('click', () => {
        const type = card.dataset.cameraType;
        if (lensInput.value === defaultLens(cameraType)) lensInput.value = defaultLens(type);
        selectType(type);
        syncCameraOptions();
        window.refreshGoomSelects?.();
    }));
    lensInput.addEventListener('change', updateSummary);
    window.addEventListener('goom-language-changed', updateSummary);
    document.getElementById('btnCameraSettingsCancel').addEventListener('click', closePicker);
    modal.addEventListener('click', event => {
        if (event.target === modal) closePicker();
    });
    form.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        event.stopPropagation();
        closePicker();
    });
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (presetTools.querySelector(`[data-type="${cameraType}"]`).hidden) return;
        cameraPlacementOptions = readCameraFields('newCamera');
        lastType = cameraType;
        selectedTool = cameraType;
        window.tabletPanMode = false;
        stopDeviceRotation();
        activeDeviceIds.clear();
        document.querySelectorAll('#deviceSelector .device-btn.active').forEach(button => button.classList.remove('active'));
        picker.classList.add('active');
        closePicker();
        requestRedraw();
    });

    document.getElementById('editCameraLens').addEventListener('change', event => {
        if (!editingDevice || !Object.hasOwn(CCTV_CAMERAS, editingDevice.type)) return;
        document.getElementById('cameraAngle').value = getCameraLensAngle(editType.value, event.target.value);
    });
})();

function drawCctvDevice(ctx, type, sMult) {
    ctx.save();
    ctx.scale(sMult, sMult);
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = COLORS[type];
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    if (type === 'cctv_doorbell') {
        ctx.roundRect(-10, -17, 20, 34, 4);
    } else if (type === 'acs_reader') {
        ctx.roundRect(-13, -15, 26, 30, 4);
    } else if (type === 'cctv_antenna') {
        ctx.moveTo(-12, 15); ctx.lineTo(0, -3); ctx.lineTo(12, 15); ctx.closePath();
    } else if (type === 'cctv_receiver') {
        ctx.roundRect(-18, -7, 36, 21, 4);
    } else if (type === 'cctv_bullet') {
        ctx.roundRect(-17, -8, 24, 16, 3);
        ctx.moveTo(7, -4); ctx.lineTo(15, -9); ctx.lineTo(15, 9); ctx.lineTo(7, 4); ctx.closePath();
    } else if (Object.hasOwn(CCTV_CAMERAS, type)) {
        ctx.arc(-2, 0, 11, 0, Math.PI * 2);
        ctx.moveTo(9, -5); ctx.lineTo(16, 0); ctx.lineTo(9, 5);
    } else {
        ctx.roundRect(-19, -9, 38, 18, 3);
    }
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = COLORS[type];
    if (type === 'cctv_doorbell') {
        ctx.beginPath(); ctx.arc(0, -7, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(0, 8, 3, 0, Math.PI * 2); ctx.stroke();
    } else if (type === 'acs_reader') {
        ctx.strokeRect(-7, -5, 14, 10);
        ctx.beginPath(); ctx.moveTo(-7, -1); ctx.lineTo(7, -1); ctx.stroke();
    } else if (type === 'cctv_antenna') {
        ctx.beginPath(); ctx.moveTo(0, 15); ctx.lineTo(0, -13); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, -13, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(0, -13, 8, -Math.PI / 3, Math.PI / 3);
        ctx.moveTo(-4, -20); ctx.arc(0, -13, 8, Math.PI * 2 / 3, Math.PI * 4 / 3); ctx.stroke();
    } else if (type === 'cctv_receiver') {
        ctx.beginPath(); ctx.moveTo(-11, -7); ctx.lineTo(-15, -18);
        ctx.moveTo(11, -7); ctx.lineTo(15, -18); ctx.stroke();
        ctx.beginPath(); ctx.arc(-9, 4, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(-2, 4); ctx.lineTo(10, 4); ctx.stroke();
    } else if (type === 'cctv_nvr' || type === 'cctv_poe') {
        ctx.font = 'bold 10px monospace';
        ctx.fillText(type === 'cctv_nvr' ? 'NVR' : 'PoE', 0, 0);
    } else if (type !== 'cctv_bullet') {
        ctx.beginPath();
        ctx.arc(-2, 0, type === 'cctv_ptz' ? 5.5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
        if (type === 'cctv_ptz') {
            ctx.beginPath();
            ctx.arc(-2, 0, 15, Math.PI * .55, Math.PI * 1.45);
            ctx.stroke();
        }
    }
    ctx.restore();
}
