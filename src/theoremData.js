// import { colorEdges, setHighlightedNode } from './components/learn/TheoremPage';



import { KnGraph } from "./createGraph";

const StepsByPage = [
    {
        theoremName: "R(3) = 6",
        theoremNameSlug: "r3-equals-6",
        initialGraph: KnGraph(6, "black"),
        steps: [
            {
                content: 'Proof: Choose any node.',
                highlightedNodes: [0],
                graph: KnGraph({ n: 6, defaultColor: "black" }),
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
        initialGraph: KnGraph(10, "black"),
        steps: [
            {
                content: 'Here we color a single edge in the K10 graph.',
                graph: KnGraph({ n: 10, redEdges: [[0, 1]] }),
                highlightedNodes: []
            }
        ]
    }
]

export default StepsByPage;