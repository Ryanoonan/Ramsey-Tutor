import { useRef, useCallback, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const Graph = ({ nodes, links, onNodeClick, onLinkClick, width = 800, height = 600 }) => {
    const fgRef = useRef();

    const handleNodeClick = useCallback((node) => {
        if (onNodeClick) onNodeClick(node);
    }, [onNodeClick]);

    const handleLinkClick = useCallback((link) => {
        if (onLinkClick) onLinkClick(link);
    }, [onLinkClick]);

    useEffect(() => {
        if (fgRef.current) {
            // Update graph dimensions and forces
            fgRef.current.width = width;
            fgRef.current.height = height;
            // Disable forces to prevent node movement
            fgRef.current.d3Force('charge', null);
            fgRef.current.d3Force('center', null);
            fgRef.current.d3Force('link', null);
            fgRef.current.d3Force('collide', null);
        }
    }, [width, height]);

    return (
        <ForceGraph2D
            ref={fgRef}
            graphData={{ nodes, links }}
            nodeRelSize={6}
            nodeColor="black"
            linkWidth={2}
            linkColor={(link) => link.color || '#999'}
            width={width}
            height={height}
            onNodeClick={handleNodeClick}
            onLinkClick={handleLinkClick}
            linkDirectionalParticles={0}
            enableNodeDrag={false}
            d3VelocityDecay={1}
            cooldownTime={0}
            d3AlphaDecay={1}
        />
    );
};

export default Graph;