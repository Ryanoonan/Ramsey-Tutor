

export function KnGraph(n, defaultColor = "black") {
    const nodes = Array.from({ length: n }, (_, i) => ({
        id: i,
        x: 300 + 150 * Math.cos((i * 2 * Math.PI) / n),
        y: 300 + 150 * Math.sin((i * 2 * Math.PI) / n),
    }));

    const links = [];
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            links.push({
                edge: [i, j],
                color: defaultColor
            });
        }
    }

    return [nodes, links];
}
