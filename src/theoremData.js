// import { colorEdges, setHighlightedNode } from './components/learn/TheoremPage';
import theme from "./theme"


import { KnGraph, KInfGraph, KInfGraphWithKeepIds } from "./createGraph";

const StepsByPage = [
    {
        theoremName: "R(3) = 6",
        theoremNameSlug: "r3-equals-6",
        initialGraph: KnGraph({ n: 6, defaultColor: theme.palette.custom.edgeDefault }),
        steps: [
            {
                content: 'Proof: Choose any node.',
                highlightedNodes: [0],
                graph: KnGraph({ n: 6, defaultColor: theme.palette.custom.edgeDefault }),
                redEdges: [],
                blueEdges: [],

            },
            {
                content: 'This node has 5 outgoing edges. By pigeonhole principle, if we color them with red and blue, at least 3 edges must be the same color. WLOG these edges are red.',
                graph: KnGraph({ n: 6, redEdges: [[0, 1], [0, 2], [0, 3]] }),
            },
            {
                content: 'For each uncolored edge, coloring this red would lead to a red triangle. Therefore these edges must be blue.',
                graph: KnGraph({ n: 6, redEdges: [[0, 1], [0, 2], [0, 3]], blueEdges: [[1, 2], [1, 3], [2, 3]] }),

            },
            {
                content: 'Duplicate step test',
                graph: KnGraph({ n: 6, redEdges: [[0, 1], [0, 2], [0, 3]], blueEdges: [[1, 2], [1, 3], [2, 3]] }),
                shouldAnimate: true,

            },
            {
                content: "Empty",
                graph: KnGraph({ n: 4, redEdges: [[0, 1], [0, 2], [0, 3]], blueEdges: [[1, 2], [1, 3], [2, 3]] }),
                shouldAnimate: true,
            },
            {
                content: 'We have formed a blue triangle! Therefore it is impossible to color the edges of K6 with 2 colors without forming a monochromatic triangle.',
                graph: KnGraph({ n: 4 }),
            }

        ]
    },
    {
        theoremName: "K10 Single Edge",
        theoremNameSlug: "k10-single-edge",
        initialGraph: KnGraph({ n: 10, defaultColor: theme.palette.custom.edgeDefault }),
        steps: [
            {
                content: 'Here we color a single edge in the K10 graph.',
                graph: KnGraph({ n: 10, redEdges: [[0, 1]] }),
                highlightedNodes: []
            },
            {
                content: 'Looking at a K4 subgraph...',
                graph: KnGraph({ n: 16, redEdges: [[0, 1]], blueEdges: [] }),
                highlightedNodes: [0, 1, 2, 3],
                shouldAnimate: true,
            },
            {
                content: 'Now examining a K6 subgraph...',
                graph: KnGraph({ n: 4, redEdges: [[0, 1]], blueEdges: [] }),
                highlightedNodes: [0, 1, 2, 3, 4, 5],
                shouldAnimate: true,
            },
            {
                content: 'Looking at a different K5 subgraph...',
                graph: KnGraph({ n: 24, redEdges: [[0, 1]], blueEdges: [[1, 2], [2, 3]] }),
                highlightedNodes: [0, 1, 2, 3, 4],
                shouldAnimate: true,
            },
            {
                content: 'Finally examining a K8 subgraph...',
                graph: KnGraph({ n: 8, redEdges: [[0, 1]], blueEdges: [[1, 2], [2, 3], [3, 4]] }),
                highlightedNodes: [0, 1, 2, 3, 4, 5, 6, 7],
                shouldAnimate: true,
            }
        ]
    }, {
        theoremName: "Infinite complete graph test",
        theoremNameSlug: "infinite-complete-graph-test",
        initialGraph: KInfGraph({ n: 70 }),
        steps: [
            {
                content: "Select any node.",
                graph: KInfGraph({ n: 70 }),
                highlightedNodes: [35]
            },
            {
                content: "By infinite pigeonhole principle, at least infinitely many edges must be the same color. WLOG these edges are blue.",
                graph: KInfGraph({ n: 70, blueEdges: [[35, 7], [35, 12], [35, 15], [35, 18], [35, 21], [35, 24], [35, 27], [35, 30], [35, 32], [35, 36], [35, 39], [35, 41], [35, 44], [35, 47], [35, 49], [35, 52], [35, 54], [35, 56], [35, 58], [35, 62]] }),
                shouldAnimate: true,
                highlightedNodes: [35]
            },

            {
                content: "Lets take a closer look at the blue edges. We see our original node has infinitely many neighbors connected to it by a blue edge.",
                graph: KInfGraphWithKeepIds({
                    originalGraph: KInfGraph({ n: 70 }),
                    n: 70,
                    blueEdges: [[35, 7], [35, 12], [35, 15], [35, 18], [35, 21], [35, 24], [35, 27], [35, 30], [35, 32], [35, 36], [35, 39], [35, 41], [35, 44], [35, 47], [35, 49], [35, 52], [35, 54], [35, 56], [35, 58], [35, 62]],
                    idsToKeep: [7, 12, 15, 18, 21, 24, 27, 30, 32, 35, 36, 39, 41, 44, 47, 49, 52, 54, 56, 58, 62],
                    defaultColor: theme.palette.custom.edgeDefault,
                    centerNodeId: 35
                }),
                shouldAnimate: true,
                highlightedNodes: [35]
            },
            {
                content: "Choose any of these nodes.",
                graph: KInfGraphWithKeepIds({
                    originalGraph: KInfGraph({ n: 70 }),
                    n: 70,
                    blueEdges: [[35, 7], [35, 12], [35, 15], [35, 18], [35, 21], [35, 24], [35, 27], [35, 30], [35, 32], [35, 36], [35, 39], [35, 41], [35, 44], [35, 47], [35, 49], [35, 52], [35, 54], [35, 56], [35, 58], [35, 62]],
                    idsToKeep: [7, 12, 15, 18, 21, 24, 27, 30, 32, 35, 36, 39, 41, 44, 47, 49, 52, 54, 56, 58, 62],
                    defaultColor: theme.palette.custom.edgeDefault,
                    centerNodeId: 35
                }),
                shouldAnimate: true,
                highlightedNodes: [35, 12]
            },
            {
                content: "Lets move this node to the center.",
                graph: KInfGraphWithKeepIds({
                    originalGraph: KInfGraphWithKeepIds({
                        originalGraph: KInfGraph({ n: 70 }),
                        n: 70,
                        blueEdges: [[35, 7], [35, 12], [35, 15], [35, 18], [35, 21], [35, 24], [35, 27], [35, 30], [35, 32], [35, 36], [35, 39], [35, 41], [35, 44], [35, 47], [35, 49], [35, 52], [35, 54], [35, 56], [35, 58], [35, 62]],
                        idsToKeep: [7, 12, 15, 18, 21, 24, 27, 30, 32, 35, 36, 39, 41, 44, 47, 49, 52, 54, 56, 58, 62],
                        defaultColor: theme.palette.custom.edgeDefault,
                        centerNodeId: 35
                    }),
                    n: 70,
                    idsToDrop: [12],
                    defaultColor: theme.palette.custom.edgeDefault,
                    centerNodeId: 35
                }),
                shouldAnimate: true,
                highlightedNodes: [35]
            },
        ]
    }
]


export default StepsByPage;