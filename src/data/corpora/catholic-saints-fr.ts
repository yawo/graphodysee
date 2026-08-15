import { MythologyGraph } from '../../types/mythology';

export const catholicSaintsCorpusFr: MythologyGraph = {
  manifest: {
    id: 'catholic-saints',
    name: 'La Légende Dorée & Les Hagiographies',
    culture: 'Chrétienté Médiévale Européenne',
    language: 'Latin / Traduction Française',
    era: 'Ier siècle au XVe siècle apr. J.-C.',
    description:
      'Les chroniques sacrées des archanges célestes, martyrs terrassant les dragons, saintes guerrières inspirées, mystiques aux stigmates et protecteurs célestes, compilées dans la Legenda Aurea de Jacques de Voragine.',
    icon: 'Sparkles',
    accent_color: '#10b981',
    license_note:
      'Sources primaires basées sur la Légende Dorée de Jacques de Voragine (trad. J.-B. Roze) et les textes canoniques médiévaux.',
    default_voice: 'Kore',
    narrative_style: {
      tone: 'Hagiographique, lumineux, mystique, voix de chroniqueur médiéval contant miracles et prodiges',
      length_seconds: 180,
      recommended_speakers: ['Chroniqueur Médiéval', 'Sainte Jeanne d’Arc', 'Saint François d’Assise'],
    },
    featured_nodes: ['char_st_michael', 'char_st_george', 'char_st_joan_of_arc', 'char_st_francis', 'concept_intercession'],
  },
  nodes: [
    {
      id: 'char_st_michael',
      type: 'Character',
      corpus_id: 'catholic-saints',
      label: 'L’Archange Saint Michel',
      summary:
        'Prince de la milice céleste et vainqueur de Lucifer lors de la rébellion primordiale des anges. Psychopompe et juge pesant les âmes au Jugement Dernier, protecteur de la France et de l’Église.',
      attributes: {
        Titre: 'Chef des Armées Célestes / Grand Archange',
        Fête: '29 septembre (Saint-Michel)',
        Symboles: ['Épée flamboyante', 'Balance de justice', 'Dragon terrassé sous le pied'],
        Patronage: ['Parachutistes', 'Chevaliers & Soldats', 'Protection contre le Mal'],
      },
      source_refs: [
        {
          text: 'Apocalypse de Saint Jean',
          chapter: '12:7-9',
          citation_quote: 'Il y eut alors un combat dans le ciel : Michel et ses anges combattirent le dragon. Et le grand dragon fut précipité, l’antique serpent appelé le diable.',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'char_st_george',
      type: 'Character',
      corpus_id: 'catholic-saints',
      label: 'Saint Georges de Lydda',
      summary:
        'Chevalier et martyr de Cappadoce. Figure emblématique de la chevalerie chrétienne qui terrassa le dragon venimeux de Silène pour délivrer la princesse et convertir la contrée.',
      attributes: {
        Titre: 'Grand Martyr & Champion de la Foi',
        Exploit: 'Le terrassant du dragon de Silène en Libye',
        Symboles: ['Croix rouge sur fond blanc', 'Lance Ascalon', 'Cheval blanc'],
      },
      source_refs: [
        {
          text: 'Jacques de Voragine, La Légende Dorée',
          citation_quote: 'Georges, montant sur son cheval et se munissant du signe de la croix, attaqua hardiment le dragon qui s’avançait vers lui.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_st_joan_of_arc',
      type: 'Character',
      corpus_id: 'catholic-saints',
      label: 'Sainte Jeanne d’Arc (La Pucelle)',
      summary:
        'Jeune paysanne lorraine guidée par les voix célestes de Saint Michel, Sainte Catherine et Sainte Marguerite. Elle délivra Orléans du siège anglais, fit sacrer Charles VII à Reims et mourut martyre au bûcher de Rouen.',
      attributes: {
        Étendard: 'Jhesus Maria et le champ de lys d’or',
        Voix_Célestes: ['Archange Saint Michel', 'Sainte Catherine d’Alexandrie', 'Sainte Marguerite d’Antioche'],
        Titre: 'La Pucelle de Domrémy / Libératrice d’Orléans',
      },
      source_refs: [
        {
          text: 'Procès de Condamnation et de Réhabilitation de Jeanne d’Arc (1431)',
          citation_quote: 'J’avais treize ans quand j’entendis une voix de Dieu pour m’aider et me guider. La première fois, ce fut la voix de Saint Michel.',
        },
      ],
      timeline_order: 5,
    },
    {
      id: 'char_st_francis',
      type: 'Character',
      corpus_id: 'catholic-saints',
      label: 'Saint François d’Assise (Il Poverello)',
      summary:
        'Fondateur de l’ordre des Frères Mineurs, chantre de Dame Pauvreté et de l’amour cosmique universel. Il reçut sur le mont Alverne les stigmates sacrés de la Passion du Christ.',
      attributes: {
        Titre: 'Le Petit Pauvre d’Assise (Il Poverello)',
        Écrits: ['Le Cantique de Frère Soleil (Cantique des Créatures)'],
        Miracles: ['Prédication aux oiseaux', 'Apprivoisement du loup de Gubbio', 'Stigmates sacrés'],
      },
      source_refs: [
        {
          text: 'Thomas de Celano, Première Vie de Saint François',
          citation_quote: 'Deux ans avant de rendre son âme au ciel, François vit dans une vision divine un Séraphin aux six ailes portant l’image du Crucifié.',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'concept_intercession',
      type: 'Concept',
      corpus_id: 'catholic-saints',
      label: 'L’Intercession des Saints',
      summary:
        'La communion spirituelle mystique unissant les croyants de la terre et les âmes glorifiées au ciel, permettant aux saints de porter les prières humaines devant le trône divin.',
      attributes: {
        Dogme: 'Communion des Saints',
        Fonction: 'Protection, guérison miraculeuse et médiation céleste',
      },
      source_refs: [
        {
          text: 'Jacques de Voragine, La Légende Dorée',
          citation_quote: 'Les saints sont établis comme nos avocats et protecteurs perpétuels auprès de la divine miséricorde.',
        },
      ],
    },
  ],
  edges: [
    {
      id: 'edge_michael_dragon',
      source: 'char_st_michael',
      target: 'concept_intercession',
      type: 'EMBODIES',
      label: 'CHAMPION DE LA PROTECTION',
      description: 'Saint Michel intercède et protège les âmes contre les pièges ténébreux',
      corpus_id: 'catholic-saints',
      source_refs: [{ text: 'Légende Dorée' }],
    },
    {
      id: 'edge_joan_michael',
      source: 'char_st_joan_of_arc',
      target: 'char_st_michael',
      type: 'GUIDED_BY',
      label: 'INSPIRÉE & GUIDÉE PAR',
      description: 'L’archange Saint Michel apparut à Jeanne d’Arc pour lui commander de sauver le royaume',
      corpus_id: 'catholic-saints',
      source_refs: [{ text: 'Procès de Jeanne d’Arc' }],
    },
    {
      id: 'edge_francis_intercession',
      source: 'char_st_francis',
      target: 'concept_intercession',
      type: 'EMBODIES',
      label: 'INCARNE LA MISÉRICORDE & L’',
      description: 'Saint François prie et intercède pour la réconciliation de toute la création',
      corpus_id: 'catholic-saints',
      source_refs: [{ text: 'Cantique des Créatures' }],
    },
  ],
};
