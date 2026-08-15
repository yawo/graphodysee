import { MythologyGraph } from '../../types/mythology';

export const norseMythologyCorpus: MythologyGraph = {
  manifest: {
    id: 'norse-mythology',
    name: 'The Eddas & Ragnarök',
    culture: 'Old Norse / Scandinavian',
    language: 'Old Norse / English translation',
    era: 'Viking Age (c. 800 - 1200 CE)',
    description:
      'The cosmic narrative of the Nine Realms centered around Yggdrasil, Odin’s quest for forbidden wisdom, Thor’s battles against jötnar, Loki’s fateful betrayal, and the apocalyptic Twilight of the Gods.',
    icon: 'Shield',
    accent_color: '#8b5cf6',
    license_note:
      'Primary texts based on Poetic Edda (Jackson Crawford & Henry Adams Bellows translations) and Prose Edda of Snorri Sturluson (Anthony Faulkes translation).',
    default_voice: 'Fenrir',
    narrative_style: {
      tone: 'Grim, stoic, fatalistic, skaldic verse chanter of ancient Scandinavia',
      length_seconds: 180,
      recommended_speakers: ['Skaldic Chants', 'Odin the Allfather', 'Völva the Seeress'],
    },
    featured_nodes: ['char_odin', 'char_thor', 'char_loki', 'char_fenrir', 'place_yggdrasil', 'event_ragnarok'],
  },
  nodes: [
    {
      id: 'char_odin',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Odin (Allfather)',
      summary:
        'King of the Aesir gods, ruler of Asgard, god of war, wisdom, frenzy, poetry, and the runes. Sacrificed his eye at Mímir’s well and hung nine days on Yggdrasil to unlock the secrets of the cosmos.',
      attributes: {
        Domain: ['War', 'Wisdom', 'Runes', 'Poetry', 'Frenzy'],
        Epithets: ['Allfather (Alfaðir)', 'Hangaguð (God of the Hanged)', 'Grimnir', 'Bölverkr'],
        Sacred_Animals: ['Huginn and Muninn (Ravens)', 'Geri and Freki (Wolves)', 'Sleipnir (8-legged steed)'],
        Sacrifices: 'One eye to Mímir’s Well; 9 nights hung pierced by Gungnir upon Yggdrasil',
      },
      source_refs: [
        {
          text: 'Poetic Edda, Hávamál',
          line_range: '138-141',
          citation_quote: 'I know that I hung on a wind-swept tree nine whole nights, wounded with a spear, given to Odin, myself to myself.',
        },
        {
          text: 'Poetic Edda, Völuspá',
          line_range: '28-29',
          citation_quote: 'I know all, Odin, where you hid your eye: in the renowned well of Mímir.',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'char_thor',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Thor (Þórr)',
      summary:
        'God of thunder, lightning, storms, strength, and protector of humanity in Midgard. Wielder of the crushing hammer Mjölnir, destined to slay the World Serpent Jörmungandr at Ragnarök before succumbing to its venom.',
      attributes: {
        Domain: ['Thunder', 'Physical Might', 'Protection of Midgard', 'Consecration'],
        Epithets: ['Defender of Asgard', 'Slayer of Giants', 'Son of Earth (Jörð)'],
        Items: ['Mjölnir (Hammer)', 'Megingjörð (Belt of Strength)', 'Járngreipr (Iron Gauntlets)'],
      },
      source_refs: [
        {
          text: 'Poetic Edda, Völuspá',
          line_range: '55-56',
          citation_quote: 'Then comes the famous son of Hlódyn; Odin’s son goes to fight the serpent; in his wrath strikes Midgard’s defender; nine steps walks the son of Fjörgyn, fallen dead from the dragon.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_loki',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Loki',
      summary:
        'Jötunn blood-brother to Odin, trickster shapeshifter who engineered the murder of Baldr with mistletoe. Bound to subterranean stones with the entrails of his son beneath a venomous snake until breaking free at Ragnarök.',
      attributes: {
        Domain: ['Shapeshifting', 'Deceit', 'Catalyst of Catastrophe'],
        Offspring: ['Fenrir', 'Jörmungandr', 'Hel', 'Sleipnir'],
        Fate: 'Commands the ship of the dead (Naglfar) against the gods at Ragnarök',
      },
      source_refs: [
        {
          text: 'Prose Edda, Gylfaginning',
          chapter: 'Chapter 50',
          citation_quote: 'Loki took three flat stones and set them on edge, drilling holes through each. There they bound him with the entrails of his son Nari.',
        },
      ],
      timeline_order: 3,
    },
    {
      id: 'char_fenrir',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Fenrir (Fenrisúlfr)',
      summary:
        'Monstrous wolf sired by Loki and Angrboða, bound by the gods with the unyielding ribbon Gleipnir at the cost of Týr’s right hand. Prophesied to break his chains at Ragnarök and swallow Odin whole.',
      attributes: {
        Species: 'Monstrous Jötunn Wolf',
        Tether: 'Gleipnir (woven by dwarves from cat footfalls, mountain roots, woman beards)',
        Fate: 'Devours Odin; slain by Víðarr who rips his jaws apart with a leather boot',
      },
      source_refs: [
        {
          text: 'Prose Edda, Gylfaginning',
          chapter: 'Chapter 34',
          citation_quote: 'When the wolf opened his mouth, Týr put his right hand into his jaws. When Fenrir kicked, the ribbon tightened, and Týr lost his hand.',
        },
      ],
    },
    {
      id: 'char_baldr',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Baldr',
      summary:
        'Beloved son of Odin and Frigg, embodiment of light, purity, and beauty. Slain unwittingly by his blind brother Höðr guided by Loki’s mistletoe dart, triggering the inexorable descent toward Ragnarök.',
      attributes: {
        Status: 'Slain god dwelling in Helheim until the post-Ragnarök rebirth',
        Death_Cause: 'Mistletoe dart engineered by Loki',
      },
      source_refs: [
        {
          text: 'Poetic Edda, Völuspá',
          line_range: '31-33',
          citation_quote: 'I saw for Baldr, the bleeding god, Odin’s child, his hidden fate; high above the plain grew slender and fair the mistletoe.',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'char_freyja',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Freyja',
      summary:
        'Vanir goddess of love, beauty, fertility, gold, seidr magic, and battle death. She receives half of all warriors who fall in combat in her meadow Fólkvangr, preceding even Odin’s share.',
      attributes: {
        Domain: ['Love', 'Seiðr Magic', 'Battle Slain', 'Fertility', 'Gold'],
        Realm: 'Fólkvangr (Sessrúmnir)',
        Possessions: ['Brísingamen (Golden Necklace)', 'Falcon Cloak (Feathered Flight)', 'Chariot drawn by blue cats'],
      },
      source_refs: [
        {
          text: 'Poetic Edda, Grímnismál',
          line_range: '14',
          citation_quote: 'Fólkvang is the ninth, there Freyja directs the sittings in the hall; half the slain she chooses every day, and Odin gets the other half.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_heimdall',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Heimdall (The White God)',
      summary:
        'The gleaming guardian of the gods and the Bifröst bridge, born of nine mothers. He requires less sleep than a bird, can see 100 leagues by night or day, hears wool grow on sheep, and blows the Gjallarhorn to summon all beings to the final clash.',
      attributes: {
        Domain: ['Vigilance', 'Boundary Guardian', 'Divine Senses'],
        Title: 'The White As (Hvítastr Ása)',
        Possessions: ['Gjallarhorn (Cosmic War Horn)', 'Gulltoppr (Golden-maned horse)', 'Sword Höfuð'],
        Fate: 'Slays and is slain by Loki at the climax of Ragnarök',
      },
      source_refs: [
        {
          text: 'Poetic Edda, Völuspá',
          line_range: '46',
          citation_quote: 'Loud blows Heimdall, the horn is in the air; Odin speaks with Mím’s head; the ancient tree groans and the giant breaks free.',
        },
      ],
      timeline_order: 5,
    },
    {
      id: 'char_jormungandr',
      type: 'Character',
      corpus_id: 'norse-mythology',
      label: 'Jörmungandr (The Midgard Serpent)',
      summary:
        'Colossal venomous serpent child of Loki and Angrboða, cast into the cosmic sea by Odin. Grown so vast he encircles Midgard and grasps his own tail in his mouth; his thrashing at Ragnarök floods the continents with oceanic poison.',
      attributes: {
        Domain: ['Cosmic Boundary', 'Oceanic Depths', 'Lethal Venom'],
        Nemesis: 'Thor',
        Fate: 'Slain by Thor’s hammer Mjölnir; kills Thor with venom after nine paces',
      },
      source_refs: [
        {
          text: 'Poetic Edda, Hymiskviða',
          line_range: '22-24',
          citation_quote: 'Thor dragged the glistening serpent up onto the gunwale; with hammer raised, the fierce monster struck the hideous head of the serpent of the deep.',
        },
      ],
      timeline_order: 5,
    },
    {
      id: 'place_bifrost',
      type: 'Place',
      corpus_id: 'norse-mythology',
      label: 'Bifröst (The Shimmering Rainbow Bridge)',
      summary:
        'The flaming tripartite rainbow bridge connecting Midgard (realm of mortals) to Asgard (realm of gods), defended by Heimdall against giants until shattered by the sons of Muspell.',
      attributes: {
        Appearance: 'Three-stranded burning rainbow of red, blue, and green fire',
        Guardian: 'Heimdall residing at Himinbjörg',
        Destruction: 'Collapses under the weight of Surtr and the fire giants of Muspelheim',
      },
      source_refs: [
        {
          text: 'Prose Edda, Gylfaginning',
          chapter: 'Chapter 13',
          citation_quote: 'Have you not been told that the gods made a bridge from earth to heaven called Bifröst? You will have seen it, maybe you call it the rainbow. It has three colors and is very strong.',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'place_yggdrasil',
      type: 'Place',
      corpus_id: 'norse-mythology',
      label: 'Yggdrasil (The World Ash Tree)',
      summary:
        'The immense sacred cosmic ash tree whose branches extend into the heavens and whose three great roots nourish and bind together the Nine Realms.',
      attributes: {
        Nine_Realms: ['Asgard', 'Midgard', 'Jötunheim', 'Helheim', 'Niflheim', 'Muspelheim', 'Vanaheim', 'Alfheim', 'Svartalfheim'],
        Inhabitants: ['Níðhöggr (Dragon chewing roots)', 'Eagle at the crown', 'Ratatoskr (Messenger squirrel)', 'Four stags'],
      },
      source_refs: [
        {
          text: 'Poetic Edda, Grímnismál',
          line_range: '31-35',
          citation_quote: 'Three roots spread in three directions under the ash tree Yggdrasil: Hel lives under one, frost-giants under the second, mortal men under the third.',
        },
      ],
    },
    {
      id: 'place_valhalla',
      type: 'Place',
      corpus_id: 'norse-mythology',
      label: 'Valhalla (Hall of the Slain)',
      summary:
        'Odin’s majestic hall in Asgard roofed with golden shields and raftered with spears, where the Valkyries bring the Einherjar (fallen warriors) to feast and prepare for Ragnarök.',
      attributes: {
        Architecture: '540 doors, through each of which 800 warriors march abreast',
        Feast: 'Meat of the regenerating boar Sæhrímnir, mead from the goat Heiðrún',
      },
      source_refs: [
        {
          text: 'Poetic Edda, Grímnismál',
          line_range: '23-24',
          citation_quote: 'Five hundred doors and forty more, methinks, are in Valhalla; eight hundred warriors go through one door at once when they go to fight the wolf.',
        },
      ],
    },
    {
      id: 'obj_mjolnir',
      type: 'Object',
      corpus_id: 'norse-mythology',
      label: 'Mjölnir',
      summary:
        'Thor’s devastating short-handled war hammer forged by the dwarf brothers Brokkr and Sindri. Never misses its target, crushes mountains, and always returns to Thor’s hand.',
      attributes: {
        Makers: 'Brokkr and Eitri/Sindri',
        Flaw: 'Short handle caused by Loki (as a fly) stinging Brokkr’s eyelid during forging',
        Powers: 'Bludgeon of infinite force, lightning channeler, holy consecration of weddings/funerals',
      },
      source_refs: [
        {
          text: 'Prose Edda, Skáldskaparmál',
          chapter: 'Chapter 35',
          citation_quote: 'He could strike as hard as he liked at whatever was before him, and the hammer would never fail; wherever he threw it, it would never miss.',
        },
      ],
    },
    {
      id: 'event_death_of_baldr',
      type: 'Event',
      corpus_id: 'norse-mythology',
      label: 'The Murder of Baldr',
      summary:
        'Frigg extracted oaths from every creature and plant not to harm Baldr, omitting only the young mistletoe. Loki fashioned a dart from it and tricked blind Höðr into throwing it.',
      attributes: {
        Consequence: 'Began the unraveling of the moral order of the cosmos',
        Funeral: 'Baldr burned on his great dragon-prowed ship Hringhorni',
      },
      source_refs: [
        {
          text: 'Prose Edda, Gylfaginning',
          chapter: 'Chapter 49',
          citation_quote: 'Höðr took the mistletoe and shot at Baldr under Loki’s direction. The shaft flew through him, and Baldr fell dead to the earth.',
        },
      ],
      timeline_order: 4,
    },
    {
      id: 'event_ragnarok',
      type: 'Event',
      corpus_id: 'norse-mythology',
      label: 'Ragnarök (Twilight of the Gods)',
      summary:
        'The apocalyptic battle preceded by the three-year unbroken Fimbulwinter, where monsters shatter their bonds, the sky splits, gods and beasts destroy one another, and the world sinks into the sea to be reborn.',
      attributes: {
        Harbingers: 'Fimbulwinter, wolves swallow sun and moon, roosters crow in Nine Realms',
        Fateful_Duels: ['Odin vs. Fenrir', 'Thor vs. Jörmungandr', 'Freyr vs. Surtr', 'Heimdall vs. Loki'],
        Renewal: 'Earth rises green and fertile; Baldr returns; Líf and Lífþrasir repopulate humanity',
      },
      source_refs: [
        {
          text: 'Poetic Edda, Völuspá',
          line_range: '45-57',
          citation_quote: 'Brothers will fight and kill each other, sisters’ children will defile kinship... The sun turns black, earth sinks into the sea, the hot stars fall from the sky.',
        },
      ],
      timeline_order: 6,
    },
    {
      id: 'concept_wyrd',
      type: 'Concept',
      corpus_id: 'norse-mythology',
      label: 'Urðr / Wyrd (Unbending Fate)',
      summary:
        'The cosmic inevitability of destiny woven by the three Norns (Urðr, Verðandi, Skuld) beneath the well at the foot of Yggdrasil, which even the highest gods cannot escape.',
      attributes: {
        Weavers: 'The Three Norns at Urðarbrunnr',
        Philosophical_Core: 'Courage is not avoiding doom, but facing predetermined ruin with unwavering defiance and honor',
      },
      source_refs: [
        {
          text: 'Poetic Edda, Völuspá',
          line_range: '20',
          citation_quote: 'Thence come three maidens of deep knowing from the hall standing under the tree: Urð they call one, another Verðandi, and Skuld the third. They carved on wood, they laid down laws, they chose lives for the children of men, the fates of mortals.',
        },
      ],
    },
  ],
  edges: [
    {
      id: 'e_odin_thor',
      source: 'char_odin',
      target: 'char_thor',
      type: 'PARENT_OF',
      label: 'Father of',
      description: 'Odin fathered Thor with Jörð (the personification of the earth).',
      source_refs: [{ text: 'Prose Edda, Gylfaginning', chapter: 'Chapter 9' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_odin_loki',
      source: 'char_odin',
      target: 'char_loki',
      type: 'ALLIED_WITH',
      label: 'Blood-Brothers',
      description: 'Odin and Loki swore an ancient blood oath never to drink ale unless poured for both.',
      source_refs: [{ text: 'Poetic Edda, Lokasenna', line_range: '9' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_loki_fenrir',
      source: 'char_loki',
      target: 'char_fenrir',
      type: 'PARENT_OF',
      label: 'Father of',
      description: 'Loki sired Fenrir with the giantess Angrboða in the Ironwood.',
      source_refs: [{ text: 'Prose Edda, Gylfaginning', chapter: 'Chapter 34' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_fenrir_odin',
      source: 'char_fenrir',
      target: 'char_odin',
      type: 'SLAYED',
      label: 'Destined Slayer of',
      description: 'Fenrir swallows Odin whole at Ragnarök.',
      source_refs: [{ text: 'Poetic Edda, Völuspá', line_range: '53' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_thor_mjolnir',
      source: 'char_thor',
      target: 'obj_mjolnir',
      type: 'POSSESSES',
      label: 'Wields',
      description: 'Thor uses Mjölnir to slay giants and sanctify realms.',
      source_refs: [{ text: 'Prose Edda, Skáldskaparmál', chapter: '35' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_odin_ygg',
      source: 'char_odin',
      target: 'place_yggdrasil',
      type: 'TOOK_PLACE_AT',
      label: 'Self-Sacrifice upon',
      description: 'Odin hung pierced for nine nights upon Yggdrasil to win the runes.',
      source_refs: [{ text: 'Poetic Edda, Hávamál', line_range: '138-141' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_odin_valhalla',
      source: 'char_odin',
      target: 'place_valhalla',
      type: 'RULES_OVER',
      label: 'Lord of',
      description: 'Odin gathers chosen fallen warriors in Valhalla for the final battle.',
      source_refs: [{ text: 'Poetic Edda, Grímnismál', line_range: '21-24' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_loki_baldr',
      source: 'char_loki',
      target: 'event_death_of_baldr',
      type: 'TOOK_PLACE_AT',
      label: 'Instigated Murder of',
      description: 'Loki guided the fatal mistletoe dart into Baldr’s heart.',
      source_refs: [{ text: 'Prose Edda, Gylfaginning', chapter: '49' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_baldr_death',
      source: 'char_baldr',
      target: 'event_death_of_baldr',
      type: 'TOOK_PLACE_AT',
      label: 'Victim of',
      description: 'Baldr fell dead upon the playing field of the Aesir.',
      source_refs: [{ text: 'Poetic Edda, Völuspá', line_range: '31-33' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_ragnarok_wyrd',
      source: 'event_ragnarok',
      target: 'concept_wyrd',
      type: 'EMBODIES',
      label: 'Ultimate Fulfillment of',
      description: 'Ragnarök represents the inescapable destiny decreed by the Norns.',
      source_refs: [{ text: 'Poetic Edda, Völuspá', line_range: '20' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_heimdall_bifrost',
      source: 'char_heimdall',
      target: 'place_bifrost',
      type: 'GUARDS',
      label: 'Watchman of',
      description: 'Heimdall keeps ceaseless vigil against mountain and frost giants atop the rainbow bridge.',
      source_refs: [{ text: 'Prose Edda, Gylfaginning', chapter: 'Chapter 27' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_thor_jormungandr',
      source: 'char_thor',
      target: 'char_jormungandr',
      type: 'FOUGHT',
      label: 'Mortal Nemesis of',
      description: 'Thor battles the Midgard Serpent during a fishing expedition with Hymir and in their lethal mutual destruction at Ragnarök.',
      source_refs: [{ text: 'Poetic Edda, Völuspá', line_range: '55-56' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_heimdall_loki',
      source: 'char_heimdall',
      target: 'char_loki',
      type: 'FOUGHT',
      label: 'Reciprocal Slayers at Ragnarök',
      description: 'Heimdall and Loki fight to the death at the Singasteinn and in their apocalyptic final duel.',
      source_refs: [{ text: 'Prose Edda, Gylfaginning', chapter: 'Chapter 51' }],
      corpus_id: 'norse-mythology',
    },
    {
      id: 'e_freyja_odin',
      source: 'char_freyja',
      target: 'char_odin',
      type: 'ALLIED_WITH',
      label: 'Shares Slain Warriors with',
      description: 'Freyja introduced Odin to the mystical art of seiðr and divides the noble battlefield fallen with him.',
      source_refs: [{ text: 'Ynglinga Saga', chapter: 'Chapter 4' }],
      corpus_id: 'norse-mythology',
    },
  ],
};
