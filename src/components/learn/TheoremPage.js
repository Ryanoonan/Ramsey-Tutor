import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, useTheme } from '@mui/material';
import Graph from '../shared/Graph';
import StepsByPage from '../../theoremData';
import { useParams } from 'react-router-dom'
import AppBar from '../shared/AppBar';
import { InlineMath } from 'react-katex';
import { KInfGraph } from '../../createGraph';

function TheoremPage() {
    const { slug } = useParams();
    const theme = useTheme();
    const [showProof, setShowProof] = useState(false);
    const [graph, setGraph] = useState({ nodes: [], links: [] });
    const [highlightedNodes, setHighlightedNodes] = useState(null);
    const [dimensions, setDimensions] = useState({
        width: 600,
        height: 600
    });
    const [nextStepIndex, setNextStepIndex] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const maxStepsToShow = 3;

    const currentTheoremData = StepsByPage.filter(item => item.theoremNameSlug === slug)[0] || StepsByPage[0];

    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [animationDuration, setAnimationDuration] = useState(1000);

    const executeStepAction = (step) => {
        if (step.graph) {
            const graphData = step.graph;
            const graphClass = graphData.constructor;
            const params = {
                n: graphData.nodes.length,
                defaultColor: graphData.defaultColor || theme.palette.custom.edgeDefault,
                redEdges: graphData.redEdges || [],
                blueEdges: graphData.blueEdges || [],
                circleRadius: graphData.circleRadius || 150,
                ids: graphData.ids || graphData.nodes.map(n => n.id),
                width: dimensions.width,
                height: dimensions.height
            };

            let newGraph;
            if (graphData instanceof KInfGraph) {
                newGraph = graphData.clone();
            } else {
                newGraph = new graphClass(params);
            }
            newGraph.width = dimensions.width;
            newGraph.height = dimensions.height;

            setGraph({
                nodes: newGraph.nodes,
                links: newGraph.links
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
        shouldAnimate: step.shouldAnimate || false,
        animationDuration: step.animationDuration || 1000,
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

    useEffect(() => {
        const initializeGraph = () => {
            const graphData = currentTheoremData.initialGraph;
            const graphClass = graphData.constructor;

            const params = {
                n: graphData.nodes.length,
                defaultColor: graphData.defaultColor || theme.palette.custom.edgeDefault,
                redEdges: graphData.redEdges || [],
                blueEdges: graphData.blueEdges || [],
                circleRadius: graphData.circleRadius || 150,
                ids: graphData.ids || graphData.nodes.map(n => n.id),
                width: dimensions.width,
                height: dimensions.height
            };
            let newGraph;
            if (graphClass.name === 'KInfGraph') {
                newGraph = graphData.clone();
            } else {
                newGraph = new graphClass(params);
            }
            newGraph.width = dimensions.width;
            newGraph.height = dimensions.height;

            setGraph({
                nodes: newGraph.nodes,
                links: newGraph.links
            });
        };

        initializeGraph();
    }, [currentTheoremData.initialGraph, dimensions, theme.palette.custom.edgeDefault]);

    const handleNext = () => {
        if (nextStepIndex >= steps.length) return;

        if (isAnimating) return;

        const newItem = steps[nextStepIndex];

        setShouldAnimate(newItem.shouldAnimate || false);
        setAnimationDuration(newItem.animationDuration || 1000);

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

        // If we're still animating, don't allow the action
        if (isAnimating) return;

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

    // Effect to ensure animation state is reset when component unmounts
    useEffect(() => {
        return () => {
            setIsAnimating(false);
        };
    }, []);

    // Log animation state changes for debugging
    useEffect(() => {
    }, [isAnimating]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            overflow: 'hidden'
        }}>
            <AppBar returnPath="/learnmenu" titleText={currentTheoremData.theoremName} formatMath={true} />
            <Box sx={{ height: '2vh' }} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1
            }}>
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: '2vh',
                    p: '2vh',
                    backgroundColor: theme.palette.background.default,
                    overflow: 'auto'
                }}>
                    <Box id="learn-graph-container" sx={{
                        flex: 1,
                        height: '80vh',
                        width: '45vw',
                    }}>
                        <Graph
                            nodes={graph.nodes}
                            links={graph.links}
                            width={dimensions.width}
                            height={dimensions.height}
                            linkColor={theme.palette.custom.edgeDefault}
                            highlightedNodes={highlightedNodes}
                            shouldAnimate={shouldAnimate}
                            animationDuration={animationDuration}
                            onAnimationStateChange={setIsAnimating}
                        />
                    </Box>

                    <Paper sx={{
                        flex: 1,
                        p: '2vh',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2vh',
                        overflow: 'auto',
                        maxHeight: '90vh',
                        minWidth: '45vw',
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        boxShadow: 'none',
                        borderRadius: 1
                    }}>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    textAlign: 'left',
                                    fontSize: '3vh',
                                    fontFamily: 'Helvetica',
                                    mb: '2vh'
                                }}
                            >
                                <InlineMath>{currentTheoremData.theoremName}</InlineMath>
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
                                                fontSize: '1.4rem',
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
                                    variant="contained"
                                    onClick={handlePrevious}
                                    disabled={nextStepIndex === 1 || isAnimating}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    disabled={nextStepIndex >= steps.length || isAnimating}
                                >
                                    Next
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}


export default TheoremPage;

