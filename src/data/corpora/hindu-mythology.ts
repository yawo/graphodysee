import { MythologyGraph } from '../../types/mythology';

export const hinduMythologyCorpus: MythologyGraph = {
  manifest: {
    id: 'hindu-mythology',
    name: 'The Itihasas: Ramayana & Mahabharata',
    culture: 'Ancient Indian / Vedic',
    language: 'Sanskrit / English translation',
    era: 'c. 1000 BCE - 400 CE',
    description:
      'The cosmic epics of Dharma, the righteous exile and war of Rama to rescue Sita from Ravana, and the Kurukshetra war where Krishna delivers the immortal discourse of the Bhagavad Gita.',
    icon: 'Flame',
    accent_color: '#f97316',
    license_note:
      'Primary texts based on Valmiki Ramayana (Gita Press translation) and Mahabharata / Bhagavad Gita (Kisari Mohan Ganguli & Eknath Easwaran translations).',
    default_voice: 'Puck',
    narrative_style: {
      tone: 'Philosophical, luminous, majestic, steeped in cosmic duty and devotion',
      length_seconds: 180,
      recommended_speakers: ['Sage Valmiki', 'Lord Krishna', 'Devoted Hanuman'],
    },
    featured_nodes: ['char_rama', 'char_sita', 'char_hanuman', 'char_krishna', 'concept_dharma'],
  },
  nodes: [
    {
      id: 'char_rama',
      type: 'Character',
      corpus_id: 'hindu-mythology',
      label: 'Lord Rama',
      summary:
        'Seventh Avatar of Vishnu, prince of Ayodhya, and Maryada Purushottama (the ideal human of righteous conduct). Upholder of truth who endured fourteen years of forest exile and conquered the ten-headed demon king Ravana.',
      attributes: {
        Avatar: '7th Avatar of Vishnu',
        Kingdom: 'Ayodhya (Kosala Kingdom)',
        Epithets: ['Maryada Purushottama', 'Raghava', 'Kodandapani (Wielder of the Bow)'],
        Bow: 'Kodanda / Pinaka',
      },
      source_refs: [
        {
          text: 'Valmiki Ramayana, Bala Kanda',
          chapter: 'Sarga 1, Slokas 1-18',
          citation_quote: 'Who in this world is virtuous, valorous, knower of righteousness, true to his vows, and of unwavering character? Such a man is Rama, born in the Ikshvaku race.',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'char_sita',
      type: 'Character',
      corpus_id: 'hindu-mythology',
      label: 'Sita Devi (Janaki)',
      summary:
        'Incarnation of Goddess Lakshmi, princess of Mithila, and consort of Rama. Found in a furrow of the earth by King Janaka, emblem of devotion, courage, purity, and earth-bound endurance.',
      attributes: {
        Avatar: 'Incarnation of Lakshmi',
        Origin: 'Born from Mother Earth (Bhoomi Devi)',
        Virtue: 'Pativrata (Unwavering devotion and moral resilience)',
      },
      source_refs: [
        {
          text: 'Valmiki Ramayana, Bala Kanda',
          chapter: 'Sarga 66',
          citation_quote: 'As I was ploughing the sacrificial field, she arose from the furrow; hence she is named Sita.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_hanuman',
      type: 'Character',
      corpus_id: 'hindu-mythology',
      label: 'Hanuman (Maruti)',
      summary:
        'Divine Vanara warrior, incarnation of Shiva’s energy (Rudra Avatar), son of Vayu the wind god, and supreme personification of selfless devotion (Bhakti). Leaped across the ocean to Lanka and lifted Mount Dronagiri to fetch the life-saving Sanjeevani herb.',
      attributes: {
        Father: 'Vayu (Wind God) and Anjana',
        Powers: ['Ashta Siddhis (Eight mystical powers)', 'Nava Nidhis (Nine divine treasures)', 'Immortality (Chiranjivi)'],
        Deeds: ['Leap to Lanka', 'Burning of Lanka with his tail', 'Carrying Mount Dronagiri'],
      },
      source_refs: [
        {
          text: 'Valmiki Ramayana, Sundara Kanda',
          chapter: 'Sarga 1',
          citation_quote: 'Hanuman, son of the wind, assumed a gigantic form, pressed the mountain with his feet, and rose like a winged mountain into the sky to cross the ocean.',
        },
      ],
      timeline_order: 3,
    },
    {
      id: 'char_ravana',
      type: 'Character',
      corpus_id: 'hindu-mythology',
      label: 'Ravana (Dashanan)',
      summary:
        'Ten-headed scholar-king of Lanka, great devotee of Shiva and master of the Vedas, whose immense ego and adharmic abduction of Sita precipitated the cosmic war and his destruction by Rama.',
      attributes: {
        Heads: 'Ten heads representing mastery of the 4 Vedas and 6 Shastras',
        Realm: 'Golden Lanka',
        Boons: 'Invulnerability against gods, asuras, and spirits from Brahma (forgetting to include humans and animals)',
      },
      source_refs: [
        {
          text: 'Valmiki Ramayana, Yuddha Kanda',
          chapter: 'Sarga 108',
          citation_quote: 'Rama fitted the flaming Brahmastra given by Agastya, aimed at Ravana’s chest, and severed his life breath.',
        },
      ],
    },
    {
      id: 'char_krishna',
      type: 'Character',
      corpus_id: 'hindu-mythology',
      label: 'Lord Krishna',
      summary:
        'Eighth Avatar of Vishnu, statesman, and divine charioteer to Arjuna on the battlefield of Kurukshetra. Delivered the Bhagavad Gita, revealing the Vishvarupa (Universal Cosmic Form) and the paths of Karma, Jnana, and Bhakti Yoga.',
      attributes: {
        Avatar: 'Complete Purna Avatar of Vishnu',
        Discourse: 'The Bhagavad Gita (The Song of the Lord)',
        Symbols: ['Sudharshana Chakra', 'Panchajanya Conch', 'Flute (Bansuri)'],
      },
      source_refs: [
        {
          text: 'Bhagavad Gita',
          chapter: 'Chapter 4, Verses 7-8',
          citation_quote: 'Whenever there is a decline of righteousness (Dharma) and a rise of unrighteousness (Adharma), I manifest Myself to protect the virtuous and destroy evildoers.',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'place_ayodhya',
      type: 'Place',
      corpus_id: 'hindu-mythology',
      label: 'Ayodhya',
      summary:
        'Ancient capital city of the Solar Dynasty (Suryavansha) on the banks of the sacred Sarayu river, ruled by King Dasharatha and Lord Rama.',
      attributes: {
        River: 'Sarayu',
        Dynasty: 'Ikshvaku / Suryavansha',
      },
      source_refs: [
        {
          text: 'Valmiki Ramayana, Bala Kanda',
          chapter: 'Sarga 5',
          citation_quote: 'There was a city named Ayodhya on the banks of Sarayu, famous in the three worlds, built by Manu himself.',
        },
      ],
    },
    {
      id: 'place_lanka',
      type: 'Place',
      corpus_id: 'hindu-mythology',
      label: 'Golden Lanka',
      summary:
        'The island fortress crafted by the divine architect Vishvakarma, surrounded by the southern ocean and ruled by Ravana.',
      attributes: {
        Architect: 'Vishvakarma and Maya Danava',
        Access: 'Bridged by the Vanara army using floating stones inscribed with Rama’s name (Ram Setu)',
      },
      source_refs: [
        {
          text: 'Valmiki Ramayana, Sundara Kanda',
          chapter: 'Sarga 2',
          citation_quote: 'Lanka shone with palaces of gold and crystal, perched atop Mount Trikuta like a city suspended in the sky.',
        },
      ],
    },
    {
      id: 'obj_brahmastra',
      type: 'Object',
      corpus_id: 'hindu-mythology',
      label: 'The Brahmastra',
      summary:
        'The supreme metaphysical missile weapon created by Lord Brahma, capable of annihilating entire armadas, burning the cosmos, and causing centuries of environmental devastation.',
      attributes: {
        Creator: 'Lord Brahma',
        Effect: 'Incinerates all life and curses the land with drought',
      },
      source_refs: [
        {
          text: 'Valmiki Ramayana, Yuddha Kanda',
          chapter: 'Sarga 108',
          citation_quote: 'The Brahmastra, blazing like the fire of cosmic dissolution, was discharged by Rama with sacred mantras.',
        },
      ],
    },
    {
      id: 'event_kurukshetra_war',
      type: 'Event',
      corpus_id: 'hindu-mythology',
      label: 'The Kurukshetra War & The Bhagavad Gita',
      summary:
        'The eighteen-day apocalyptic war between the Pandavas and Kauravas on the sacred field of Kurukshetra, inaugurated by Krishna teaching Arjuna the eternal science of Duty and Soul immortality.',
      attributes: {
        Duration: '18 Days',
        Scripture: 'The Bhagavad Gita (700 verses across 18 chapters)',
      },
      source_refs: [
        {
          text: 'Bhagavad Gita',
          chapter: 'Chapter 2, Verse 47',
          citation_quote: 'You have a right only to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor let yourself be attached to inaction.',
        },
      ],
      timeline_order: 5,
    },
    {
      id: 'concept_dharma',
      type: 'Concept',
      corpus_id: 'hindu-mythology',
      label: 'Dharma (Righteous Cosmic Duty)',
      summary:
        'The moral and cosmic order that upholds and sustains the universe. The fundamental duty of an individual aligned with cosmic harmony, justice, truth, and societal virtue.',
      attributes: {
        Core_Maxims: ['Dharmo Rakshati Rakshitah (Dharma protects those who protect it)', 'Satyam Vada, Dharmam Chara (Speak the truth, abide by Dharma)'],
      },
      source_refs: [
        {
          text: 'Mahabharata, Vana Parva',
          chapter: '313.128',
          citation_quote: 'Dharma when protected protects the protector; when destroyed, it destroys. Therefore Dharma should not be transgressed.',
        },
      ],
    },
  ],
  edges: [
    {
      id: 'e_ram_sita',
      source: 'char_rama',
      target: 'char_sita',
      type: 'SPOUSE_OF',
      label: 'Divine Consort of',
      description: 'Rama broke the bow of Shiva at Mithila to win the hand of Sita.',
      source_refs: [{ text: 'Valmiki Ramayana, Bala Kanda', chapter: '67' }],
      corpus_id: 'hindu-mythology',
    },
    {
      id: 'e_han_ram',
      source: 'char_hanuman',
      target: 'char_rama',
      type: 'SERVES',
      label: 'Supreme Devotee & Ally of',
      description: 'Hanuman dedicated his life in pure selfless servitude to Rama.',
      source_refs: [{ text: 'Valmiki Ramayana, Kishkindha Kanda', chapter: '4' }],
      corpus_id: 'hindu-mythology',
    },
    {
      id: 'e_ram_rav',
      source: 'char_rama',
      target: 'char_ravana',
      type: 'SLAYED',
      label: 'Defeated in Battle',
      description: 'Rama slain Ravana on the battlefield of Lanka using the Brahmastra.',
      source_refs: [{ text: 'Valmiki Ramayana, Yuddha Kanda', chapter: '108' }],
      corpus_id: 'hindu-mythology',
    },
    {
      id: 'e_ram_brahma',
      source: 'char_rama',
      target: 'obj_brahmastra',
      type: 'POSSESSES',
      label: 'Discharged',
      description: 'Rama invoked the Brahmastra with Agastya’s solar hymn Aditya Hridaya.',
      source_refs: [{ text: 'Valmiki Ramayana, Yuddha Kanda', chapter: '107-108' }],
      corpus_id: 'hindu-mythology',
    },
    {
      id: 'e_kri_war',
      source: 'char_krishna',
      target: 'event_kurukshetra_war',
      type: 'GUIDED_BY',
      label: 'Charioteer & Teacher in',
      description: 'Krishna drove Arjuna’s chariot and sang the Gita on the battlefield.',
      source_refs: [{ text: 'Bhagavad Gita', chapter: '1' }],
      corpus_id: 'hindu-mythology',
    },
    {
      id: 'e_ram_dharma',
      source: 'char_rama',
      target: 'concept_dharma',
      type: 'EMBODIES',
      label: 'Embodiment of Dharma',
      description: 'Ramo Vigrahavan Dharmah — Rama is Dharma personified.',
      source_refs: [{ text: 'Valmiki Ramayana, Aranya Kanda', chapter: '37.13' }],
      corpus_id: 'hindu-mythology',
    },
  ],
};
