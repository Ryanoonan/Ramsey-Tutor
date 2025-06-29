import { useRef, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { lerp, lerpColor, easeInOutCubic, applyOpacity } from '../../animationHelpers';
import Delayed from './Delayed';

function Graph({
    nodes,
    links,
    onNodeClick,
    onLinkClick,
    onBackgroundClick,
    width = 800,
    height = 600,
    highlightedNodes = null,
    animationDuration,
    shouldAnimate = false,
    onAnimationStateChange = null
}) {

    const theme = useTheme();
    const canvasRef = useRef();
    const animationRef = useRef();
    const startTimeRef = useRef(null);
    const nodesRef = useRef([]);
    const linksRef = useRef([]);
    const prevNodesRef = useRef([]);
    const prevLinksRef = useRef([]);
    const isAnimatingRef = useRef(false);
    const nodeMapRef = useRef({});
    const linkMapRef = useRef({});

    const drawGraph = useCallback((nodesToDraw, linksToDraw) => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        const nodeBorderColor = theme.palette.custom.nodeBorder;
        const nodeFillColor = theme.palette.custom.nodeFill;

        ctx.clearRect(0, 0, width, height);

        // draw links
        linksToDraw.forEach(link => {
            const [sourceId, targetId] = link.edge;
            const source = nodesToDraw.find(n => n.id === sourceId);
            const target = nodesToDraw.find(n => n.id === targetId);

            if (!source || !target) return;
            ctx.lineWidth = link.width;
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);

            ctx.strokeStyle = link.color;

            ctx.stroke();
        });

        // draw nodes
        nodesToDraw.forEach(node => {
            if (highlightedNodes !== null && highlightedNodes.some(id => id === node.id)) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 1.5, 0, 2 * Math.PI);
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = node.radius / 3;
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);

            if (node.opacity !== undefined) {
                ctx.fillStyle = applyOpacity(nodeFillColor, node.opacity);
                ctx.strokeStyle = applyOpacity(nodeBorderColor, node.opacity);
            } else {
                ctx.fillStyle = nodeFillColor;
                ctx.strokeStyle = nodeBorderColor;
            }

            ctx.fill();
            ctx.lineWidth = node.radius / 3;
            ctx.stroke();
        });
    }, [width, height, theme, highlightedNodes]);



    // Animation loop function
    const animationTick = useCallback((timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsedTime = timestamp - startTimeRef.current;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const easedProgress = easeInOutCubic(progress);

        const interpolatedNodes = prevNodesRef.current.map(prevNode => {
            const targetNode = nodeMapRef.current[prevNode.id];
            if (!targetNode) {
                // Node is being removed - fade it out
                return {
                    ...prevNode,
                    opacity: 1 - easedProgress
                };
            }

            return {
                ...prevNode,
                x: lerp(prevNode.x, targetNode.x, easedProgress),
                y: lerp(prevNode.y, targetNode.y, easedProgress),
                radius: lerp(prevNode.radius, targetNode.radius, easedProgress),
            };
        });

        // Add any new nodes that weren't in the previous state
        nodes.forEach(newNode => {
            if (!prevNodesRef.current.some(n => n.id === newNode.id)) {
                interpolatedNodes.push({
                    ...newNode,
                    opacity: easedProgress
                });
            }
        });

        const interpolatedLinks = prevLinksRef.current.map(prevLink => {
            const linkId = `${prevLink.edge[0]}-${prevLink.edge[1]}`;
            const targetLink = linkMapRef.current[linkId];

            if (!targetLink) {
                return {
                    ...prevLink,
                    color: lerpColor(prevLink.color, 'rgb(0,0,0,0)', easedProgress),
                };
            }
            return {
                ...prevLink,
                color: lerpColor(prevLink.color, targetLink.color, easedProgress),
                width: lerp(prevLink.width, targetLink.width, easedProgress),
            };
        });

        // Add new links
        links.forEach(newLink => {
            const linkId = `${newLink.edge[0]}-${newLink.edge[1]}`;
            if (!prevLinksRef.current.some(l =>
                `${l.edge[0]}-${l.edge[1]}` === linkId
            )) {
                interpolatedLinks.push({
                    ...newLink,
                    color: lerpColor('rgb(0,0,0,0)', newLink.color, easedProgress),
                });
            }
        });

        drawGraph(interpolatedNodes, interpolatedLinks);

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animationTick);
        } else {
            // animation complete
            nodesRef.current = [...nodes];
            linksRef.current = [...links];
            isAnimatingRef.current = false;
            if (onAnimationStateChange) {
                onAnimationStateChange(false);
            }
            drawGraph(nodes, links);
        }
    }, [nodes, links, animationDuration, onAnimationStateChange, drawGraph]);


    useEffect(() => {
        const newNodeMap = {};
        nodes.forEach(node => {
            newNodeMap[node.id] = node;
        });
        nodeMapRef.current = newNodeMap;

        const newLinkMap = {};
        links.forEach(link => {
            const linkId = `${link.edge[0]}-${link.edge[1]}`;
            newLinkMap[linkId] = link;
        });
        linkMapRef.current = newLinkMap;

        // If this is the first render, set the refs without animating
        if (nodesRef.current.length === 0 && linksRef.current.length === 0) {
            nodesRef.current = [...nodes];
            linksRef.current = [...links];
            prevNodesRef.current = [...nodes];
            prevLinksRef.current = [...links];
            drawGraph(nodes, links);
            return;
        }
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        if (shouldAnimate) {
            prevNodesRef.current = [...nodesRef.current];
            prevLinksRef.current = [...linksRef.current];

            startTimeRef.current = null;
            isAnimatingRef.current = true;

            if (onAnimationStateChange) {
                onAnimationStateChange(true);
            }

            animationRef.current = requestAnimationFrame(animationTick);
        } else {
            nodesRef.current = [...nodes];
            linksRef.current = [...links];
            drawGraph(nodes, links);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [nodes, links, shouldAnimate, animationTick, onAnimationStateChange, drawGraph]);

    return (
        <Delayed>
            <div style={{ width, height }}>
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    style={{ cursor: 'pointer' }}
                />
            </div>

        </Delayed>

    );
}

export default Graph;