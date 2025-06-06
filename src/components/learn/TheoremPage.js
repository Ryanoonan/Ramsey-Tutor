import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, AppBar, Toolbar, useTheme } from '@mui/material';
import Graph from '../shared/Graph';

function TheoremPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [currentStepInPage, setCurrentStepInPage] = useState(0);
    const [showProof, setShowProof] = useState(false);
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [highlightedNode, setHighlightedNode] = useState(null);
    const [dimensions, setDimensions] = useState({
        width: 600,
        height: 600
    });
    const [nextStepIndex, setNextStepIndex] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState([]);
    const maxStepsToShow = 3;

    const steps = [
        {
            content: 'Proof: Choose any node.',
            action: () => {
                setHighlightedNode(nodes[0].id);
            }
        },
        {
            content: 'This node has 5 outgoing edges. By pigeonhole principle, if we color them with red and blue, at least 3 edges must be the same color. WLOG these edges are red.',
            action: () => {
                colorEdges([[0, 1], [0, 2], [0, 3]], 'red');
            }
        },
        {
            content: 'For each uncolored edge, coloring this red would lead to a red triangle. Therefore these edges must be blue.',
            action: () => {
                colorEdges([[1, 2], [1, 3], [2, 3]], 'blue');
            }
        },
        {
            content: 'We have formed a blue triangle! Therefore it is impossible to color the edges of K6 with 2 colors without forming a monochromatic triangle.',
            action: () => {
                // Final state already shown
            }
        }

    ];

    useEffect(() => {
        const updateDimensions = () => {
            const graphContainer = document.getElementById('learn-graph-container');
            if (graphContainer) {
                setDimensions({
                    width: graphContainer.offsetWidth,
                    height: graphContainer.offsetHeight
                });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions(); // Initial dimensions

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const initializeK6 = () => {
        // Use theme color instead of CSS variable
        const defaultColor = theme.palette.custom.edgeDefault;

        // Create 6 nodes in a circular arrangement
        const newNodes = Array.from({ length: 6 }, (_, i) => ({
            id: i,
            x: 300 + 150 * Math.cos((i * 2 * Math.PI) / 6),
            y: 300 + 150 * Math.sin((i * 2 * Math.PI) / 6),
        }));

        // Create all possible edges
        const newLinks = [];
        for (let i = 0; i < 6; i++) {
            for (let j = i + 1; j < 6; j++) {
                newLinks.push({ source: i, target: j, color: defaultColor });
            }
        }

        setNodes(newNodes);
        setLinks(newLinks);
    };

    const areEdgesEqual = (edge1, edge2) => {
        return (edge1[0] === edge2[0] && edge1[1] === edge2[1]) ||
            (edge1[0] === edge2[1] && edge1[1] === edge2[0]);
    };

    const colorEdges = (edgePairs, color) => {
        console.log('Coloring edges:', edgePairs, 'with color:', color);
        setLinks(links => links.map(link => { //TODO: Change the type of link to just be a list of 2 elements
            // Convert link to comparable format
            const currentEdge = [link.source, link.target];

            // Check if this edge should be colored
            const shouldColor = edgePairs.some(edgePair => areEdgesEqual(edgePair, currentEdge));

            if (shouldColor) {
                return {
                    ...link,
                    // Use theme color instead of CSS variable
                    color: theme.palette.custom[`edge${color === 'red' ? 'Red' : 'Blue'}`]
                };
            }
            console.log("not coloring link", link)
            return link;
        }));
    };

    useEffect(() => {
        initializeK6();
    }, []);

    const handleNext = () => {
        if (nextStepIndex >= steps.length) return;

        const newItem = steps[nextStepIndex];
        if (newItem.action) {
            newItem.action();
        }

        if (visibleSteps.length < maxStepsToShow) {
            setVisibleSteps(v => [...v, newItem]);
        } else {
            setVisibleSteps([newItem]);
        }
        setNextStepIndex(i => i + 1);
    };

    const handlePrevious = () => {
        if (nextStepIndex <= 1) return;

        const prevIndex = nextStepIndex - 2;
        const prevItem = steps[prevIndex];

        if (prevItem.action) {
            prevItem.action();
        }

        if (visibleSteps.length > 1) {
            setVisibleSteps(v => v.slice(0, -1));
        } else {
            setVisibleSteps(steps.slice(nextStepIndex - 1 - maxStepsToShow, nextStepIndex - 1));
        }

        setNextStepIndex(i => i - 1);
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" sx={{ bgcolor: theme.palette.background.paper }}>
                <Toolbar>
                    <Button color="inherit" onClick={() => navigate('/')} sx={{ mr: 2 }}>
                        Back to Menu
                    </Button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Learn Mode: R(3) = 6
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{
                flex: 1,
                display: 'flex',
                gap: 2,
                p: 2,
                backgroundColor: theme.palette.background.default
            }}>
                <Box id="learn-graph-container" sx={{
                    flex: 1,
                    minHeight: '600px'
                }}>
                    <Graph
                        nodes={nodes}
                        links={links}
                        width={dimensions.width}
                        height={dimensions.height}
                        linkColor={theme.palette.custom.edgeDefault}
                        highlightedNode={highlightedNode}
                    />
                </Box>

                <Paper sx={{
                    flex: 1,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: 'none',
                    borderRadius: 1
                }}>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: 'left',
                                fontSize: '2rem',
                                fontFamily: 'Helvetica',
                                mb: 2
                            }}
                        >
                            Theorem: It is impossible to color the edges of K₆ red and blue without forming a monochromatic triangle.
                        </Typography>

                        {!showProof ? (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setShowProof(true);
                                    const firstStep = steps[0];
                                    if (firstStep.action) {
                                        firstStep.action();
                                    }
                                    setVisibleSteps([firstStep]);
                                    setNextStepIndex(1);
                                }}
                                sx={{ alignSelf: 'flex-start' }}
                            >
                                Show Proof
                            </Button>
                        ) : (
                            <>
                                {visibleSteps.map((step, idx) => (
                                    <Typography
                                        key={idx}
                                        variant="body1"
                                        sx={{
                                            textAlign: 'left',
                                            fontSize: '1.8rem',
                                            fontFamily: 'Helvetica',
                                            mb: idx < visibleSteps.length - 1 ? 2 : 0
                                        }}
                                    >
                                        {step.content}
                                    </Typography>
                                ))}
                            </>
                        )}
                    </Box>

                    {showProof && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button
                                onClick={handlePrevious}
                                disabled={nextStepIndex === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                disabled={nextStepIndex >= steps.length}
                            >
                                Next
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Box >
        </Box >
    );
}

export default TheoremPage;

