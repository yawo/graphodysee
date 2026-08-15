import React, { useState } from 'react';
import { extractKnowledgeGraph } from '../api/client';
import { MythologyGraph } from '../types/mythology';
import { useLanguage } from '../i18n/LanguageContext';
import { BookOpen, Sparkles, X, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

interface CorpusExtractorModalProps {
  onClose: () => void;
  onCorpusCreated: (graph: MythologyGraph) => void;
}

const SAMPLE_CUSTOM_TEXT_EN = `Gilgamesh, King of Uruk, two-thirds divine and one-third human, ruled the great walled city of Uruk in ancient Mesopotamia. Oppressed by his arrogance, the citizens cried out to the sky-god Anu, who created Enkidu, a wild man formed of clay in the wilderness to be a companion and equal to Gilgamesh.

Enkidu fought Gilgamesh at the gates of Uruk, but after their fierce battle they forged an unbreakable brotherhood. Together they journeyed to the Cedar Forest guarded by the ferocious monster Humbaba. Aided by the solar deity Shamash, they slew Humbaba and felled the sacred cedar trees.

Later, the goddess Ishtar proposed marriage to Gilgamesh, but he rejected her disdainfully. Enraged, Ishtar sent the celestial Bull of Heaven to ravage Uruk. Gilgamesh and Enkidu together wrestled and killed the Bull of Heaven. As retribution for killing the Bull and Humbaba, the gods decreed that Enkidu must perish. Following Enkidu's tragic death, Gilgamesh traversed the Waters of Death to seek the immortal sage Utnapishtim to learn the secret of eternal life.`;

const SAMPLE_CUSTOM_TEXT_FR = `Gilgamesh, roi d'Ourouk, aux deux tiers divin et un tiers humain, régnait sur la grande cité fortifiée d'Ourouk en Mésopotamie antique. Opprimés par son arrogance, les citoyens implorèrent le dieu du ciel Anou, qui façonna Enkidu, un homme sauvage formé d'argile dans la steppe pour être le compagnon et l'égal de Gilgamesh.

Enkidu affronta Gilgamesh aux portes d'Ourouk, mais après leur féroce combat, ils forgèrent une fraternité indestructible. Ensemble, ils voyagèrent vers la Forêt des Cèdres gardée par le redoutable monstre Humbaba. Guidés par la divinité solaire Shamash, ils terrassèrent Humbaba et abattirent les cèdres sacrés.

Plus tard, la déesse Ishtar demanda Gilgamesh en mariage, mais le roi la rejeta avec dédain. Furieuse, Ishtar envoya le Taureau Céleste dévaster Ourouk. Gilgamesh et Enkidu combattirent et tuèrent le Taureau Céleste. En châtiment pour avoir occis le Taureau et Humbaba, les dieux décrétèrent la mort d'Enkidu. Après le trépas tragique d'Enkidu, Gilgamesh traversa les Eaux de la Mort à la recherche du sage immortel Outanapishtim pour percer le secret de la vie éternelle.`;

export const CorpusExtractorModal: React.FC<CorpusExtractorModalProps> = ({
  onClose,
  onCorpusCreated,
}) => {
  const { lang, t } = useLanguage();
  const sampleText = lang === 'fr' ? SAMPLE_CUSTOM_TEXT_FR : SAMPLE_CUSTOM_TEXT_EN;
  const defaultTitle = lang === 'fr' ? "L'Épopée de Gilgamesh" : 'Epic of Gilgamesh';
  const defaultCulture = lang === 'fr' ? 'Mésopotamienne / Sumérienne' : 'Mesopotamian / Sumerian';
  const defaultEra = lang === 'fr' ? 'v. 2100 av. J.-C. - 1200 av. J.-C.' : 'c. 2100 BCE - 1200 BCE';

  const [corpusName, setCorpusName] = useState(defaultTitle);
  const [cultureName, setCultureName] = useState(defaultCulture);
  const [era, setEra] = useState(defaultEra);
  const [text, setText] = useState(sampleText);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async () => {
    if (!text.trim() || text.length < 20) {
      setError(
        lang === 'fr'
          ? 'Veuillez fournir au moins quelques phrases de récit mythologique.'
          : 'Please provide at least a few sentences of mythological narrative.'
      );
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const extractedGraph = await extractKnowledgeGraph(text, corpusName, cultureName, era, lang);
      onCorpusCreated(extractedGraph);
      onClose();
    } catch (err: any) {
      setError(err.message || (lang === 'fr' ? "Échec de l'extraction du graphe" : 'Failed to extract knowledge graph'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="corpus-extractor-modal-container"
        className="w-full max-w-2xl bg-[#0b1120] border border-slate-700/80 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-slate-200"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/40">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-serif">
                {t.extractor.title}
              </h2>
              <p className="text-xs text-slate-400">
                {t.extractor.subtitle}
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

        {/* Content Form */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                {t.extractor.corpusTitle}
              </label>
              <input
                id="extractor-corpus-name-input"
                type="text"
                value={corpusName}
                onChange={(e) => setCorpusName(e.target.value)}
                placeholder={lang === 'fr' ? 'ex. L’Épopée de Gilgamesh' : 'e.g. Epic of Gilgamesh'}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                {t.extractor.culture}
              </label>
              <input
                id="extractor-culture-name-input"
                type="text"
                value={cultureName}
                onChange={(e) => setCultureName(e.target.value)}
                placeholder={lang === 'fr' ? 'ex. Mésopotamienne' : 'e.g. Mesopotamian'}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                {t.extractor.era}
              </label>
              <input
                id="extractor-era-input"
                type="text"
                value={era}
                onChange={(e) => setEra(e.target.value)}
                placeholder={lang === 'fr' ? 'ex. v. 2100 av. J.-C.' : 'e.g. c. 2100 BCE'}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-400 block">
                {t.extractor.primaryNarrative}
              </label>
              <button
                type="button"
                onClick={() => setText(sampleText)}
                className="text-[11px] text-pink-400 hover:text-pink-300 transition-colors"
              >
                {t.extractor.loadSample}
              </button>
            </div>
            <textarea
              id="extractor-text-textarea"
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.extractor.placeholder}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 font-mono leading-relaxed"
            />
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300">{t.extractor.guaranteeTitle}</div>
            <p>{t.extractor.guaranteeDesc}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/60 bg-slate-950/60 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            {t.extractor.cancel}
          </button>
          <button
            id="extractor-submit-btn"
            onClick={handleExtract}
            disabled={loading || !text.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t.extractor.extracting}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                {t.extractor.extractButton}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

