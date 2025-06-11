import { applyOpacity, lerpColor } from "./animationHelpers";
import theme from './theme';

function calculateNodeRadius(nodeCount) {
    if (nodeCount <= 10) return 50;
    if (nodeCount <= 20) return 40;
    return 20;
}

function calculateLineWidth(nodeCount) {
    if (nodeCount <= 10) return 5;
    if (nodeCount <= 20) return 1;
    if (nodeCount <= 40) return 2;
    if (nodeCount <= 60) return 0.5;
    return 1;
}

export function createCompleteLinks(nodes, redEdges = [], blueEdges = [], defaultColor = theme.palette.custom.edgeDefault, lineWidth = 1) {
    const links = [];
    const nodeIds = nodes.map(node => node.id);

    for (let i = 0; i < nodeIds.length; i++) {
        for (let j = i + 1; j < nodeIds.length; j++) {
            const id1 = nodeIds[i];
            const id2 = nodeIds[j];

            const isRedEdge = redEdges.some(edge =>
                (edge[0] === id1 && edge[1] === id2) || (edge[0] === id2 && edge[1] === id1));
            const isBlueEdge = blueEdges.some(edge =>
                (edge[0] === id1 && edge[1] === id2) || (edge[0] === id2 && edge[1] === id1));

            let color = defaultColor;
            if (isRedEdge) color = theme.palette.custom.edgeRed;
            if (isBlueEdge) color = theme.palette.custom.edgeBlue;

            links.push({
                edge: [id1, id2],
                color: color,
                width: lineWidth
            });
        }
    }

    return links;
}

export function KnGraph({ n, defaultColor = theme.palette.custom.edgeDefault, redEdges = [], blueEdges = [], circleRadius = 150 }) {
    const nodeRadius = calculateNodeRadius(n);
    const lineWidth = calculateLineWidth(n);

    const adjustedCircleRadius = n > 15 ? circleRadius + Math.min(100, n * 3) : circleRadius;

    const nodes = Array.from({ length: n }, (_, i) => ({
        id: i,
        x: 300 + adjustedCircleRadius * Math.cos((i * 2 * Math.PI) / n),
        y: 300 + adjustedCircleRadius * Math.sin((i * 2 * Math.PI) / n),
        radius: nodeRadius,
    }));

    const links = createCompleteLinks(nodes, redEdges, blueEdges, defaultColor, lineWidth);

    return [nodes, links];
}


export function GetAngleRatio(idx, maxIdx) {
    const ratio = (idx / maxIdx);
    const scaled = 1 / (1 + Math.exp((ratio - 0.5) * 13));
    const angle = scaled * 2 * Math.PI + Math.PI;
    return angle > 2 * Math.PI ? angle - 2 * Math.PI : angle;
}

export function GetAngle2(x) {
    if (x < 0 || x > 1) {
        throw new Error("GetAngle2: x must be in the range [0, 1]");
    }
    let y;
    if (x <= 0.5) {
        if (x < 0.184) {
            y = Math.PI * (0.1836278408721 - 0.7998964082831 * x) / 0.1836278408721;
        } else {
            y = Math.PI * Math.pow(x - 0.5, 4) * 20;
        }
    } else {
        return Math.PI * 2 - GetAngle2(-x + 1)
    }
    return y
}




export function KInfGraphWithKeepIds({ originalGraph, n = 50, defaultColor = theme.palette.custom.edgeDefault, redEdges = [], blueEdges = [], circleRadius = 150, idsToKeep = [], centerNodeId, idsToDrop = [] }) {
    const oldIds = originalGraph[0].map((node) => node.id)
    let newIds;
    if (idsToDrop.length > 0) {
        newIds = oldIds.filter(id => !idsToDrop.includes(id));
        newIds.push(Math.floor((Math.random() + 100) * 10000));
    } else {
        newIds = [...Array(26).keys()].map(x => Math.floor((Math.random() + 100) * 10000))
        newIds.push(...idsToKeep)
        newIds.push([...Array(n - newIds.length).keys()].map(x => Math.floor((Math.random() + 100) * 10000)))
        // Flatten the newIds array in case there are nested arrays
        newIds = newIds.flat();

        if (idsToKeep.includes(centerNodeId)) {
            const centerNodeIndex = newIds.indexOf(centerNodeId);

            for (let i = 0; i < newIds.length; i++) {
                if (i !== centerNodeIndex) {
                    blueEdges.push([centerNodeId, newIds[i]]);
                }
            }
        }

    }
    return KInfGraph({ n, defaultColor, redEdges, blueEdges, circleRadius, ids: newIds });
}

export function GetRadiusFromAngle(x) {
    const distToStart = Math.min(x, 2 * Math.PI - x);
    const normalizedDist = distToStart / Math.PI;
    return -1 / (1 + Math.exp(10 * (normalizedDist - 0.5))) + 1;
}

export class KInfGraph {
    constructor({ n = 50, defaultColor = theme.palette.custom.edgeDefault, redEdges = [], blueEdges = [], circleRadius = 150, ids = [] }) {
        const baseNodeRadius = calculateNodeRadius(n);
        const lineWidth = calculateLineWidth(n);
        let newIds = ids
        console.log("newIds", newIds);
        if (ids.length === 0) {
            newIds = [...Array(n).keys()]
        }
        else {
            console.log("Lenght of ids", ids.length);
        }
        const adjustedCircleRadius = n > 15 ? circleRadius + Math.min(100, n * 3) : circleRadius;
        const nodes = Array.from({ length: n }, (_, i) => {
            const angle = GetAngle2(i / n);
            const radius = GetRadiusFromAngle(angle) * baseNodeRadius;
            return {
                id: newIds[i],
                x: 300 + adjustedCircleRadius * Math.cos(angle),
                y: 300 + adjustedCircleRadius * Math.sin(angle),
                radius: radius,

            }
        });

        let links = createCompleteLinks(nodes, redEdges, blueEdges, defaultColor, lineWidth);

        // Apply opacity and width adjustments specific to KInfGraph
        links = links.map(link => {
            const [id1, id2] = link.edge;
            const nodeI = nodes.find(node => node.id === id1);
            const nodeJ = nodes.find(node => node.id === id2);

            const opacity = Math.min(nodeI.radius, nodeJ.radius) / baseNodeRadius;
            let adjustedLineWidth = link.width;
            let adjustedLineColor = link.color;

            const isSpecialEdge = link.color === theme.palette.custom.edgeRed ||
                link.color === theme.palette.custom.edgeBlue;

            if (isSpecialEdge) {
                adjustedLineWidth = lineWidth * 5;
                adjustedLineColor = lerpColor('rgba(0,0,0,0)', adjustedLineColor, Math.min(opacity * 3, 1));
            } else {
                adjustedLineColor = lerpColor('rgba(0,0,0,0)', adjustedLineColor, opacity);
            }

            return {
                edge: link.edge,
                color: adjustedLineColor,
                width: adjustedLineWidth
            };
        });
        this.nodes = nodes;
        this.links = links;
    }

    colorEdgesFromNode(nodeId, color = theme.palette.custom.edgeDefault) {
        this.links.forEach(link => {
            if (link.edge.includes(nodeId)) {
                link.color = color;
            }
        });
    }
}
