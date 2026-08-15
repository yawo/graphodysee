import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import {
  INITIAL_CORPORA_EN,
  INITIAL_CORPORA_FR,
  getAllManifests,
  getCorpusGraph,
  getLocalSubgraph,
  findShortestPath,
} from './src/data/corpora';
import { MythologyGraph, PodcastEpisode } from './src/types/mythology';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory runtime corpora storage for dynamic custom uploads per language
const dynamicCorporaEn: Record<string, MythologyGraph> = { ...INITIAL_CORPORA_EN };
const dynamicCorporaFr: Record<string, MythologyGraph> = { ...INITIAL_CORPORA_FR };

function getCorporaMap(lang: string = 'en') {
  return lang === 'fr' ? dynamicCorporaFr : dynamicCorporaEn;
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 2. List all available corpora manifests
app.get('/api/corpora', (req, res) => {
  const lang = (req.query.lang as string) || 'en';
  const corporaMap = getCorporaMap(lang);
  const manifests = Object.values(corporaMap).map((g) => {
    return {
      ...g.manifest,
      node_count: g.nodes.length,
      edge_count: g.edges.length,
    };
  });
  res.json({ corpora: manifests });
});

// 3. Get full graph for a corpus
app.get('/api/graph', (req, res) => {
  const lang = (req.query.lang as string) || 'en';
  const corporaMap = getCorporaMap(lang);
  const corpusId = (req.query.corpus_id as string) || 'greek-odyssey';
  const graph = corporaMap[corpusId] || corporaMap['greek-odyssey'];
  if (!graph) {
    return res.status(404).json({ error: `Corpus '${corpusId}' not found` });
  }
  res.json({ graph });
});

// 4. Get character/entity subgraph & dossier
app.get('/api/character/:id', (req, res) => {
  const entityId = req.params.id;
  const lang = (req.query.lang as string) || 'en';
  const corporaMap = getCorporaMap(lang);
  const corpusId = (req.query.corpus_id as string) || 'greek-odyssey';
  const hops = parseInt((req.query.hops as string) || '1', 10);

  const graph = corporaMap[corpusId];
  if (!graph) {
    return res.status(404).json({ error: `Corpus '${corpusId}' not found` });
  }

  const centerNode = graph.nodes.find((n) => n.id === entityId);
  if (!centerNode) {
    return res.status(404).json({ error: `Entity '${entityId}' not found in corpus '${corpusId}'` });
  }

  const localSubgraph = getLocalSubgraph(corpusId, entityId, hops, lang === 'fr' ? 'fr' : 'en');
  res.json({
    entity: centerNode,
    subgraph: {
      nodes: localSubgraph.nodes,
      edges: localSubgraph.edges,
      related_events: localSubgraph.relatedEvents,
    },
  });
});

// 5. Shortest path finder between two entities
app.get('/api/path', (req, res) => {
  const lang = (req.query.lang as string) || 'en';
  const corpusId = (req.query.corpus_id as string) || 'greek-odyssey';
  const startId = req.query.start as string;
  const endId = req.query.end as string;

  if (!startId || !endId) {
    return res.status(400).json({ error: 'Both start and end node IDs are required' });
  }

  const pathResult = findShortestPath(corpusId, startId, endId, lang === 'fr' ? 'fr' : 'en');
  if (!pathResult) {
    return res.json({
      path: null,
      message: lang === 'fr' ? 'Aucun chemin direct trouvé entre ces entités' : 'No direct connected path found between entities',
    });
  }

  res.json({ path: pathResult });
});

// 6. GraphRAG Hybrid Search
app.post('/api/hybrid-search', async (req, res) => {
  const { query, corpus_id, lang } = req.body;
  const currentLang = (lang as string) || 'en';
  const corporaMap = getCorporaMap(currentLang);
  const corpusId = corpus_id || 'greek-odyssey';
  const graph = corporaMap[corpusId] || corporaMap['greek-odyssey'];

  if (!query || !graph) {
    return res.status(400).json({ error: 'Query and valid corpus_id are required' });
  }

  const queryLower = query.toLowerCase();

  // Local graph retrieval: match nodes by label, summary, or attributes
  const matchedNodes = graph.nodes.filter((node) => {
    const labelMatch = node.label.toLowerCase().includes(queryLower);
    const summaryMatch = node.summary.toLowerCase().includes(queryLower);
    const typeMatch = node.type.toLowerCase().includes(queryLower);
    const attrMatch = Object.values(node.attributes).some((val) =>
      typeof val === 'string'
        ? val.toLowerCase().includes(queryLower)
        : Array.isArray(val) && val.some((v) => v.toLowerCase().includes(queryLower))
    );
    return labelMatch || summaryMatch || typeMatch || attrMatch;
  });

  // Extract relevant connected edges
  const matchedNodeIds = new Set(matchedNodes.map((n) => n.id));
  const matchedEdges = graph.edges.filter(
    (e) => matchedNodeIds.has(e.source) || matchedNodeIds.has(e.target)
  );

  // Collect facts & citations
  const groundedFacts: string[] = [];
  matchedNodes.forEach((n) => {
    groundedFacts.push(`${n.label} (${n.type}): ${n.summary}`);
  });
  matchedEdges.slice(0, 8).forEach((e) => {
    const s = graph.nodes.find((n) => n.id === e.source)?.label || e.source;
    const t = graph.nodes.find((n) => n.id === e.target)?.label || e.target;
    groundedFacts.push(`Relation: ${s} [${e.label}] ${t}${e.description ? ` (${e.description})` : ''}`);
  });

  const sourceRefs = matchedNodes.flatMap((n) => n.source_refs);

  // If Gemini API is available, generate grounded reasoning
  const ai = getGeminiClient();
  let reasoning = '';
  let answer = '';

  if (ai) {
    try {
      const languageInstruction = currentLang === 'fr'
        ? 'Répondez STRICTEMENT en français avec une prose élégante et captivante.'
        : 'Respond strictly in English with elegant prose.';

      const prompt = `You are a GraphRAG knowledge engine for ${graph.manifest.name} (${graph.manifest.culture}).
${languageInstruction}
User question: "${query}"

Retrieved Subgraph Facts:
${groundedFacts.join('\n')}

Primary Source Citations:
${sourceRefs.map((r) => `- ${r.text} ${r.book ? `Book/Livre ${r.book}` : ''} ${r.line_range ? `lines/vers ${r.line_range}` : ''}: "${r.citation_quote || ''}"`).join('\n')}

CRITICAL RULE (NO INVENTED MYTHOLOGY):
Ground your answer STRICTLY in the provided graph facts and primary citations. Never invent facts not in the graph. Answer concisely in 2-3 structured paragraphs, highlighting the entities and their relationships.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      answer = response.text || '';
      reasoning = currentLang === 'fr'
        ? `Synthèse générée à partir de ${matchedNodes.length} entités et ${matchedEdges.length} arêtes du graphe avec citations vérifiées.`
        : `Synthesized from ${matchedNodes.length} graph entities and ${matchedEdges.length} relationship links with primary citations.`;
    } catch (err: any) {
      console.warn('Gemini search synthesis error:', err?.message);
      if (currentLang === 'fr') {
        answer = `D’après le graphe de ${graph.manifest.name}, ${matchedNodes.length} entités correspondent à votre recherche : ${matchedNodes.map((n) => n.label).join(', ')}.`;
        reasoning = 'Parcours topologique direct du graphe de connaissances.';
      } else {
        answer = `Based on the graph for ${graph.manifest.name}, found ${matchedNodes.length} matching entities: ${matchedNodes.map((n) => n.label).join(', ')}.`;
        reasoning = 'Direct graph topology retrieval.';
      }
    }
  } else {
    if (currentLang === 'fr') {
      answer = `Trouvé ${matchedNodes.length} entités mythologiques directes associées à "${query}" dans ${graph.manifest.name} :\n` +
        matchedNodes.map((n) => `• **${n.label}** (${n.type}) : ${n.summary}`).join('\n');
      reasoning = 'Parcours topologique et sémantique local GraphRAG.';
    } else {
      answer = `Found ${matchedNodes.length} direct mythological entities related to "${query}" in ${graph.manifest.name}:\n` +
        matchedNodes.map((n) => `• **${n.label}** (${n.type}): ${n.summary}`).join('\n');
      reasoning = 'Local GraphRAG vector & keyword traversal.';
    }
  }

  res.json({
    answer,
    reasoning,
    matching_nodes: matchedNodes,
    matching_edges: matchedEdges,
    subgraph_node_ids: Array.from(matchedNodeIds),
    grounded_facts: groundedFacts,
    source_refs: sourceRefs,
  });
});

// 7. GraphRAG Podcast Generator endpoint
app.post('/api/podcast', async (req, res) => {
  const { entity_id, corpus_id, tone_override, length_seconds, lang } = req.body;
  const currentLang = (lang as string) || 'en';
  const corporaMap = getCorporaMap(currentLang);
  const corpusId = corpus_id || 'greek-odyssey';
  const graph = corporaMap[corpusId] || corporaMap['greek-odyssey'];

  if (!entity_id || !graph) {
    return res.status(400).json({ error: 'entity_id and valid corpus_id are required' });
  }

  const centerNode = graph.nodes.find((n) => n.id === entity_id);
  if (!centerNode) {
    return res.status(404).json({ error: `Entity '${entity_id}' not found` });
  }

  // Retrieve 2-hop local subgraph for rich context
  const localSubgraph = getLocalSubgraph(corpusId, entity_id, 2, currentLang === 'fr' ? 'fr' : 'en');
  const connectedNodes = localSubgraph.nodes;
  const connectedEdges = localSubgraph.edges;
  const relatedEvents = localSubgraph.relatedEvents;

  const tone = tone_override || graph.manifest.narrative_style.tone;
  const targetDuration = length_seconds || graph.manifest.narrative_style.length_seconds || 180;

  // Prepare strict facts and citations for prompt grounding
  const factsList: string[] = [
    `Primary Entity: ${centerNode.label} (${centerNode.type})`,
    `Bio Summary: ${centerNode.summary}`,
    `Attributes: ${JSON.stringify(centerNode.attributes)}`,
  ];

  connectedEdges.forEach((e) => {
    const s = graph.nodes.find((n) => n.id === e.source)?.label || e.source;
    const t = graph.nodes.find((n) => n.id === e.target)?.label || e.target;
    factsList.push(`Relationship: ${s} [${e.label}] ${t} -> ${e.description || ''}`);
  });

  relatedEvents.forEach((ev) => {
    factsList.push(`Chronological Event: ${ev.label} -> ${ev.summary}`);
  });

  const citationsList = connectedNodes.flatMap((n) =>
    n.source_refs.map(
      (r) =>
        `${r.text} ${r.book ? `Book ${r.book}` : ''} ${r.line_range ? `lines ${r.line_range}` : ''} ${r.chapter ? `Chapter ${r.chapter}` : ''}: "${r.citation_quote || ''}"`
    )
  );

  const ai = getGeminiClient();

  if (ai) {
    try {
      const languageSystem = currentLang === 'fr'
        ? 'Vous DEVEZ rédiger l’intégralité du script, des titres de chapitres et des indications sonores EN FRANÇAIS soutenu et évocateur.'
        : 'You must write the entire script, chapter titles, and audio cues in English.';

      const systemInstruction = `You are a master mythology podcast producer and oral storyteller for GraphOdyssée.
${languageSystem}
Your duty is to produce an immersive ~3-minute episodic narrative podcast script about the specified entity, strictly grounded in the knowledge graph facts and primary text citations.

RULES:
1. Ground every claim strictly in the provided subgraph facts. NO INVENTED MYTHOLOGY.
2. Tone: ${tone}.
3. Create 4 to 5 distinct chronological sections: Introduction/Origin, Rising Conflict & Alliances, Climactic Deeds, Divine Judgment/Fate, and Mythic Legacy.
4. For each section, list the grounded facts used and primary source references.
5. Provide immersive audio cues (e.g. [Pincements de lyre], [Grondement du tonnerre], [Brise du désert], [Chant grégorien]).`;

      const userPrompt = `Corpus: ${graph.manifest.name} (${graph.manifest.culture})
Entity: ${centerNode.label}
Type: ${centerNode.type}
Language: ${currentLang === 'fr' ? 'French (Français)' : 'English'}

SUBGRAPH FACTS:
${factsList.join('\n')}

PRIMARY CITATIONS:
${citationsList.slice(0, 10).join('\n')}

Generate the complete structured JSON podcast episode.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'Epic episode title' },
              tone: { type: Type.STRING, description: 'Narrative tone descriptor' },
              duration_seconds: { type: Type.NUMBER },
              sections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    timestamp: { type: Type.STRING, description: 'e.g. 0:00, 0:45' },
                    speaker: { type: Type.STRING, description: 'Narrator / Character voice' },
                    title: { type: Type.STRING, description: 'Chapter title' },
                    text: { type: Type.STRING, description: 'Spoken narration text' },
                    audio_cue: { type: Type.STRING, description: 'Background sound effect or musical motif' },
                    grounded_node_ids: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: 'IDs of graph nodes referenced',
                    },
                    grounded_facts: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: 'Specific graph facts cited in this segment',
                    },
                  },
                  required: ['timestamp', 'speaker', 'title', 'text', 'grounded_node_ids'],
                },
              },
            },
            required: ['title', 'duration_seconds', 'sections'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      const fullScript = parsed.sections
        ? parsed.sections.map((s: any) => `[${s.timestamp}] ${s.speaker} (${s.title}):\n${s.audio_cue ? `🎵 ${s.audio_cue}\n` : ''}${s.text}`).join('\n\n')
        : '';

      const episode: PodcastEpisode = {
        id: `pod_${centerNode.id}_${Date.now()}`,
        entity_id: centerNode.id,
        entity_name: centerNode.label,
        entity_type: centerNode.type,
        corpus_id: graph.manifest.id,
        corpus_name: graph.manifest.name,
        title: parsed.title || (currentLang === 'fr' ? `La Légende de ${centerNode.label}` : `The Legend of ${centerNode.label}`),
        duration_seconds: parsed.duration_seconds || targetDuration,
        tone: parsed.tone || tone,
        created_at: new Date().toISOString(),
        sections: parsed.sections || [],
        full_script: fullScript,
      };

      return res.json({ episode });
    } catch (err: any) {
      console.error('Gemini podcast generation error:', err);
    }
  }

  // High quality deterministic fallback in requested language
  const fallbackSections = currentLang === 'fr'
    ? [
        {
          timestamp: '0:00',
          speaker: graph.manifest.narrative_style.recommended_speakers?.[0] || 'Barde Mythique',
          title: 'Prologue & Origines Sacrées',
          text: `Dans les chroniques millénaires de ${graph.manifest.culture}, peu de noms résonnent avec autant d’éclat que celui de ${centerNode.label}. Évoqué dans les textes fondateurs comme "${centerNode.summary}", ce ${centerNode.type.toLowerCase()} se tient au carrefour du destin cosmique.`,
          audio_cue: '[Son résonnant de cor d’airain et harpe acoustique]',
          grounded_node_ids: [centerNode.id],
          grounded_facts: [`${centerNode.label}: ${centerNode.summary}`],
          source_refs: centerNode.source_refs,
        },
        {
          timestamp: '0:45',
          speaker: graph.manifest.narrative_style.recommended_speakers?.[0] || 'Barde Mythique',
          title: 'La Trame des Alliances & des Épreuves',
          text: `Relié par des liens sacrés et des destins inaltérables, ${centerNode.label} chemine parmi les dieux et les mortels de ${graph.manifest.name}. ${connectedEdges.slice(0, 3).map((e) => {
            const t = graph.nodes.find((n) => n.id === e.target)?.label || e.target;
            return `Uni à ${t} par le lien : ${e.label.toLowerCase()}${e.description ? ` (${e.description})` : ''}.`;
          }).join(' ')}`,
          audio_cue: '[Tambours de guerre au loin et cordes montantes]',
          grounded_node_ids: connectedNodes.slice(0, 3).map((n) => n.id),
          grounded_facts: connectedEdges.slice(0, 3).map((e) => e.description || e.label),
          source_refs: connectedNodes.flatMap((n) => n.source_refs).slice(0, 2),
        },
        {
          timestamp: '1:30',
          speaker: graph.manifest.narrative_style.recommended_speakers?.[1] || 'Témoin du Mythe',
          title: 'L’Heure des Hauts Faits',
          text: relatedEvents.length > 0
            ? `L’instant décisif survint lors de : ${relatedEvents[0].label}. ${relatedEvents[0].summary} C’est alors, comme en témoignent les vers antiques, que le destin révéla son décret immuable.`
            : `À travers chaque épreuve, ${centerNode.label} incarna l’essence même de la tradition de ${graph.manifest.culture}, gravant son souvenir éternel dans la mémoire des hommes.`,
          audio_cue: '[Crescendo majestueux avec chœur antique]',
          grounded_node_ids: relatedEvents.length > 0 ? [centerNode.id, relatedEvents[0].id] : [centerNode.id],
          grounded_facts: relatedEvents.length > 0 ? [relatedEvents[0].summary] : [centerNode.summary],
          source_refs: relatedEvents.flatMap((e) => e.source_refs),
        },
        {
          timestamp: '2:20',
          speaker: graph.manifest.narrative_style.recommended_speakers?.[0] || 'Barde Mythique',
          title: 'Épilogue & Gloire Immortelle',
          text: `C’est ainsi que la geste de ${centerNode.label} s’est transmise à travers les âges, non comme une simple fable, mais comme une constellation vivante de fidélité, de courage et de vérité. Comme le consignent les rouleaux sacrés : "${centerNode.source_refs[0]?.citation_quote || 'Leur renommée monte jusqu’au faîte des cieux.'}"`,
          audio_cue: '[Harmonie éthérée et carillon céleste s’estompant]',
          grounded_node_ids: [centerNode.id],
          grounded_facts: [`Préservé dans ${graph.manifest.name}`],
          source_refs: centerNode.source_refs,
        },
      ]
    : [
        {
          timestamp: '0:00',
          speaker: graph.manifest.narrative_style.recommended_speakers?.[0] || 'Mythic Narrator',
          title: 'Prologue & Sacred Origins',
          text: `In the ancient records of ${graph.manifest.culture}, few names reverberate across eternity like ${centerNode.label}. Described in primary texts as "${centerNode.summary}", this ${centerNode.type.toLowerCase()} stood at the very fulcrum of cosmic fate.`,
          audio_cue: '[Resonant brass horn and ambient acoustic harp]',
          grounded_node_ids: [centerNode.id],
          grounded_facts: [`${centerNode.label}: ${centerNode.summary}`],
          source_refs: centerNode.source_refs,
        },
        {
          timestamp: '0:45',
          speaker: graph.manifest.narrative_style.recommended_speakers?.[0] || 'Mythic Narrator',
          title: 'The Web of Alliances & Trials',
          text: `Connected through sacred bonds and unyielding destinies, ${centerNode.label} moved among the gods and mortals of ${graph.manifest.name}. ${connectedEdges.slice(0, 3).map((e) => {
            const t = graph.nodes.find((n) => n.id === e.target)?.label || e.target;
            return `Bound to ${t} through ${e.label.toLowerCase()}${e.description ? ` (${e.description})` : ''}.`;
          }).join(' ')}`,
          audio_cue: '[Distant war drum and rising strings]',
          grounded_node_ids: connectedNodes.slice(0, 3).map((n) => n.id),
          grounded_facts: connectedEdges.slice(0, 3).map((e) => e.description || e.label),
          source_refs: connectedNodes.flatMap((n) => n.source_refs).slice(0, 2),
        },
        {
          timestamp: '1:30',
          speaker: graph.manifest.narrative_style.recommended_speakers?.[1] || 'Eyewitness Bard',
          title: 'The Climactic Deeds',
          text: relatedEvents.length > 0
            ? `The turning point arrived during ${relatedEvents[0].label}. ${relatedEvents[0].summary} Here, as the ancient verses attest, fate revealed its inescapable decree.`
            : `Across every ordeal, ${centerNode.label} embodied the transcendent core of ${graph.manifest.culture}, leaving an indelible mark upon the mythological landscape.`,
          audio_cue: '[Climactic crescendo with choral undertone]',
          grounded_node_ids: relatedEvents.length > 0 ? [centerNode.id, relatedEvents[0].id] : [centerNode.id],
          grounded_facts: relatedEvents.length > 0 ? [relatedEvents[0].summary] : [centerNode.summary],
          source_refs: relatedEvents.flatMap((e) => e.source_refs),
        },
        {
          timestamp: '2:20',
          speaker: graph.manifest.narrative_style.recommended_speakers?.[0] || 'Mythic Narrator',
          title: 'Epilogue & Eternal Legacy',
          text: `Thus is the chronicle of ${centerNode.label} preserved through the millennia, not as mere fable, but as a living constellation of truth, duty, and human endurance. As recorded in the sacred scrolls: "${centerNode.source_refs[0]?.citation_quote || 'Their fame reaches unto high heaven.'}"`,
          audio_cue: '[Fading ambient resonance with wind chime]',
          grounded_node_ids: [centerNode.id],
          grounded_facts: [`Preserved in ${graph.manifest.name}`],
          source_refs: centerNode.source_refs,
        },
      ];

  const fallbackEpisode: PodcastEpisode = {
    id: `pod_${centerNode.id}_${Date.now()}`,
    entity_id: centerNode.id,
    entity_name: centerNode.label,
    entity_type: centerNode.type,
    corpus_id: graph.manifest.id,
    corpus_name: graph.manifest.name,
    title: currentLang === 'fr' ? `La Saga de ${centerNode.label}` : `The Saga of ${centerNode.label}`,
    duration_seconds: 180,
    tone,
    created_at: new Date().toISOString(),
    sections: fallbackSections,
    full_script: fallbackSections.map((s) => `[${s.timestamp}] ${s.speaker} (${s.title}):\n${s.text}`).join('\n\n'),
  };

  res.json({ episode: fallbackEpisode });
});

