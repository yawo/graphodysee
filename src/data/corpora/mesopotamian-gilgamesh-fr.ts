import { MythologyGraph } from '../../types/mythology';

export const mesopotamianCorpusFr: MythologyGraph = {
  manifest: {
    id: 'mesopotamian-gilgamesh',
    name: 'L’Épopée de Gilgamesh & Mythes de Mésopotamie',
    culture: 'Sumérienne / Babylonienne',
    language: 'Akkadien / Traduction Française',
    era: 'v. 2100–1200 av. J.-C.',
    description:
      'La plus ancienne épopée littéraire de l’humanité : le roi Gilgamesh d’Uruk, sa fraternité indéfectible avec l’homme sauvage Enkidu, le meurtre de Humbaba, le Taureau Céleste et la quête tragique de l’immortalité au-delà des Eaux de la Mort.',
    icon: 'Sparkles',
    accent_color: '#d97706',
    license_note:
      'D’après l’Épopée babylonienne standard de Sin-leqi-unninni et les tablettes cunéiformes mésopotamiennes.',
    default_voice: 'Fenrir',
    narrative_style: {
      tone: 'Archaïque, grandiose, existentiel, aux rythmes sacrés des strophes cunéiformes',
      length_seconds: 180,
      recommended_speakers: ['Le Scribe Babylonien', 'Gilgamesh d’Uruk', 'Enkidu de la Steppe', 'Siduri la Cabaretière'],
    },
    featured_nodes: ['char_gilgamesh', 'char_enkidu', 'char_ishtar', 'char_utnapishtim', 'place_uruk', 'event_flood'],
  },
  nodes: [
    {
      id: 'char_gilgamesh',
      type: 'Character',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Gilgamesh',
      summary:
        'Roi d’Uruk, aux deux tiers divin et un tiers mortel, bâtisseur des murailles légendaires. Après la mort déchirante d’Enkidu, il sillonne les terres sauvages dans une quête poignante contre la mort.',
      attributes: {
        Titre: 'Roi d’Uruk, Héros de l’Épopée',
        Nature: 'Deux tiers divin, un tiers humain',
        Parents: 'Fils de Lugalbanda et de la déesse Ninsun',
        Exploits: ['Érection des remparts de briques cuites d’Uruk', 'Abattage de la Forêt des Cèdres', 'Victoire sur le Taureau Céleste'],
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette I',
          passage: 'Col. I:1-8',
          citation_quote: 'Celui qui a vu l’Abîme, le fondement du pays, qui savait toutes choses et a parcouru les confins de la terre !',
        },
        {
          text: 'Épopée de Gilgamesh, Tablette IX',
          passage: 'Col. I:1-5',
          citation_quote: 'Pour son ami Enkidu, Gilgamesh pleura amèrement en errant dans le désert : Ne mourrai-je point moi aussi ? Ne suis-je pas comme Enkidu ?',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'char_enkidu',
      type: 'Character',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Enkidu',
      summary:
        'Façonné d’argile par la déesse Aruru pour égaler et apaiser Gilgamesh. Dégrossi et initié par Shamhat, il devient le frère d’âme de Gilgamesh avant de succomber au châtiment des dieux.',
      attributes: {
        Origine: 'Créé de terre vierge dans la steppe par Aruru',
        Rôle: 'Compagnon, âme jumelle et protecteur sauvage des bêtes',
        Initiation: 'Éveillé à la civilisation par Shamhat grâce au pain, à la bière et à l’amour',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette I',
          passage: 'Col. II:34-40',
          citation_quote: 'Aruru se lava les mains, pétrit l’argile et la jeta dans la steppe ; là elle créa le vaillant Enkidu, rejeton du silence.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_ishtar',
      type: 'Character',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Ishtar (Inanna)',
      summary:
        'Reine du Ciel, déesse de l’amour ardent, de la beauté et de la guerre dévastatrice. Éconduite avec éclat par Gilgamesh qui lui rappelle ses amants ruinés, elle lâche le Taureau Céleste pour dévaster Uruk.',
      attributes: {
        Domaine: 'Amour passionné, Guerre sacrée, Tempêtes célestes',
        Sanctuaire: 'Eanna à Uruk',
        Symboles: 'Étoile à huit branches, lion, rosette',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette VI',
          passage: 'Col. I:1-24',
          citation_quote: 'Viens, Gilgamesh, sois mon époux ! Offre-moi la saveur de tes fruits ! Sois mon mari et je serai ta reine !',
        },
      ],
      timeline_order: 3,
    },
    {
      id: 'char_utnapishtim',
      type: 'Character',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Outa-Napishtim le Lointain',
      summary:
        'L’ancêtre qui survécut au Déluge universel et reçut la vie éternelle d’Enlil et Ea. Il réside au-delà des Eaux de la Mort, à l’embouchure des fleuves primordiaux.',
      attributes: {
        Surnom: 'Le Lointain (Rūqu)',
        Don_Divin: 'Immortalité accordée par les dieux pour avoir préservé la semence de toute vie dans l’Arche',
        Demeure: 'Dilmun, aux confins du soleil levant',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette XI',
          passage: 'Col. I:1-14',
          citation_quote: 'Gilgamesh dit à Outa-Napishtim le Lointain : Je te regarde, ta forme n’est pas différente, tu es fait comme moi. Dis-moi comment tu fus admis parmi les dieux pour conquérir la vie !',
        },
      ],
      timeline_order: 7,
    },
    {
      id: 'char_siduri',
      type: 'Character',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Siduri la Cabaretière',
      summary:
        'La sage déesse tavernière qui habite aux bords de l’océan cosmique. Elle délivre à Gilgamesh l’immortelle sagesse du carpe diem : chérir les bonheurs terrestres, la fête, le vin et la tendresse familiale.',
      attributes: {
        Rôle: 'Gardienne de la Mer du Soleil, Brasseuse divine',
        Philosophie: 'La joie du foyer et des mets partagés comme seule véritable part des mortels',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette Paléo-babylonienne (Meissner)',
          passage: 'Col. III:1-14',
          citation_quote: 'Gilgamesh, où cours-tu ? La vie que tu poursuis, tu ne la trouveras jamais. Quand les dieux créèrent les hommes, ils leur assignèrent la mort et retinrent la vie entre leurs mains.',
        },
      ],
      timeline_order: 6,
    },
    {
      id: 'char_humbaba',
      type: 'Character',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Humbaba (Huwawa)',
      summary:
        'Le monstre terrible et gardien de la Forêt des Cèdres du Liban, établi par Enlil, dont le rugissement est déluge, la bouche flamme et le souffle trépas.',
      attributes: {
        Rôle: 'Gardien de la Forêt sacrée des Cèdres',
        Établi_par: 'Enlil pour terrifier les mortels audacieux',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette II',
          passage: 'Col. V:1-10',
          citation_quote: 'Enlil l’a préposé pour garder la Forêt des Cèdres ; son rugissement est tempête, sa gueule crache le feu, son souffle est la mort !',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'char_urshanabi',
      type: 'Character',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Ourshanabi',
      summary:
        'Le passeur mystique des Eaux de la Mort, qui guide la barque vers le domaine secret d’Outa-Napishtim à l’aide de perches de cèdre pour qu’aucune goutte fatale n’effleure les mains.',
      attributes: {
        Rôle: 'Nocher de l’abîme mortel',
        Vaisseau: 'Bateau propulsé par 120 perches de cèdre',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette X',
          passage: 'Col. III:25-45',
          citation_quote: 'Ourshanabi lui dit : Coupe cent vingt perches de soixante coudées de long, enduis-les de bitume et apporte-les ici.',
        },
      ],
      timeline_order: 6,
    },
    {
      id: 'place_uruk',
      type: 'Place',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Uruk aux Parcs Superbes',
      summary:
        'La métropole royale sur l’Euphrate, berceau de l’écriture et de la civilisation urbaine, ceinte de formidables remparts de briques cuites et couronnée par le temple d’Eanna.',
      attributes: {
        Fleuve: 'Euphrate',
        Architecture: 'Remparts de briques cuites au four, ziggourat étincelante et terrasses',
        Divinité_Tutélaire: 'Ishtar et Anu',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette I',
          passage: 'Col. I:18-22',
          citation_quote: 'Monte sur la muraille d’Uruk, parcours-la ! Examine ses fondations, contemple sa structure de briques cuites !',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'place_cedar_forest',
      type: 'Place',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'La Forêt Sacrée des Cèdres',
      summary:
        'Le massif montagneux luxuriant aux cèdres géants parfumés de résine, domaine sacré des dieux gardé par Humbaba et conquis par Gilgamesh et Enkidu.',
      attributes: {
        Atmosphère: 'Parfum suave d’encens et de résine, ombre impénétrable',
        Gardien: 'Humbaba',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette V',
          passage: 'Col. I:1-10',
          citation_quote: 'Ils s’arrêtèrent à la lisière de la forêt, contemplant la hauteur démesurée des cèdres et cherchant la trace de Humbaba.',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'place_waters_of_death',
      type: 'Place',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Les Eaux de la Mort',
      summary:
        'L’océan cosmique ténébreux séparant le monde des vivants de Dilmun, dont le moindre contact liquide dissout instantanément toute chair mortelle.',
      attributes: {
        Danger: 'Mort foudroyante au contact de la peau',
        Pilote: 'Ourshanabi le passeur',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette X',
          passage: 'Col. II:15-25',
          citation_quote: 'Nul vivant n’a jamais traversé cette mer, car redoutables et meurtrières sont les Eaux de la Mort qui barrent le passage.',
        },
      ],
      timeline_order: 6,
    },
    {
      id: 'object_plant_of_youth',
      type: 'Object',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'La Plante de Jouvence (« Le Vieillard Rajeunit »)',
      summary:
        'Une herbe épineuse qui croît au fond de l’Apsu (l’Abîme des eaux douces) et redonne vigueur et jeunesse à ceux qui la consomment. Cueillie héroïquement par Gilgamesh, puis dérobée par un serpent d’eau.',
      attributes: {
        Nom_Akkadien: 'Shibu Issahir Amelu (« Le vieil homme redevient jeune »)',
        Pouvoir: 'Régénération absolue, peau sans rides et vigueur première',
        Sort: 'Avalée par un serpent qui mue sur-le-champ',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette XI',
          passage: 'Col. VI:265-290',
          citation_quote: 'Il est une plante dont l’épine pique comme celle du buisson d’épines au fond de l’Apsu... si tes mains la saisissent, tu retrouveras une jeunesse éternelle.',
        },
      ],
      timeline_order: 8,
    },
    {
      id: 'object_bull_of_heaven',
      type: 'Object',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Le Taureau Céleste (Gougalanna)',
      summary:
        'Le monstre stellaire déchaîné par Ishtar depuis les cieux : chacun de ses naseaux entrouvre des failles telluriques béantes qui engloutissent des centaines de guerriers d’Uruk.',
      attributes: {
        Origine: 'Constellation céleste lâchée par Anu',
        Férocité: 'Son premier souffle engloutit 100 jeunes gens d’Uruk dans les entrailles du sol',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette VI',
          passage: 'Col. III:95-130',
          citation_quote: 'À son premier ébrouement, une crevasse s’ouvrit dans Uruk et cent hommes y sombrèrent. Au second, deux cents y périrent.',
        },
      ],
      timeline_order: 5,
    },
    {
      id: 'event_wrestling_match',
      type: 'Event',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Le Duel au Seuil Nuptial',
      summary:
        'Le combat titanesque entre Gilgamesh et Enkidu au cœur d’Uruk. Le fracas de leurs corps ébranle les portes de la cité jusqu’à ce que Gilgamesh l’emporte et que les deux colosses se scellent dans une amitié indéfectible.',
      attributes: {
        Portée: 'Fondation de la plus noble fraternité héroïque de l’histoire',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette II',
          passage: 'Col. II:110-135',
          citation_quote: 'Ils s’empoignèrent à la porte de la chambre nuptiale, luttant comme des taureaux sauvages, faisant trembler les montants et chanceler les murs.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'event_felling_cedar',
      type: 'Event',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'La Chute de Humbaba',
      summary:
        'L’expédition audacieuse au Liban avec l’appui des treize vents du dieu Shamash, la capture du monstre et son exécution malgré ses implorations désespérées.',
      attributes: {
        Conséquence: 'Provoque le courroux funeste du dieu Enlil',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette V',
          passage: 'Col. IV:1-40',
          citation_quote: 'Shamash déchaîna contre Huwawa les grands vents : le vent du Sud, le vent du Nord, la tourmente... Huwawa ne put ni avancer ni reculer.',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'event_death_of_enkidu',
      type: 'Event',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'L’Agonie Tragique d’Enkidu',
      summary:
        'Condamné par l’assemblée des grands dieux pour avoir terrassé Humbaba et le Taureau Céleste, Enkidu s’éteint dans la fièvre, brisant le cœur de Gilgamesh et l’envoyant dans une quête éperdue d’immortalité.',
      attributes: {
        Retentissement: 'Provoque la rupture existentielle de Gilgamesh et son angoisse de la mort',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablettes VII & VIII',
          passage: 'Tablette VIII: Col. II:1-20',
          citation_quote: 'Six jours et sept nuits durant j’ai pleuré sur lui, refusant de le livrer à la fosse jusqu’à ce qu’un ver tombe de sa narine.',
        },
      ],
      timeline_order: 5,
    },
    {
      id: 'event_flood',
      type: 'Event',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Le Grand Déluge Primordial',
      summary:
        'Le cataclysme aqueux décrété par Enlil pour engloutir le genre humain, dont Outa-Napishtim réchappa grâce à l’arche colossale construite selon les ordres du dieu Ea.',
      attributes: {
        Durée: 'Six jours et sept nuits de déluge apocalyptique',
        Salvation: 'Lâcher de la colombe, de l’hirondelle et du corbeau au mont Nimush',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette XI',
          passage: 'Col. III:100-145',
          citation_quote: 'Pendant six jours et sept nuits la tempête et le déluge ravagèrent la terre. Au septième jour, la furie des flots s’apaisa.',
        },
      ],
      timeline_order: 7,
    },
    {
      id: 'concept_mortality_legacy',
      type: 'Concept',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'L’Immortalité des Œuvres et de la Cité',
      summary:
        'L’apogée philosophique de l’épopée : l’immortalité biologique appartient aux seuls dieux, mais l’humain conquiert sa véritable gloire éternelle par ses hauts faits, ses monuments, l’amour des siens et la beauté pérenne de la civilisation.',
      attributes: {
        Idée_Centrale: 'Acceptation sereine du destin mortel et gloire des réalisations humaines',
        Symbole: 'Les murailles d’Uruk qui défient les siècles',
      },
      source_refs: [
        {
          text: 'Épopée de Gilgamesh, Tablette XI',
          passage: 'Col. VI:300-320',
          citation_quote: 'Gilgamesh dit à Ourshanabi : Vois les remparts d’Uruk, admire leur harmonie de briques... une lieue de ville, une lieue de palmeraies, une lieue de carrières !',
        },
      ],
      timeline_order: 9,
    },
  ],
  edges: [
    {
      id: 'edge_g_e_friends_fr',
      source: 'char_gilgamesh',
      target: 'char_enkidu',
      type: 'ALLIED_WITH',
      label: 'Frère d’armes et d’âme avec',
      description: 'Après un combat homérique dans les rues d’Uruk, Gilgamesh et Enkidu deviennent inséparables.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette II', passage: 'Col. II' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_uruk_fr',
      source: 'char_gilgamesh',
      target: 'place_uruk',
      type: 'RULES_OVER',
      label: 'Règne sur et bâtit les murs de',
      description: 'Gilgamesh érigea les remparts imprenables de briques cuites d’Uruk.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette I', passage: 'Col. I' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_ishtar_g_fr',
      source: 'char_ishtar',
      target: 'char_gilgamesh',
      type: 'CURSED_BY',
      label: 'Éconduite par et maudit',
      description: 'Gilgamesh rejette violemment les avances d’Ishtar en lui rappelant le destin funeste de ses anciens amants.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette VI', passage: 'Col. I' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_ishtar_bull_fr',
      source: 'char_ishtar',
      target: 'object_bull_of_heaven',
      type: 'ORIGIN_OF',
      label: 'Déchaîne sur Uruk',
      description: 'Ishtar exige d’Anu la libération du Taureau Céleste pour anéantir Gilgamesh.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette VI', passage: 'Col. III' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_ge_humbaba_fr',
      source: 'char_gilgamesh',
      target: 'char_humbaba',
      type: 'SLAYED',
      label: 'Terrasse avec Enkidu',
      description: 'Soutenus par les vents du dieu Shamash, Gilgamesh et Enkidu terrassent le gardien de la forêt.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette V', passage: 'Col. IV' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_humbaba_forest_fr',
      source: 'char_humbaba',
      target: 'place_cedar_forest',
      type: 'GUARDS',
      label: 'Garde le sanctuaire de',
      description: 'Établi par Enlil pour défendre les cèdres sacrés contre les haches des hommes.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette II', passage: 'Col. V' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_enkidu_death_fr',
      source: 'char_enkidu',
      target: 'event_death_of_enkidu',
      type: 'TOOK_PLACE_AT',
      label: 'Succombe au châtiment divin dans',
      description: 'Condamné par les dieux pour la mort de Humbaba et du Taureau Céleste.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette VII', passage: 'Col. VI' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_siduri_fr',
      source: 'char_gilgamesh',
      target: 'char_siduri',
      type: 'GUIDED_BY',
      label: 'Reçoit la leçon de vie de',
      description: 'Siduri enseigne au héros inconsolable de jouir de la vie terrestre et de sa famille.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette Paléo-babylonienne', passage: 'Col. III' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_urshanabi_fr',
      source: 'char_gilgamesh',
      target: 'char_urshanabi',
      type: 'MET',
      label: 'Franchit les eaux mortelles avec',
      description: 'Gilgamesh taille 120 perches de cèdre pour naviguer sur la mer fatale avec Ourshanabi.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette X', passage: 'Col. III' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_urshanabi_waters_fr',
      source: 'char_urshanabi',
      target: 'place_waters_of_death',
      type: 'RULES_OVER',
      label: 'Connaît les passages des',
      description: 'Seul Ourshanabi sait mener une embarcation jusqu’au rivage de Dilmun sans périr.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette X', passage: 'Col. II' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_utnapishtim_fr',
      source: 'char_gilgamesh',
      target: 'char_utnapishtim',
      type: 'MET',
      label: 'Implore le secret de la vie à',
      description: 'Gilgamesh rejoint Outa-Napishtim pour percer le mystère de sa survie au Déluge.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette XI', passage: 'Col. I' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_utnapishtim_flood_fr',
      source: 'char_utnapishtim',
      target: 'event_flood',
      type: 'TOOK_PLACE_AT',
      label: 'Survécut et sauva la vie pendant',
      description: 'Outa-Napishtim construisit l’arche sacrée pour sauver toute semence vivante du courroux d’Enlil.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette XI', passage: 'Col. III' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_utnapishtim_plant_fr',
      source: 'char_utnapishtim',
      target: 'object_plant_of_youth',
      type: 'ORIGIN_OF',
      label: 'Révèle le secret de',
      description: 'Outa-Napishtim révèle à Gilgamesh l’existence de la plante régénératrice au fond des abîmes.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette XI', passage: 'Col. VI' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_plant_fr',
      source: 'char_gilgamesh',
      target: 'object_plant_of_youth',
      type: 'POSSESSES',
      label: 'Plonge dans l’abîme pour cueillir',
      description: 'Gilgamesh s’attache des pierres aux pieds pour descendre cueillir la plante au fond de l’Apsu.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette XI', passage: 'Col. VI' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_legacy_fr',
      source: 'char_gilgamesh',
      target: 'concept_mortality_legacy',
      type: 'EMBODIES',
      label: 'Trouve la paix dans',
      description: 'De retour à Uruk sans la plante, Gilgamesh contemple sa fière cité et comprend la beauté des accomplissements humains.',
      source_refs: [{ text: 'Épopée de Gilgamesh, Tablette XI', passage: 'Col. VI' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
  ],
};
