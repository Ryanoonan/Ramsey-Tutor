import { useRef, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';

function Graph({ nodes, links, onNodeClick, onLinkClick, onBackgroundClick, width = 800, height = 600, nodeRadius = 30, lineWidth = 6, highlightedNode = null }) {

    const theme = useTheme();
    const canvasRef = useRef();
    const nodeBoundaryWidth = 5; // New constant for node boundary width

    // Draw everything on each render
    useEffect(() => {

        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');

        // Get the computed values of CSS variables
        const nodeBorderColor = theme.palette.custom.nodeBorder;
        const nodeFillColor = theme.palette.custom.nodeFill;

        ctx.clearRect(0, 0, width, height);

        // Draw links
        links.forEach(link => {
            // Get source and target nodes from edge property
            const [sourceId, targetId] = link.edge;
            const source = nodes.find(n => n.id === sourceId);
            const target = nodes.find(n => n.id === targetId);

            if (!source || !target) return;
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = link.color;
            ctx.stroke();
        });

        // Draw nodes and highlight
        nodes.forEach(node => {
            // Draw highlight if this is the highlighted node
            if (highlightedNode !== null && node.id === highlightedNode) {
                console.log("Highlighted node")
                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius + 10, 0, 2 * Math.PI);
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            // Draw the node
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = nodeFillColor;
            ctx.fill();
            ctx.strokeStyle = nodeBorderColor;
            ctx.lineWidth = nodeBoundaryWidth;
            ctx.stroke();
        });
    }, [nodes, links, width, height, nodeRadius, lineWidth, highlightedNode]);

    // Utility for checking distance of point->line
    const pointToLineDistance = (px, py, x1, y1, x2, y2) => {
        // Based on standard line distance formula
        const numerator = Math.abs((y2 - y1) * px - (x2 - x1) * py + x2 * y1 - y2 * x1);
        const denominator = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
        return denominator ? numerator / denominator : Infinity;
    };

    // Handle clicks for node, link, or background
    const handleCanvasClick = useCallback((e) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        // Check nodes first
        for (const node of nodes) {
            const dx = node.x - offsetX;
            const dy = node.y - offsetY;
            if (Math.sqrt(dx * dx + dy * dy) <= nodeRadius) {
                onNodeClick?.(node);
                return;
            }
        }
        // Check links next
        for (const link of links) {
            const [sourceId, targetId] = link.edge;
            const source = nodes.find(n => n.id === sourceId);
            const target = nodes.find(n => n.id === targetId);

            if (!source || !target) continue;
            const dist = pointToLineDistance(offsetX, offsetY, source.x, source.y, target.x, target.y);
            if (dist < 5) {
                onLinkClick?.(link);
                return;
            }
        }
        // Otherwise background
        onBackgroundClick?.({ x: offsetX, y: offsetY });
    }, [nodes, links, onNodeClick, onLinkClick, onBackgroundClick, nodeRadius]);

    return (
        <div style={{ width, height }}>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{ cursor: 'pointer' }}
                onClick={handleCanvasClick}
            />
        </div>
    );
};

export default Graph;