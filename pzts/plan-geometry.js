// Source geometry is in plan coordinates and is independent of the display theme.
const wallGeometryCache = new WeakMap();
const mapGeometryRequests = new WeakSet();

function buildWallIndex(edges, depth = 0) {
    if (!edges.length) return null;
    const bounds = {minX:Infinity, minY:Infinity, maxX:-Infinity, maxY:-Infinity};
    for (const edge of edges) {
        bounds.minX = Math.min(bounds.minX, edge.x, edge.x + edge.dx);
        bounds.minY = Math.min(bounds.minY, edge.y, edge.y + edge.dy);
        bounds.maxX = Math.max(bounds.maxX, edge.x, edge.x + edge.dx);
        bounds.maxY = Math.max(bounds.maxY, edge.y, edge.y + edge.dy);
    }
    if (edges.length <= 12) return {...bounds, edges};
    const axis = depth % 2 ? 'y' : 'x';
    const delta = 'd' + axis;
    edges.sort((a,b) => (a[axis] + a[delta]/2) - (b[axis] + b[delta]/2));
    const middle = edges.length >> 1;
    return {...bounds, left:buildWallIndex(edges.slice(0,middle), depth+1), right:buildWallIndex(edges.slice(middle), depth+1)};
}

function getPlanWallGeometry(floor) {
    const image = floor.image;
    const map = floor.satellite;
    const source = map ? map.buildingOutlines : floor.vectorPlan;
    if (!source || !image) {
        if (map && image && !mapGeometryRequests.has(map)) {
            mapGeometryRequests.add(map);
            void ensureMapSceneForFloor(floor).then(() => { if (floor.satellite === map) requestRedraw(); });
        }
        return null;
    }
    const width = image.naturalWidth || image.width, height = image.naturalHeight || image.height;
    const cached = wallGeometryCache.get(source);
    if (cached?.width === width && cached.height === height) return cached;
    const edges = [];
    const limit = 100000;
    const add = (x,y,nextX,nextY) => {
        if (![x,y,nextX,nextY].every(Number.isFinite) || Math.hypot(nextX-x,nextY-y) < .001) return;
        edges.push({x,y,dx:nextX-x,dy:nextY-y});
    };
    if (map) {
        const sx = width/source.width, sy = height/source.height;
        for (const ring of source.rings) {
            for (let i=0; i<ring.length; i++) {
                const a = ring[i], b = ring[(i+1)%ring.length];
                // Clipped map polygons can contain an artificial edge on the perimeter of the image.
                if ((a[0] === b[0] && [0,source.width].includes(a[0])) || (a[1] === b[1] && [0,source.height].includes(a[1]))) continue;
                add(a[0]*sx,a[1]*sy,b[0]*sx,b[1]*sy);
            }
        }
    } else {
        const path = document.createElementNS('http://www.w3.org/2000/svg','path');
        for (const d of source.paths) {
            if (edges.length >= limit) break;
            for (const part of d.match(/M[^M]*/g) || []) {
                if (edges.length >= limit) break;
                if (/^[MLZ\d\s.,eE+\-]+$/.test(part)) {
                    const coordinates = (part.match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) || []).map(Number);
                    for (let i=2; i+1<coordinates.length && edges.length<limit; i+=2) add(...coordinates.slice(i-2,i+2));
                    if (/Z\s*$/.test(part) && coordinates.length >= 4) add(...coordinates.slice(-2), ...coordinates.slice(0,2));
                } else {
                    path.setAttribute('d', part);
                    const length = path.getTotalLength();
                    const count = Math.min(limit-edges.length, 1200, Math.ceil(length/2));
                    if (count < 1) continue;
                    let a = path.getPointAtLength(0);
                    for (let i=1; i<=count; i++) {
                        const b = path.getPointAtLength(length*i/count);
                        add(a.x,a.y,b.x,b.y); a=b;
                    }
                }
            }
        }
    }
    const geometry = {width,height,index:buildWallIndex(edges),complete:edges.length<limit};
    wallGeometryCache.set(source,geometry);
    return geometry;
}

function tracePlanWall(node, x, y, dx, dy, maximum) {
    if (!node) return maximum;
    const endX = x + dx*maximum, endY = y + dy*maximum;
    if (Math.min(x,endX)>node.maxX || Math.max(x,endX)<node.minX ||
        Math.min(y,endY)>node.maxY || Math.max(y,endY)<node.minY) return maximum;
    if (!node.edges) return tracePlanWall(node.right,x,y,dx,dy,tracePlanWall(node.left,x,y,dx,dy,maximum));
    for (const edge of node.edges) {
        const determinant = dx*edge.dy - dy*edge.dx;
        if (Math.abs(determinant)<1e-9) continue;
        const relX = edge.x-x, relY = edge.y-y;
        const distance = (relX*edge.dy-relY*edge.dx)/determinant;
        const fraction = (relX*dy-relY*dx)/determinant;
        if (distance>3 && distance<maximum && fraction>=-1e-7 && fraction<=1+1e-7) maximum=distance;
    }
    return maximum;
}

function strokeWallIndex(context, node) {
    if (node.edges) {
        for (const edge of node.edges) {
            context.moveTo(edge.x,edge.y);
            context.lineTo(edge.x+edge.dx,edge.y+edge.dy);
        }
    } else {
        strokeWallIndex(context,node.left);
        strokeWallIndex(context,node.right);
    }
}
