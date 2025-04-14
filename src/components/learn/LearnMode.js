import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Stepper, Step, StepLabel, Paper, AppBar, Toolbar } from '@mui/material';
import Graph from '../shared/Graph';

function LearnMode() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [dimensions, setDimensions] = useState({
        width: 600,
        height: 600
    });

    const steps = [
        {
            label: 'Complete Graph K6',
            description: 'We start with a complete graph on 6 vertices (K6).',
            action: () => initializeK6(),
        },
        {
            label: 'Two-Coloring Challenge',
            description: 'We will try to color the edges with two colors (red and blue) without creating a monochromatic triangle.',
        },
        {
            label: 'First Triangle',
            description: 'Consider vertices 1, 2, and 3. If all edges are blue, we have a blue triangle.',
            action: () => colorEdges([[0, 1], [1, 2], [0, 2]], 'blue'),
        },
        {
            label: 'Forcing Red Edges',
            description: 'To avoid a blue triangle, at least one edge must be red.',
            action: () => colorEdges([[0, 1]], 'red'),
        },
        {
            label: 'Complete the Proof',
            description: 'No matter how we color the remaining edges, we will always find a monochromatic triangle.',
        },
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
                newLinks.push({
                    source: i,
                    target: j,
                    color: 'var(--color-edge-default)',
                });
            }
        }

        setNodes(newNodes);
        setLinks(newLinks);
    };

    const colorEdges = (edgePairs, color) => {
        setLinks(links.map(link => {
            const pair = [link.source, link.target];
            const reversePair = [link.target, link.source];
            if (edgePairs.some(ep =>
                (ep[0] === pair[0] && ep[1] === pair[1]) ||
                (ep[0] === reversePair[0] && ep[1] === reversePair[1])
            )) {
                return { ...link, color: `var(--color-edge-${color})` };
            }
            return link;
        }));
    };

    useEffect(() => {
        initializeK6();
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            const nextStep = steps[currentStep + 1];
            if (nextStep.action) {
                nextStep.action();
            }
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            const prevStep = steps[currentStep - 1];
            if (prevStep.action) {
                prevStep.action();
            }
            setCurrentStep(currentStep - 1);
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
                    <Stepper
                        activeStep={currentStep}
                        orientation="vertical"
                        sx={{
                            '& .MuiStepLabel-label': {
                                color: 'var(--color-text-primary)'
                            },
                            '& .MuiStepIcon-root': {
                                color: 'var(--color-progress-node)',
                                '&.Mui-active': {
                                    color: 'var(--color-progress-node)'
                                }
                            },
                            '& .MuiStepConnector-root .MuiStepConnector-line': {
                                borderColor: 'var(--color-edge-default)'  // Changed from text-primary to edge-default
                            },
                            '& .Mui-disabled': {
                                color: 'var(--color-text-secondary)'
                            },
                            '& .MuiStep-root': {
                                color: 'var(--color-text-primary)'
                            }
                        }}
                    >
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel>
                                    <Typography variant="subtitle1">{step.label}</Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Typography variant="body1" sx={{ flex: 1, my: 2 }}>
                        {steps[currentStep].description}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            disabled={currentStep === steps.length - 1}
                        >
                            Next
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}

export default LearnMode;

