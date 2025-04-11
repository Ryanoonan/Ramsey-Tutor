import { useRef, useEffect, useCallback } from 'react';

const Graph = ({ nodes, links, onNodeClick, onLinkClick, onBackgroundClick, width = 800, height = 600, nodeRadius = 20, lineWidth = 12, linkColor = 'black' }) => {
    const canvasRef = useRef();

    // Draw everything on each render
    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, width, height);

        // Draw links
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        links.forEach(link => {
            const source = typeof link.source === 'object' ? link.source : nodes.find(n => n.id === link.source);
            const target = typeof link.target === 'object' ? link.target : nodes.find(n => n.id === link.target);
            if (!source || !target) return;
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = linkColor;
            ctx.stroke();
        });

        // Draw nodes
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        });
    }, [nodes, links, width, height, nodeRadius, lineWidth, linkColor]);

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
            const source = typeof link.source === 'object' ? link.source : nodes.find(n => n.id === link.source);
            const target = typeof link.target === 'object' ? link.target : nodes.find(n => n.id === link.target);
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
                style={{ backgroundColor: '#ffffff', cursor: 'pointer' }}
                onClick={handleCanvasClick}
            />
        </div>
    );
};

export default Graph;