// 8. Extract Graph from Raw Mythological Text (AI Knowledge Graph Ingestion)
app.post('/api/extract-graph', async (req, res) => {
  const { text, corpus_name, culture_name, era, lang } = req.body;
  const currentLang = (lang as string) || 'en';

  if (!text || text.trim().length < 20) {
    return res.status(400).json({ error: 'Text of at least 20 characters is required for extraction' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.status(503).json({
      error: 'Gemini API key not configured. Please set GEMINI_API_KEY in the Secrets panel to use AI graph extraction.',
    });
  }

  try {
    const prompt = `You are a knowledge graph extractor specializing in mythology, folklore, and epic literature for GraphOdyssée.
Extract a clean, corpus-agnostic knowledge graph from the following mythological text.
Language of the output: ${currentLang === 'fr' ? 'French' : 'English'}.

Source Text:
"""
${text}
"""

EXTRACTION SCHEMA RULES:
1. Node Types (STRICTLY ONE OF): "Character", "Place", "Object", "Event", "Concept".
2. Relation Types: Use screaming snake case like "CHILD_OF", "SPOUSE_OF", "FOUGHT", "MET", "TOOK_PLACE_AT", "WORSHIPPED_AS", "GUARDS", "TRANSFORMED_INTO", "GUIDED_BY", "ALLIED_WITH", "SLAYED", "POSSESSES", "EMBODIES", "RULES_OVER".
3. Every node and edge MUST have a "source_refs" array with at least one citation citing the passage/text.
4. Do NOT invent fictional elements not in the text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            manifest: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                culture: { type: Type.STRING },
                language: { type: Type.STRING },
                era: { type: Type.STRING },
                description: { type: Type.STRING },
                icon: { type: Type.STRING },
                accent_color: { type: Type.STRING },
                license_note: { type: Type.STRING },
                default_voice: { type: Type.STRING },
                narrative_style: {
                  type: Type.OBJECT,
                  properties: {
                    tone: { type: Type.STRING },
                    length_seconds: { type: Type.NUMBER },
                  },
                  required: ['tone', 'length_seconds'],
                },
                featured_nodes: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['id', 'name', 'culture', 'description', 'narrative_style', 'featured_nodes'],
            },
            nodes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['Character', 'Place', 'Object', 'Event', 'Concept'] },
                  label: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  attributes: { type: Type.OBJECT },
                  source_refs: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        text: { type: Type.STRING },
                        passage: { type: Type.STRING },
                        citation_quote: { type: Type.STRING },
                      },
                      required: ['text'],
                    },
                  },
                },
                required: ['id', 'type', 'label', 'summary', 'source_refs'],
              },
            },
            edges: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  source: { type: Type.STRING },
                  target: { type: Type.STRING },
                  type: { type: Type.STRING },
                  label: { type: Type.STRING },
                  description: { type: Type.STRING },
                  source_refs: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        text: { type: Type.STRING },
                        citation_quote: { type: Type.STRING },
                      },
                    },
                  },
                },
                required: ['id', 'source', 'target', 'type', 'label'],
              },
            },
          },
          required: ['manifest', 'nodes', 'edges'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    const corpusId = parsed.manifest.id || `custom-${Date.now()}`;
    parsed.manifest.id = corpusId;
    parsed.manifest.name = corpus_name || parsed.manifest.name;
    parsed.manifest.culture = culture_name || parsed.manifest.culture;
    parsed.manifest.era = era || parsed.manifest.era;
    parsed.manifest.accent_color = parsed.manifest.accent_color || '#ec4899';
    parsed.manifest.icon = parsed.manifest.icon || 'BookOpen';

    // Stamp corpus_id on nodes & edges
    parsed.nodes.forEach((n: any) => (n.corpus_id = corpusId));
    parsed.edges.forEach((e: any) => (e.corpus_id = corpusId));

    // Save to dynamic corpora maps
    dynamicCorporaEn[corpusId] = parsed;
    dynamicCorporaFr[corpusId] = parsed;

    res.json({ success: true, graph: parsed });
  } catch (err: any) {
    console.error('Graph extraction failed:', err);
    res.status(500).json({ error: 'Failed to extract knowledge graph: ' + err.message });
  }
});

// 9. Save / import custom corpus
app.post('/api/save-corpus', (req, res) => {
  const { graph } = req.body;
  if (!graph || !graph.manifest || !graph.manifest.id || !graph.nodes) {
    return res.status(400).json({ error: 'Invalid mythology graph structure' });
  }
  dynamicCorporaEn[graph.manifest.id] = graph;
  dynamicCorporaFr[graph.manifest.id] = graph;
  res.json({ success: true, corpus_id: graph.manifest.id });
});

// Vite middleware for development & static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GraphOdyssée server running on http://localhost:${PORT}`);
  });
}

startServer();
