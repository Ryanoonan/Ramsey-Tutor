

export function KnGraph({ n, defaultColor = "black", redEdges = [], blueEdges = [] }) {
    const nodes = Array.from({ length: n }, (_, i) => ({
        id: i,
        x: 300 + 150 * Math.cos((i * 2 * Math.PI) / n),
        y: 300 + 150 * Math.sin((i * 2 * Math.PI) / n),
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
                color: color
            });
        }
    }

    return [nodes, links];
}
