import { MythologyGraph } from '../../types/mythology';

export const hinduMythologyCorpusFr: MythologyGraph = {
  manifest: {
    id: 'hindu-mythology',
    name: 'Les Itihâsas : Râmâyana & Mahâbhârata',
    culture: 'Inde Antique / Tradition Védique',
    language: 'Sanskrit / Traduction Française',
    era: 'env. 1000 av. J.-C. - 400 apr. J.-C.',
    description:
      'Les grandes épopées sacrées du Dharma : l’exil vertueux et la guerre du prince Râma pour délivrer Sîtâ du démon Râvana, et la guerre de Kurukshetra où Krishna transmet l’immortel enseignement de la Bhagavad Gîtâ.',
    icon: 'Flame',
    accent_color: '#f97316',
    license_note:
      'Sources primaires basées sur le Râmâyana de Vâlmîki (trad. Hippolyte Fauche / Gita Press) et le Mahâbhârata / Bhagavad Gîtâ (trad. Émile Senart & Alain Porte).',
    default_voice: 'Puck',
    narrative_style: {
      tone: 'Philosophique, lumineux, majestueux, empreint de dévotion (bhakti) et du devoir cosmique (dharma)',
      length_seconds: 180,
      recommended_speakers: ['Le Sage Vâlmîki', 'Le Seigneur Krishna', 'Le Dévoué Hanumân'],
    },
    featured_nodes: ['char_rama', 'char_sita', 'char_hanuman', 'char_krishna', 'concept_dharma'],
  },
  nodes: [
    {
      id: 'char_rama',
      type: 'Character',
      corpus_id: 'hindu-mythology',
      label: 'Le Seigneur Râma (Râmacandra)',
      summary:
        'Septième avatar de Vishnu, prince héritier d’Ayodhyâ et incarnation parfaite de la droiture morale (Maryada Purushottama). Il endura quatorze années d’exil dans la forêt et vainquit le roi-démon Râvana.',
      attributes: {
        Avatar: '7e Avatar du dieu Vishnu',
        Royaume: 'Ayodhyâ (Royaume de Kosala)',
        Épithètes: ['Maryada Purushottama (L’homme idéal)', 'Râghava', 'Kodandapâni (Porteur du grand arc)'],
        Arme: 'L’Arc Divin Kodanda / Pinâka',
      },
      source_refs: [
        {
          text: 'Vâlmîki Râmâyana, Bâla Kânda',
          chapter: 'Sarga 1, Slokas 1-18',
          citation_quote: 'Qui en ce monde est doué de toutes les vertus, vaillant, connaisseur du devoir, fidèle à ses vœux et d’une conduite inébranlable ? Un tel homme est Râma, né de la lignée d’Ikshvâku.',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'char_sita',
      type: 'Character',
      corpus_id: 'hindu-mythology',
      label: 'Sîtâ (Jânakî)',
      summary:
        'Incarnation de la déesse Lakshmî, fille née de la Terre nourricière (Bhûmi) et épouse dévouée de Râma. Symbole suprême de pureté, de grâce, de courage moral et d’amour inaltérable.',
      attributes: {
        Origine: 'Née du sillon sacré de la Terre labourée par le roi Janaka',
        Épreuve: 'L’épreuve du feu sacré (Agni Parikshâ)',
      },
      source_refs: [
        {
          text: 'Vâlmîki Râmâyana, Yuddha Kânda',
          citation_quote: 'Si mon esprit n’a jamais dévié de Râma, que le feu Agni, témoin de tous les êtres, me protège !',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_hanuman',
      type: 'Character',
      corpus_id: 'hindu-mythology',
      label: 'Hanumân (Mâruti / Mahâvîra)',
      summary:
        'Fils divin du dieu du vent Vâyu, incarnation de la dévotion absolue (Bhakti) et serviteur incomparable de Râma. Il franchit l’océan d’un bond prodigieux et transporta la montagne d’herbes médicinales.',
      attributes: {
        Pouvoirs: ['Ashta Siddhis (Les 8 pouvoirs yogiques suprêmes)', 'Force invincible', 'Vol céleste'],
        Exploits: ['Saut vers l’île de Lankâ', 'Transport du Mont Dronagiri avec l’herbe Sanjeevani'],
      },
      source_refs: [
        {
          text: 'Vâlmîki Râmâyana, Sundara Kânda',
          citation_quote: 'Comme une flèche décochée par Râma, Hanumân fendit l’azur des cieux au-dessus de l’océan mugissant.',
        },
      ],
      timeline_order: 3,
    },
    {
      id: 'char_krishna',
      type: 'Character',
      corpus_id: 'hindu-mythology',
      label: 'Le Seigneur Krishna (Vâsudeva)',
      summary:
        'Huitième avatar suprême de Vishnu. Conducteur du char d’Arjuna sur le champ de bataille de Kurukshetra, il révèle la vision cosmique universelle (Vishvarûpa) et transmet la Bhagavad Gîtâ.',
      attributes: {
        Titre: 'Yogeshvara (Seigneur Suprême du Yoga)',
        Rôle: 'Conducteur de char, ami et guide spirituel d’Arjuna',
        Enseignement: 'Le Karma Yoga, Bhakti Yoga et Jnana Yoga',
      },
      source_refs: [
        {
          text: 'Bhagavad Gîtâ',
          chapter: 'Chapitre 2, Verset 47',
          citation_quote: 'Tu as droit uniquement à l’action, jamais à ses fruits. Que les fruits de tes actes ne soient jamais ton mobile.',
        },
      ],
      timeline_order: 5,
    },
    {
      id: 'char_arjuna',
      type: 'Character',
      corpus_id: 'hindu-mythology',
      label: 'Arjuna (Pârtha)',
      summary:
        'Troisième prince Pândava, fils du dieu Indra, le plus grand archer du monde maniant l’arc Gândîva. En proie au doute moral avant la bataille, il reçoit l’éveil spirituel de Krishna.',
      attributes: {
        Arme: 'L’Arc Céleste Gândîva offert par Agni',
        Épithètes: ['Dhananjaya (Le Conquérant des trésors)', 'Savyasâchin (Archer ambidextre)'],
      },
      source_refs: [
        {
          text: 'Mahâbhârata, Bhagavad Gîtâ',
          chapter: 'Chapitre 18, Verset 73',
          citation_quote: 'Mon illusion est dissipée ! Par ta grâce, ô Krishna, j’ai recouvré la mémoire et je me tiens prêt à agir selon ta parole.',
        },
      ],
      timeline_order: 6,
    },
    {
      id: 'place_kurukshetra',
      type: 'Place',
      corpus_id: 'hindu-mythology',
      label: 'La Plaine Sacrée de Kurukshetra',
      summary:
        'Le champ sacré du devoir (Dharmakshetra) où se déroula la gigantesque guerre de dix-huit jours opposant les Pândavas et les Kauravas pour restaurer l’ordre du monde.',
      attributes: {
        Nature: 'Champ d’ascèse et de confrontation des destinées royales',
        Durée: '18 jours de combat épique',
      },
      source_refs: [
        {
          text: 'Bhagavad Gîtâ',
          chapter: 'Chapitre 1, Verset 1',
          citation_quote: 'Sur le champ sacré de Kurukshetra, réunis et avides de combattre, qu’ont fait les miens et les fils de Pându ?',
        },
      ],
    },
    {
      id: 'concept_dharma',
      type: 'Concept',
      corpus_id: 'hindu-mythology',
      label: 'Le Dharma (L’Ordre Cosmique & le Devoir Vertueux)',
      summary:
        'Le fondement moral, éthique et cosmique qui soutient et harmonise toute l’existence. Chaque être a le devoir sacré d’agir conformément à sa nature et à la vérité universelle.',
      attributes: {
        Devise: 'Dharmo Rakshati Rakshitah (Le Dharma protège ceux qui le protègent)',
        Piliers: ['Satya (Vérité)', 'Ahimsa (Non-violence)', 'Dama (Maîtrise de soi)', 'Saucha (Pureté)'],
      },
      source_refs: [
        {
          text: 'Mahâbhârata, Shânti Parva',
          citation_quote: 'Ce qui soutient l’ensemble des créatures et maintient le monde en harmonie, c’est cela le Dharma.',
        },
      ],
    },
  ],
  edges: [
    {
      id: 'edge_rama_sita',
      source: 'char_rama',
      target: 'char_sita',
      type: 'SPOUSE_OF',
      label: 'ÉPOUX DE',
      description: 'L’union immaculée du roi juste et de la reine de dévotion',
      corpus_id: 'hindu-mythology',
      source_refs: [{ text: 'Vâlmîki Râmâyana' }],
    },
    {
      id: 'edge_hanuman_rama',
      source: 'char_hanuman',
      target: 'char_rama',
      type: 'SERVES',
      label: 'SERVITEUR DÉVOUÉ DE',
      description: 'Hanumân consacre chaque souffle de son existence au service de Râma',
      corpus_id: 'hindu-mythology',
      source_refs: [{ text: 'Sundara Kânda' }],
    },
    {
      id: 'edge_krishna_arjuna',
      source: 'char_krishna',
      target: 'char_arjuna',
      type: 'GUIDED_BY',
      label: 'GUIDE SPIRITUEL DE',
      description: 'Krishna éclaire l’esprit troublé d’Arjuna sur le champ de bataille',
      corpus_id: 'hindu-mythology',
      source_refs: [{ text: 'Bhagavad Gîtâ' }],
    },
    {
      id: 'edge_rama_dharma',
      source: 'char_rama',
      target: 'concept_dharma',
      type: 'EMBODIES',
      label: 'INCARNATION VIVANTE DU',
      description: 'Râmo Vigrahavân Dharmah : Râma est le Dharma fait homme',
      corpus_id: 'hindu-mythology',
      source_refs: [{ text: 'Vâlmîki Râmâyana' }],
    },
  ],
};
