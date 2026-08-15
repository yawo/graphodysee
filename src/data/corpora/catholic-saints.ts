import { MythologyGraph } from '../../types/mythology';

export const catholicSaintsCorpus: MythologyGraph = {
  manifest: {
    id: 'catholic-saints',
    name: 'The Golden Legend & Hagiographies',
    culture: 'Christian / Medieval European Hagiography',
    language: 'Latin / English translation',
    era: '1st Century to 15th Century CE',
    description:
      'The sacred chronicles of the Archangels, dragon-slaying martyrs, mystic visionaries, stigmatists, and celestial patrons, as compiled in Jacobus de Voragine’s Legenda Aurea.',
    icon: 'Sparkles',
    accent_color: '#10b981',
    license_note:
      'Primary texts based on Jacobus de Voragine’s Legenda Aurea (The Golden Legend, William Caxton & Ryan translations) and canonical hagiographies.',
    default_voice: 'Kore',
    narrative_style: {
      tone: 'Hagiographical, radiant, reverent, mystical chronicler of saints and miracles',
      length_seconds: 180,
      recommended_speakers: ['Medieval Chronicler', 'Saint Joan of Arc', 'Saint Francis of Assisi'],
    },
    featured_nodes: ['char_st_michael', 'char_st_george', 'char_st_joan_of_arc', 'char_st_francis', 'concept_intercession'],
  },
  nodes: [
    {
      id: 'char_st_michael',
      type: 'Character',
      corpus_id: 'catholic-saints',
      label: 'Saint Michael the Archangel',
      summary:
        'Leader of the celestial armies of God, prince of the angels, and champion against Lucifer and cosmic rebellion. Depicted weighing souls at the Last Judgment and thrusting the dragon into the abyss.',
      attributes: {
        Title: 'Prince of the Heavenly Host / Archangel',
        Feast_Day: 'September 29 (Michaelmas)',
        Symbols: ['Flaming Sword', 'Scales of Justice', 'Dragon underfoot'],
        Patronage: ['Soldiers', 'Police', 'Sick', 'Protector of the Church'],
      },
      source_refs: [
        {
          text: 'Book of Revelation',
          chapter: '12:7-9',
          citation_quote: 'Now war arose in heaven, Michael and his angels fighting against the dragon. And the great dragon was thrown down, that ancient serpent called the devil.',
        },
        {
          text: 'Jacobus de Voragine, Legenda Aurea',
          chapter: 'Cap. 145 (The Feast of Saint Michael)',
          citation_quote: 'Michael is interpreted: Who is like unto God? For whenever any work of wondrous power is done, this Archangel is sent.',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'char_st_george',
      type: 'Character',
      corpus_id: 'catholic-saints',
      label: 'Saint George the Megalomartyr',
      summary:
        'Roman tribune of Cappadocia and Christian martyr. Renowned for rescuing the king’s daughter at Silene by slaying the venomous dragon with the sign of the Cross and his lance Ascalon.',
      attributes: {
        Title: 'Megalomartyr / Great Martyr',
        Feast_Day: 'April 23',
        Weapon: 'Lance Ascalon',
        Patronage: ['Chivalry', 'Knights', 'England', 'Georgia', 'Soldiers'],
      },
      source_refs: [
        {
          text: 'Jacobus de Voragine, Legenda Aurea',
          chapter: 'Cap. 58 (Life of Saint George)',
          citation_quote: 'Saint George mounted his horse, fortified himself with the sign of the cross, and rode boldly against the dragon that was coming toward him, brandishing his lance.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_st_joan_of_arc',
      type: 'Character',
      corpus_id: 'catholic-saints',
      label: 'Saint Joan of Arc (Jeanne d’Arc)',
      summary:
        'The Maid of Orléans, peasant visionary from Domrémy guided by the voices of Saint Michael, Saint Catherine, and Saint Margaret. Lifted the Siege of Orléans, crowned Charles VII at Reims, and was martyred at Rouen at age nineteen.',
      attributes: {
        Title: 'The Maid of Orléans (La Pucelle)',
        Feast_Day: 'May 30',
        Voices: ['Saint Michael the Archangel', 'Saint Catherine of Alexandria', 'Saint Margaret of Antioch'],
        Banner: 'Jesus Maria with golden lilies',
      },
      source_refs: [
        {
          text: 'Trial of Condemnation of Joan of Arc (Rouen, 1431)',
          chapter: 'Second Public Session',
          citation_quote: 'When I was about thirteen years old, I had a voice from God to help me in my conduct. And the first time I was terrified; the voice came about the noon hour in the summer time in my father’s garden.',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'char_st_francis',
      type: 'Character',
      corpus_id: 'catholic-saints',
      label: 'Saint Francis of Assisi',
      summary:
        'Founder of the Franciscan Order, mystic, and lover of holy poverty (Lady Poverty). Preached to the birds, tamed the wolf of Gubbio, and received the sacred stigmata (the five wounds of Christ) on Mount La Verna.',
      attributes: {
        Title: 'Il Poverello (The Little Poor Man)',
        Feast_Day: 'October 4',
        Works: ['Canticle of the Creatures (Brother Sun, Sister Moon)', 'Rule of Saint Francis'],
        Miracles: ['Stigmata on Mount La Verna', 'Taming of the Wolf of Gubbio'],
      },
      source_refs: [
        {
          text: 'Saint Bonaventure, Legenda Major',
          chapter: 'Chapter 13',
          citation_quote: 'While he dwelt in the hermitage called La Verna, about the feast of the Exaltation of the Holy Cross, he saw in a vision of God a Seraph with six wings like a flaming fire descending from heaven.',
        },
      ],
      timeline_order: 3,
    },
    {
      id: 'place_la_verna',
      type: 'Place',
      corpus_id: 'catholic-saints',
      label: 'Mount La Verna',
      summary:
        'Solitary mountain sanctuary in the Tuscan Apennines where Saint Francis retreated in prayer and received the stigmata from a six-winged Seraph.',
      attributes: {
        Location: 'Casentino, Tuscany',
        Relic: 'The cleft rock and the chapel of the Stigmata',
      },
      source_refs: [
        {
          text: 'The Little Flowers of Saint Francis (Fioretti)',
          chapter: 'Third Consideration of the Stigmata',
          citation_quote: 'Upon that solitary crag, Francis was transformed into the likeness of Christ crucified.',
        },
      ],
    },
    {
      id: 'obj_stigmata',
      type: 'Object',
      corpus_id: 'catholic-saints',
      label: 'The Sacred Stigmata',
      summary:
        'The bodily imprint of the five holy wounds of Christ (hands, feet, and pierced side) mysteriously manifested upon Saint Francis in 1224 CE.',
      attributes: {
        Origin: 'Imprinted by a crucified Seraph',
        Appearance: 'Nails of dark flesh protruding through hands and feet, bleeding lance wound in the side',
      },
      source_refs: [
        {
          text: 'Saint Bonaventure, Legenda Major',
          chapter: 'Chapter 13.3',
          citation_quote: 'There appeared in his hands and his feet the marks of nails, and his right side was pierced as if with a spear.',
        },
      ],
    },
    {
      id: 'event_siege_of_orleans',
      type: 'Event',
      corpus_id: 'catholic-saints',
      label: 'The Relief of the Siege of Orléans (1429)',
      summary:
        'Joan of Arc arrived at the besieged city of Orléans with her white banner, inspired the French army to take the fortress of Les Tourelles, and broke the seven-month English encirclement in nine days.',
      attributes: {
        Turning_Point: 'Reversed the course of the Hundred Years’ War',
        Banner: 'Carried into battle rather than her sword to avoid killing anyone',
      },
      source_refs: [
        {
          text: 'Journal of the Siege of Orléans',
          passage: 'May 8, 1429',
          citation_quote: 'On this day the English abandoned their bastilles and retreated; the Maid entered the Cathedral to give thanks to God.',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'concept_intercession',
      type: 'Concept',
      corpus_id: 'catholic-saints',
      label: 'Communion of Saints & Intercession',
      summary:
        'The Catholic theological doctrine that holy souls in heaven pray for and intercede on behalf of pilgrims on earth, mediating divine grace and miracles.',
      attributes: {
        Core_Premise: 'The living and the glorified form one single mystical body in Christ',
      },
      source_refs: [
        {
          text: 'Catechism of the Catholic Church',
          chapter: 'Paragraph 956',
          citation_quote: 'The intercession of the saints: Being more closely united to Christ, those who dwell in heaven fix the whole Church more firmly in holiness.',
        },
      ],
    },
  ],
  edges: [
    {
      id: 'e_mic_joan',
      source: 'char_st_michael',
      target: 'char_st_joan_of_arc',
      type: 'GUIDED_BY',
      label: 'Archangelic Voice to',
      description: 'Saint Michael appeared to Joan in Domrémy telling her to go to the aid of the King of France.',
      source_refs: [{ text: 'Trial of Condemnation of Joan of Arc', chapter: 'Session 3' }],
      corpus_id: 'catholic-saints',
    },
    {
      id: 'e_fra_verna',
      source: 'char_st_francis',
      target: 'place_la_verna',
      type: 'TOOK_PLACE_AT',
      label: 'Mystical Fast at',
      description: 'Francis fasted 40 days on Mount La Verna.',
      source_refs: [{ text: 'Fioretti', chapter: 'Treatise on Stigmata' }],
      corpus_id: 'catholic-saints',
    },
    {
      id: 'e_fra_stig',
      source: 'char_st_francis',
      target: 'obj_stigmata',
      type: 'POSSESSES',
      label: 'Received Holy Marks of',
      description: 'Francis bore the living wounds of Christ until his death.',
      source_refs: [{ text: 'Legenda Major', chapter: '13' }],
      corpus_id: 'catholic-saints',
    },
    {
      id: 'e_joan_orleans',
      source: 'char_st_joan_of_arc',
      target: 'event_siege_of_orleans',
      type: 'TOOK_PLACE_AT',
      label: 'Liberated',
      description: 'Joan led the assault that broke the siege of Orléans.',
      source_refs: [{ text: 'Journal of the Siege of Orléans', passage: 'May 1429' }],
      corpus_id: 'catholic-saints',
    },
    {
      id: 'e_geo_inter',
      source: 'char_st_george',
      target: 'concept_intercession',
      type: 'EMBODIES',
      label: 'Invoked as Patron',
      description: 'George is invoked as one of the Fourteen Holy Helpers in times of trial.',
      source_refs: [{ text: 'Legenda Aurea', chapter: 'Cap. 58' }],
      corpus_id: 'catholic-saints',
    },
  ],
};
