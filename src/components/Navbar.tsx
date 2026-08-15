import React, { useState, useRef, useEffect } from 'react';
import { CorpusManifest, GraphNode } from '../types/mythology';
import {
  Sparkles,
  Compass,
  Search,
  BookOpen,
  ChevronDown,
  Layers,
  Radio,
  Plus,
  Flame,
  Globe,
  Disc,
} from 'lucide-react';

interface NavbarProps {
  corpora: CorpusManifest[];
  activeCorpusId: string;
  onSelectCorpus: (corpusId: string) => void;
  nodes: GraphNode[];
  onSelectNode: (node: GraphNode) => void;
  onOpenHybridSearch: () => void;
  onOpenPathFinder: () => void;
  onOpenExtractor: () => void;
  onOpenEpisodeLibrary: () => void;
  savedEpisodesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  corpora,
  activeCorpusId,
  onSelectCorpus,
  nodes,
  onSelectNode,
  onOpenHybridSearch,
  onOpenPathFinder,
  onOpenExtractor,
  onOpenEpisodeLibrary,
  savedEpisodesCount,
}) => {
  const [corpusDropdownOpen, setCorpusDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const activeManifest = corpora.find((c) => c.id === activeCorpusId) || corpora[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCorpusDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered nodes for quick autocomplete search
  const filteredNodes = searchQuery.trim()
    ? nodes.filter((n) =>
        n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.summary.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <header
      id="app-navbar"
      className="h-16 bg-[#0a0f1d]/95 backdrop-blur-md border-b border-slate-700/60 px-4 flex items-center justify-between z-40 relative text-slate-200 select-none"
    >
      {/* Brand & Corpus Switcher */}
      <div className="flex items-center gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/40">
            <Compass className="w-5 h-5 text-slate-950 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              GraphOdyssée
              <span className="text-[10px] font-sans font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                GraphRAG
              </span>
            </span>
          </div>
        </div>

        {/* Corpus Dropdown Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            id="corpus-selector-dropdown-btn"
            onClick={() => setCorpusDropdownOpen(!corpusDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs transition-all shadow-sm"
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: activeManifest?.accent_color || '#f59e0b' }}
            />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-white truncate max-w-[150px] sm:max-w-[200px]">
                {activeManifest?.name || 'Select Corpus'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono leading-none">
                {activeManifest?.culture}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {/* Dropdown Menu */}
          {corpusDropdownOpen && (
            <div
              id="corpus-dropdown-menu"
              className="absolute left-0 top-full mt-2 w-80 bg-[#0d1424] border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800 flex items-center justify-between">
                <span>Select Mythology Corpus</span>
                <span>{corpora.length} Available</span>
              </div>
              <div className="py-1 max-h-80 overflow-y-auto space-y-1">
                {corpora.map((corpus) => {
                  const isActive = corpus.id === activeCorpusId;
                  return (
                    <div
                      key={corpus.id}
                      onClick={() => {
                        onSelectCorpus(corpus.id);
                        setCorpusDropdownOpen(false);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-start justify-between ${
                        isActive
                          ? 'bg-amber-500/20 border border-amber-500/40 text-white'
                          : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="space-y-0.5 pr-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: corpus.accent_color || '#f59e0b' }}
                          />
                          <span className="font-semibold text-xs text-white">
                            {corpus.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {corpus.culture} • {corpus.era}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {corpus.node_count || 0} nodes
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ingestion button shortcut */}
              <div className="pt-2 border-t border-slate-800 mt-1">
                <button
                  id="add-corpus-shortcut-btn"
                  onClick={() => {
                    setCorpusDropdownOpen(false);
                    onOpenExtractor();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-pink-300 border border-slate-700 hover:border-pink-500/40 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Ingest New Myth / Custom Corpus with AI
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Autocomplete Node Search */}
      <div className="relative hidden md:block w-72 lg:w-96" ref={searchContainerRef}>
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            id="node-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            placeholder={`Search ${nodes.length} entities in ${activeManifest?.name}...`}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-inner"
          />
        </div>

        {/* Autocomplete Dropdown */}
        {searchFocused && filteredNodes.length > 0 && (
          <div
            id="node-search-results-dropdown"
            className="absolute left-0 top-full mt-2 w-full bg-[#0d1424] border border-slate-700/80 rounded-xl shadow-2xl p-1.5 z-50"
          >
            {filteredNodes.map((node) => (
              <div
                key={node.id}
                onClick={() => {
                  onSelectNode(node);
                  setSearchFocused(false);
                  setSearchQuery('');
                }}
                className="p-2 rounded-lg hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-xs text-white group-hover:text-amber-300 transition-colors">
                    {node.label}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {node.summary}
                  </p>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  {node.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Navigation Action Buttons */}
      <div className="flex items-center gap-2">
        {/* GraphRAG QA Search */}
        <button
          id="open-hybrid-search-btn"
          onClick={onOpenHybridSearch}
          className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all flex items-center gap-1.5"
          title="GraphRAG Natural Language Engine"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">GraphRAG QA</span>
        </button>

        {/* Path Finder */}
        <button
          id="open-pathfinder-btn"
          onClick={onOpenPathFinder}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
          title="Find shortest mythic connection path"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Path Finder</span>
        </button>

        {/* Ingest Corpus */}
        <button
          id="open-extractor-btn"
          onClick={onOpenExtractor}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
          title="Extract Knowledge Graph from Raw Story Text"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Ingest Text</span>
        </button>

        {/* Podcast Episodes Library */}
        <button
          id="open-episodes-library-btn"
          onClick={onOpenEpisodeLibrary}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5 relative"
          title="View Generated Podcast Episodes"
        >
          <Radio className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Podcasts</span>
          {savedEpisodesCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
              {savedEpisodesCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
