// import { colorEdges, setHighlightedNode } from './components/learn/TheoremPage';
import theme from "./theme"


import { KnGraph, KInfGraph, KInfGraphWithKeepIds } from "./createGraph";

// infinite graph declarations
const graph1 = new KInfGraph({ n: 70 })
const graph2 = new KInfGraph({ n: 70, blueEdges: [[0, 7], [0, 12], [0, 15], [0, 18], [0, 21], [0, 24], [0, 27], [0, 30], [0, 32], [0, 36], [0, 39], [0, 41], [0, 44], [0, 47], [0, 49], [0, 52], [0, 54], [0, 56], [0, 58], [0, 62]] });
const graph2b = new KInfGraph({
    n: 70, blueEdges: [[0, 7], [0, 12], [0, 15], [0, 18], [0, 21], [0, 24], [0, 27], [0, 30], [0, 32], [0, 36], [0, 39], [0, 41], [0, 44], [0, 47], [0, 49], [0, 52], [0, 54], [0, 56], [0, 58], [0, 62]],
    ids: [0, 7, 12, 15, 18, 21, 24, 27, 30, 32, 36,].concat(
        [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118]
    ).concat([39, 41, 44, 47, 49, 52, 54, 56, 58, 62,])
})
let graph3 = graph2b;
graph3.colorEdgesFromNode(0, theme.palette.custom.edgeBlue);



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
        initialGraph: new KInfGraph({ n: 70 }),
        steps: [
            {
                content: "Select any node.",
                graph: graph1,
                highlightedNodes: [0],
                shouldAnimate: true,
            },
            {
                content: "By infinite pigeonhole principle, at least infinitely many edges must be the same color. WLOG these edges are blue.",
                graph: graph2,
                shouldAnimate: true,
                highlightedNodes: [0]
            },
            {
                content: "Lets take a closer look at the blue edges.",
                graph: graph3,
                shouldAnimate: true,
                highlightedNodes: [0]
            },
            {
                content: "Select one of these nodes.",
                graph: graph3,
                shouldAnimate: true,
                highlightedNodes: [0, 70]
            },


        ]
    }
]





export default StepsByPage;