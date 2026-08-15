import React, { useState } from 'react';
import {
  GraphNode,
  GraphEdge,
  NodeType,
  CorpusManifest,
} from '../types/mythology';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Mic,
  BookOpen,
  GitCommit,
  Share2,
  Calendar,
  Compass,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Quote,
  Flame,
} from 'lucide-react';

interface EntityDossierProps {
  entity: GraphNode;
  manifest: CorpusManifest;
  edges: GraphEdge[];
  allNodes: GraphNode[];
  onClose: () => void;
  onSelectNode: (node: GraphNode) => void;
  onGeneratePodcast: (entity: GraphNode, tone: string, duration: number) => void;
  onStartPathFinding: (entity: GraphNode) => void;
  isGeneratingPodcast: boolean;
}

const TYPE_BADGE_STYLES: Record<NodeType, string> = {
  Character: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Place: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Object: 'bg-red-500/20 text-red-300 border-red-500/30',
  Event: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Concept: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
};

export const EntityDossier: React.FC<EntityDossierProps> = ({
  entity,
  manifest,
  edges,
  allNodes,
  onClose,
  onSelectNode,
  onGeneratePodcast,
  onStartPathFinding,
  isGeneratingPodcast,
}) => {
  const { lang, t } = useLanguage();
  const [selectedTone, setSelectedTone] = useState<string>(
    manifest.narrative_style?.tone || (lang === 'fr' ? 'Barde homérique, solennel et captivant' : 'Homeric Bard')
  );
  const [selectedDuration, setSelectedDuration] = useState<number>(180);
  const [activeTab, setActiveTab] = useState<'lore' | 'relations' | 'citations' | 'timeline'>('lore');

  // Filter edges connected to this entity
  const connectedEdges = edges.filter(
    (e) => e.source === entity.id || e.target === entity.id
  );

  // Group connected nodes
  const relatedNodePairs = connectedEdges.map((edge) => {
    const isOut = edge.source === entity.id;
    const targetId = isOut ? edge.target : edge.source;
    const targetNode = allNodes.find((n) => n.id === targetId);
    return {
      edge,
      isOut,
      targetNode,
    };
  }).filter((p) => p.targetNode !== undefined);

  // Associated events
  const relatedEvents = relatedNodePairs
    .filter((p) => p.targetNode?.type === 'Event')
    .map((p) => p.targetNode!)
    .sort((a, b) => (a.timeline_order || 99) - (b.timeline_order || 99));

  return (
    <aside
      id="entity-dossier-sidebar"
      className="w-full lg:w-[420px] h-full bg-[#0d1424]/95 backdrop-blur-xl border-l border-slate-700/60 flex flex-col shadow-2xl z-30 transition-all text-slate-200 overflow-hidden"
    >
      {/* Header Banner */}
      <div className="p-4 border-b border-slate-700/60 flex items-start justify-between bg-gradient-to-b from-slate-800/40 to-transparent">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${
                TYPE_BADGE_STYLES[entity.type] || TYPE_BADGE_STYLES.Character
              }`}
            >
              {t.types[entity.type] || entity.type}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {manifest.culture}
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-serif">
            {entity.label}
          </h2>
        </div>
        <button
          id="close-dossier-btn"
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={lang === 'fr' ? 'Fermer le dossier' : 'Close dossier'}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-700/60 bg-slate-900/40 text-xs font-medium">
        <button
          onClick={() => setActiveTab('lore')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            activeTab === 'lore'
              ? 'border-amber-400 text-amber-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.dossier.tabs.lore}
        </button>
        <button
          onClick={() => setActiveTab('relations')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'relations'
              ? 'border-amber-400 text-amber-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.dossier.tabs.relations}
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
            {relatedNodePairs.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('citations')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'citations'
              ? 'border-amber-400 text-amber-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.dossier.tabs.citations}
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
            {entity.source_refs.length}
          </span>
        </button>
        {relatedEvents.length > 0 && (
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              activeTab === 'timeline'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.dossier.tabs.timeline}
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
        {/* Tab 1: Lore & Attributes */}
        {activeTab === 'lore' && (
          <div className="space-y-4">
            {/* Bio Lore Summary */}
            <div className="bg-slate-800/40 rounded-xl p-3.5 border border-slate-700/50">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1.5">
                {t.dossier.mythRecord}
              </h3>
              <p className="text-slate-200 leading-relaxed text-sm">
                {entity.summary}
              </p>
            </div>

            {/* Entity Attributes Table */}
            {Object.keys(entity.attributes).length > 0 && (
              <div className="bg-slate-800/40 rounded-xl p-3.5 border border-slate-700/50">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                  {t.dossier.mythAttributes}
                </h3>
                <div className="space-y-2">
                  {Object.entries(entity.attributes).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:justify-between text-xs gap-1 py-1 border-b border-slate-700/30 last:border-0">
                      <span className="text-slate-400 font-medium capitalize">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span className="text-slate-200 font-medium text-right">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                id="pathfind-from-entity-btn"
                onClick={() => onStartPathFinding(entity)}
                className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-600 transition-colors flex items-center justify-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                {t.dossier.findPathTo}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Graph Relations */}
        {activeTab === 'relations' && (
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
              {t.dossier.connectedSubgraph(relatedNodePairs.length)}
            </h3>
            {relatedNodePairs.length === 0 ? (
              <p className="text-slate-400 text-xs italic">{t.dossier.noConnections}</p>
            ) : (
              relatedNodePairs.map(({ edge, isOut, targetNode }) => (
                <div
                  key={edge.id}
                  onClick={() => targetNode && onSelectNode(targetNode)}
                  className="group p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-amber-500/50 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-semibold">
                        {edge.label}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded ${
                          TYPE_BADGE_STYLES[targetNode!.type]
                        }`}
                      >
                        {t.types[targetNode!.type] || targetNode!.type}
                      </span>
                    </div>
                    <div className="font-semibold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {targetNode!.label}
                    </div>
                    {edge.description && (
                      <p className="text-[11px] text-slate-400 leading-snug line-clamp-1">
                        {edge.description}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Primary Citations */}
        {activeTab === 'citations' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                {t.dossier.primaryCitations}
              </h3>
              <span className="text-[10px] text-emerald-400 font-mono">{t.dossier.groundedPercent}</span>
            </div>
            {entity.source_refs.length === 0 ? (
              <p className="text-slate-400 text-xs italic">{t.dossier.noCitations}</p>
            ) : (
              entity.source_refs.map((ref, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      {ref.text}
                    </span>
                    <span className="text-slate-400 font-normal">
                      {ref.book ? (lang === 'fr' ? `Livre ${ref.book}` : `Book ${ref.book}`) : ''}{' '}
                      {ref.line_range ? (lang === 'fr' ? `vers ${ref.line_range}` : `ll. ${ref.line_range}`) : ''}
                      {ref.chapter ? (lang === 'fr' ? `Chap. ${ref.chapter}` : `Cap. ${ref.chapter}`) : ''}
                      {ref.passage ? `${ref.passage}` : ''}
                    </span>
                  </div>
                  {ref.citation_quote && (
                    <blockquote className="text-xs text-slate-300 italic pl-2.5 border-l-2 border-amber-500/50 leading-relaxed">
                      "{ref.citation_quote}"
                    </blockquote>
                  )}
                </div>
              ))
            )}
            <p className="text-[11px] text-slate-500 italic mt-2">
              {manifest.license_note}
            </p>
          </div>
        )}

        {/* Tab 4: Chronological Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
              {t.dossier.chronologicalEvents}
            </h3>
            <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
              {relatedEvents.map((ev, idx) => (
                <div
                  key={ev.id}
                  onClick={() => onSelectNode(ev)}
                  className="relative group cursor-pointer"
                >
                  <span className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-slate-900 group-hover:scale-125 transition-transform" />
                  <div className="bg-slate-800/40 group-hover:bg-slate-800 border border-slate-700/50 rounded-lg p-2.5 transition-all">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-purple-300 group-hover:text-purple-200">
                        {ev.label}
                      </span>
                      {ev.timeline_order && (
                        <span className="text-[10px] font-mono text-slate-400">
                          {t.dossier.step} #{ev.timeline_order}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {ev.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Podcast Generator Footer Card */}
      <div className="p-4 border-t border-slate-700/60 bg-gradient-to-t from-slate-950 via-[#101728] to-[#101728] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t.dossier.podcastEngine}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            ~{Math.round(selectedDuration / 60)} {t.dossier.minAudio}
          </span>
        </div>

        {/* Tone and Length Selector */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">{t.dossier.narratorTone}</label>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-amber-500"
            >
              {Object.entries(t.dossier.tones).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">{t.dossier.targetLength}</label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-amber-500"
            >
              <option value={90}>{t.dossier.durations[90]}</option>
              <option value={180}>{t.dossier.durations[180]}</option>
              <option value={300}>{t.dossier.durations[300]}</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <button
          id="generate-podcast-btn"
          disabled={isGeneratingPodcast}
          onClick={() => onGeneratePodcast(entity, selectedTone, selectedDuration)}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 ${
            isGeneratingPodcast
              ? 'bg-amber-600/50 text-amber-200 cursor-wait'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold hover:shadow-amber-500/20 active:scale-[0.98]'
          }`}
        >
          {isGeneratingPodcast ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              {t.dossier.generating}
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 text-slate-950" />
              {t.dossier.generateButton(entity.label)}
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

