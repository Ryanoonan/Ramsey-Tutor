import { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import Graph from '../shared/Graph';

function SandboxMode() {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [history, setHistory] = useState([]);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight - 64 // Subtract AppBar height
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight - 64
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const addNode = (event) => {
        // Prevent the click from bubbling up to parent elements
        event.stopPropagation();

        // Get the graph container element
        const graphContainer = event.currentTarget;
        const rect = graphContainer.getBoundingClientRect();

        // Calculate coordinates relative to the container, accounting for scroll
        const x = event.clientX - rect.left + graphContainer.scrollLeft;
        const y = event.clientY - rect.top + graphContainer.scrollTop;

        const newNode = {
            id: nodes.length,
            x: x,
            y: y,
            fx: x, // Fix the node position in x
            fy: y  // Fix the node position in y
        };

        saveState();
        setNodes([...nodes, newNode]);
    };

    const handleNodeClick = (node) => {
        if (selectedNodes.length === 1 && selectedNodes[0].id !== node.id) {
            // Create edge between nodes
            const newLink = {
                source: selectedNodes[0].id,
                target: node.id,
                color: '#999'
            };

            saveState();
            setLinks([...links, newLink]);
            setSelectedNodes([]);
        } else {
            setSelectedNodes([node]);
        }
    };

    const handleLinkClick = (link) => {
        saveState();
        const newLinks = links.map(l => {
            if (l === link) {
                return {
                    ...l,
                    color: l.color === 'red' ? 'blue' : 'red'
                };
            }
            return l;
        });
        setLinks(newLinks);
    };

    const saveState = () => {
        setHistory([...history, { nodes: [...nodes], links: [...links] }]);
    };

    const undo = () => {
        if (history.length > 0) {
            const previousState = history[history.length - 1];
            setNodes(previousState.nodes);
            setLinks(previousState.links);
            setHistory(history.slice(0, -1));
        }
    };

    const reset = () => {
        saveState();
        setNodes([]);
        setLinks([]);
        setSelectedNodes([]);
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Sandbox Mode
                    </Typography>
                    <ButtonGroup>
                        <IconButton color="inherit" onClick={undo} disabled={history.length === 0}>
                            <UndoIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={reset}>
                            <DeleteIcon />
                        </IconButton>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    flexGrow: 1,
                    position: 'relative',
                    cursor: 'pointer'
                }}
                onClick={addNode}
            >
                <Graph
                    nodes={nodes}
                    links={links}
                    onNodeClick={handleNodeClick}
                    onLinkClick={handleLinkClick}
                    width={dimensions.width}
                    height={dimensions.height}
                />
            </Box>
        </Box>
    );
}

export default SandboxMode;