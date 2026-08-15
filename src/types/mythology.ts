export type NodeType = 'Character' | 'Place' | 'Object' | 'Event' | 'Concept';

export type RelationType =
  | 'CHILD_OF'
  | 'SPOUSE_OF'
  | 'SIBLING_OF'
  | 'PARENT_OF'
  | 'FOUGHT'
  | 'MET'
  | 'TOOK_PLACE_AT'
  | 'WORSHIPPED_AS'
  | 'GUARDS'
  | 'TRANSFORMED_INTO'
  | 'GUIDED_BY'
  | 'ALLIED_WITH'
  | 'SLAYED'
  | 'POSSESSES'
  | 'EMBODIES'
  | 'RULES_OVER'
  | 'ORIGIN_OF'
  | 'CURSED_BY'
  | 'FEARS'
  | 'CREATOR_OF'
  | 'DESCENDED_TO'
  | 'SERVES'
  | 'INTERCEDES_FOR'
  | string;

export interface SourceRef {
  text: string;
  book?: number | string;
  line_range?: string;
  chapter?: string | number;
  passage?: string;
  citation_quote?: string;
  url?: string;
}

export interface GraphNode {
  id: string;
  type: NodeType;
  corpus_id: string;
  label: string;
  summary: string;
  attributes: Record<string, string | string[]>;
  source_refs: SourceRef[];
  timeline_order?: number;
  // Simulation coordinate props
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: RelationType;
  label: string;
  description?: string;
  source_refs: SourceRef[];
  corpus_id: string;
}

export interface CorpusManifest {
  id: string;
  name: string;
  culture: string;
  language: string;
  era: string;
  description: string;
  icon: string;
  accent_color: string;
  license_note: string;
  default_voice: string;
  narrative_style: {
    tone: string;
    length_seconds: number;
    recommended_speakers?: string[];
  };
  featured_nodes: string[];
  node_count?: number;
  edge_count?: number;
}

export interface MythologyGraph {
  manifest: CorpusManifest;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface PodcastScriptSection {
  timestamp: string;
  speaker: string;
  title: string;
  text: string;
  grounded_node_ids: string[];
  grounded_facts: string[];
  source_refs: SourceRef[];
  audio_cue?: string;
}

export interface PodcastEpisode {
  id: string;
  entity_id: string;
  entity_name: string;
  entity_type: NodeType;
  corpus_id: string;
  corpus_name: string;
  title: string;
  duration_seconds: number;
  tone: string;
  created_at: string;
  sections: PodcastScriptSection[];
  full_script: string;
  audio_base64?: string;
}

export interface HybridSearchResult {
  answer: string;
  matching_nodes: GraphNode[];
  matching_edges: GraphEdge[];
  subgraph_node_ids: string[];
  grounded_facts: string[];
  source_refs: SourceRef[];
  reasoning: string;
}

export interface GraphPath {
  nodes: GraphNode[];
  edges: GraphEdge[];
  length: number;
}
