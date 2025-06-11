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

            const isRedEdge = redEdges.some(edge => areEdgesEqual(edge, [id1, id2]));
            const isBlueEdge = blueEdges.some(edge => areEdgesEqual(edge, [id1, id2]));

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


export function IdxRatioToAngle(x) {
    if (x < 0 || x > 1) {
        throw new Error("PosRatioToAngle: x must be in the range [0, 1]");
    }
    let y;
    if (x <= 0.5) {
        if (x < 0.184) {
            y = Math.PI * (0.1836278408721 - 0.7998964082831 * x) / 0.1836278408721;
        } else {
            y = Math.PI * Math.pow(x - 0.5, 4) * 20;
        }
    } else {
        return Math.PI * 2 - IdxRatioToAngle(-x + 1)
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
            const angle = IdxRatioToAngle(i / n);
            const radius = GetRadiusFromAngle(angle) * baseNodeRadius;
            return {
                id: newIds[i],
                x: 300 + adjustedCircleRadius * Math.cos(angle),
                y: 300 + adjustedCircleRadius * Math.sin(angle),
                radius: radius,

            }
        });
        this.nodes = nodes;
        this.n = n;
        this.defaultColor = defaultColor;
        this.redEdges = redEdges;
        this.blueEdges = blueEdges;
        this.circleRadius = circleRadius;
        this.ids = newIds;
        this.links = this.getNewLinks();
    }

    colorEdgesFromNode(nodeId, color = theme.palette.custom.edgeDefault) {
        // Remove any existing edges with this node from both arrays
        this.redEdges = this.redEdges.filter(edge =>
            !(edge[0] === nodeId || edge[1] === nodeId));
        this.blueEdges = this.blueEdges.filter(edge =>
            !(edge[0] === nodeId || edge[1] === nodeId));

        // Add new edges to the appropriate array based on color
        if (color === theme.palette.custom.edgeRed) {
            this.nodes.forEach(node => {
                if (node.id !== nodeId) {
                    this.redEdges.push([nodeId, node.id]);
                }
            });
        } else if (color === theme.palette.custom.edgeBlue) {
            this.nodes.forEach(node => {
                if (node.id !== nodeId) {
                    this.blueEdges.push([nodeId, node.id]);
                }
            });
        }

        // Regenerate links
        this.links = this.getNewLinks();
    }
    dropNodeWithId(idToDrop, idToReplaceWith) {
        const nodeToDrop = this.nodes.find(node => node.id === idToDrop);
        console.log("Length of nodes before drop:", this.nodes.length);
        this.nodes = this.nodes.filter(node => node.id !== idToDrop)
        console.log("Length of nodes after drop:", this.nodes.length);
        this.nodes.push({
            id: idToReplaceWith,
            x: nodeToDrop.x,
            y: nodeToDrop.y,
            radius: nodeToDrop.radius
        });
    }

    clone() {
        const newGraph = new KInfGraph({ n: this.n, defaultColor: this.defaultColor, redEdges: this.redEdges, blueEdges: this.blueEdges, circleRadius: this.circleRadius, ids: structuredClone(this.ids) });
        newGraph.nodes = structuredClone(this.nodes);
        newGraph.links = structuredClone(this.links);
        newGraph.ids = structuredClone(this.ids);
        return newGraph;
    }

    addNode(node) {
        if (!this.nodes.some(n => n.id === node.id)) {
            this.nodes.push(node);
            this.links = createCompleteLinks(this.nodes, this.redEdges, this.blueEdges, this.defaultColor, calculateLineWidth(this.n));
        }
        else {
            throw new Error(`Node with id ${node.id} already exists in the graph.`);
        }
    }

    getNewLinks() {
        const baseNodeRadius = calculateNodeRadius(this.n);
        const lineWidth = calculateLineWidth(this.n);
        const links = createCompleteLinks(this.nodes, this.redEdges, this.blueEdges, this.defaultColor, calculateLineWidth(this.n));
        // Apply opacity and width adjustments specific to KInfGraph
        return links.map(link => {
            const [id1, id2] = link.edge;
            const nodeI = this.nodes.find(node => node.id === id1);
            const nodeJ = this.nodes.find(node => node.id === id2);

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
    }

    colorEdges(edges = [], color = theme.palette.custom.edgeDefault) {
        edges.forEach(edge => {
            const [id1, id2] = edge;

            this.redEdges = this.redEdges.filter(e => !areEdgesEqual(e, edge));
            this.blueEdges = this.blueEdges.filter(e => !areEdgesEqual(e, edge));

            if (color === theme.palette.custom.edgeRed) {
                this.redEdges.push([id1, id2]);
            } else if (color === theme.palette.custom.edgeBlue) {
                this.blueEdges.push([id1, id2]);
            }
        });
        this.links = this.getNewLinks();
    }
}



function areEdgesEqual(edge1, edge2) {
    return (edge1[0] === edge2[0] && edge1[1] === edge2[1]) || (edge1[0] === edge2[1] && edge1[1] === edge2[0]);
}
