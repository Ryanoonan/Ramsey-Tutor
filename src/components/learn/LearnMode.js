import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, AppBar, Toolbar } from '@mui/material';
import Graph from '../shared/Graph';

function LearnMode() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(-1);
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

    const pages = [
        {
            steps: [
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
                }
            ]
        },
        {
            steps: [
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
            ]
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
        // Resolve default edge color from CSS custom property
        const css = getComputedStyle(document.documentElement);
        const defaultColor = css.getPropertyValue('--color-edge-default').trim();
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
                    color: getComputedStyle(document.documentElement)
                        .getPropertyValue(`--color-edge-${color}`).trim()
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
        const currentPageSteps = pages[currentPage].steps;

        if (currentStepInPage < currentPageSteps.length - 1) {
            // Move to next step in current page
            const nextStep = currentPageSteps[currentStepInPage + 1];
            if (nextStep.action) {
                nextStep.action();
            }
            setCurrentStepInPage(currentStepInPage + 1);
        } else if (currentPage < pages.length - 1) {
            // Move to first step of next page
            const nextPageFirstStep = pages[currentPage + 1].steps[0];
            if (nextPageFirstStep.action) {
                nextPageFirstStep.action();
            }
            setCurrentPage(currentPage + 1);
            setCurrentStepInPage(0);
        }
    };

    const handlePrevious = () => {
        if (currentStepInPage > 0) {
            // Move to previous step in current page
            const prevStep = pages[currentPage].steps[currentStepInPage - 1];
            if (prevStep.action) {
                prevStep.action();
            }
            setCurrentStepInPage(currentStepInPage - 1);
        } else if (currentPage > 0) {
            // Move to last step of previous page
            const prevPage = pages[currentPage - 1];
            const lastStepIndex = prevPage.steps.length - 1;
            const lastStep = prevPage.steps[lastStepIndex];
            if (lastStep.action) {
                lastStep.action();
            }
            setCurrentPage(currentPage - 1);
            setCurrentStepInPage(lastStepIndex);
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" sx={{ bgcolor: 'var(--color-paper)' }}>
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
                backgroundColor: 'var(--color-background)'
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
                        linkColor="var(--color-edge-default)"
                        highlightedNode={highlightedNode}
                    />
                </Box>

                <Paper sx={{
                    flex: 1,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    bgcolor: 'var(--color-paper)',
                    color: 'var(--color-text-primary)',
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
                                    const firstStep = pages[0].steps[0];
                                    if (firstStep.action) {
                                        firstStep.action();
                                    }
                                }}
                                sx={{ alignSelf: 'flex-start' }}
                            >
                                Show Proof
                            </Button>
                        ) : (
                            <>
                                {pages[currentPage].steps
                                    .slice(0, currentStepInPage + 1)
                                    .map((step, idx) => (
                                        <Typography
                                            key={idx}
                                            variant="body1"
                                            sx={{
                                                textAlign: 'left',
                                                fontSize: '1.8rem',
                                                fontFamily: 'Helvetica',
                                                mb: idx < currentStepInPage ? 2 : 0
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
                                disabled={currentPage === 0 && currentStepInPage === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                disabled={currentPage === pages.length - 1 && currentStepInPage === pages[currentPage].steps.length - 1}
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

export default LearnMode;

