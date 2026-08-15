import { MythologyGraph } from '../../types/mythology';

export const egyptianMythologyCorpusFr: MythologyGraph = {
  manifest: {
    id: 'egyptian-mythology',
    name: 'Le Mythe d’Osiris & Le Douat',
    culture: 'Égypte Antique',
    language: 'Égyptien Ancien / Traduction Française',
    era: 'Ancien au Nouvel Empire (env. 2400 av. J.-C. - 1000 av. J.-C.)',
    description:
      'Le cycle sacré de la mort et de la résurrection d’Osiris, la puissante magie d’Isis, le combat d’Horus contre Seth pour le trône cosmique, et le voyage périlleux des âmes à travers le Douat jusqu’à la Salle de Maât.',
    icon: 'Sun',
    accent_color: '#06b6d4',
    license_note:
      'Sources primaires basées sur les Textes des Pyramides (trad. Faulkner), le Livre des Morts (Papyrus d’Ani) et les Aventures d’Horus et Seth (Papyrus Chester Beatty I).',
    default_voice: 'Zephyr',
    narrative_style: {
      tone: 'Hiératique, solennel, mystique, voix de prêtre ritualiste de l’antique Héliopolis',
      length_seconds: 180,
      recommended_speakers: ['Prêtre Lecteur du Temple', 'Isis la Grande Magicienne', 'Horus Vengeur de son Père'],
    },
    featured_nodes: ['char_osiris', 'char_isis', 'char_horus', 'char_anubis', 'place_duat'],
  },
  nodes: [
    {
      id: 'char_osiris',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Osiris (Ounnefer)',
      summary:
        'Premier pharaon d’Égypte, dieu de l’au-delà, de la résurrection, de la fertilité et de la végétation. Assassiné et démembré par son frère Seth, ressuscité par Isis pour régner en juge suprême des morts dans l’Amenti.',
      attributes: {
        Domaine: ['Au-delà', 'Résurrection', 'Végétation & Nil', 'Justice éternelle'],
        Épithètes: ['Seigneur de l’Éternité (Neb-er-Djer)', 'Premier des Occidentaux (Khenty-Imentiou)', 'Le Dieu Vert'],
        Couronne: 'Couronne Atef ornée de plumes d’autruche',
        Symboles: ['Crosse Heqa', 'Fléau Nekhekh', 'Pilier Djed'],
      },
      source_refs: [
        {
          text: 'Textes des Pyramides, Formule 213',
          citation_quote: 'Ô Osiris le Roi, tu n’es point parti mort, tu es parti vivant ! Prends place sur le trône d’Osiris.',
        },
        {
          text: 'Livre des Morts (Papyrus d’Ani)',
          chapter: 'Hymne à Osiris',
          citation_quote: 'Hommage à toi, Osiris, Seigneur de l’éternité, Roi des Dieux, dont les noms sont innombrables et les formes saintes.',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'char_isis',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Isis (Aset)',
      summary:
        'Déesse de la magie (Heka), de la maternité et de la guérison. Sœur-épouse d’Osiris, elle rassembla ses membres dispersés, accomplit les premiers rites d’embaumement et conçut miraculeusement Horus.',
      attributes: {
        Domaine: ['Magie Suprême (Heka)', 'Maternité royale', 'Protection des défunts', 'Guérison'],
        Épithètes: ['Weret-Hekau (Grande en Magie)', 'Mère Divine', 'Le Trône Vivant'],
        Symboles: ['Nœud Tit (Sang d’Isis)', 'Ailes protectrices déployées'],
      },
      source_refs: [
        {
          text: 'Stèle d’Amenmès (Louvre C286)',
          citation_quote: 'Isis l’avisée, dont le cœur est prompt, aux paroles efficaces et aux formules sans défaut.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_horus',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Horus (Herou)',
      summary:
        'Fils faucon d’Osiris et d’Isis, héritier légitime du trône d’Égypte. Après une lutte acharnée de 80 ans contre son oncle Seth, il est proclamé souverain victorieux et incarne chaque pharaon vivant.',
      attributes: {
        Titre: 'Nedj-itef (Le Vengeur de son Père)',
        Forme: 'Faucon céleste dont l’œil droit est le Soleil et le gauche la Lune',
        Symbole: 'Œil Oudjat (Symbole de plénitude et de guérison)',
      },
      source_refs: [
        {
          text: 'Papyrus Chester Beatty I',
          chapter: 'Les Aventures d’Horus et Seth',
          citation_quote: 'Donnez la charge royale à Horus, car il est le fils légitime d’Osiris !',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'char_seth',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Seth (Souty)',
      summary:
        'Dieu du chaos, du désert rouge, des orages et de la force brute. Meurtrier d’Osiris, mais aussi défenseur indispensable de la barque solaire de Rê contre le serpent Apophis.',
      attributes: {
        Domaine: ['Désert Rouge (Deshret)', 'Tempêtes', 'Force brute', 'Chaos créateur'],
        Animal_Sacré: 'L’animal séthien mystérieux (Sha)',
      },
      source_refs: [
        {
          text: 'Livre des Morts, Chapitre 39',
          citation_quote: 'Seth se dresse à la proue de la barque solaire et transperce le serpent Apophis de sa lance.',
        },
      ],
      timeline_order: 3,
    },
    {
      id: 'char_anubis',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Anubis (Inpou)',
      summary:
        'Dieu chacal de la momification, des nécropoles et gardien des portes de l’au-delà. Il pèse le cœur des défunts sur la balance de la vérité face à la plume de Maât.',
      attributes: {
        Épithètes: ['Seigneur de la Terre Sacrée (Neb-Ta-Djeser)', 'Celui qui préside à la tente divine (Imi-Out)'],
        Rôle: 'Gardien de la balance du jugement et maître de l’embaumement',
      },
      source_refs: [
        {
          text: 'Livre des Morts (Papyrus d’Ani), Jugement',
          citation_quote: 'Anubis ajuste le fléau de la balance et examine le cœur du scribe Ani.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_thot',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Thot (Djehouty)',
      summary:
        'Dieu ibis et babouin de la sagesse, de l’écriture hiéroglyphique, des sciences et de la mesure du temps. Scribe des dieux qui consigne le verdict final lors du jugement des âmes.',
      attributes: {
        Épithètes: ['Seigneur des Paroles Divines (Medou Netjer)', 'Trois fois Très Grand (Hermès Trismégiste)'],
        Symboles: ['Palette de scribe', 'Croissant de lune', 'Ibis sacré'],
      },
      source_refs: [
        {
          text: 'Papyrus d’Ani, Jugement d’Osiris',
          citation_quote: 'Thot, juge de vérité pour l’Ennéade des Dieux, dit : Écoutez ce jugement ! Le cœur d’Ani est juste.',
        },
      ],
    },
    {
      id: 'char_ra',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Rê (Râ / Atoum)',
      summary:
        'Dieu solaire créateur suprême, souverain du ciel. Il parcourt chaque jour le firmament dans sa barque Mandjet et traverse chaque nuit les douze heures du Douat dans sa barque Mesektet.',
      attributes: {
        Domaine: ['Soleil Créateur', 'Ordre cosmique', 'Lumière divine'],
        Barques: ['Mandjet (Barque du Jour)', 'Mesektet (Barque de la Nuit)'],
      },
      source_refs: [
        {
          text: 'Livre des Morts, Hymne à Rê au Lever',
          citation_quote: 'Salut à toi qui viens comme Atoum, qui t’élèves à l’horizon oriental !',
        },
      ],
    },
    {
      id: 'place_duat',
      type: 'Place',
      corpus_id: 'egyptian-mythology',
      label: 'Le Douat (Monde Souterrain)',
      summary:
        'Le royaume mystique souterrain traversé par le Soleil durant les 12 heures nocturnes. Lieu de purification, de métamorphose et de jugement éternel pour les âmes défuntes.',
      attributes: {
        Régions: ['Portes gardées par des démons à couteaux', 'Lac de Feu', 'Champs d’Ialou (Le Paradis)'],
        Épreuves: 'Connaissance des noms secrets des gardiens des portes',
      },
      source_refs: [
        {
          text: 'Livre de l’Amdouat',
          citation_quote: 'La première heure de la nuit : Rê pénètre dans l’horizon occidental du Douat.',
        },
      ],
    },
    {
      id: 'object_eye_of_horus',
      type: 'Object',
      corpus_id: 'egyptian-mythology',
      label: 'L’Œil Oudjat (Œil d’Horus)',
      summary:
        'L’œil sacré arraché à Horus par Seth lors de leur combat, guéri et recomposé par Thot. Amulette suprême de régénération, de protection et d’offrande divine.',
      attributes: {
        Pouvoir: 'Protection contre le mal, intégrité physique et résurrection',
        Symbolisme: 'Fractions mathématiques sacrées de la mesure égyptienne',
      },
      source_refs: [
        {
          text: 'Textes des Pyramides, Formule 249',
          citation_quote: 'Je t’apporte l’Œil d’Horus, que ton cœur soit rassasié par lui !',
        },
      ],
    },
    {
      id: 'event_weighing_of_heart',
      type: 'Event',
      corpus_id: 'egyptian-mythology',
      label: 'La Pesée du Cœur (Psychostasie)',
      summary:
        'L’épreuve ultime dans la Salle des Deux Vérités où le cœur (Ib) du défunt est posé sur la balance face à la plume d’autruche de Maât, sous le regard d’Osiris et d’Ammout.',
      attributes: {
        Lieu: 'Salle des Deux Vérités devant les 42 juges divins',
        Dévoratrice: 'Ammout (La dévoreuse des cœurs impurs)',
        Résultat: 'Maa Kherou (Justifié de voix) ou anéantissement',
      },
      source_refs: [
        {
          text: 'Livre des Morts, Chapitre 125',
          citation_quote: 'Je n’ai pas commis d’iniquité, je n’ai pas fait pleurer autrui, je suis pur !',
        },
      ],
    },
    {
      id: 'concept_maat',
      type: 'Concept',
      corpus_id: 'egyptian-mythology',
      label: 'Maât (Vérité & Ordre Cosmique)',
      summary:
        'Le principe fondamental d’harmonie universelle, de justice, d’équilibre cosmique et de droiture morale sans lequel l’univers basculerait dans le chaos primal (Isfet).',
      attributes: {
        Symbole: 'La plume d’autruche de vérité',
        Opposition: 'Isfet (Le Chaos, le Mensonge et la Démesure)',
      },
      source_refs: [
        {
          text: 'Maximes de Ptahhotep',
          citation_quote: 'Grande est Maât, durable est son efficacité ; elle n’a pas été troublée depuis l’époque d’Osiris.',
        },
      ],
    },
  ],
  edges: [
    {
      id: 'edge_osiris_isis',
      source: 'char_osiris',
      target: 'char_isis',
      type: 'SPOUSE_OF',
      label: 'ÉPOUX & FRÈRE DE',
      description: 'L’union divine régénératrice d’Osiris et Isis',
      corpus_id: 'egyptian-mythology',
      source_refs: [{ text: 'Textes des Pyramides' }],
    },
    {
      id: 'edge_horus_osiris',
      source: 'char_horus',
      target: 'char_osiris',
      type: 'CHILD_OF',
      label: 'FILS & VENGEUR DE',
      description: 'Horus restaure l’honneur de son père défunt et réclame son héritage royal',
      corpus_id: 'egyptian-mythology',
      source_refs: [{ text: 'Papyrus Chester Beatty I' }],
    },
    {
      id: 'edge_horus_isis',
      source: 'char_horus',
      target: 'char_isis',
      type: 'CHILD_OF',
      label: 'PROTÉGÉ & ÉLEVÉ PAR',
      description: 'Isis cache et guérit le jeune Horus dans les marais de Khemmis',
      corpus_id: 'egyptian-mythology',
      source_refs: [{ text: 'Stèle de Metternich' }],
    },
    {
      id: 'edge_horus_seth',
      source: 'char_horus',
      target: 'char_seth',
      type: 'FOUGHT',
      label: 'A COMBATTU POUR LE TRÔNE',
      description: 'La guerre mythique de 80 ans opposant l’ordre royal et le chaos',
      corpus_id: 'egyptian-mythology',
      source_refs: [{ text: 'Papyrus Chester Beatty I' }],
    },
    {
      id: 'edge_seth_osiris',
      source: 'char_seth',
      target: 'char_osiris',
      type: 'SLAYED',
      label: 'A ASSASSINÉ & DÉMEMBRÉ',
      description: 'Seth piège Osiris dans un coffre de cèdre et disperse ses restes sur le Nil',
      corpus_id: 'egyptian-mythology',
      source_refs: [{ text: 'Plutarque, De Iside et Osiride' }],
    },
    {
      id: 'edge_anubis_osiris',
      source: 'char_anubis',
      target: 'char_osiris',
      type: 'SERVES',
      label: 'A EMBAUMÉ LE CORPS DE',
      description: 'Anubis préside à la première momification sacrée de l’histoire cosmique',
      corpus_id: 'egyptian-mythology',
      source_refs: [{ text: 'Livre des Morts' }],
    },
    {
      id: 'edge_anubis_weighing',
      source: 'char_anubis',
      target: 'event_weighing_of_heart',
      type: 'RULES_OVER',
      label: 'PRÉSIDE À',
      description: 'Anubis conduit le défunt et surveille l’exactitude de la balance',
      corpus_id: 'egyptian-mythology',
      source_refs: [{ text: 'Papyrus d’Ani' }],
    },
    {
      id: 'edge_weighing_maat',
      source: 'event_weighing_of_heart',
      target: 'concept_maat',
      type: 'EMBODIES',
      label: 'ÉVALUÉ SELON',
      description: 'Le cœur est pesé rigoureusement contre la plume de Maât',
      corpus_id: 'egyptian-mythology',
      source_refs: [{ text: 'Livre des Morts, Chapitre 125' }],
    },
    {
      id: 'edge_osiris_duat',
      source: 'char_osiris',
      target: 'place_duat',
      type: 'RULES_OVER',
      label: 'SOUVERAIN DU',
      description: 'Osiris trône dans la salle divine d’Amenti au cœur du Douat',
      corpus_id: 'egyptian-mythology',
      source_refs: [{ text: 'Livre de l’Amdouat' }],
    },
    {
      id: 'edge_thot_eye',
      source: 'char_thot',
      target: 'object_eye_of_horus',
      type: 'GUIDED_BY',
      label: 'A SOIGNÉ & RECOMPOSÉ',
      description: 'Thot rassemble les morceaux de l’œil d’Horus et lui redonne sa plénitude',
      corpus_id: 'egyptian-mythology',
      source_refs: [{ text: 'Textes des Pyramides' }],
    },
  ],
};
