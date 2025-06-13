import theme from "./theme"


import { KnGraph } from "./createGraph";
import { infiniteGraphs } from "./infiniteGraphsData";

const StepsByPage = [
    {
        theoremName: "R(3) = 6",
        theoremNameSlug: "r3-equals-6",
        initialGraph: new KnGraph({ n: 6, defaultColor: theme.palette.custom.edgeDefault }),
        steps: [
            {
                content: 'Proof: Choose any node.',
                highlightedNodes: [0],
                graph: new KnGraph({ n: 6, defaultColor: theme.palette.custom.edgeDefault }),
                redEdges: [],
                blueEdges: [],

            },
            {
                content: 'This node has 5 outgoing edges. By pigeonhole principle, if we color them with red and blue, at least 3 edges must be the same color. WLOG these edges are red.',
                graph: new KnGraph({ n: 6, redEdges: [[0, 1], [0, 2], [0, 3]] }),
                shouldAnimate: true,
                animationDuration: 400,
            },
            {
                content: "Let's take a closer look at the graph formed on these nodes.",
                graph: new KnGraph({ n: 4, redEdges: [[0, 1], [0, 2], [0, 3]] }),
                shouldAnimate: true,
                animationDuration: 1500,
            },
            {
                content: 'For each uncolored edge, coloring this red would lead to a red triangle. Therefore these edges must be blue.',
                graph: new KnGraph({ n: 4, redEdges: [[0, 1], [0, 2], [0, 3]], blueEdges: [[1, 2], [1, 3], [2, 3]] }),
                shouldAnimate: true,
                animationDuration: 400,
            },
            {
                content: 'We have formed a blue triangle! Therefore it is impossible to color the edges of K6 with 2 colors without forming a monochromatic triangle.',
                graph: new KnGraph({ n: 4, redEdges: [[0, 1], [0, 2], [0, 3]], blueEdges: [[1, 2], [1, 3], [2, 3]] }),
            }

        ]
    },
    {
        theoremName: "R(\\aleph_0) \\geq \\aleph_0",
        theoremNameSlug: "r-inf-greater-than-inf",
        initialGraph: infiniteGraphs[0],
        steps: [
            {
                content: "Select any node.",
                graph: infiniteGraphs[0],
                highlightedNodes: [0],
            },
            {
                content: "By infinite pigeonhole principle, at least infinitely many edges leaving this node must be the same color. WLOG these edges are blue.",
                graph: infiniteGraphs[1],
                shouldAnimate: true,
                animationDuration: 500,
                highlightedNodes: [0]
            },
            {
                content: "Let's take a closer look at the blue edges, and drop all the nodes (and edges on these nodes) that are not connected to the selected node by a blue edge. We are still inside a KInf graph.",
                graph: infiniteGraphs[2],
                shouldAnimate: true,
                animationDuration: 4000,
                highlightedNodes: [0]
            },
            {
                content: "Select one of these nodes.",
                graph: infiniteGraphs[2],
                shouldAnimate: true,
                highlightedNodes: [0, 70]
            },
            {
                content: "Let's move it to the center",
                graph: infiniteGraphs[3],
                shouldAnimate: true,
                highlightedNodes: [0, 70, 119]
            },
            {
                content: "By pigeonhole principle once again, at least infinitely many edges leaving this NEW node must be the same color. Let's suppose for now these edges are red.",
                graph: infiniteGraphs[4],
                shouldAnimate: true,
                highlightedNodes: [0, 70]
            },
            {
                content: "Now, Let's keep only the nodes in the graph that are connected to the second selected node by a red edge. We are once again still inside a KInf graph.",
                graph: infiniteGraphs[5],
                shouldAnimate: true,
                highlightedNodes: [0, 70]
            },
            {
                content: "Now we have a infinite Kn, with one node with only outgoing red edges, and one node with only outgoing blue edges. We can continue this process infinitely.",
                graph: infiniteGraphs[5],
                highlightedNodes: [0, 70],
                shouldAnimate: true,
            },
            {
                content: "For example, our next node has infinitely many outgoing blue edges.",
                graph: infiniteGraphs[6],
                shouldAnimate: true,
                highlightedNodes: [0, 70, 18]
            },
            {
                content: "Then for example, our next node has infinitely many outgoing red edges.",
                graph: infiniteGraphs[7],
                shouldAnimate: true,
                highlightedNodes: [0, 70, 18, 30]
            },
            {
                content: "We can continue this process infinitely, and get a new KInf graph at each step, having an additional node with infinitely many outgoing edges of one color.",
                graph: infiniteGraphs[0],
                shouldAnimate: true,
            },
            {
                content: "By applying infinite pigeonhole principle again, there must be infinitely many nodes with infinitely many outgoing edges of the same color. Let's highlight these nodes, and suppose the edges are red.",
                graph: infiniteGraphs[8],
                highlightedNodes: [0, 10, 20, 50, 57, 66, 69],
                shouldAnimate: true,
            },
            {
                content: "If we consider the subgraph on these nodes, every single edge between every node is red, and there are infinitely many nodes. Therefore this subgraph is a monochromatic KInf!",
                graph: infiniteGraphs[9],
                highlightedNodes: [0, 10, 20, 50, 57, 66, 69].concat([0, 10, 20, 50, 57, 66, 69].concat([70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132])),
                shouldAnimate: true,
            }

        ]
    },
    {
        theoremName: "R(3,4) = 9",
        theoremNameSlug: "r3-4-equals-9",
        initialGraph: new KnGraph({ n: 9 }),
        steps: [
            {
                content: "R(3,4) = 9 means that in any coloring of the edges of K9 with 2 colors, there will be either a red triangle or a blue K4. (We choose red as the first color and blue as the second color.)",
                graph: new KnGraph({ n: 9 }),
            },
            {
                content: "Select any node.",
                graph: new KnGraph({ n: 9 }),
                highlightedNodes: [0],
            },
            {
                content: "Suppose this node has at least 4 outgoing red edges.",
                graph: new KnGraph({ n: 9, redEdges: [[0, 1], [0, 3], [0, 4], [0, 5]] }),
                highlightedNodes: [0],
                shouldAnimate: true,
                animationDuration: 300,
            },
            {
                content: "Let's take a look at this subgraph.",
                graph: new KnGraph({ n: 5, redEdges: [[0, 1], [0, 3], [0, 4], [0, 5]], ids: [0, 1, 3, 4, 5] }),
                highlightedNodes: [0],
                shouldAnimate: true,
            },
            {
                content: "If any of these black edges are colored red, we have a red triangle. So we must color them blue.",
                graph: new KnGraph({ n: 5, redEdges: [[0, 1], [0, 3], [0, 4], [0, 5]], blueEdges: [[1, 3], [1, 4], [1, 5], [3, 4], [3, 5], [4, 5]], ids: [0, 1, 3, 4, 5] }),
                highlightedNodes: [0],
                shouldAnimate: true,
            },
            {
                content: "But here we have a blue K4!",
                graph: new KnGraph({ n: 5, redEdges: [[0, 1], [0, 3], [0, 4], [0, 5]], blueEdges: [[1, 3], [1, 4], [1, 5], [3, 4], [3, 5], [4, 5]], ids: [0, 1, 3, 4, 5] }),
                highlightedNodes: [0],

            },
            {
                content: "Let's return to our original graph.",
                graph: new KnGraph({ n: 9 }),
                shouldAnimate: true,
            },
            {
                content: "We saw that for any node, if it has at least 4 outgoing red edges, we can find a blue K4 or red triangle. So we can assume that any node has at most 3 outgoing red edges.",
                graph: new KnGraph({ n: 9 }),
            },
            {
                content: "Now we will show that any nodes has at most 5 outoging blue edges, with a similar argument.",
                graph: new KnGraph({ n: 9 }),
            },
            {
                content: "Select any node, and suppose it has at least 6 outgoing blue edges.",
                graph: new KnGraph({
                    n: 9,
                    blueEdges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]]
                }),
                highlightedNodes: [0],
                shouldAnimate: true,
                animationDuration: 300,
            },
            {
                content: "Let's take a look at this subgraph.",
                graph: new KnGraph({
                    n: 7,
                    blueEdges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
                    ids: [0, 1, 2, 3, 4, 5, 6]
                }),
                highlightedNodes: [0],
                shouldAnimate: true,
            },
            {
                content: "Take a look at these 6 nodes... Look familiar?",
                graph: new KnGraph({
                    n: 7,
                    blueEdges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
                    ids: [0, 1, 2, 3, 4, 5, 6]
                }),
                highlightedNodes: [1, 2, 3, 4, 5, 6],
            },
            {
                content: "Yes! This is K_6! We know that R(3) = 6, so there must be a red or blue triangle in this subgraph.",
                graph: new KnGraph({
                    n: 7,
                    blueEdges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
                    ids: [0, 1, 2, 3, 4, 5, 6]
                }),
                highlightedNodes: [1, 2, 3, 4, 5, 6],
                shouldAnimate: true,
            },
            {
                content: "If there is a red triangle, we have a red triangle in the original graph. ",
                graph: new KnGraph({
                    n: 7,
                    blueEdges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
                    redEdges: [[1, 2], [1, 4], [4, 2]],
                    ids: [0, 1, 2, 3, 4, 5, 6]
                }),
                highlightedNodes: [],
                shouldAnimate: true,
                animationDuration: 300,
            },
            {
                content: "If there is a blue triangle... ",
                graph: new KnGraph({
                    n: 7,
                    blueEdges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [1, 4], [4, 2]],
                    ids: [0, 1, 2, 3, 4, 5, 6]
                }),
                shouldAnimate: true,
            },
            {
                content: "we have now formed a blue K_4!  ",
                graph: new KnGraph({
                    n: 4,
                    blueEdges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [1, 4], [4, 2]],
                    ids: [0, 1, 2, 4]
                }),
                shouldAnimate: true,
            },
            {
                content: "Let's return to our original graph. We have seen that if any node has at least 6 outgoing blue edges, we can find a red triangle or blue K4. So we can assume that any node has at most 5 outgoing blue edges.",
                graph: new KnGraph({ n: 9 }),
                shouldAnimate: true,
            },
            {
                content: "Since every node has 8 outgoing edges, and at most 3 are red, and at most 5 are blue, we can conclude that every node has exactly 3 red edges and 5 blue edges.",
                graph: new KnGraph({ n: 9 }),
            },
            {
                content: "Consider an arbitrary coloring of the edges such that each node has 3 outgoing red edges.",
                graph: new KnGraph({ n: 9, redEdges: [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 6], [2, 7], [3, 8], [6, 8], [4, 7], [8, 5]] }),
                shouldAnimate: true,
                animationDuration: 300,
                highlightedNodes: [7]
            },
            {
                content: "Let's count the number of red edges. Each of the 9 nodes has 3 outgoing red edges, so we count 9 * 3 = 27 red edges. But in this multiplication, each edge is counted twice (once for each endpoint), so there are actually 27 / 2 = 13.5 red edges. This is impossible!",
                graph: new KnGraph({ n: 9, redEdges: [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 6], [2, 7], [3, 8], [6, 8], [4, 7], [8, 5]] }),
                highlightedNodes: [7]
            },
            {
                content: "Finding a non-integer number of edges is a contradiction, hence this red subgraph cannot exist! (Notice I cheated, and the graph displayed does not actually have 3 outgoing red edges for each node)",
                graph: new KnGraph({ n: 9, redEdges: [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 6], [2, 7], [3, 8], [6, 8], [4, 7], [8, 5]] }),
                highlightedNodes: [7]
            },
            {
                content: "Trying to color the edges of K9 red and blue without forming a red triangle or blue K4 always either leads to a red triangle or a blue K4, or leads to a contradiction. Therefore it is impossible! Hence R(3,4) <= 9.",
                graph: new KnGraph({ n: 9 }),
                shouldAnimate: true,
            },
            {
                content: "Now we will show that R(3,4) > 8. We can do this by constructing a coloring of the edges of K8 with two colors such that there is no red triangle or blue K4. Here is such a coloring.",
                graph: new KnGraph({
                    n: 8,
                    blueEdges: [
                        [0, 1], [0, 3], [0, 4], [0, 7],
                        [1, 2], [1, 4], [1, 5], [1, 7],
                        [2, 3], [2, 5], [2, 6], [2, 7],
                        [3, 6], [3, 7],
                        [4, 5], [4, 6],
                        [5, 6]
                    ],
                    redEdges: [
                        [0, 2], [0, 5], [0, 6],
                        [1, 3], [1, 6],
                        [2, 4],
                        [3, 4], [3, 5],
                        [4, 7],
                        [5, 7],
                        [6, 7]
                    ]
                }),
                shouldAnimate: true
            }, {
                content: "And we are done! We have shown that R(3,4) = 9.",
                graph: new KnGraph({
                    n: 8,
                    blueEdges: [
                        [0, 1], [0, 3], [0, 4], [0, 7],
                        [1, 2], [1, 4], [1, 5], [1, 7],
                        [2, 3], [2, 5], [2, 6], [2, 7],
                        [3, 6], [3, 7],
                        [4, 5], [4, 6],
                        [5, 6]
                    ],
                    redEdges: [
                        [0, 2], [0, 5], [0, 6],
                        [1, 3], [1, 6],
                        [2, 4],
                        [3, 4], [3, 5],
                        [4, 7],
                        [5, 7],
                        [6, 7]
                    ]
                }),
                shouldAnimate: true
            },

        ]
    },
    {
        theoremName: "R(4,4) = 18",
        theoremNameSlug: "r4-4-equals-18",
        initialGraph: new KnGraph({ n: 18 }),
        steps: [
            {
                content: "R(4,4) = 18 means that in any coloring of the edges of K18 with 2 colors, there will be either a red K4 or a blue K4.",
                graph: new KnGraph({ n: 18 }),
                shouldAnimate: false,
            },
            {

                content: "Select any node.",
                graph: new KnGraph({ n: 18 }),
                highlightedNodes: [0],
                shouldAnimate: false,
            },
            {
                content: "Since there are 17 edges leaving this node, by pigeonhole principle, at least 9 of them must be the same color. WLOG these edges are red.",
                graph: new KnGraph({ n: 18, redEdges: [[0, 6], [0, 7], [0, 3], [0, 4], [0, 10], [0, 14], [0, 15], [0, 8], [0, 9]] }),
                highlightedNodes: [0],
                shouldAnimate: true,
                animationDuration: 300,
            },
            {
                content: "Let's take a look at this subgraph.",
                graph: new KnGraph({ n: 10, redEdges: [[0, 6], [0, 7], [0, 3], [0, 4], [0, 10], [0, 14], [0, 15], [0, 8], [0, 9]], ids: [0, 3, 4, 6, 7, 8, 9, 10, 14, 15] }),
                shouldAnimate: true,
                animationDuration: 2000,
            },
            {
                content: "Take a look at these 9 nodes.",
                graph: new KnGraph({ n: 10, redEdges: [[0, 6], [0, 7], [0, 3], [0, 4], [0, 10], [0, 14], [0, 15], [0, 8], [0, 9]], ids: [0, 3, 4, 6, 7, 8, 9, 10, 14, 15] }),
                shouldAnimate: true,
                highlightedNodes: [3, 4, 6, 7, 8, 9, 10, 14, 15],
                animationDuration: 2000,
            },
            {
                content: "Notice anything? Yes! This is K_9! We know that R(3,4) = 9, so there must be a red triangle or a blue K4 in this subgraph.",
                graph: new KnGraph({ n: 10, redEdges: [[0, 6], [0, 7], [0, 3], [0, 4], [0, 10], [0, 14], [0, 15], [0, 8], [0, 9]], ids: [0, 3, 4, 6, 7, 8, 9, 10, 14, 15] }),
                shouldAnimate: true,
                highlightedNodes: [3, 4, 6, 7, 8, 9, 10, 14, 15],
                animationDuration: 2000,
            },
            {
                content: "If there is a blue K4, we are done, and if there is a red triangle, well...",
                graph: new KnGraph({ n: 10, redEdges: [[0, 6], [0, 7], [0, 3], [0, 4], [0, 10], [0, 14], [0, 15], [0, 8], [0, 9], [8, 15], [9, 15], [8, 9]], ids: [0, 3, 4, 6, 7, 8, 9, 10, 14, 15] }),
                shouldAnimate: true,
                highlightedNodes: [8, 9, 15],
                animationDuration: 2000,
            },
            {
                content: "We have a red K4!",
                graph: new KnGraph({ n: 4, redEdges: [[0, 9], [0, 8], [0, 15], [8, 15], [9, 15], [8, 9]], ids: [0, 8, 9, 15] }),
                shouldAnimate: true,
                animationDuration: 2000,
            },
        ]
    }]


export default StepsByPage;