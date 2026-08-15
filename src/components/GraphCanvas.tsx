import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import {
  GraphNode,
  GraphEdge,
  NodeType,
  GraphPath,
} from '../types/mythology';
import { useLanguage } from '../i18n/LanguageContext';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Sparkles,
  Compass,
  Filter,
  Eye,
  EyeOff,
  Activity,
  RotateCcw,
} from 'lucide-react';

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId: string | null;
  onSelectNode: (node: GraphNode | null) => void;
  highlightedPath: GraphPath | null;
  activeTypeFilter: Set<NodeType>;
  onToggleTypeFilter: (type: NodeType) => void;
  searchHighlightId: string | null;
}

const TYPE_COLORS: Record<NodeType, { fill: string; stroke: string; glow: string; text: string }> = {
  Character: { fill: '#d97706', stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.45)', text: '#fbbf24' },
  Place: { fill: '#059669', stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.45)', text: '#34d399' },
  Object: { fill: '#dc2626', stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.45)', text: '#f87171' },
  Event: { fill: '#7c3aed', stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.45)', text: '#c084fc' },
  Concept: { fill: '#0284c7', stroke: '#06b6d4', glow: 'rgba(6, 182, 212, 0.45)', text: '#38bdf8' },
};

interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  degree: number;
}

