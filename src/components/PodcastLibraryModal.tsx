import React from 'react';
import { PodcastEpisode } from '../types/mythology';
import { useLanguage } from '../i18n/LanguageContext';
import { Radio, Play, Trash2, X, Clock, Sparkles } from 'lucide-react';

interface PodcastLibraryModalProps {
  episodes: PodcastEpisode[];
  onPlayEpisode: (episode: PodcastEpisode) => void;
  onDeleteEpisode: (episodeId: string) => void;
  onClose: () => void;
}

export const PodcastLibraryModal: React.FC<PodcastLibraryModalProps> = ({
  episodes,
  onPlayEpisode,
  onDeleteEpisode,
  onClose,
}) => {
  const { lang, t } = useLanguage();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="podcast-library-modal-container"
        className="w-full max-w-2xl bg-[#0b1120] border border-slate-700/80 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-slate-200"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-serif">
                {t.library.title}
              </h2>
              <p className="text-xs text-slate-400">
                {t.library.episodesAvailable(episodes.length)}
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

        {/* Content */}
        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
          {episodes.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 text-amber-400/50 mx-auto" />
              <p className="text-sm">{t.library.noEpisodes}</p>
              <p className="text-xs text-slate-500">
                {t.library.noEpisodesSub}
              </p>
            </div>
          ) : (
            episodes.map((ep) => (
              <div
                key={ep.id}
                className="p-3.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 rounded-xl flex items-center justify-between transition-all group"
              >
                <div className="space-y-1 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white group-hover:text-amber-300 transition-colors">
                      {ep.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                      {ep.corpus_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{t.library.entity}: {ep.entity_name} ({t.types[ep.entity_type] || ep.entity_type})</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {Math.round(ep.duration_seconds / 60)} min ({t.library.chapters(ep.sections.length)})
                    </span>
                    <span>•</span>
                    <span className="text-[11px] text-slate-500">
                      {new Date(ep.created_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      onPlayEpisode(ep);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-md flex items-center gap-1.5 text-xs"
                    title={t.library.play}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    {t.library.play}
                  </button>
                  <button
                    onClick={() => onDeleteEpisode(ep.id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-700/50 transition-colors"
                    title={t.library.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

