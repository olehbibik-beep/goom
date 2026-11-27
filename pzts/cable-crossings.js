// Crossings are drawn as dots. The cables retain their original endpoint connections.
const cableCrossingCache = new WeakMap();

function getCablePaintPlan(floor) {
    const nodes = new Map(floor.devices.map(device => [device.id, device]));
    const routes = [];
    for (const cable of floor.cables) {
        const from = nodes.get(cable.fromId), to = nodes.get(cable.toId);
        if (!from || !to || [from,to].some(node => node.type === 'textNode' || !showDeactivatedDevices && node.type === 'deactivated')) continue;
        if (!Number.isFinite(cable.h1x)) recalcCableHandles(cable, from, to);
        routes.push({cable, from, to, points:getCableRoute(cable,from,to)});
    }
    const signature = routes.map(({cable,from,to,points}) => [cable.id,from.id,to.id,from.attachedCableId,to.attachedCableId,points.map(({x,y}) => [x,y])]);
    const key = JSON.stringify(signature);
    const cached = cableCrossingCache.get(floor);
    if (cached?.key === key) return cached.plan;

    const segments = routes.flatMap(route => route.points.slice(1).flatMap((b,index) => {
        const a = route.points[index];
        if (Math.hypot(b.x-a.x,b.y-a.y)<.001) return [];
        return [{route,a,b,minX:Math.min(a.x,b.x),maxX:Math.max(a.x,b.x),minY:Math.min(a.y,b.y),maxY:Math.max(a.y,b.y)}];
    })).sort((a,b) => a.minX-b.minX);
    const dots = new Map();
    let active = [];
    for (const second of segments) {
        active = active.filter(first => first.maxX >= second.minX);
        for (const first of active) {
            if (first.route === second.route || first.minY > second.maxY || first.maxY < second.minY) continue;
            const ax=first.b.x-first.a.x, ay=first.b.y-first.a.y, bx=second.b.x-second.a.x, by=second.b.y-second.a.y;
            const d=ax*by-ay*bx;
            if (Math.abs(d)<1e-8) continue;
            const dx=second.a.x-first.a.x, dy=second.a.y-first.a.y;
            const t=(dx*by-dy*bx)/d, u=(dx*ay-dy*ax)/d;
            if (t<-.00001 || t>1.00001 || u<-.00001 || u>1.00001) continue;
            const x=first.a.x+t*ax, y=first.a.y+t*ay;
            const sharesEndpoint = (a,b) => [a.from,a.to].some(node => Math.hypot(node.x-x,node.y-y)<1 &&
                (node.id===b.from.id || node.id===b.to.id || node.attachedCableId===b.cable.id));
            if (sharesEndpoint(first.route,second.route) || sharesEndpoint(second.route,first.route)) continue;
            dots.set(Math.round(x*100)+':'+Math.round(y*100),{x,y});
            if (dots.size>=5000) break;
        }
        active.push(second);
        if (dots.size>=5000) break;
    }
    const plan = {dots:[...dots.values()],crossings:dots.size};
    cableCrossingCache.set(floor,{key,plan});
    return plan;
}

function drawCableCrossings(target, points) {
    target.save();
    target.fillStyle = '#08090b';
    for (const {x,y} of points) {
        target.beginPath();
        target.arc(x,y,4.6,0,Math.PI*2);
        target.fill();
    }
    target.restore();
}
