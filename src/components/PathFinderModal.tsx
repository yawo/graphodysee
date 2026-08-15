import React, { useState } from 'react';
import { GraphNode, GraphPath, CorpusManifest } from '../types/mythology';
import { fetchShortestPath } from '../api/client';
import { useLanguage } from '../i18n/LanguageContext';
import { Compass, ArrowRight, Sparkles, X, Check, Eye } from 'lucide-react';

interface PathFinderModalProps {
  nodes: GraphNode[];
  corpusManifest: CorpusManifest;
  initialStartNode: GraphNode | null;
  onClose: () => void;
  onApplyPath: (path: GraphPath | null) => void;
  onSelectNode: (node: GraphNode) => void;
}

export const PathFinderModal: React.FC<PathFinderModalProps> = ({
  nodes,
  corpusManifest,
  initialStartNode,
  onClose,
  onApplyPath,
  onSelectNode,
}) => {
  const { lang, t } = useLanguage();
  const [startId, setStartId] = useState<string>(initialStartNode?.id || (nodes[0]?.id || ''));
  const [endId, setEndId] = useState<string>(nodes[1]?.id || '');
  const [pathResult, setPathResult] = useState<GraphPath | null>(null);
  const [noPathFound, setNoPathFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFindPath = async () => {
    if (!startId || !endId || startId === endId) return;
    setLoading(true);
    setNoPathFound(false);
    try {
      const res = await fetchShortestPath(startId, endId, corpusManifest.id, lang);
      if (res && res.nodes.length > 0) {
        setPathResult(res);
        onApplyPath(res);
      } else {
        setPathResult(null);
        setNoPathFound(true);
        onApplyPath(null);
      }
    } catch (err) {
      setNoPathFound(true);
      onApplyPath(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="pathfinder-modal-container"
        className="w-full max-w-xl bg-[#0b1120] border border-slate-700/80 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-slate-200"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-serif">
                {t.path.finderTitle}
              </h2>
              <p className="text-xs text-slate-400">
                {t.path.finderSubtitle(corpusManifest.name)}
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

        {/* Inputs */}
        <div className="p-5 space-y-4 bg-slate-950/40 border-b border-slate-700/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                {t.path.originEntity}
              </label>
              <select
                id="pathfinder-start-select"
                value={startId}
                onChange={(e) => setStartId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {nodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label} ({t.types[n.type] || n.type})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                {t.path.targetEntity}
              </label>
              <select
                id="pathfinder-end-select"
                value={endId}
                onChange={(e) => setEndId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {nodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label} ({t.types[n.type] || n.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            id="pathfinder-calculate-btn"
            onClick={handleFindPath}
            disabled={loading || startId === endId}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                {t.path.findButton}
              </>
            )}
          </button>
        </div>

        {/* Results */}
        <div className="p-5 space-y-3 max-h-72 overflow-y-auto">
          {noPathFound && (
            <p className="text-xs text-amber-400 italic text-center py-4">
              {t.path.noPathFound}
            </p>
          )}

          {pathResult && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
                <span>{t.path.pathFound(pathResult.edges.length)}</span>
                <span className="text-[11px] text-emerald-400">{t.path.highlighted}</span>
              </div>

              {/* Step-by-step route visualization */}
              <div className="space-y-2">
                {pathResult.nodes.map((node, idx) => {
                  const edge = pathResult.edges[idx];
                  return (
                    <React.Fragment key={node.id}>
                      <div
                        onClick={() => {
                          onSelectNode(node);
                          onClose();
                        }}
                        className="p-3 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-xs text-white">
                            {node.label}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-700 text-slate-300">
                            {t.types[node.type] || node.type}
                          </span>
                        </div>
                        <Eye className="w-4 h-4 text-slate-400 hover:text-white" />
                      </div>

                      {edge && (
                        <div className="flex items-center justify-center gap-2 text-[11px] text-amber-300/90 font-mono py-0.5">
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                            ↓ {edge.label}
                          </span>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

