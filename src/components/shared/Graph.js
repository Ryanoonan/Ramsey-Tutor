import { useRef, useEffect, useCallback, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { lerp, lerpColor, easeInOutCubic, applyOpacity } from '../../animationHelpers';

function Graph({
    nodes,
    links,
    onNodeClick,
    onLinkClick,
    onBackgroundClick,
    width = 800,
    height = 600,
    lineWidth = 6,
    highlightedNode = null,
    animationDuration = 800,
    shouldAnimate = false
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
    const nodeBoundaryWidth = 5;
    const nodeMapRef = useRef({});
    const linkMapRef = useRef({});

    const drawGraph = (nodesToDraw, linksToDraw) => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        const nodeBorderColor = theme.palette.custom.nodeBorder;
        const nodeFillColor = theme.palette.custom.nodeFill;

        ctx.clearRect(0, 0, width, height);

        // Draw links
        linksToDraw.forEach(link => {
            const [sourceId, targetId] = link.edge;
            const source = nodesToDraw.find(n => n.id === sourceId);
            const target = nodesToDraw.find(n => n.id === targetId);

            if (!source || !target) return;
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.lineWidth = link.lineWidth;
            if (link.opacity !== undefined) {
                ctx.strokeStyle = applyOpacity(link.color || 'black', link.opacity);
            } else {
                ctx.strokeStyle = link.color || 'black';
            }

            ctx.stroke();
        });

        nodesToDraw.forEach(node => {
            if (highlightedNode !== null && node.id === highlightedNode) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius + 10, 0, 2 * Math.PI);
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 3;
                ctx.stroke();
            }

            // Draw node
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
            ctx.lineWidth = nodeBoundaryWidth;
            ctx.stroke();
        });
    };



    // Animation loop function
    const animationTick = (timestamp) => {
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
                    color: prevLink.color,
                    opacity: 1 - easedProgress
                };
            }
            return {
                ...prevLink,
                color: targetLink.color,
                //lineWidth: lerp(prevLink.lineWidth, targetLink.lineWidth, easedProgress),
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
                    opacity: easedProgress,
                    color: newLink.color
                });
            }
        });

        // Draw the interpolated state
        drawGraph(interpolatedNodes, interpolatedLinks);

        // Continue animation if not complete
        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animationTick);
            console.log("Current animation progress:", progress);
        } else {
            // Animation complete - update refs to current state
            nodesRef.current = [...nodes];
            linksRef.current = [...links];
            isAnimatingRef.current = false;

            // Wait a small amount of time before drawing the final state
            // This ensures the fade-out completes visually
            setTimeout(() => {
                // Draw the final state without any fade effects
                drawGraph(nodes, links);
            }, 50);
        }
    };

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

            animationRef.current = requestAnimationFrame(animationTick);
        } else {
            nodesRef.current = [...nodes];
            linksRef.current = [...links];
            drawGraph(nodes, links);
        }

        // Cleanup function to cancel animation on unmount or when deps change
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [nodes, links, drawGraph, animationTick, shouldAnimate]);

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
            if (Math.sqrt(dx * dx + dy * dy) <= node.radius) {
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
    }, [nodes, links, onNodeClick, onLinkClick, onBackgroundClick]);

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