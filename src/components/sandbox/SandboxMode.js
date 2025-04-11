import { useState, useEffect, useRef } from 'react';
import { Box, Button, ButtonGroup, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import Graph from '../shared/Graph';

function SandboxMode() {
    const graphRef = useRef(null);
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

    const addNode = (coords) => {
        const { x, y } = coords;
        const newNode = {
            id: nodes.length,
            x: x,
            y: y,
            fx: x,
            fy: y
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
                ref={graphRef}
                sx={{
                    flexGrow: 1,
                    position: 'relative',
                    cursor: 'pointer'
                }}
            >
                <Graph
                    nodes={nodes}
                    links={links}
                    onNodeClick={handleNodeClick}
                    onLinkClick={handleLinkClick}
                    onBackgroundClick={addNode}
                    width={dimensions.width}
                    height={dimensions.height}
                />
            </Box>
        </Box>
    );
}

export default SandboxMode;