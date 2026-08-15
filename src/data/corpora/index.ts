import { CorpusManifest, MythologyGraph, GraphNode, GraphEdge } from '../../types/mythology';
import { greekOdysseyCorpus } from './greek-odyssey';
import { egyptianMythologyCorpus } from './egyptian-mythology';
import { norseMythologyCorpus } from './norse-mythology';
import { hinduMythologyCorpus } from './hindu-mythology';
import { catholicSaintsCorpus } from './catholic-saints';

export const INITIAL_CORPORA: Record<string, MythologyGraph> = {
  'greek-odyssey': greekOdysseyCorpus,
  'egyptian-mythology': egyptianMythologyCorpus,
  'norse-mythology': norseMythologyCorpus,
  'hindu-mythology': hinduMythologyCorpus,
  'catholic-saints': catholicSaintsCorpus,
};

// Compute dynamic node & edge counts
Object.keys(INITIAL_CORPORA).forEach((key) => {
  const g = INITIAL_CORPORA[key];
  g.manifest.node_count = g.nodes.length;
  g.manifest.edge_count = g.edges.length;
});

export function getAllManifests(): CorpusManifest[] {
  return Object.values(INITIAL_CORPORA).map((g) => g.manifest);
}

export function getCorpusGraph(corpusId: string): MythologyGraph | undefined {
  return INITIAL_CORPORA[corpusId];
}

export function getLocalSubgraph(
  corpusId: string,
  nodeId: string,
  hops: number = 1
): { centerNode?: GraphNode; nodes: GraphNode[]; edges: GraphEdge[]; relatedEvents: GraphNode[] } {
  const graph = INITIAL_CORPORA[corpusId];
  if (!graph) {
    return { nodes: [], edges: [], relatedEvents: [] };
  }

  const centerNode = graph.nodes.find((n) => n.id === nodeId);
  if (!centerNode) {
    return { nodes: [], edges: [], relatedEvents: [] };
  }

  const visitedNodeIds = new Set<string>([nodeId]);
  let currentLayer = new Set<string>([nodeId]);

  for (let h = 0; h < hops; h++) {
    const nextLayer = new Set<string>();
    graph.edges.forEach((edge) => {
      if (currentLayer.has(edge.source) && !visitedNodeIds.has(edge.target)) {
        visitedNodeIds.add(edge.target);
        nextLayer.add(edge.target);
      } else if (currentLayer.has(edge.target) && !visitedNodeIds.has(edge.source)) {
        visitedNodeIds.add(edge.source);
        nextLayer.add(edge.source);
      }
    });
    currentLayer = nextLayer;
  }

  const nodes = graph.nodes.filter((n) => visitedNodeIds.has(n.id));
  const edges = graph.edges.filter(
    (e) => visitedNodeIds.has(e.source) && visitedNodeIds.has(e.target)
  );

  // Find all events in subgraph or connected to center node
  const relatedEvents = nodes
    .filter((n) => n.type === 'Event')
    .sort((a, b) => (a.timeline_order || 99) - (b.timeline_order || 99));

  return { centerNode, nodes, edges, relatedEvents };
}

export function findShortestPath(
  corpusId: string,
  startId: string,
  endId: string
): { nodes: GraphNode[]; edges: GraphEdge[] } | null {
  const graph = INITIAL_CORPORA[corpusId];
  if (!graph || startId === endId) return null;

  // Build adjacency
  const adj = new Map<string, { neighbor: string; edge: GraphEdge }[]>();
  graph.nodes.forEach((n) => adj.set(n.id, []));
  graph.edges.forEach((e) => {
    adj.get(e.source)?.push({ neighbor: e.target, edge: e });
    adj.get(e.target)?.push({ neighbor: e.source, edge: e });
  });

  const queue: string[] = [startId];
  const visited = new Set<string>([startId]);
  const parentMap = new Map<string, { parent: string; edge: GraphEdge }>();

  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (curr === endId) {
      // Reconstruct path
      const pathNodes: GraphNode[] = [];
      const pathEdges: GraphEdge[] = [];
      let step: string | undefined = endId;

      while (step && step !== startId) {
        const nodeObj = graph.nodes.find((n) => n.id === step);
        if (nodeObj) pathNodes.unshift(nodeObj);
        const pInfo = parentMap.get(step);
        if (pInfo) {
          pathEdges.unshift(pInfo.edge);
          step = pInfo.parent;
        } else {
          break;
        }
      }
      const startNodeObj = graph.nodes.find((n) => n.id === startId);
      if (startNodeObj) pathNodes.unshift(startNodeObj);

      return { nodes: pathNodes, edges: pathEdges };
    }

    const neighbors = adj.get(curr) || [];
    for (const { neighbor, edge } of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parentMap.set(neighbor, { parent: curr, edge });
        queue.push(neighbor);
      }
    }
  }

  return null;
}
