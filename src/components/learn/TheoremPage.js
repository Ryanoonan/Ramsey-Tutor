import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, AppBar, Toolbar, useTheme } from '@mui/material';
import Graph from '../shared/Graph';
import StepsByPage from '../../theoremData';
import { useParams } from 'react-router-dom'

function TheoremPage() {
    const { slug } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const [showProof, setShowProof] = useState(false);
    const [graph, setGraph] = useState({ nodes: [], links: [] });
    const [highlightedNodes, setHighlightedNodes] = useState(null);
    const [dimensions, setDimensions] = useState({
        width: 600,
        height: 600
    });
    const [nextStepIndex, setNextStepIndex] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState([]);
    const maxStepsToShow = 3;

    const currentTheoremData = StepsByPage.filter(item => item.theoremNameSlug === slug)[0] || StepsByPage[0];

    const [shouldAnimate, setShouldAnimate] = useState(false);

    const executeStepAction = (step) => {
        if (step.graph) {
            const [nodes, links] = step.graph;
            setGraph({
                nodes: nodes,
                links: links
            });
        }

        if (step.highlightedNodes && step.highlightedNodes.length > 0) {
            setHighlightedNodes(step.highlightedNodes);
        } else {
            setHighlightedNodes(null);
        }
    };

    const steps = currentTheoremData.steps.map(step => ({
        content: step.content,
        action: () => executeStepAction(step),
        graph: step.graph,
        highlightedNodes: step.highlightedNodes,
        newSubGraphNodes: step.newSubGraphNodes,
        shouldAnimate: step.shouldAnimate || false
    }));

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

    const initializeGraph = () => {
        const [initNodes, initLinks] = currentTheoremData.initialGraph;
        setGraph({
            nodes: initNodes,
            links: initLinks
        });
    };

    useEffect(() => {
        initializeGraph();
    }, []);

    const handleNext = () => {
        if (nextStepIndex >= steps.length) return;

        const newItem = steps[nextStepIndex];

        setShouldAnimate(newItem.shouldAnimate || false);

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
        const currentItem = steps[nextStepIndex - 1];

        // When going backward, use the current step's shouldAnimate property
        setShouldAnimate(currentItem.shouldAnimate || false);

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
                        {currentTheoremData.theoremName}
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
                        nodes={graph.nodes}
                        links={graph.links}
                        width={dimensions.width}
                        height={dimensions.height}
                        linkColor={theme.palette.custom.edgeDefault}
                        highlightedNodes={highlightedNodes}
                        shouldAnimate={shouldAnimate}
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
                            {currentTheoremData.theoremName}
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

