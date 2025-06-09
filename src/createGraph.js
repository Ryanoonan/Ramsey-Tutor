

function calculateNodeRadius(nodeCount) {
    if (nodeCount <= 10) return 25;
    if (nodeCount <= 20) return 20;
    if (nodeCount <= 40) return 15;
    if (nodeCount <= 60) return 10;
    return 7;
}

function calculateLineWidth(nodeCount) {
    if (nodeCount <= 10) return 5;
    if (nodeCount <= 20) return 1;
    if (nodeCount <= 40) return 2;
    if (nodeCount <= 60) return 1.5;
    return 1;
}

export function KnGraph({ n, defaultColor = "black", redEdges = [], blueEdges = [], circleRadius = 150 }) {
    const nodeRadius = calculateNodeRadius(n);
    const lineWidth = calculateLineWidth(n);

    const adjustedCircleRadius = n > 15 ? circleRadius + Math.min(100, n * 3) : circleRadius;

    const nodes = Array.from({ length: n }, (_, i) => ({
        id: i,
        x: 300 + adjustedCircleRadius * Math.cos((i * 2 * Math.PI) / n),
        y: 300 + adjustedCircleRadius * Math.sin((i * 2 * Math.PI) / n),
        radius: nodeRadius,
    }));

    const links = [];
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const isRedEdge = redEdges.some(edge =>
                (edge[0] === i && edge[1] === j) || (edge[0] === j && edge[1] === i));
            const isBlueEdge = blueEdges.some(edge =>
                (edge[0] === i && edge[1] === j) || (edge[0] === j && edge[1] === i));

            let color = defaultColor;
            if (isRedEdge) color = "red";
            if (isBlueEdge) color = "blue";

            links.push({
                edge: [i, j],
                color: color,
                width: lineWidth
            });
        }
    }

    return [nodes, links];
}
