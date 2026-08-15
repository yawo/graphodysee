import React, { useState, useEffect, useRef } from 'react';
import { PodcastEpisode, PodcastScriptSection, GraphNode } from '../types/mythology';
import { globalAudioPlayer } from '../utils/audio';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Download,
  Copy,
  Check,
  X,
  Sparkles,
  BookOpen,
  Mic,
  Disc,
  FastForward,
  Clock,
  Radio,
} from 'lucide-react';

interface PodcastModalProps {
  episode: PodcastEpisode | null;
  onClose: () => void;
  allNodes: GraphNode[];
  onSelectNode: (node: GraphNode) => void;
}

export const PodcastModal: React.FC<PodcastModalProps> = ({
  episode,
  onClose,
  allNodes,
  onSelectNode,
}) => {
  const { lang, t } = useLanguage();
  if (!episode) return null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [copied, setCopied] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  const waveformCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Update audio player language
  useEffect(() => {
    globalAudioPlayer.setLang(lang);
  }, [lang]);

  // Initialize voices
  useEffect(() => {
    const updateVoices = () => {
      const voices = globalAudioPlayer.getAvailableVoices();
      setAvailableVoices(voices);
      if (voices.length > 0 && !selectedVoice) {
        const preferred = voices.find(
          (v) =>
            v.lang.startsWith(lang) &&
            (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Thomas') || v.name.includes('Audrey') || v.name.includes('Male'))
        );
        setSelectedVoice(preferred ? preferred.name : voices[0].name);
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [lang]);

  // Hook audio player state
  useEffect(() => {
    globalAudioPlayer.setCallbacks(
      (idx) => {
        setActiveSectionIndex(idx);
        sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      },
      (playing, paused) => {
        setIsPlaying(playing);
        setIsPaused(paused);
      }
    );

    // Auto-start playback on modal mount
    if (episode.sections.length > 0) {
      globalAudioPlayer.startPodcast(episode.sections, 0);
    }

    return () => {
      globalAudioPlayer.stop();
    };
  }, [episode]);

  // Waveform visualization animation
  useEffect(() => {
    let animId: number;
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const barCount = 48;

    const renderWaveform = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + 2);
        let barHeight = 4;

        if (isPlaying && !isPaused) {
          // Dynamic animated wave
          const freq = Math.sin(phase + i * 0.25) * 0.5 + 0.5;
          const noise = Math.sin(phase * 1.5 + i * 0.4) * 0.3;
          barHeight = Math.max(4, (freq + noise) * (height * 0.85));
        } else {
          // Subtle idle pulse
          barHeight = 4 + Math.sin(phase * 0.5 + i * 0.1) * 2;
        }

        const y = (height - barHeight) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, '#f59e0b');
        grad.addColorStop(1, '#d97706');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      phase += isPlaying && !isPaused ? 0.15 : 0.03;
      animId = requestAnimationFrame(renderWaveform);
    };

    animId = requestAnimationFrame(renderWaveform);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isPaused]);

  const handleTogglePlay = () => {
    globalAudioPlayer.togglePlayPause();
  };

  const handleJumpSection = (idx: number) => {
    globalAudioPlayer.playSection(idx);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    globalAudioPlayer.setRate(speed);
  };

  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoice(voiceName);
    globalAudioPlayer.setVoice(voiceName);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(episode.full_script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# ${episode.title}\n**Corpus:** ${episode.corpus_name}\n**Entity:** ${episode.entity_name} (${episode.entity_type})\n**Tone:** ${episode.tone}\n**Generated on:** ${new Date(episode.created_at).toLocaleString()}\n\n---\n\n${episode.sections.map((s) => `### [${s.timestamp}] ${s.title} — *${s.speaker}*\n${s.audio_cue ? `> 🎵 *${s.audio_cue}*\n\n` : ''}${s.text}\n\n**Grounded Facts:**\n${s.grounded_facts.map((f) => `- ${f}`).join('\n')}\n`).join('\n---\n\n')}`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${episode.title.toLowerCase().replace(/\s+/g, '_')}_script.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeSection = episode.sections[activeSectionIndex] || episode.sections[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="podcast-modal-container"
        className="w-full max-w-5xl h-[88vh] bg-[#0b1120] border border-slate-700/80 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-slate-200"
      >
        {/* Modal Top Header */}
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {t.podcast.audioEpisode}
                </span>
                <span className="text-xs text-slate-400">{episode.corpus_name}</span>
              </div>
              <h2 className="text-xl font-bold text-white font-serif tracking-tight mt-0.5">
                {episode.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyScript}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
              title={t.podcast.copy}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? t.podcast.copied : t.podcast.copy}
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Download script as Markdown"
            >
              <Download className="w-4 h-4" />
              Markdown
            </button>
            <button
              id="close-podcast-modal-btn"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio Player Controller Bar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Main Controls & Waveform */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              id="podcast-play-pause-btn"
              onClick={handleTogglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex-shrink-0"
            >
              {isPlaying && !isPaused ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">
                {t.podcast.chapter(activeSectionIndex + 1, episode.sections.length)}
              </span>
              <span className="text-xs text-amber-300 font-medium">
                {activeSection?.title || 'Prologue'}
              </span>
            </div>

            {/* Waveform Visualizer Canvas */}
            <canvas
              ref={waveformCanvasRef}
              width={160}
              height={32}
              className="h-8 rounded bg-slate-950/60 px-1"
            />
          </div>

          {/* Speed & Voice Switchers */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Speed Selector */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-2 py-1 rounded font-mono ${
                    playbackSpeed === speed
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Voice Dropdown */}
            {availableVoices.length > 0 && (
              <select
                value={selectedVoice}
                onChange={(e) => handleVoiceChange(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-amber-500 max-w-[140px] truncate"
              >
                {availableVoices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name.replace(/(Google|Microsoft|Apple|Natural)\s*/g, '')}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Modal Split View: Transcript on left, Live Grounded Facts on right */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Synchronized Interactive Transcript (7 cols) */}
          <div className="lg:col-span-7 border-r border-slate-700/60 overflow-y-auto p-6 space-y-4 bg-[#0d1424]">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-semibold uppercase tracking-wider">{t.podcast.syncedTranscript}</span>
              <span>{t.podcast.clickToJump}</span>
            </div>

            {episode.sections.map((section, idx) => {
              const isActive = activeSectionIndex === idx;
              return (
                <div
                  key={idx}
                  ref={(el) => (sectionRefs.current[idx] = el)}
                  onClick={() => handleJumpSection(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/40 shadow-lg'
                      : 'bg-slate-850/50 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                        {section.timestamp}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {section.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 italic">
                      {t.podcast.voice}: {section.speaker}
                    </span>
                  </div>

                  {section.audio_cue && (
                    <div className="text-[11px] text-amber-400/80 font-mono italic mb-2">
                      🎵 {section.audio_cue}
                    </div>
                  )}

                  <p className="text-sm leading-relaxed text-slate-100 font-sans">
                    {section.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Graph Facts & Citations for Active Chapter (5 cols) */}
          <div className="lg:col-span-5 overflow-y-auto p-6 space-y-4 bg-slate-900/40">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.podcast.groundedFacts}</span>
            </div>

            {/* Active Chapter Header */}
            <div className="bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/60">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wide">
                {t.podcast.activeChapter(activeSectionIndex + 1)}
              </span>
              <h3 className="text-base font-bold text-white font-serif mt-0.5">
                {activeSection?.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {t.podcast.narratedBy}: <strong className="text-slate-200">{activeSection?.speaker}</strong>
              </p>
            </div>

            {/* Grounded Nodes Pills */}
            {activeSection?.grounded_node_ids && activeSection.grounded_node_ids.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  {t.podcast.referencedEntities}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSection.grounded_node_ids.map((nodeId) => {
                    const nodeObj = allNodes.find((n) => n.id === nodeId);
                    return (
                      <button
                        key={nodeId}
                        onClick={() => nodeObj && onSelectNode(nodeObj)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        {nodeObj ? nodeObj.label : nodeId}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Grounded Facts List */}
            {activeSection?.grounded_facts && activeSection.grounded_facts.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  {t.podcast.verifiedFacts}
                </span>
                <div className="space-y-2">
                  {activeSection.grounded_facts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50 leading-relaxed"
                    >
                      • {fact}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Source Citations */}
            {activeSection?.source_refs && activeSection.source_refs.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  {t.podcast.primaryCitations}
                </span>
                <div className="space-y-2">
                  {activeSection.source_refs.map((ref, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/80 text-xs space-y-1"
                    >
                      <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {ref.text}
                      </div>
                      {ref.citation_quote && (
                        <p className="italic text-slate-300 text-[11px] border-l-2 border-amber-500/50 pl-2">
                          "{ref.citation_quote}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

