import React, { useState } from 'react';
import { performHybridSearch } from '../api/client';
import { HybridSearchResult, GraphNode, CorpusManifest } from '../types/mythology';
import {
  Search,
  Sparkles,
  X,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Cpu,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface HybridSearchModalProps {
  corpusManifest: CorpusManifest;
  onClose: () => void;
  onSelectNode: (node: GraphNode) => void;
}

const SAMPLE_QUERIES: Record<string, string[]> = {
  'greek-odyssey': [
    'How did Odysseus blind Polyphemus and escape his cave?',
    'What was Circe’s magic and how did Hermes help Odysseus resist it?',
    'Why did Poseidon seek vengeance against Odysseus?',
  ],
  'egyptian-mythology': [
    'Why did Set murder Osiris and dismember his body?',
    'How did Anubis assist Isis in the first mummification?',
    'What happens in the Weighing of the Heart before the scales of Ma’at?',
  ],
  'norse-mythology': [
    'How did Loki orchestrate the death of Baldr using mistletoe?',
    'Why did Odin sacrifice his eye at Mímir’s well?',
    'What is the prophecy of Ragnarök and the world serpent Jörmungandr?',
  ],
  'hindu-mythology': [
    'How did Krishna deliver the Bhagavad Gita to Arjuna before the Kurukshetra war?',
    'Why did Hanuman fly to Mount Dronagiri for the Sanjeevani herb?',
    'What is the concept of Dharma in the epic trials of Rama and Arjuna?',
  ],
  'catholic-saints': [
    'How did Saint Michael defeat Lucifer and the dragon in celestial battle?',
    'What voices inspired Saint Joan of Arc at Domrémy and Orléans?',
    'How did Saint Francis receive the sacred stigmata on Mount La Verna?',
  ],
};

export const HybridSearchModal: React.FC<HybridSearchModalProps> = ({
  corpusManifest,
  onClose,
  onSelectNode,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HybridSearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sampleQueries = SAMPLE_QUERIES[corpusManifest.id] || SAMPLE_QUERIES['greek-odyssey'];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await performHybridSearch(searchQuery, corpusManifest.id);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="hybrid-search-modal-container"
        className="w-full max-w-3xl max-h-[85vh] bg-[#0b1120] border border-slate-700/80 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-slate-200"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-serif">
                GraphRAG Natural Language Engine
              </h2>
              <p className="text-xs text-slate-400">
                Corpus-grounded retrieval for <strong>{corpusManifest.name}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-700/60 bg-slate-950/40 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="relative flex items-center"
          >
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
            <input
              id="hybrid-search-query-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Ask any question about ${corpusManifest.name}...`}
              className="w-full pl-10 pr-24 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-inner"
            />
            <button
              id="hybrid-search-submit-btn"
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Query
                </>
              )}
            </button>
          </form>

          {/* Sample Prompts */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] text-slate-400">Try asking:</span>
            {sampleQueries.map((sample, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(sample);
                  handleSearch(sample);
                }}
                className="px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700 transition-colors"
              >
                "{sample}"
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-500/50 rounded-xl text-xs text-red-300">
              {error}
            </div>
          )}

          {loading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400 text-sm">
              <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <span>Traversing knowledge graph and synthesizing grounded facts...</span>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Synthesized Answer */}
              <div className="bg-slate-800/60 border border-cyan-500/30 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-cyan-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Grounded GraphRAG Answer
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {result.reasoning}
                  </span>
                </div>
                <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-line">
                  {result.answer}
                </p>
              </div>

              {/* Matched Entities Subgraph */}
              {result.matching_nodes.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    Retrieved Graph Entities ({result.matching_nodes.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.matching_nodes.map((node) => (
                      <div
                        key={node.id}
                        onClick={() => {
                          onSelectNode(node);
                          onClose();
                        }}
                        className="p-3 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/50 rounded-xl cursor-pointer transition-all flex items-start justify-between group"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-white group-hover:text-amber-300 transition-colors">
                              {node.label}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-700 text-slate-300">
                              {node.type}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2">
                            {node.summary}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Source Citations */}
              {result.source_refs.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    Verified Citations Grounding This Result
                  </h3>
                  <div className="space-y-2">
                    {result.source_refs.slice(0, 4).map((ref, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-800/40 border border-slate-700/50 rounded-lg text-xs"
                      >
                        <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          {ref.text}
                          <span className="font-normal text-slate-400">
                            {ref.book ? `Book ${ref.book}` : ''} {ref.line_range ? `ll. ${ref.line_range}` : ''} {ref.chapter ? `Cap. ${ref.chapter}` : ''}
                          </span>
                        </div>
                        {ref.citation_quote && (
                          <p className="italic text-slate-300 text-[11px] mt-1 pl-2 border-l border-amber-500/40">
                            "{ref.citation_quote}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
