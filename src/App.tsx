import React, { useState, useEffect, useCallback } from 'react';
import {
  CorpusManifest,
  MythologyGraph,
  GraphNode,
  GraphEdge,
  NodeType,
  PodcastEpisode,
  GraphPath,
} from './types/mythology';
import {
  fetchCorpora,
  fetchGraph,
  generatePodcast,
  saveCustomCorpus,
} from './api/client';
import { useLanguage } from './i18n/LanguageContext';
import { Navbar } from './components/Navbar';
import { GraphCanvas } from './components/GraphCanvas';
import { EntityDossier } from './components/EntityDossier';
import { PodcastModal } from './components/PodcastModal';
import { HybridSearchModal } from './components/HybridSearchModal';
import { PathFinderModal } from './components/PathFinderModal';
import { CorpusExtractorModal } from './components/CorpusExtractorModal';
import { PodcastLibraryModal } from './components/PodcastLibraryModal';
import {
  Compass,
  Sparkles,
  BookOpen,
  Radio,
  Layers,
  ChevronRight,
  Info,
  Flame,
} from 'lucide-react';

export default function App() {
  const { lang, t } = useLanguage();
  const [corpora, setCorpora] = useState<CorpusManifest[]>([]);
  const [activeCorpusId, setActiveCorpusId] = useState<string>('greek-odyssey');
  const [graph, setGraph] = useState<MythologyGraph | null>(null);
  const [loadingGraph, setLoadingGraph] = useState(true);

  // Selection and Canvas State
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<GraphPath | null>(null);
  const [activeTypeFilter, setActiveTypeFilter] = useState<Set<NodeType>>(
    new Set(['Character', 'Place', 'Object', 'Event', 'Concept'])
  );
  const [searchHighlightId, setSearchHighlightId] = useState<string | null>(null);

  // Modals & Drawers
  const [isHybridSearchOpen, setIsHybridSearchOpen] = useState(false);
  const [isPathFinderOpen, setIsPathFinderOpen] = useState(false);
  const [isExtractorOpen, setIsExtractorOpen] = useState(false);
  const [isEpisodeLibraryOpen, setIsEpisodeLibraryOpen] = useState(false);

  // Podcast State
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode | null>(null);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState(false);
  const [savedEpisodes, setSavedEpisodes] = useState<PodcastEpisode[]>(() => {
    try {
      const stored = localStorage.getItem('graphodyssee_episodes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save episodes to local storage
  const saveEpisodeToArchive = (ep: PodcastEpisode) => {
    setSavedEpisodes((prev) => {
      const updated = [ep, ...prev.filter((p) => p.id !== ep.id)];
      try {
        localStorage.setItem('graphodyssee_episodes', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const deleteEpisodeFromArchive = (epId: string) => {
    setSavedEpisodes((prev) => {
      const updated = prev.filter((p) => p.id !== epId);
      try {
        localStorage.setItem('graphodyssee_episodes', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // 1. Initial Corpora Fetch and re-fetch on language change
  useEffect(() => {
    async function loadCorpora() {
      try {
        const manifests = await fetchCorpora(lang);
        setCorpora(manifests);
      } catch (err) {
        console.error('Failed to load corpora:', err);
      }
    }
    loadCorpora();
  }, [lang]);

  // 2. Fetch Graph when Active Corpus or Language Changes
  useEffect(() => {
    async function loadGraph() {
      setLoadingGraph(true);
      // Preserve selected node if possible across language switch
      const currentSelectedId = selectedNode?.id;
      setHighlightedPath(null);
      setSearchHighlightId(null);
      try {
        const g = await fetchGraph(activeCorpusId, lang);
        setGraph(g);
        if (currentSelectedId) {
          const match = g.nodes.find((n) => n.id === currentSelectedId);
          if (match) setSelectedNode(match);
        }
      } catch (err) {
        console.error('Failed to load graph:', err);
      } finally {
        setLoadingGraph(false);
      }
    }
    loadGraph();
  }, [activeCorpusId, lang]);

  // Global Keyboard Shortcuts (Cmd+K for GraphRAG search, Esc to close/deselect)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsHybridSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsHybridSearchOpen(false);
        setIsPathFinderOpen(false);
        setIsExtractorOpen(false);
        setIsEpisodeLibraryOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Type Filter Toggle
  const handleToggleTypeFilter = (type: NodeType) => {
    setActiveTypeFilter((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size > 1) next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  // Handle Podcast Generation
  const handleGeneratePodcast = async (
    entity: GraphNode,
    tone: string,
    duration: number
  ) => {
    setIsGeneratingPodcast(true);
    try {
      const episode = await generatePodcast(entity.id, activeCorpusId, tone, duration, lang);
      setActiveEpisode(episode);
      saveEpisodeToArchive(episode);
    } catch (err: any) {
      alert(`Podcast generation error: ${err?.message || 'Could not generate episode'}`);
    } finally {
      setIsGeneratingPodcast(false);
    }
  };

  // Handle Ingested Custom Corpus
  const handleCorpusCreated = (newGraph: MythologyGraph) => {
    setCorpora((prev) => [newGraph.manifest, ...prev]);
    setActiveCorpusId(newGraph.manifest.id);
    setGraph(newGraph);
  };

  const activeManifest = corpora.find((c) => c.id === activeCorpusId) || graph?.manifest;

  return (
    <div className="w-screen h-screen flex flex-col bg-[#070b14] text-slate-100 overflow-hidden font-sans antialiased">
      {/* Top Application Navbar */}
      <Navbar
        corpora={corpora}
        activeCorpusId={activeCorpusId}
        onSelectCorpus={(id) => setActiveCorpusId(id)}
        nodes={graph?.nodes || []}
        onSelectNode={(node) => {
          setSelectedNode(node);
          setSearchHighlightId(node.id);
        }}
        onOpenHybridSearch={() => setIsHybridSearchOpen(true)}
        onOpenPathFinder={() => setIsPathFinderOpen(true)}
        onOpenExtractor={() => setIsExtractorOpen(true)}
        onOpenEpisodeLibrary={() => setIsEpisodeLibraryOpen(true)}
        savedEpisodesCount={savedEpisodes.length}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Left / Center: Interactive Knowledge Graph Canvas */}
        <main className="flex-1 relative h-full">
          {loadingGraph ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#0a0f1d] text-slate-400">
              <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span className="font-serif text-sm">{t.canvas.traversing}</span>
            </div>
          ) : graph ? (
            <GraphCanvas
              nodes={graph.nodes}
              edges={graph.edges}
              selectedNodeId={selectedNode?.id || null}
              onSelectNode={(node) => {
                setSelectedNode(node);
                setSearchHighlightId(null);
              }}
              highlightedPath={highlightedPath}
              activeTypeFilter={activeTypeFilter}
              onToggleTypeFilter={handleToggleTypeFilter}
              searchHighlightId={searchHighlightId}
            />
          ) : null}

          {/* Quick Guide Overlay (when no entity selected) */}
          {!selectedNode && graph && (
            <div className="absolute bottom-6 left-6 max-w-md bg-[#0d1424]/90 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 shadow-2xl pointer-events-auto text-xs space-y-2 hidden sm:block">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 font-serif text-sm">
                  {graph.manifest.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {graph.nodes.length} {t.dossier.nodesLabel} • {graph.edges.length} {t.dossier.relationsLabel}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {graph.manifest.description}
              </p>
              {graph.manifest.featured_nodes && graph.manifest.featured_nodes.length > 0 && (
                <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-400 font-medium">{t.canvas.explorePrefix}</span>
                  {graph.manifest.featured_nodes.map((fid) => {
                    const nodeObj = graph.nodes.find((n) => n.id === fid);
                    if (!nodeObj) return null;
                    return (
                      <button
                        key={fid}
                        onClick={() => setSelectedNode(nodeObj)}
                        className="px-2 py-0.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 transition-colors font-medium"
                      >
                        {nodeObj.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>

        {/* Right Slide-out Sidebar: Entity Dossier */}
        {selectedNode && activeManifest && graph && (
          <EntityDossier
            entity={selectedNode}
            manifest={activeManifest}
            edges={graph.edges}
            allNodes={graph.nodes}
            onClose={() => setSelectedNode(null)}
            onSelectNode={(node) => setSelectedNode(node)}
            onGeneratePodcast={handleGeneratePodcast}
            onStartPathFinding={(entity) => {
              setIsPathFinderOpen(true);
            }}
            isGeneratingPodcast={isGeneratingPodcast}
          />
        )}
      </div>

      {/* Podcast Audio Player Modal */}
      {activeEpisode && (
        <PodcastModal
          episode={activeEpisode}
          onClose={() => setActiveEpisode(null)}
          allNodes={graph?.nodes || []}
          onSelectNode={(node) => {
            setSelectedNode(node);
            setActiveEpisode(null);
          }}
        />
      )}

      {/* GraphRAG QA Search Modal */}
      {isHybridSearchOpen && activeManifest && (
        <HybridSearchModal
          corpusManifest={activeManifest}
          onClose={() => setIsHybridSearchOpen(false)}
          onSelectNode={(node) => {
            setSelectedNode(node);
            setSearchHighlightId(node.id);
          }}
        />
      )}

      {/* Path Finder Modal */}
      {isPathFinderOpen && activeManifest && graph && (
        <PathFinderModal
          nodes={graph.nodes}
          corpusManifest={activeManifest}
          initialStartNode={selectedNode}
          onClose={() => setIsPathFinderOpen(false)}
          onApplyPath={(path) => setHighlightedPath(path)}
          onSelectNode={(node) => setSelectedNode(node)}
        />
      )}

      {/* Ingestion & Extraction Modal */}
      {isExtractorOpen && (
        <CorpusExtractorModal
          onClose={() => setIsExtractorOpen(false)}
          onCorpusCreated={handleCorpusCreated}
        />
      )}

      {/* Episode Library Archives Modal */}
      {isEpisodeLibraryOpen && (
        <PodcastLibraryModal
          episodes={savedEpisodes}
          onPlayEpisode={(ep) => setActiveEpisode(ep)}
          onDeleteEpisode={deleteEpisodeFromArchive}
          onClose={() => setIsEpisodeLibraryOpen(false)}
        />
      )}
    </div>
  );
}

