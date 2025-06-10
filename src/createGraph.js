import { applyOpacity } from "./animationHelpers";
import theme from './theme';

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
    if (nodeCount <= 60) return 0.5;
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
            if (isRedEdge) color = theme.palette.custom.edgeRed;
            if (isBlueEdge) color = theme.palette.custom.edgeBlue;

            links.push({
                edge: [i, j],
                color: color,
                width: lineWidth
            });
        }
    }

    return [nodes, links];
}


export function GetAngleRatio(idx, maxIdx) {
    const ratio = (idx / maxIdx);
    const scaled = 1 / (1 + Math.exp((ratio - 0.5) * 13));
    return scaled * 2 * Math.PI;
}

export function KInfGraph({ n = 50, defaultColor = "black", redEdges = [], blueEdges = [], circleRadius = 150, ids = [] }) {
    const baseNodeRadius = calculateNodeRadius(n);
    const lineWidth = calculateLineWidth(n);
    let newIds = ids
    if (ids.length === 0) {
        newIds = [...Array(n).keys()]
    }

    const adjustedCircleRadius = n > 15 ? circleRadius + Math.min(100, n * 3) : circleRadius;
    const nodes = Array.from({ length: n }, (_, i) => {
        const angle = GetAngleRatio(i, n);
        const radius = Math.min(angle, 2 * Math.PI - angle) * baseNodeRadius;
        return {
            id: newIds[i],
            x: 300 + adjustedCircleRadius * Math.cos(angle),
            y: 300 + adjustedCircleRadius * Math.sin(angle),
            radius: radius,
        }
    });

    const links = [];
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const nodeI = nodes.find(node => node.id === newIds[i]);
            const nodeJ = nodes.find(node => node.id === newIds[j]);
            const isRedEdge = redEdges.some(edge =>
                (edge[0] === newIds[i] && edge[1] === newIds[j]) || (edge[0] === newIds[j] && edge[1] === newIds[i]));
            const isBlueEdge = blueEdges.some(edge =>
                (edge[0] === newIds[i] && edge[1] === newIds[j]) || (edge[0] === newIds[j] && edge[1] === newIds[i]));

            let color = defaultColor;
            if (isRedEdge) color = theme.palette.custom.edgeRed;
            if (isBlueEdge) color = theme.palette.custom.edgeBlue;
            let opacity = Math.min(nodeI.radius, nodeJ.radius) / baseNodeRadius;
            color = applyOpacity(color, opacity)
            let adjustedLineWidth = lineWidth;
            let adjustedLineColor = color;
            if (isRedEdge || isBlueEdge) {
                adjustedLineWidth = lineWidth * 5;
                adjustedLineColor = applyOpacity(color, 0.5);
            }

            links.push({
                edge: [newIds[i], newIds[j]],
                color: adjustedLineColor,
                width: adjustedLineWidth,
            });
        }
    }
    return [nodes, links];


}

export function KInfGraphWithKeepIds({ n = 50, defaultColor = "black", redEdges = [], blueEdges = [], circleRadius = 150, idsToKeep = [] }) {
    const defaultGraph = KInfGraph({ n, defaultColor, redEdges, blueEdges, circleRadius })
    const oldIds = defaultGraph[0].map((node) => node.id)
    let newIds = [...Array(26).keys()].map(x => Math.floor((Math.random() + 100) * 10000))
    newIds.push(...idsToKeep)
    newIds.push([...Array(n - newIds.length).keys()].map(x => Math.floor((Math.random() + 100) * 10000)))
    return KInfGraph({ n, defaultColor, redEdges, blueEdges, circleRadius, ids: newIds });

}