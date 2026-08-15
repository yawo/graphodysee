import { MythologyGraph } from '../../types/mythology';

export const mesopotamianCorpus: MythologyGraph = {
  manifest: {
    id: 'mesopotamian-gilgamesh',
    name: 'The Epic of Gilgamesh & Mesopotamian Lore',
    culture: 'Sumerian / Babylonian',
    language: 'Akkadian / English translation',
    era: 'c. 2100–1200 BCE',
    description:
      'The world’s oldest recorded epic: King Gilgamesh of Uruk, his brotherhood with the wild man Enkidu, the slaying of Humbaba, the Bull of Heaven, and the tragic quest for immortality across the Waters of Death.',
    icon: 'Sparkles',
    accent_color: '#d97706',
    license_note:
      'Based on the Standard Babylonian Epic of Gilgamesh by Sin-leqi-unninni and ancient cuneiform tablet records in public domain.',
    default_voice: 'Fenrir',
    narrative_style: {
      tone: 'Archaic, monumental, existential, echoing the resonant cadences of cuneiform verse',
      length_seconds: 180,
      recommended_speakers: ['Mesopotamian Scribe', 'Gilgamesh of Uruk', 'Enkidu of the Steppe', 'Siduri the Alewife'],
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
        'King of Uruk, two-thirds divine and one-third mortal, builder of the great walls of Uruk. After the heart-shattering death of his companion Enkidu, he embarks on an epic pilgrimage to conquer mortality.',
      attributes: {
        Title: 'King of Uruk, Hero of the Epic',
        Nature: 'Two-thirds divine, one-third human',
        Parents: 'Son of Lugalbanda and goddess Ninsun',
        Deeds: ['Raised the fired-brick walls of Uruk', 'Felled the Cedar Forest', 'Slew the Bull of Heaven'],
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet I',
          passage: 'Col. I:1-8',
          citation_quote: 'He who saw the Deep, the foundation of the land, who knew the ways, was wise in all matters! Gilgamesh, who inspected the edges of the earth.',
        },
        {
          text: 'Epic of Gilgamesh, Tablet IX',
          passage: 'Col. I:1-5',
          citation_quote: 'For his friend Enkidu, Gilgamesh did weep bitterly and roamed over the wilderness: Shall I not die too? Am I not like Enkidu?',
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
        'Created from clay and spit by the goddess Aruru to be an equal rival and companion to Gilgamesh. Civilized by Shamhat, he becomes Gilgamesh’s soul brother until his tragic divine execution.',
      attributes: {
        Origin: 'Fashioned by Aruru from pristine clay in the steppe',
        Role: 'Companion, mirror soul, wild protector of animals',
        Transformation: 'Initiated into humanity by Shamhat through bread, beer, and love',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet I',
          passage: 'Col. II:34-40',
          citation_quote: 'Aruru washed her hands, pinched off clay, cast it into the wilderness; on the steppe she created valiant Enkidu, offspring of silence.',
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
        'Queen of Heaven, goddess of love, beauty, sex, war, and political power. When Gilgamesh scorches her marriage proposal with a catalogue of her ruined lovers, she unleashes the monstrous Bull of Heaven upon Uruk.',
      attributes: {
        Domain: 'Love, War, Storms, Divine Sovereign Passion',
        Temple: 'Eanna in Uruk',
        Sacred_Symbol: 'Eight-pointed star, lion, rosette',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet VI',
          passage: 'Col. I:1-24',
          citation_quote: 'Come, Gilgamesh, be thou my bridegroom! Give me your fruit for my pleasure! Be my husband and I shall be your wife!',
        },
      ],
      timeline_order: 3,
    },
    {
      id: 'char_utnapishtim',
      type: 'Character',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Utnapishtim the Faraway',
      summary:
        'The Mesopotamian Noah, survivor of the great ancient Deluge who was granted eternal life by Enlil and Ea. He resides at the mouth of the rivers beyond the Waters of Death.',
      attributes: {
        Epithet: 'The Faraway (Rūqu)',
        Gift: 'Immortality granted by the gods after preserving all seeds of life in the Great Ark',
        Location: 'Dilmun, the edge of the rising sun',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet XI',
          passage: 'Col. I:1-14',
          citation_quote: 'Gilgamesh said to Utnapishtim the Faraway: As I look upon you, your appearance is no different; you are like me. Tell me how you joined the assembly of gods to seek life!',
        },
      ],
      timeline_order: 7,
    },
    {
      id: 'char_siduri',
      type: 'Character',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Siduri the Alewife',
      summary:
        'The wise divine tavern keeper who dwells by the shore of the vast cosmic sea. She offers Gilgamesh the timeless philosophical counsel of carpe diem: to cherish earthly joy, warmth, food, and family over futile quests for immortality.',
      attributes: {
        Role: 'Guardian of the Sea of Sun, Brewer of Heavenly Mead',
        Wisdom: 'Earthly joy and human love as the only true destiny of mortals',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Old Babylonian Tablet (Meissner)',
          passage: 'Col. III:1-14',
          citation_quote: 'Gilgamesh, whither rovest thou? The life you seek you will never find. When the gods created mankind, they allotted death to man, and retained life in their own hands.',
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
        'The ferocious guardian of the Cedar Forest of Lebanon, appointed by Enlil whose roar is the deluge, whose mouth is fire, and whose breath is death.',
      attributes: {
        Role: 'Guardian of the Sacred Cedar Realm',
        Appointed_by: 'Enlil to terrify mortal intruders',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet II',
          passage: 'Col. V:1-10',
          citation_quote: 'Enlil made him guardian of the Cedar Forest to frighten men away; his roar is the flood-storm, his breath is flame, his maw is death!',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'char_urshanabi',
      type: 'Character',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Urshanabi',
      summary:
        'The mystical ferryman who navigates the Waters of Death to the remote sanctuary of Utnapishtim using punting poles so mortal skin never touches the lethal current.',
      attributes: {
        Role: 'Ferryman of the cosmic waters of death',
        Vessel: 'Punting skiff with 120 cedar poles',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet X',
          passage: 'Col. III:25-45',
          citation_quote: 'Urshanabi said to him: Cut one hundred and twenty poles, each sixty cubits long; strip them and cap them with bitumen, and bring them here.',
        },
      ],
      timeline_order: 6,
    },
    {
      id: 'place_uruk',
      type: 'Place',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Uruk the Sheepfold',
      summary:
        'The ancient metropolis on the Euphrates river, crowning jewel of early civilization, famed for its massive seven-league burnt-brick walls and the temple Eanna dedicated to Anu and Ishtar.',
      attributes: {
        River: 'Euphrates',
        Architecture: 'Baked brick ramparts, copper foundation terrace, glazed mosaic ziggurat',
        Patron_Deity: 'Ishtar & Anu',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet I',
          passage: 'Col. I:18-22',
          citation_quote: 'Climb Uruk’s wall, walk upon it! Study the foundation terrace, inspect the brickwork! Is not the core of it made of oven-fired brick?',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'place_cedar_forest',
      type: 'Place',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'The Sacred Cedar Forest',
      summary:
        'The primeval mountain forest of giant aromatic cedars, dwelling of gods and protected by Humbaba, felled by Gilgamesh and Enkidu to build the great gate of Nippur.',
      attributes: {
        Aura: 'Terrifying divine cedar forest smelling of sweet resin',
        Guardian: 'Humbaba',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet V',
          passage: 'Col. I:1-10',
          citation_quote: 'They stood at the forest’s edge, gazing upon the towering height of the cedars, searching for the entrance where Humbaba trod.',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'place_waters_of_death',
      type: 'Place',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Waters of Death',
      summary:
        'The lethal abyss of black cosmic waters dividing the mortal world from Dilmun, where touching even a single droplet brings instantaneous annihilation.',
      attributes: {
        Danger: 'Fatal upon mortal contact',
        Navigator: 'Urshanabi the Ferryman',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet X',
          passage: 'Col. II:15-25',
          citation_quote: 'No mortal has ever crossed that sea, for deadly are the Waters of Death that bar the passage.',
        },
      ],
      timeline_order: 6,
    },
    {
      id: 'object_plant_of_youth',
      type: 'Object',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'Old Man Becomes Young (Plant of Rejuvenation)',
      summary:
        'A thorny aquatic plant growing at the bottom of the cosmic sweet-water deep (Apsu) that restores youth to the aged. Retrieved by Gilgamesh with stones on his feet, only to be stolen by a serpent.',
      attributes: {
        Name: 'Old Man Becomes Young Man (Shibu Issahir Amelu)',
        Power: 'Restores youth, vigor, and wrinkle-free skin',
        Fate: 'Devoured by a water serpent that instantly sloughs its old skin',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet XI',
          passage: 'Col. VI:265-290',
          citation_quote: 'There is a plant that grows like a box-thorn in the Apsu... if your hands take hold of it, you will find new life and youth renewed.',
        },
      ],
      timeline_order: 8,
    },
    {
      id: 'object_bull_of_heaven',
      type: 'Object',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'The Bull of Heaven (Gugalanna)',
      summary:
        'A catastrophic celestial beast demanded by Ishtar from Anu that splits open chasms in the earth with each snort, killing hundreds of warriors in Uruk before being butchered by Gilgamesh and Enkidu.',
      attributes: {
        Origin: 'Constellation Taurus, sent from the sky by Anu',
        Destruction: 'First snort opened a hole swallowing 100 men of Uruk',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet VI',
          passage: 'Col. III:95-130',
          citation_quote: 'With its first snort a chasm opened in Uruk, and one hundred young men fell into it. With its second snort, two hundred fell.',
        },
      ],
      timeline_order: 5,
    },
    {
      id: 'event_wrestling_match',
      type: 'Event',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'The Duel at the Bridal Door',
      summary:
        'The titanic wrestling match between Gilgamesh and Enkidu in the streets of Uruk. Their colossal clash shakes the doorposts of the city until Gilgamesh prevails and the two embrace as eternal brothers.',
      attributes: {
        Significance: 'Birth of the greatest brotherhood in world mythology',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet II',
          passage: 'Col. II:110-135',
          citation_quote: 'They seized each other at the bridal door; like bulls they locked horns, shattering the doorposts and shaking the walls.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'event_felling_cedar',
      type: 'Event',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'The Slaying of Humbaba',
      summary:
        'Gilgamesh and Enkidu march to Lebanon with divine axes, invoke the thirteen winds of Shamash, trap Humbaba, and despite his pleas for mercy, execute the forest demon.',
      attributes: {
        Consequence: 'Arouses the wrath of Enlil against Enkidu and Gilgamesh',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet V',
          passage: 'Col. IV:1-40',
          citation_quote: 'Shamash sent forth mighty winds against Huwawa: the South Wind, North Wind, Whirlwind, Storm Wind... Huwawa was trapped and could neither move forward nor back.',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'event_death_of_enkidu',
      type: 'Event',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'The Tragic Death of Enkidu',
      summary:
        'Decreed by the council of gods (Anu, Enlil, Ea) for slaying Humbaba and the Bull of Heaven, Enkidu suffers a slow feverish demise, triggering Gilgamesh’s profound existential dread and wandering.',
      attributes: {
        Impact: 'Shatters Gilgamesh’s pride and sparks the quest for eternal life',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet VII & VIII',
          passage: 'Tablet VIII: Col. II:1-20',
          citation_quote: 'Six days and seven nights I wept over him; I did not let him be buried until a maggot fell from his nostril.',
        },
      ],
      timeline_order: 5,
    },
    {
      id: 'event_flood',
      type: 'Event',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'The Great Primeval Deluge',
      summary:
        'The catastrophic universal flood decreed by Enlil to wipe out noisy humanity, from which Utnapishtim built a giant cube-shaped ark to save all living species.',
      attributes: {
        Duration: 'Six days and seven nights of apocalyptic torrent',
        Deliverance: 'Releasing dove, swallow, and raven at Mount Nimush',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet XI',
          passage: 'Col. III:100-145',
          citation_quote: 'For six days and seven nights the wind blew, the downpour, tempest and flood overwhelmed the land. When the seventh day arrived, the flood subsided.',
        },
      ],
      timeline_order: 7,
    },
    {
      id: 'concept_mortality_legacy',
      type: 'Concept',
      corpus_id: 'mesopotamian-gilgamesh',
      label: 'The Immortality of Human Works',
      summary:
        'The central philosophical realization of the epic: that physical immortality is reserved only for gods, but human beings achieve true everlasting life through their heroic deeds, monuments, compassion, and the enduring beauty of civilization.',
      attributes: {
        Core_Theme: 'Acceptance of mortality and celebration of human artifice',
        Manifestation: 'The walls of Uruk that outlast all kings',
      },
      source_refs: [
        {
          text: 'Epic of Gilgamesh, Tablet XI',
          passage: 'Col. VI:300-320',
          citation_quote: 'Gilgamesh said to Urshanabi: Mount the walls of Uruk, walk upon them, examine the foundation terrace... one square mile city, one square mile date-groves, one square mile clay-pits!',
        },
      ],
      timeline_order: 9,
    },
  ],
  edges: [
    {
      id: 'edge_g_e_friends',
      source: 'char_gilgamesh',
      target: 'char_enkidu',
      type: 'ALLIED_WITH',
      label: 'Brother-in-arms with',
      description: 'After an earth-shattering duel in Uruk, Gilgamesh and Enkidu become inseparable soul brothers and heroes.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet II', passage: 'Col. II' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_uruk',
      source: 'char_gilgamesh',
      target: 'place_uruk',
      type: 'RULES_OVER',
      label: 'King and builder of',
      description: 'Gilgamesh built the monumental brick ramparts and temples of Uruk.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet I', passage: 'Col. I' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_ishtar_g',
      source: 'char_ishtar',
      target: 'char_gilgamesh',
      type: 'CURSED_BY',
      label: 'Spurned by and curses',
      description: 'Gilgamesh fiercely rejects Ishtar’s advances, listing her previous doomed and mutilated lovers.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet VI', passage: 'Col. I' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_ishtar_bull',
      source: 'char_ishtar',
      target: 'object_bull_of_heaven',
      type: 'ORIGIN_OF',
      label: 'Unleashes upon Uruk',
      description: 'In divine fury, Ishtar commands Anu to release the Bull of Heaven to kill Gilgamesh.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet VI', passage: 'Col. III' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_ge_humbaba',
      source: 'char_gilgamesh',
      target: 'char_humbaba',
      type: 'SLAYED',
      label: 'Slays with Enkidu',
      description: 'With the help of Shamash’s storm winds, Gilgamesh and Enkidu slay the guardian of the Cedar Forest.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet V', passage: 'Col. IV' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_humbaba_forest',
      source: 'char_humbaba',
      target: 'place_cedar_forest',
      type: 'GUARDS',
      label: 'Guards the sacred cedar realm of',
      description: 'Appointed by Enlil to guard the sacred primeval cedars from mortal axes.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet II', passage: 'Col. V' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_enkidu_death',
      source: 'char_enkidu',
      target: 'event_death_of_enkidu',
      type: 'TOOK_PLACE_AT',
      label: 'Succumbs to fatal curse in',
      description: 'Enkidu is doomed by the council of gods for butchering Humbaba and the Bull of Heaven.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet VII', passage: 'Col. VI' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_siduri',
      source: 'char_gilgamesh',
      target: 'char_siduri',
      type: 'GUIDED_BY',
      label: 'Receives counsel on mortality from',
      description: 'Siduri instructs the grieving Gilgamesh to embrace mortal joys and family rather than chasing immortality.',
      source_refs: [{ text: 'Epic of Gilgamesh, Old Babylonian Tablet', passage: 'Col. III' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_urshanabi',
      source: 'char_gilgamesh',
      target: 'char_urshanabi',
      type: 'MET',
      label: 'Crosses waters of death with',
      description: 'Gilgamesh cuts 120 punting poles to cross the lethal sea with Urshanabi.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet X', passage: 'Col. III' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_urshanabi_waters',
      source: 'char_urshanabi',
      target: 'place_waters_of_death',
      type: 'RULES_OVER',
      label: 'Navigates deadly currents of',
      description: 'Only Urshanabi knows how to guide boats safely across the fatal waters to Dilmun.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet X', passage: 'Col. II' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_utnapishtim',
      source: 'char_gilgamesh',
      target: 'char_utnapishtim',
      type: 'MET',
      label: 'Seeks secret of immortality from',
      description: 'Gilgamesh reaches Utnapishtim to learn how he survived the Deluge and conquered death.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet XI', passage: 'Col. I' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_utnapishtim_flood',
      source: 'char_utnapishtim',
      target: 'event_flood',
      type: 'TOOK_PLACE_AT',
      label: 'Survived and saved all life during',
      description: 'Utnapishtim built the great ark to preserve seed of all living things through the divine storm.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet XI', passage: 'Col. III' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_utnapishtim_plant',
      source: 'char_utnapishtim',
      target: 'object_plant_of_youth',
      type: 'ORIGIN_OF',
      label: 'Reveals secret location of',
      description: 'Utnapishtim grants Gilgamesh the secret of the rejuvenation plant beneath the sea.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet XI', passage: 'Col. VI' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_plant',
      source: 'char_gilgamesh',
      target: 'object_plant_of_youth',
      type: 'POSSESSES',
      label: 'Dives into abyss to retrieve',
      description: 'Gilgamesh ties heavy stones to his feet and plunges to the floor of the Apsu to pluck the thorny plant.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet XI', passage: 'Col. VI' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
    {
      id: 'edge_g_legacy',
      source: 'char_gilgamesh',
      target: 'concept_mortality_legacy',
      type: 'EMBODIES',
      label: 'Achieves philosophical peace in',
      description: 'Returning to Uruk without the plant, Gilgamesh gazes upon his magnificent walls and finds immortality in human artistry.',
      source_refs: [{ text: 'Epic of Gilgamesh, Tablet XI', passage: 'Col. VI' }],
      corpus_id: 'mesopotamian-gilgamesh',
    },
  ],
};
