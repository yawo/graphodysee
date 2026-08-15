import { MythologyGraph } from '../../types/mythology';

export const greekOdysseyCorpusFr: MythologyGraph = {
  manifest: {
    id: 'greek-odyssey',
    name: 'L’Odyssée & Les Épopées Homériques',
    culture: 'Grèce Antique',
    language: 'Grec Ancien / Traduction Française',
    era: 'VIIIe siècle av. J.-C.',
    description:
      'Le cycle épique des dix années d’errance d’Ulysse après la guerre de Troie, ses confrontations avec les dieux, monstres et magiciennes, et son retour triomphal à Ithaque.',
    icon: 'Compass',
    accent_color: '#f59e0b',
    license_note:
      'Sources primaires fondées sur l’Odyssée d’Homère (Perseus Digital Library, trad. Leconte de Lisle & Victor Bérard).',
    default_voice: 'Kore',
    narrative_style: {
      tone: 'Barde homérique, poétique, rythmé, solennel, empreint du destin et du courroux des dieux',
      length_seconds: 180,
      recommended_speakers: ['Barde Homérique', 'Athéna Glaukôpis', 'Ulysse d’Ithaque'],
    },
    featured_nodes: ['char_odysseus', 'char_athena', 'char_penelope', 'char_circe', 'place_ithaca'],
  },
  nodes: [
    {
      id: 'char_odysseus',
      type: 'Character',
      corpus_id: 'greek-odyssey',
      label: 'Ulysse (Odysseus)',
      summary:
        'Roi d’Ithaque, héros de la guerre de Troie, célèbre pour son intelligence rusée (mètis), son endurance et son retour légendaire vers son foyer (nostos).',
      attributes: {
        Épithètes: ['Polytropos (L’homme aux mille ruses)', 'Polymètis (Aux conseils avisés)', 'Ptoliporthos (Le destructeur de cités)'],
        Royaume: 'Ithaque',
        Divinité_Protectrice: 'Athéna',
        Famille: 'Fils de Laërte, époux de Pénélope, père de Télémaque',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 1,
          line_range: '1-10',
          citation_quote: 'Chante-moi, Muse, l’homme aux mille ruses, qui erra si longtemps après avoir détruit la citadelle sacrée de Troie.',
        },
        {
          text: 'Homère, Odyssée',
          book: 9,
          line_range: '19-21',
          citation_quote: 'Je suis Ulysse, fils de Laërte, dont les ruses sont connues de tous les hommes, et ma gloire monte jusqu’aux cieux.',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'char_penelope',
      type: 'Character',
      corpus_id: 'greek-odyssey',
      label: 'Pénélope',
      summary:
        'Reine d’Ithaque et épouse fidèle d’Ulysse, réputée pour sa sagesse, sa constance et le stratagème du linceul de Laërte tissé le jour et défait la nuit.',
      attributes: {
        Vertu: 'Fidélité conjugale et sagesse (sophrosyne)',
        Royaume: 'Ithaque',
        Épreuve: 'L’épreuve de l’arc d’Eurytos',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 2,
          line_range: '93-110',
          citation_quote: 'Elle dressa un grand métier dans son palais et tissait une toile fine et immense.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_telemachus',
      type: 'Character',
      corpus_id: 'greek-odyssey',
      label: 'Télémaque',
      summary:
        'Fils d’Ulysse et de Pénélope. Guidé par Athéna sous les traits de Mentor, il entreprend un voyage à Pylos et Sparte pour retrouver son père disparu.',
      attributes: {
        Quête: 'La Télémachie (Recherche d’Ulysse)',
        Alliés: ['Mentor / Athéna', 'Nestor', 'Ménélas'],
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 3,
          line_range: '25-40',
          citation_quote: 'Télémaque, tu ne manqueras ni de courage ni de sagesse, si l’esprit noble de ton père coule en tes veines.',
        },
      ],
      timeline_order: 3,
    },
    {
      id: 'char_athena',
      type: 'Character',
      corpus_id: 'greek-odyssey',
      label: 'Athéna (Pallas)',
      summary:
        'Déesse de la sagesse, de la guerre stratégique et de l’artisanat. Fille de Zeus, protectrice inébranlable d’Ulysse et de Télémaque.',
      attributes: {
        Épithètes: ['Glaukôpis (Aux yeux pers/étincelants)', 'Promachos (Celle qui combat au premier rang)'],
        Demeure: 'Mont Olympe',
        Attributs: ['Égide', 'Casque d’or', 'Chouette', 'Olivier'],
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 13,
          line_range: '298-305',
          citation_quote: 'Je suis Pallas Athéna, fille de Zeus, qui veille toujours sur toi et te protège dans toutes tes épreuves.',
        },
      ],
      timeline_order: 0,
    },
    {
      id: 'char_poseidon',
      type: 'Character',
      corpus_id: 'greek-odyssey',
      label: 'Poséidon',
      summary:
        'Dieu des mers, des tempêtes et des tremblements de terre. Il voue une haine implacable à Ulysse après que celui-ci a aveuglé son fils, le Cyclope Polyphème.',
      attributes: {
        Domaine: 'Océans, Abîmes et Ébranlement du Monde',
        Épithètes: ['Enosichthon (L’Ébranleur du sol)', 'Seigneur des Flots'],
        Arme: 'Le Trident',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 9,
          line_range: '528-535',
          citation_quote: 'Entends-moi, Poséidon aux cheveux bleus ! Si je suis vraiment ton fils, fais qu’Ulysse ne revoie jamais sa demeure.',
        },
      ],
      timeline_order: 0,
    },
    {
      id: 'char_zeus',
      type: 'Character',
      corpus_id: 'greek-odyssey',
      label: 'Zeus',
      summary:
        'Roi des dieux et des hommes, maître du tonnerre et gardien suprême de l’ordre cosmique et des lois sacrées de l’hospitalité (Xenia).',
      attributes: {
        Titre: 'Souverain de l’Olympe',
        Arme: 'Le Foudre',
        Rôle: 'Garant de la Xenia et arbitre suprême du destin',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 1,
          line_range: '65-75',
          citation_quote: 'Comment pourrais-je oublier le divin Ulysse, qui surpasse les mortels en sagesse et offre de pieux sacrifices ?',
        },
      ],
      timeline_order: 0,
    },
    {
      id: 'char_polyphemus',
      type: 'Character',
      corpus_id: 'greek-odyssey',
      label: 'Polyphème le Cyclope',
      summary:
        'Fils géant de Poséidon et de la nymphe Thoosa. Pasteur sauvage à un œil qui dévore les compagnons d’Ulysse avant d’être aveuglé par le pieu d’olivier rougi au feu.',
      attributes: {
        Nature: 'Cyclope pasteur',
        Demeure: 'Île des Cyclopes (Sicile)',
        Faiblesse: 'Le vin pur des Cicones offert par Ulysse sous le nom de "Personne"',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 9,
          line_range: '364-370',
          citation_quote: 'Personne est mon nom ! C’est ainsi que m’appellent ma mère, mon père et tous mes compagnons.',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'char_circe',
      type: 'Character',
      corpus_id: 'greek-odyssey',
      label: 'Circé d’Ééa',
      summary:
        'Enchanteresse et déesse d’Ééa, fille du Soleil Hélios. Elle transforme les compagnons d’Ulysse en pourceaux grâce à ses philtres magiques avant de devenir leur alliée.',
      attributes: {
        Magie: 'Pharmaka (Potions métamorphiques)',
        Demeure: 'Île d’Ééa',
        Parenté: 'Fille d’Hélios et de Perséis',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 10,
          line_range: '235-245',
          citation_quote: 'Elle les frappa de sa baguette et les enferma dans les soues à porcs ; ils avaient la tête, la voix et les soies du pourceau.',
        },
      ],
      timeline_order: 5,
    },
    {
      id: 'char_calypso',
      type: 'Character',
      corpus_id: 'greek-odyssey',
      label: 'Calypso d’Ogygie',
      summary:
        'Nymphe immortelle, fille d’Atlas. Elle retient Ulysse captif par amour sur son île paradisiaque d’Ogygie pendant sept années, lui promettant l’immortalité.',
      attributes: {
        Demeure: 'Île d’Ogygie',
        Offre: 'Immortalité et jeunesse éternelle refusées par Ulysse',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 5,
          line_range: '135-140',
          citation_quote: 'Je l’ai accueilli avec amour et nourri, et je lui promis de le rendre immortel et exempt de vieillesse à jamais.',
        },
      ],
      timeline_order: 6,
    },
    {
      id: 'char_tiresias',
      type: 'Character',
      corpus_id: 'greek-odyssey',
      label: 'Tirésias le Devin',
      summary:
        'Prophète thébain aveugle dont l’ombre conserve toute sa lucidité prophétique aux Enfers. Il révèle à Ulysse le chemin du retour et les périls des troupeaux du Soleil.',
      attributes: {
        Rôle: 'Oracle des Enfers (Nekuia)',
        Origine: 'Thèbes',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 11,
          line_range: '100-115',
          citation_quote: 'Tu cherches un retour doux comme le miel, noble Ulysse, mais un dieu te le rendra amer.',
        },
      ],
      timeline_order: 7,
    },
    {
      id: 'place_ithaca',
      type: 'Place',
      corpus_id: 'greek-odyssey',
      label: 'Île d’Ithaque',
      summary:
        'Royaume rocailleux mais bien-aimé d’Ulysse, situé en mer Ionienne. Cœur de la nostalgie du héros et théâtre du massacre final des prétendants.',
      attributes: {
        Géographie: 'Île Ionienne rocheuse et boisée',
        Lieux_Sacrés: ['Mont Nérite', 'Grotte des Nymphes Naïades', 'Palais d’Ulysse'],
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 9,
          line_range: '27-28',
          citation_quote: 'C’est une terre âpre, mais bonne nourrice de braves guerriers. Je ne saurais rien voir de plus doux au monde que ma propre terre.',
        },
      ],
    },
    {
      id: 'place_olympus',
      type: 'Place',
      corpus_id: 'greek-odyssey',
      label: 'Mont Olympe',
      summary:
        'Demeure resplendissante des dieux immortels, baignée d’une lumière éternelle, où Zeus et l’assemblée divine décident du sort des mortels.',
      attributes: {
        Nature: 'Sommet sacré céleste',
        Résidents: 'Les douze dieux olympiens',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 6,
          line_range: '42-45',
          citation_quote: 'Où les vents ne soufflent jamais avec violence, où la pluie ne tombe point et où la neige n’approche jamais.',
        },
      ],
    },
    {
      id: 'place_underworld',
      type: 'Place',
      corpus_id: 'greek-odyssey',
      label: 'Le Royaume d’Hadès (Les Enfers)',
      summary:
        'Le séjour obscur des ombres au-delà des fleuves de l’Océan, où Ulysse accomplit le rite de la Nékuia pour interroger l’âme de Tirésias.',
      attributes: {
        Fleuves_Sacrés: ['Achéron', 'Cocyte', 'Pyriphlégéthon', 'Styx'],
        Rite: 'Nekuia (Libation de sang pour évoquer les défunts)',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 11,
          line_range: '20-35',
          citation_quote: 'Là, les Cimmériens habitent leur cité enveloppée de brumes et d’éternelles ténèbres.',
        },
      ],
    },
    {
      id: 'object_bow_of_odysseus',
      type: 'Object',
      corpus_id: 'greek-odyssey',
      label: 'L’Arc d’Eurytos',
      summary:
        'Arc redoutable hérité d’Iphitos, que seul Ulysse possède la force de bander. Instrument de vengeance utilisé pour abattre les prétendants.',
      attributes: {
        Origine: 'Don d’Iphitos, fils du grand archer Eurytos',
        Épreuve: 'Traverser le chas de douze têtes de haches alignées',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 21,
          line_range: '405-415',
          citation_quote: 'Comme un joueur de cithare tend sans effort une corde nouvelle sur son instrument, ainsi Ulysse banda le grand arc sans la moindre peine.',
        },
      ],
    },
    {
      id: 'object_lotus_flower',
      type: 'Object',
      corpus_id: 'greek-odyssey',
      label: 'La Fleur de Lotus',
      summary:
        'Fleur narcotique et mystique consommée sur l’île des Lotophages, ôtant aux marins tout souvenir du pays natal et tout désir de retour.',
      attributes: {
        Effet: 'Oubli complet du nostos (patrie et devoir)',
        Lieu: 'Terre des Lotophages (Côte libyenne)',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 9,
          line_range: '94-97',
          citation_quote: 'Quiconque mangeait le doux fruit du lotus ne voulait plus apporter de nouvelles ni revenir en arrière.',
        },
      ],
    },
    {
      id: 'event_sack_of_troy',
      type: 'Event',
      corpus_id: 'greek-odyssey',
      label: 'La Chute de Troie',
      summary:
        'L’effondrement de la cité d’Ilion après dix ans de siège, accompli grâce au Cheval de Bois imaginé par la ruse d’Ulysse.',
      attributes: {
        Conséquence: 'Début des retours tourmentés des Achéens (Nostoi)',
        Ruse: 'Le Cheval de Troie façonné par Épéios',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 8,
          line_range: '490-505',
          citation_quote: 'Chante le stratagème du cheval de bois, qu’Ulysse conduisit par ruse dans l’acropole de Troie.',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'event_slaughter_of_suitors',
      type: 'Event',
      corpus_id: 'greek-odyssey',
      label: 'Le Massacre des Prétendants (Mnesterophonia)',
      summary:
        'L’affrontement final dans la grande salle du palais d’Ithaque où Ulysse, Télémaque et leurs fidèles serviteurs exterminent les prétendants insolents.',
      attributes: {
        Lieu: 'Grande salle du mégaron d’Ithaque',
        Alliés: ['Télémaque', 'Eumée le porcher', 'Philoetios le bouvier', 'Athéna'],
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 22,
          line_range: '1-10',
          citation_quote: 'Alors l’avisé Ulysse se dépouilla de ses haillons, bondit sur le grand seuil avec l’arc et le carquois rempli de flèches.',
        },
      ],
      timeline_order: 10,
    },
    {
      id: 'concept_xenia',
      type: 'Concept',
      corpus_id: 'greek-odyssey',
      label: 'Xénia (L’Hospitalité Sacrée)',
      summary:
        'La loi divine et morale régissant l’accueil des étrangers et des suppliants, placée sous le patronage direct de Zeus Xénios. Sa transgression entraîne le châtiment céleste.',
      attributes: {
        Devoir: 'Nourrir et protéger l’hôte avant d’interroger son nom',
        Transgresseurs: ['Les Prétendants', 'Le Cyclope Polyphème'],
        Exemples_Vertueux: ['Nestor à Pylos', 'Les Phéaciens', 'Eumée le porcher'],
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 14,
          line_range: '56-58',
          citation_quote: 'Étranger, il ne m’est pas permis de mépriser un hôte, vînt-il plus misérable que toi, car tous les étrangers et mendiants viennent de Zeus.',
        },
      ],
    },
    {
      id: 'concept_nostos',
      type: 'Concept',
      corpus_id: 'greek-odyssey',
      label: 'Nostos (Le Retour au Foyer)',
      summary:
        'L’impulsion fondamentale du héros grec cherchant à regagner sa patrie, son identité royale et son épouse par-delà les tentations de l’oubli et de l’immortalité.',
      attributes: {
        Signification: 'Retour triomphal et réhabilitation de l’ordre',
        Thème: 'Mémoire, fidélité et résistance à l’oubli',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 1,
          line_range: '15-18',
          citation_quote: 'Tous les autres guerriers qui avaient échappé à la mort amère étaient rentrés dans leurs foyers.',
        },
      ],
    },
    {
      id: 'concept_metis',
      type: 'Concept',
      corpus_id: 'greek-odyssey',
      label: 'Mètis (L’Intelligence Rusée)',
      summary:
        'L’intelligence pratique, la prévoyance stratégique, l’art du déguisement et la ruse inventive incarnés suprêmement par Ulysse et sa protectrice Athéna.',
      attributes: {
        Manifestations: ['Le nom "Personne"', 'Le Cheval de Troie', 'Le déguisement en mendiant'],
        Symbole: 'La chouette et le gouvernail',
      },
      source_refs: [
        {
          text: 'Homère, Odyssée',
          book: 13,
          line_range: '295-298',
          citation_quote: 'Il faudrait être bien rusé pour te surpasser en ruses, même pour un dieu !',
        },
      ],
    },
  ],
  edges: [
    {
      id: 'edge_odysseus_athena',
      source: 'char_odysseus',
      target: 'char_athena',
      type: 'GUIDED_BY',
      label: 'GUIDÉ PAR',
      description: 'Athéna conseille, protège et transforme Ulysse tout au long de son odyssée',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 13' }],
    },
    {
      id: 'edge_odysseus_penelope',
      source: 'char_odysseus',
      target: 'char_penelope',
      type: 'SPOUSE_OF',
      label: 'ÉPOUX DE',
      description: 'L’amour indéfectible unissant le roi et la reine d’Ithaque malgré vingt ans de séparation',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 23' }],
    },
    {
      id: 'edge_odysseus_telemachus',
      source: 'char_odysseus',
      target: 'char_telemachus',
      type: 'PARENT_OF',
      label: 'PÈRE DE',
      description: 'Ulysse et Télémaque s’unissent pour reprendre le contrôle de leur palais',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 16' }],
    },
    {
      id: 'edge_odysseus_poseidon',
      source: 'char_odysseus',
      target: 'char_poseidon',
      type: 'CURSED_BY',
      label: 'MAUDIT PAR',
      description: 'Poséidon déchaîne les mers contre Ulysse après l’aveuglement de Polyphème',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 9' }],
    },
    {
      id: 'edge_odysseus_polyphemus',
      source: 'char_odysseus',
      target: 'char_polyphemus',
      type: 'FOUGHT',
      label: 'A COMBATTU & AVEUGLÉ',
      description: 'Ulysse enivre Polyphème et lui crève l’œil avec un pieu d’olivier ardent',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 9' }],
    },
    {
      id: 'edge_polyphemus_poseidon',
      source: 'char_polyphemus',
      target: 'char_poseidon',
      type: 'CHILD_OF',
      label: 'FILS DE',
      description: 'Polyphème implore son père Poséidon de venger son supplice',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 9' }],
    },
    {
      id: 'edge_odysseus_circe',
      source: 'char_odysseus',
      target: 'char_circe',
      type: 'MET',
      label: 'A RENCONTRÉ & DOMPTÉ',
      description: 'Grâce à l’herbe Moly donnée par Hermès, Ulysse résiste aux sortilèges de Circé',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 10' }],
    },
    {
      id: 'edge_circe_underworld',
      source: 'char_circe',
      target: 'place_underworld',
      type: 'GUIDED_BY',
      label: 'A INDIQUÉ LA VOIE VERS',
      description: 'Circé instruit Ulysse sur les rites nécessaires pour descendre aux Enfers',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 10' }],
    },
    {
      id: 'edge_odysseus_tiresias',
      source: 'char_odysseus',
      target: 'char_tiresias',
      type: 'MET',
      label: 'A CONSULTÉ',
      description: 'Ulysse consulte l’ombre de Tirésias pour connaître la prophétie de son retour',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 11' }],
    },
    {
      id: 'edge_odysseus_ithaca',
      source: 'char_odysseus',
      target: 'place_ithaca',
      type: 'RULES_OVER',
      label: 'RÈGNE SUR',
      description: 'Ithaque est la patrie et le royaume souverain d’Ulysse',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 1' }],
    },
    {
      id: 'edge_odysseus_bow',
      source: 'char_odysseus',
      target: 'object_bow_of_odysseus',
      type: 'POSSESSES',
      label: 'MANIE EXCLUSIVEMENT',
      description: 'Seul Ulysse a la force et la virtuosité nécessaires pour bander son arc',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 21' }],
    },
    {
      id: 'edge_odysseus_slaughter',
      source: 'char_odysseus',
      target: 'event_slaughter_of_suitors',
      type: 'TOOK_PLACE_AT',
      label: 'A MENÉ',
      description: 'Ulysse accomplit sa vengeance et restaure l’ordre royal à Ithaque',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée, Chant 22' }],
    },
    {
      id: 'edge_odysseus_xenia',
      source: 'char_odysseus',
      target: 'concept_xenia',
      type: 'EMBODIES',
      label: 'INCARNE & DÉFEND',
      description: 'Ulysse teste l’hospitalité des cités et châtie ceux qui bafouent la Xénia',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée' }],
    },
    {
      id: 'edge_odysseus_nostos',
      source: 'char_odysseus',
      target: 'concept_nostos',
      type: 'EMBODIES',
      label: 'INCARNE LA QUÊTE DU',
      description: 'Le voyage d’Ulysse est l’archétype universel du retour au foyer',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée' }],
    },
    {
      id: 'edge_odysseus_metis',
      source: 'char_odysseus',
      target: 'concept_metis',
      type: 'EMBODIES',
      label: 'MAÎTRE SUPRÊME DE LA',
      description: 'L’intelligence rusée d’Ulysse triomphe de la force brute des géants et des monstres',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Homère, Odyssée' }],
    },
    {
      id: 'edge_athena_metis',
      source: 'char_athena',
      target: 'concept_metis',
      type: 'EMBODIES',
      label: 'DIVINE INCARNATION DE LA',
      description: 'Athéna est la déesse tutélaire de la sagesse et de l’intelligence pratique',
      corpus_id: 'greek-odyssey',
      source_refs: [{ text: 'Hésiode, Théogonie' }],
    },
  ],
};