interface SimEdge {
  id: string;
  source: SimNode;
  target: SimNode;
  type: string;
  label: string;
  particleOffset: number;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  highlightedPath,
  activeTypeFilter,
  onToggleTypeFilter,
  searchHighlightId,
}) => {
  const { lang, t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // View transform
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [is3DMode, setIs3DMode] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [layoutMode, setLayoutMode] = useState<'force' | 'radial' | 'timeline'>('force');
  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const simNodesRef = useRef<SimNode[]>([]);
  const simEdgesRef = useRef<SimEdge[]>([]);
  const isDraggingRef = useRef(false);
  const draggedNodeRef = useRef<SimNode | null>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize and update simulation graph
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width || 800;
    const height = rect.height || 600;

    // Node degree map
    const degreeMap = new Map<string, number>();
    edges.forEach((e) => {
      degreeMap.set(e.source, (degreeMap.get(e.source) || 0) + 1);
      degreeMap.set(e.target, (degreeMap.get(e.target) || 0) + 1);
    });

    // Reuse existing positions or initialize in circle
    const existingPos = new Map<string, { x: number; y: number; vx: number; vy: number }>();
    simNodesRef.current.forEach((n) => {
      existingPos.set(n.id, { x: n.x, y: n.y, vx: n.vx, vy: n.vy });
    });

    const angleStep = (Math.PI * 2) / Math.max(1, nodes.length);
    const newSimNodes: SimNode[] = nodes.map((n, i) => {
      const prev = existingPos.get(n.id);
      const degree = degreeMap.get(n.id) || 1;
      const radius = Math.min(26, Math.max(14, 12 + degree * 2.2));
      const radiusOffset = 180 + (i % 3) * 60;

      return {
        ...n,
        x: prev ? prev.x : width / 2 + Math.cos(i * angleStep) * radiusOffset + (Math.random() - 0.5) * 40,
        y: prev ? prev.y : height / 2 + Math.sin(i * angleStep) * radiusOffset + (Math.random() - 0.5) * 40,
        vx: prev ? prev.vx : (Math.random() - 0.5) * 2,
        vy: prev ? prev.vy : (Math.random() - 0.5) * 2,
        radius,
        degree,
      };
    });

    const nodeMap = new Map<string, SimNode>(newSimNodes.map((n) => [n.id, n]));
    const newSimEdges: SimEdge[] = [];

    edges.forEach((e) => {
      const src = nodeMap.get(e.source);
      const tgt = nodeMap.get(e.target);
      if (src && tgt) {
        newSimEdges.push({
          id: e.id,
          source: src,
          target: tgt,
          type: e.type,
          label: e.label,
          particleOffset: Math.random(),
        });
      }
    });

    simNodesRef.current = newSimNodes;
    simEdgesRef.current = newSimEdges;
  }, [nodes, edges]);

  // Physics animation loop
  useEffect(() => {
    let animId: number;

    const tickPhysics = () => {
      const nodes = simNodesRef.current;
      const edges = simEdgesRef.current;
      const rect = containerRef.current?.getBoundingClientRect();
      const width = rect?.width || 800;
      const height = rect?.height || 600;
      const centerX = width / 2;
      const centerY = height / 2;

      if (layoutMode === 'force') {
        // 1. Repulsion between all nodes
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const n1 = nodes[i];
            const n2 = nodes[j];
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const distSq = dx * dx + dy * dy + 100;
            const dist = Math.sqrt(distSq);

            if (dist < 400) {
              const force = 3800 / distSq;
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;

              if (n1 !== draggedNodeRef.current) {
                n1.vx -= fx;
                n1.vy -= fy;
              }
              if (n2 !== draggedNodeRef.current) {
                n2.vx += fx;
                n2.vy += fy;
              }
            }
          }
        }

        // 2. Spring attraction along edges
        edges.forEach((edge) => {
          const s = edge.source;
          const t = edge.target;
          const dx = t.x - s.x;
          const dy = t.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const targetDist = 120;
          const force = (dist - targetDist) * 0.035;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (s !== draggedNodeRef.current) {
            s.vx += fx;
            s.vy += fy;
          }
          if (t !== draggedNodeRef.current) {
            t.vx -= fx;
            t.vy -= fy;
          }
        });

        // 3. Central gravity & damping
        nodes.forEach((n) => {
          if (n === draggedNodeRef.current) return;
          const dx = centerX - n.x;
          const dy = centerY - n.y;
          n.vx += dx * 0.008;
          n.vy += dy * 0.008;

          // Damping
          n.vx *= 0.88;
          n.vy *= 0.88;

          n.x += n.vx;
          n.y += n.vy;
        });
      } else if (layoutMode === 'radial') {
        // Arrange by node type in concentric rings
        const typeAngles: Record<NodeType, number> = {
          Character: 0,
          Place: (Math.PI * 2) / 5,
          Object: ((Math.PI * 2) / 5) * 2,
          Event: ((Math.PI * 2) / 5) * 3,
          Concept: ((Math.PI * 2) / 5) * 4,
        };

        nodes.forEach((n, i) => {
          if (n === draggedNodeRef.current) return;
          const baseAngle = typeAngles[n.type] || 0;
          const spread = (i % 6) * 0.2 - 0.5;
          const targetX = centerX + Math.cos(baseAngle + spread) * 240;
          const targetY = centerY + Math.sin(baseAngle + spread) * 240;

          n.x += (targetX - n.x) * 0.08;
          n.y += (targetY - n.y) * 0.08;
        });
      } else if (layoutMode === 'timeline') {
        // Chronological horizontal flow
        const sorted = [...nodes].sort((a, b) => (a.timeline_order || 99) - (b.timeline_order || 99));
        const spacingX = Math.max(80, (width - 160) / Math.max(1, sorted.length - 1));

        sorted.forEach((n, idx) => {
          if (n === draggedNodeRef.current) return;
          const targetX = 80 + idx * spacingX;
          const targetY = centerY + ((idx % 3) - 1) * 70;
          n.x += (targetX - n.x) * 0.08;
          n.y += (targetY - n.y) * 0.08;
        });
      }

      // Advance edge particles
      edges.forEach((e) => {
        e.particleOffset = (e.particleOffset + 0.006) % 1;
      });

      renderCanvas();
      animId = requestAnimationFrame(tickPhysics);
    };

    animId = requestAnimationFrame(tickPhysics);
    return () => cancelAnimationFrame(animId);
  }, [layoutMode, transform, is3DMode, showLabels, selectedNodeId, highlightedPath, activeTypeFilter, searchHighlightId, hoveredNode]);

  // Main canvas renderer
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    // Apply 2D/3D pan & zoom transform
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.k, transform.k);

    if (is3DMode) {
      ctx.transform(1, -0.2, 0.15, 0.9, 0, 0);
    }

    const nodes = simNodesRef.current;
    const edges = simEdgesRef.current;

    // Filter nodes by active type chips
    const visibleNodeIds = new Set(
      nodes.filter((n) => activeTypeFilter.has(n.type)).map((n) => n.id)
    );

    // Connected neighbors set for selected node
    const connectedNeighborIds = new Set<string>();
    if (selectedNodeId) {
      connectedNeighborIds.add(selectedNodeId);
      edges.forEach((e) => {
        if (e.source.id === selectedNodeId) connectedNeighborIds.add(e.target.id);
        if (e.target.id === selectedNodeId) connectedNeighborIds.add(e.source.id);
      });
    }

    // Path nodes and edges lookup
    const pathNodeIds = new Set(highlightedPath?.nodes.map((n) => n.id) || []);
    const pathEdgeIds = new Set(highlightedPath?.edges.map((e) => e.id) || []);

    // 1. Draw Edges
    edges.forEach((edge) => {
      if (!visibleNodeIds.has(edge.source.id) || !visibleNodeIds.has(edge.target.id)) return;

      const isPathEdge = pathEdgeIds.has(edge.id);
      const isConnectedToSelected =
        selectedNodeId &&
        (edge.source.id === selectedNodeId || edge.target.id === selectedNodeId);
      const isDimmed =
        (selectedNodeId && !isConnectedToSelected && !isPathEdge) ||
        (highlightedPath && !isPathEdge);

      ctx.beginPath();
      ctx.moveTo(edge.source.x, edge.source.y);
      ctx.lineTo(edge.target.x, edge.target.y);

      if (isPathEdge) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 12;
      } else if (isConnectedToSelected) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.4;
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 8;
      } else if (isDimmed) {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
      } else {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
        ctx.lineWidth = 1.3;
        ctx.shadowBlur = 0;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Edge Label if zoomed in enough and connected or on path
      if ((isConnectedToSelected || isPathEdge || transform.k > 1.2) && !isDimmed) {
        const midX = (edge.source.x + edge.target.x) / 2;
        const midY = (edge.source.y + edge.target.y) / 2;

        ctx.font = '10px sans-serif';
        ctx.fillStyle = isPathEdge ? '#fef08a' : isConnectedToSelected ? '#bae6fd' : '#94a3b8';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(edge.label, midX, midY - 6);
      }

      // Draw active animated particles along edge
      if (!isDimmed || isPathEdge || isConnectedToSelected) {
        const px = edge.source.x + (edge.target.x - edge.source.x) * edge.particleOffset;
        const py = edge.source.y + (edge.target.y - edge.source.y) * edge.particleOffset;

        ctx.beginPath();
        ctx.arc(px, py, isPathEdge ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isPathEdge ? '#fef08a' : isConnectedToSelected ? '#7dd3fc' : '#cbd5e1';
        ctx.shadowColor = isPathEdge ? '#f59e0b' : '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // 2. Draw Nodes
    nodes.forEach((node) => {
      if (!visibleNodeIds.has(node.id)) return;

      const isSelected = selectedNodeId === node.id;
      const isConnected = connectedNeighborIds.has(node.id);
      const isPath = pathNodeIds.has(node.id);
      const isSearchHit = searchHighlightId === node.id;
      const isHovered = hoveredNode?.id === node.id;
      const isDimmed =
        (selectedNodeId && !isSelected && !isConnected && !isPath && !isSearchHit) ||
        (highlightedPath && !isPath);

      const colors = TYPE_COLORS[node.type] || TYPE_COLORS.Character;
      const currentRadius = isSelected || isSearchHit || isHovered ? node.radius * 1.25 : node.radius;

      // Outer glow ring
      if (isSelected || isSearchHit || isPath || isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius + 7, 0, Math.PI * 2);
        ctx.fillStyle = isPath ? 'rgba(245, 158, 11, 0.35)' : isSearchHit ? 'rgba(236, 72, 153, 0.45)' : colors.glow;
        ctx.fill();
      }

      // Node Body Circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = isDimmed ? 'rgba(30, 41, 59, 0.5)' : colors.fill;
      ctx.fill();

      // Node Stroke
      ctx.lineWidth = isSelected ? 3.5 : isPath ? 3 : 2;
      ctx.strokeStyle = isDimmed
        ? 'rgba(100, 116, 139, 0.3)'
        : isPath
        ? '#fef08a'
        : isSearchHit
        ? '#f472b6'
        : colors.stroke;
      ctx.stroke();

      // Node Type Icon Indicator (Tiny dot in center)
      ctx.beginPath();
      ctx.arc(node.x, node.y, isSelected ? 4.5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = isDimmed ? '#64748b' : '#ffffff';
      ctx.fill();

      // Draw Label
      if (showLabels || isSelected || isPath || isSearchHit || isHovered || transform.k > 0.85) {
        ctx.font = `${isSelected ? 'bold 13px' : '11px'} sans-serif`;
        ctx.fillStyle = isDimmed
          ? 'rgba(148, 163, 184, 0.35)'
          : isSelected
          ? '#ffffff'
          : isPath
          ? '#fef08a'
          : colors.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Background tag for readability
        const labelText = node.label;
        const textWidth = ctx.measureText(labelText).width;
        ctx.fillStyle = isDimmed ? 'rgba(15, 23, 42, 0.4)' : 'rgba(15, 23, 42, 0.75)';
        ctx.fillRect(node.x - textWidth / 2 - 4, node.y + currentRadius + 3, textWidth + 8, 14);

        ctx.fillStyle = isDimmed
          ? 'rgba(148, 163, 184, 0.45)'
          : isSelected
          ? '#ffffff'
          : isPath
          ? '#fef08a'
          : '#f8fafc';
        ctx.fillText(labelText, node.x, node.y + currentRadius + 4);
      }
    });

    ctx.restore();
  }, [transform, is3DMode, showLabels, selectedNodeId, highlightedPath, activeTypeFilter, searchHighlightId, hoveredNode]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvasRef.current.width = rect.width;
      canvasRef.current.height = rect.height;
      renderCanvas();
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [renderCanvas]);

  // Pointer interactions (Pan, Zoom, Drag Node, Click)
  const getCanvasCoords = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const rawX = clientX - rect.left;
    const rawY = clientY - rect.top;

    // Invert transform
    const x = (rawX - transform.x) / transform.k;
    const y = (rawY - transform.y) / transform.k;
    return { x, y };
  };

  const findNodeAtCoords = (x: number, y: number): SimNode | null => {
    const nodes = simNodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (!activeTypeFilter.has(n.type)) continue;
      const dx = n.x - x;
      const dy = n.y - y;
      if (dx * dx + dy * dy <= (n.radius + 6) * (n.radius + 6)) {
        return n;
      }
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    const hitNode = findNodeAtCoords(x, y);

    if (hitNode) {
      isDraggingRef.current = true;
      draggedNodeRef.current = hitNode;
      dragStartRef.current = { x, y };
    } else {
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);

    if (isDraggingRef.current && draggedNodeRef.current) {
      draggedNodeRef.current.x = x;
      draggedNodeRef.current.y = y;
      draggedNodeRef.current.vx = 0;
      draggedNodeRef.current.vy = 0;
    } else if (isPanningRef.current) {
      setTransform((prev) => ({
        ...prev,
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      }));
    } else {
      // Hover detection
      const hovered = findNodeAtCoords(x, y);
      if (hovered !== hoveredNode) {
        setHoveredNode(hovered);
        if (hovered) {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
            setTooltipPos({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
          }
        } else {
          setTooltipPos(null);
        }
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current && draggedNodeRef.current) {
      const { x, y } = getCanvasCoords(e.clientX, e.clientY);
      const dx = x - dragStartRef.current.x;
      const dy = y - dragStartRef.current.y;
      // If minimal drag, treat as click
      if (Math.sqrt(dx * dx + dy * dy) < 5) {
        onSelectNode(draggedNodeRef.current);
      }
      isDraggingRef.current = false;
      draggedNodeRef.current = null;
    } else if (isPanningRef.current) {
      isPanningRef.current = false;
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    setTransform((prev) => {
      const newK = Math.max(0.2, Math.min(4.5, prev.k * zoomFactor));
      return { ...prev, k: newK };
    });
  };

  const handleResetView = () => {
    setTransform({ x: 0, y: 0, k: 1 });
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setTransform((prev) => ({
      ...prev,
      k: Math.max(0.2, Math.min(4.5, prev.k * (direction === 'in' ? 1.25 : 0.8))),
    }));
  };

  const nodeTypeOptions: NodeType[] = ['Character', 'Place', 'Object', 'Event', 'Concept'];

  return (
    <div
      ref={containerRef}
      id="graph-canvas-container"
      className="relative w-full h-full bg-[#0a0f1d] overflow-hidden select-none"
    >
      {/* Background Starfield / Mythic Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      <canvas
        ref={canvasRef}
        id="mythology-graph-canvas"
        className="w-full h-full cursor-grab active:cursor-grabbing block"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Floating Controls Toolbar */}
      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 bg-[#131b2e]/90 backdrop-blur-md border border-slate-700/60 rounded-xl p-2 shadow-2xl z-20">
        {/* Node Type Filters */}
        <div className="flex items-center gap-1 border-r border-slate-700/60 pr-2">
          {nodeTypeOptions.map((type) => {
            const active = activeTypeFilter.has(type);
            const colors = TYPE_COLORS[type];
            return (
              <button
                key={type}
                id={`filter-btn-${type.toLowerCase()}`}
                onClick={() => onToggleTypeFilter(type)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  active
                    ? 'text-white border shadow-sm'
                    : 'text-slate-400 bg-slate-800/40 border border-transparent hover:text-slate-200'
                }`}
                style={{
                  backgroundColor: active ? `${colors.fill}25` : undefined,
                  borderColor: active ? colors.stroke : undefined,
                }}
                title={`${t.canvas.toggleType} ${t.types[type] || type}`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: active ? colors.stroke : '#64748b' }}
                />
                {t.types[type] || type}
              </button>
            );
          })}
        </div>

        {/* Layout Modes */}
        <div className="flex items-center gap-1 border-r border-slate-700/60 pr-2">
          <button
            id="layout-force-btn"
            onClick={() => setLayoutMode('force')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
              layoutMode === 'force' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
            }`}
            title={t.canvas.forceLayout}
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            id="layout-radial-btn"
            onClick={() => setLayoutMode('radial')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
              layoutMode === 'radial' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
            }`}
            title={t.canvas.radialLayout}
          >
            <Compass className="w-4 h-4" />
          </button>
          <button
            id="layout-timeline-btn"
            onClick={() => setLayoutMode('timeline')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
              layoutMode === 'timeline' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
            }`}
            title={t.canvas.timelineLayout}
          >
            <Activity className="w-4 h-4" />
          </button>
        </div>

        {/* 2D / 3D Isometric View */}
        <button
          id="toggle-3d-btn"
          onClick={() => setIs3DMode(!is3DMode)}
          className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
            is3DMode ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
          }`}
          title={t.canvas.isometricToggle}
        >
          <Layers className="w-3.5 h-3.5" />
          {is3DMode ? '3D' : '2D'}
        </button>

        {/* Toggle Labels */}
        <button
          id="toggle-labels-btn"
          onClick={() => setShowLabels(!showLabels)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
          title={showLabels ? t.canvas.hideLabels : t.canvas.showLabels}
        >
          {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            id="zoom-in-btn"
            onClick={() => handleZoom('in')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            title={t.canvas.zoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            id="zoom-out-btn"
            onClick={() => handleZoom('out')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            title={t.canvas.zoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            id="reset-view-btn"
            onClick={handleResetView}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            title={t.canvas.resetView}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Path highlight indicator banner */}
      {highlightedPath && (
        <div className="absolute top-4 right-4 bg-amber-950/80 border border-amber-500/50 backdrop-blur-md rounded-xl px-3 py-1.5 text-xs text-amber-200 flex items-center gap-2 shadow-xl z-20">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>
            {t.path.pathLabel}: <strong>{highlightedPath.nodes[0]?.label}</strong> →{' '}
            <strong>{highlightedPath.nodes[highlightedPath.nodes.length - 1]?.label}</strong> (
            {highlightedPath.edges.length} {t.path.hops})
          </span>
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredNode && tooltipPos && (
        <div
          className="absolute pointer-events-none z-30 bg-slate-900/95 border border-slate-700 text-slate-100 rounded-lg p-2.5 shadow-2xl max-w-xs text-xs backdrop-blur-sm"
          style={{
            left: Math.min(window.innerWidth - 260, tooltipPos.x + 16),
            top: Math.max(16, tooltipPos.y - 12),
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-semibold text-white">{hoveredNode.label}</span>
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-medium"
              style={{
                backgroundColor: `${TYPE_COLORS[hoveredNode.type].fill}30`,
                color: TYPE_COLORS[hoveredNode.type].stroke,
              }}
            >
              {t.types[hoveredNode.type] || hoveredNode.type}
            </span>
          </div>
          <p className="text-slate-300 text-[11px] line-clamp-2 mb-1.5">{hoveredNode.summary}</p>
          <div className="flex items-center gap-3 text-[10px] text-slate-400">
            <span>{hoveredNode.degree} {t.canvas.connections}</span>
            <span>{hoveredNode.source_refs.length} {t.canvas.primaryCitations}</span>
          </div>
        </div>
      )}
    </div>
  );
};
