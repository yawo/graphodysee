import { MythologyGraph } from '../../types/mythology';

export const norseMythologyCorpusFr: MythologyGraph = {
  manifest: {
    id: 'norse-mythology',
    name: 'Les Eddas & Le Ragnarök',
    culture: 'Scandinavie Médiévale / Vieux Norrois',
    language: 'Vieux Norrois / Traduction Française',
    era: 'Âge des Vikings (env. 800 - 1200 apr. J.-C.)',
    description:
      'Le récit cosmique des Neuf Mondes suspendus autour d’Yggdrasil, la quête d’Odin pour la sagesse interdite des runes, les exploits de Thor contre les géants et le crépuscule fatal des dieux.',
    icon: 'Shield',
    accent_color: '#8b5cf6',
    license_note:
      'Sources primaires fondées sur l’Edda Poétique (trad. Régis Boyer) et l’Edda en Prose de Snorri Sturluson (trad. François-Xavier Dillmann).',
    default_voice: 'Fenrir',
    narrative_style: {
      tone: 'Skaldique, sombre, stoïque, fataliste, voix de scalde des fjords scandinaves',
      length_seconds: 180,
      recommended_speakers: ['Scalde d’Asgard', 'Odin le Père-de-Tout', 'Völva la Prophétesse'],
    },
    featured_nodes: ['char_odin', 'char_thor', 'char_loki', 'char_fenrir', 'place_yggdrasil', 'event_ragnarok'],
  },
  nodes: [
    {
      id: 'char_odin',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Odin (Le Père-de-Tout / Alfaðir)',
      summary:
        'Souverain des Ases et maître d’Asgard. Dieu de la guerre, de la sagesse secrète, de la fureur sacrée, de la poésie et des runes. Il sacrifia son œil à la source de Mímir et resta pendu neuf nuits à Yggdrasil pour conquérir les runes.',
      attributes: {
        Domaines: ['Guerre & Victoire', 'Sagesse cachée', 'Runes', 'Poésie skaldique', 'Fureur extatique'],
        Épithètes: ['Alfaðir (Père-de-Tout)', 'Hangaguð (Dieu des Pendus)', 'Grimnir', 'Bölverkr'],
        Compagnons_Animaux: ['Huginn & Muninn (Corbeaux Pensée et Mémoire)', 'Geri & Freki (Loups)', 'Sleipnir (Cheval à 8 jambes)'],
        Sacrifices: 'Un œil offert à Mímir ; 9 nuits suspendu transpercé par sa lance Gungnir à Yggdrasil',
      },
      source_refs: [
        {
          text: 'Edda Poétique, Hávamál',
          line_range: '138-141',
          citation_quote: 'Je sais que je pendis à l’arbre battu des vents neuf nuits entières, blessé d’une lance et offert à Odin, moi-même à moi-même donné.',
        },
        {
          text: 'Edda Poétique, Völuspá',
          line_range: '28-29',
          citation_quote: 'Je sais tout, Odin, où tu as caché ton œil : dans la source fameuse de Mímir.',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'char_thor',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Thor (Ásathórr)',
      summary:
        'Fils d’Odin et de la Terre Jörd. Dieu du tonnerre, de la foudre, de la force protectrice et champion indéfectible d’Asgard et de Midgard contre les géants (Jötnar).',
      attributes: {
        Armes_Sacrées: ['Mjöllnir (Le Marteau Concasseur)', 'Megingjörð (Ceinture de force)', 'Járngreipr (Gantelets de fer)'],
        Char: 'Tiré par les boucs Tanngrisnir et Tanngnjóstr',
        Ennemi_Juré: 'Jörmungandr (Le Serpent de Midgard)',
      },
      source_refs: [
        {
          text: 'Edda Poétique, Völuspá',
          line_range: '56-57',
          citation_quote: 'Alors s’avance le glorieux fils de Hlódyn, le protecteur de Midgard va combattre le serpent monstrueux.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_loki',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Loki (Laufeyjarson)',
      summary:
        'Fils du géant Fárbauti, frère de sang juré d’Odin. Dieu métamorphe, farceur et perfide, dont les intrigues culminent avec le meurtre de Baldr et la conduite des monstres lors du Ragnarök.',
      attributes: {
        Nature: 'Métamorphe (Faucon, jument, saumon, mouche)',
        Progéniture: ['Fenrir le loup', 'Jörmungandr le serpent', 'Hel souveraine des morts', 'Sleipnir'],
        Supplice: 'Enchaîné sous un serpent distillant un venin brûlant jusqu’au Ragnarök',
      },
      source_refs: [
        {
          text: 'Edda Poétique, Lokasenna',
          line_range: '9',
          citation_quote: 'Te souviens-tu, Odin, qu’aux jours anciens nous mêlâmes notre sang ? Tu juras de ne jamais boire si la bière ne m’était point versée.',
        },
      ],
      timeline_order: 3,
    },
    {
      id: 'char_freyja',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Freyja (Fille de Njörd)',
      summary:
        'Déesse des Vanes de l’amour, de la beauté, de la fertilité, de la magie du Seiðr et de la guerre. Elle accueille la moitié des guerriers tombés au combat dans sa demeure de Fólkvangr.',
      attributes: {
        Demeure: 'Fólkvangr (Champ du Peuple)',
        Attributs: ['Collier des Brísingar', 'Manteau de plumes de faucon', 'Char tiré par des chats bleus'],
        Magie: 'Seiðr (Magie prophétique et extatique transmise à Odin)',
      },
      source_refs: [
        {
          text: 'Edda en Prose, Gylfaginning',
          chapter: '24',
          citation_quote: 'Partout où elle chevauche au combat, elle reçoit la moitié des morts, et Odin l’autre moitié.',
        },
      ],
    },
    {
      id: 'char_fenrir',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Fenrir le Loup Monstrueux',
      summary:
        'Fils gigantesque de Loki et de la géante Angrboda. Garrotté par les dieux avec le ruban magique Gleipnir au prix de la main droite de Týr, destiné à dévorer Odin lors du Ragnarök.',
      attributes: {
        Lien_Magique: 'Gleipnir (Forgé par les nains avec le bruit d’un pas de chat et la barbe d’une femme)',
        Destin: 'Engloutir le soleil et dévorer Odin avant d’être abattu par Vidar',
      },
      source_refs: [
        {
          text: 'Edda Poétique, Völuspá',
          line_range: '53',
          citation_quote: 'Alors s’accomplit la seconde affliction de Frigg, quand Odin marche au combat contre le loup.',
        },
      ],
    },
    {
      id: 'place_yggdrasil',
      type: 'Place',
      corpus_id: 'norse-mythology',
      label: 'Yggdrasil (Le Frêne Cosmique)',
      summary:
        'L’arbre cosmique immortel reliant les Neuf Mondes. Ses racines plongent en Asgard, Jötunheim et Niflheim, baignées par la source d’Urd où siègent les Nornes.',
      attributes: {
        Trois_Sources: ['Source d’Urd (Destin)', 'Source de Mímir (Sagesse)', 'Hvergelmir (Source primordiale)'],
        Créatures: ['L’aigle au sommet', 'Le serpent Nídhögg aux racines', 'L’écureuil Ratatosk'],
      },
      source_refs: [
        {
          text: 'Edda Poétique, Grímnismál',
          line_range: '31-35',
          citation_quote: 'Yggdrasil est le plus noble des arbres, ses racines s’étendent à travers tous les mondes.',
        },
      ],
    },
    {
      id: 'place_asgard',
      type: 'Place',
      corpus_id: 'norse-mythology',
      label: 'Asgard & Le Valhalla',
      summary:
        'La forteresse céleste des dieux Ases, ceinte de remparts prodigieux et reliée à Midgard par le pont scintillant du Bifröst.',
      attributes: {
        Monuments: ['Valhalla (Salle des 540 portes)', 'Hlidskjalf (Haut-siège d’Odin)', 'Bifröst (Pont de l’arc-en-ciel)'],
      },
      source_refs: [
        {
          text: 'Edda en Prose, Gylfaginning',
          chapter: '14',
          citation_quote: 'Au centre du monde, les dieux bâtirent leur citadelle fortifiée nommée Asgard.',
        },
      ],
    },
    {
      id: 'object_mjolnir',
      type: 'Object',
      corpus_id: 'norse-mythology',
      label: 'Mjöllnir (Le Marteau de Thor)',
      summary:
        'Arme sacrée forgée par les nains Brokk et Sindri. Il ne manque jamais sa cible, revient toujours dans la main de Thor et consacre les mariages et les traités.',
      attributes: {
        Forges: 'Nains Brokk et Sindri sous le pari de Loki',
        Propriétés: ['Invocateur de la foudre', 'Protection des serments', 'Pouvoir de résurrection des boucs'],
      },
      source_refs: [
        {
          text: 'Edda Poétique, Thrymskvida',
          line_range: '30-32',
          citation_quote: 'Le cœur de Thor bondit dans sa poitrine quand il reconnut son fier marteau !',
        },
      ],
    },
    {
      id: 'event_ragnarok',
      type: 'Event',
      corpus_id: 'norse-mythology',
      label: 'Le Ragnarök (Le Crépuscule des Dieux)',
      summary:
        'La fin eschatologique du monde cosmique précédée du grand hiver Fimbulvetr. Affrontement cataclysmique où les dieux et les monstres s’entretuent avant la renaissance d’un monde verdoyant.',
      attributes: {
        Signes: ['Trois années d’hiver continu (Fimbulvetr)', 'Rupture de tous les liens magiques', 'Le navire Naglfar'],
        Survivants: ['Vidar & Vali', 'Modi & Magni (Fils de Thor héritant de Mjöllnir)', 'Baldr & Hödr revenant de Hel'],
      },
      source_refs: [
        {
          text: 'Edda Poétique, Völuspá',
          line_range: '45-58',
          citation_quote: 'Le soleil s’obscurcit, la terre s’enfonce dans la mer, les étoiles étincelantes disparaissent des cieux.',
        },
      ],
      timeline_order: 10,
    },
    {
      id: 'concept_wyrd',
      type: 'Concept',
      corpus_id: 'norse-mythology',
      label: 'Urðr / Wyrd (Le Destin Inéluctable)',
      summary:
        'La trame universelle du destin tissée par les trois Nornes (Urd, Verdandi, Skuld). Même les dieux souverains ne peuvent échapper à ce qui a été décrété dès l’aube des temps.',
      attributes: {
        Les_Trois_Nornes: ['Urðr (Ce qui est advenu)', 'Verðandi (Ce qui advient)', 'Skuld (Ce qui doit advenir)'],
        Principe: 'Honneur héroïque face à une fin inéluctable',
      },
      source_refs: [
        {
          text: 'Edda Poétique, Völuspá',
          line_range: '20',
          citation_quote: 'De là vinrent les trois vierges savantes ; elles gravèrent les runes du destin et fixèrent la vie des mortels.',
        },
      ],
    },
  ],
  edges: [
    {
      id: 'edge_odin_thor',
      source: 'char_odin',
      target: 'char_thor',
      type: 'PARENT_OF',
      label: 'PÈRE DE',
      description: 'Odin et la Terre engendrèrent le plus puissant des protecteurs d’Asgard',
      corpus_id: 'norse-mythology',
      source_refs: [{ text: 'Edda en Prose' }],
    },
    {
      id: 'edge_odin_loki',
      source: 'char_odin',
      target: 'char_loki',
      type: 'ALLIED_WITH',
      label: 'FRÈRE DE SANG JURÉ',
      description: 'Pacte primordial d’amitié brisé par la trahison de Loki envers Baldr',
      corpus_id: 'norse-mythology',
      source_refs: [{ text: 'Lokasenna' }],
    },
    {
      id: 'edge_thor_mjolnir',
      source: 'char_thor',
      target: 'object_mjolnir',
      type: 'POSSESSES',
      label: 'MANIE L’INVINCIBLE',
      description: 'Mjöllnir est le pilier de la défense divine contre les géants',
      corpus_id: 'norse-mythology',
      source_refs: [{ text: 'Gylfaginning' }],
    },
    {
      id: 'edge_loki_fenrir',
      source: 'char_loki',
      target: 'char_fenrir',
      type: 'PARENT_OF',
      label: 'PÈRE DE',
      description: 'Loki engendra le monstre qui doit anéantir le Père-de-Tout',
      corpus_id: 'norse-mythology',
      source_refs: [{ text: 'Völuspá' }],
    },
    {
      id: 'edge_odin_fenrir',
      source: 'char_odin',
      target: 'char_fenrir',
      type: 'FOUGHT',
      label: 'DOIT ÊTRE DÉVORÉ PAR',
      description: 'L’affrontement fatidique prédit lors de la plaine de Vigrid au Ragnarök',
      corpus_id: 'norse-mythology',
      source_refs: [{ text: 'Völuspá' }],
    },
    {
      id: 'edge_odin_yggdrasil',
      source: 'char_odin',
      target: 'place_yggdrasil',
      type: 'SACRIFICED_UPON',
      label: 'S’EST SUSPENDU 9 NUITS À',
      description: 'Le sacrifice cosmique d’Odin pour percer le mystère des runes sacrées',
      corpus_id: 'norse-mythology',
      source_refs: [{ text: 'Hávamál' }],
    },
    {
      id: 'edge_ragnarok_wyrd',
      source: 'event_ragnarok',
      target: 'concept_wyrd',
      type: 'EMBODIES',
      label: 'ACCOMPLISSEMENT DU',
      description: 'Le crépuscule des dieux est la manifestation suprême du destin des Nornes',
      corpus_id: 'norse-mythology',
      source_refs: [{ text: 'Völuspá' }],
    },
  ],
};
