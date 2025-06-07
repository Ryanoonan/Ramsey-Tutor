// import { colorEdges, setHighlightedNode } from './components/learn/TheoremPage';



import { KnGraph } from "./createGraph";

const StepsByPage = [
    {
        theoremName: "R(6) = 3",
        initialGraph: KnGraph(6, "black"),
        steps: [
            {
                content: 'Proof: Choose any node.',
                highlightedNodes: [0],
                redEdges: [],
                blueEdges: [],
            },
            {
                content: 'This node has 5 outgoing edges. By pigeonhole principle, if we color them with red and blue, at least 3 edges must be the same color. WLOG these edges are red.',
                redEdges: [[0, 1], [0, 2], [0, 3]],
            },
            {
                content: 'For each uncolored edge, coloring this red would lead to a red triangle. Therefore these edges must be blue.',
                blueEdges: [[1, 2], [1, 3], [2, 3]],
            },
            {
                content: 'We have formed a blue triangle! Therefore it is impossible to color the edges of K6 with 2 colors without forming a monochromatic triangle.',
            }

        ]
    }
]

export default StepsByPage;