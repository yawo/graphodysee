import {
  CorpusManifest,
  MythologyGraph,
  GraphNode,
  PodcastEpisode,
  HybridSearchResult,
  GraphPath,
} from '../types/mythology';
import { Language } from '../i18n/translations';

export async function fetchCorpora(lang: Language = 'en'): Promise<CorpusManifest[]> {
  const res = await fetch(`/api/corpora?lang=${encodeURIComponent(lang)}`);
  if (!res.ok) throw new Error('Failed to fetch corpora');
  const data = await res.json();
  return data.corpora;
}

export async function fetchGraph(corpusId: string, lang: Language = 'en'): Promise<MythologyGraph> {
  const res = await fetch(`/api/graph?corpus_id=${encodeURIComponent(corpusId)}&lang=${encodeURIComponent(lang)}`);
  if (!res.ok) throw new Error(`Failed to fetch graph for corpus ${corpusId}`);
  const data = await res.json();
  return data.graph;
}

export async function fetchCharacter(
  entityId: string,
  corpusId: string,
  hops: number = 1,
  lang: Language = 'en'
): Promise<{ entity: GraphNode; subgraph: { nodes: GraphNode[]; edges: any[]; related_events: GraphNode[] } }> {
  const res = await fetch(
    `/api/character/${encodeURIComponent(entityId)}?corpus_id=${encodeURIComponent(corpusId)}&hops=${hops}&lang=${encodeURIComponent(lang)}`
  );
  if (!res.ok) throw new Error(`Failed to fetch character ${entityId}`);
  return await res.json();
}

export async function fetchShortestPath(
  startId: string,
  endId: string,
  corpusId: string,
  lang: Language = 'en'
): Promise<GraphPath | null> {
  const res = await fetch(
    `/api/path?start=${encodeURIComponent(startId)}&end=${encodeURIComponent(endId)}&corpus_id=${encodeURIComponent(corpusId)}&lang=${encodeURIComponent(lang)}`
  );
  if (!res.ok) throw new Error('Failed to find path');
  const data = await res.json();
  return data.path;
}

export async function performHybridSearch(
  query: string,
  corpusId: string,
  lang: Language = 'en'
): Promise<HybridSearchResult> {
  const res = await fetch('/api/hybrid-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, corpus_id: corpusId, lang }),
  });
  if (!res.ok) throw new Error('Hybrid search failed');
  return await res.json();
}

export async function generatePodcast(
  entityId: string,
  corpusId: string,
  toneOverride?: string,
  lengthSeconds?: number,
  lang: Language = 'en'
): Promise<PodcastEpisode> {
  const res = await fetch('/api/podcast', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      entity_id: entityId,
      corpus_id: corpusId,
      tone_override: toneOverride,
      length_seconds: lengthSeconds,
      lang,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to generate podcast');
  }
  const data = await res.json();
  return data.episode;
}

export async function extractKnowledgeGraph(
  text: string,
  corpusName?: string,
  cultureName?: string,
  era?: string,
  lang: Language = 'en'
): Promise<MythologyGraph> {
  const res = await fetch('/api/extract-graph', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      corpus_name: corpusName,
      culture_name: cultureName,
      era,
      lang,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to extract knowledge graph');
  }
  const data = await res.json();
  return data.graph;
}

export async function saveCustomCorpus(graph: MythologyGraph): Promise<void> {
  const res = await fetch('/api/save-corpus', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ graph }),
  });
  if (!res.ok) throw new Error('Failed to save custom corpus');
}

