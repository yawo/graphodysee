import { MythologyGraph } from '../../types/mythology';

export const egyptianMythologyCorpus: MythologyGraph = {
  manifest: {
    id: 'egyptian-mythology',
    name: 'The Osiris Myth & The Duat',
    culture: 'Ancient Egyptian',
    language: 'Middle Egyptian / English translation',
    era: 'Old Kingdom to New Kingdom (c. 2400 BCE - 1000 BCE)',
    description:
      'The sacred cycle of Osiris’s death and resurrection, Isis’s devoted magic, Horus’s battle against Set for the cosmic throne, and the perilous journey of souls through the Duat to the Hall of Ma’at.',
    icon: 'Sun',
    accent_color: '#06b6d4',
    license_note:
      'Primary texts based on Pyramid Texts (Faulkner translation), Book of the Dead (Papyrus of Ani, E.A. Wallis Budge), and Contendings of Horus and Seth (Chester Beatty Papyrus I).',
    default_voice: 'Zephyr',
    narrative_style: {
      tone: 'Hieratic, solemn, reverent, mystical priest-narrator of ancient Heliopolis',
      length_seconds: 180,
      recommended_speakers: ['Temple Lector Priest', 'Isis the Great Magician', 'Horus Avenger of Father'],
    },
    featured_nodes: ['char_osiris', 'char_isis', 'char_horus', 'char_anubis', 'place_duat'],
  },
  nodes: [
    {
      id: 'char_osiris',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Osiris (Wesir)',
      summary:
        'First Pharaoh of Egypt, god of the afterlife, resurrection, fertility, and agriculture. Murdered and dismembered by his brother Set, then resurrected by Isis to become Supreme Judge of the Dead.',
      attributes: {
        Domain: ['Afterlife', 'Resurrection', 'Vegetation', 'Justice'],
        Epithets: ['Lord of Eternity (Neb-er-Djer)', 'First of the Westerners (Khenty-Imentiu)', 'The Green God'],
        Crown: 'Atef Crown with ostrich plumes',
        Symbols: ['Crook and Flail', 'Djed Pillar'],
      },
      source_refs: [
        {
          text: 'Pyramid Texts, Utterance 213',
          chapter: 'Spell 213',
          citation_quote: 'O Osiris the King, you have not departed dead, you have departed alive! Take your seat upon the throne of Osiris.',
        },
        {
          text: 'Book of the Dead (Papyrus of Ani)',
          chapter: 'Hymn to Osiris',
          citation_quote: 'Homage to thee, Osiris, Lord of eternity, King of the Gods, whose names are manifold, whose forms are holy.',
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
        'Goddess of magic, motherhood, and healing. Sister-wife of Osiris who gathered his scattered limbs, reassembled him with Anubis, breathed life into him with her wings, and magically conceived Horus.',
      attributes: {
        Domain: ['Heka (Magic)', 'Motherhood', 'Protection of the Dead', 'Healing'],
        Epithets: ['Weret-Hekau (Great of Magic)', 'Divine Mother', 'Eye of Ra'],
        Amulet: 'Tyet (Knot of Isis / Blood of Isis)',
      },
      source_refs: [
        {
          text: 'Great Hymn to Osiris (Louvre Stela C 286)',
          passage: 'Col. 12-16',
          citation_quote: 'Isis the effective, protector of her brother, who sought him without wearying... who made shade with her plumage and created breath with her wings.',
        },
      ],
      timeline_order: 2,
    },
    {
      id: 'char_horus',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Horus (Heru)',
      summary:
        'Falcon-headed god of kingship, the sky, and justice. Son of Osiris and Isis who fought an eighty-year war against his uncle Set to avenge his father and claim the legitimate throne of Egypt.',
      attributes: {
        Domain: ['Kingship', 'Sky', 'Rightful Order', 'Vengeance'],
        Epithets: ['Hor-Nedj-Itef (Horus Avenger of his Father)', 'Hor-Behedeti', 'Lord of the Two Lands'],
        Sacred_Animal: 'Peregrine Falcon',
      },
      source_refs: [
        {
          text: 'The Contendings of Horus and Seth (Chester Beatty Papyrus I)',
          passage: 'Page 1, lines 1-5',
          citation_quote: 'Horus the child stood before the Great Ennead claiming the office of his father Osiris.',
        },
      ],
      timeline_order: 3,
    },
    {
      id: 'char_set',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Set (Seth / Sutekh)',
      summary:
        'God of the desert, storms, chaos, and foreign lands. Murderer of Osiris who contested Horus for the throne, but also the fierce defender who stands at the prow of Ra’s sun barge to spear the chaos serpent Apep.',
      attributes: {
        Domain: ['Chaos (Isfet)', 'Storms', 'Desert (Deshret)', 'Raw Power'],
        Epithets: ['The Red God', 'Lord of Upper Egypt', 'Slayer of Apep'],
        Symbol: 'The Set Animal (Sha)',
      },
      source_refs: [
        {
          text: 'Book of the Dead',
          chapter: 'Spell 39',
          citation_quote: 'Set thrusts his copper lance into the coils of Apep, driving the serpent of darkness back into the void.',
        },
        {
          text: 'Pyramid Texts',
          chapter: 'Utterance 477',
          citation_quote: 'Set smote Osiris down on the banks of Nedit in Abydos.',
        },
      ],
    },
    {
      id: 'char_anubis',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Anubis (Anpu)',
      summary:
        'Jackal-headed god of embalming, mummification, and psychopomp guide to the Duat. Overseer of the sacred Scales of Ma’at during the Weighing of the Heart.',
      attributes: {
        Domain: ['Mummification', 'Embalming', 'Guardian of Necropolises', 'Scales of Truth'],
        Epithets: ['Lord of the Sacred Land (Neb-Ta-Djeser)', 'He Who is Upon His Mountain (Imy-ut)'],
        Sacred_Animal: 'African Golden Jackal / Wolf',
      },
      source_refs: [
        {
          text: 'Book of the Dead (Papyrus of Ani)',
          chapter: 'Spell 125 (Psychostasia)',
          citation_quote: 'Anubis the embalmer, guardian of the balance, tests the tongue of the balance while the heart of the deceased is weighed against the Feather of Ma’at.',
        },
      ],
    },
    {
      id: 'char_thoth',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Thoth (Djehuty)',
      summary:
        'Ibis-headed god of wisdom, writing, hieroglyphs (medu netjer), science, and the moon. Scribe of the gods who recorded the judgment of souls in the Hall of Two Truths.',
      attributes: {
        Domain: ['Wisdom', 'Hieroglyphs', 'Moon', 'Arbitration', 'Astronomy'],
        Epithets: ['Lord of Divine Words', 'Three Times Great (Trismegistus)', 'Reckoner of Time'],
        Sacred_Animals: ['Sacred Ibis', 'Hamadryas Baboon'],
      },
      source_refs: [
        {
          text: 'Book of the Dead',
          chapter: 'Spell 125',
          citation_quote: 'Thoth, the righteous scribe of the Ennead, speaks: Hear this judgment! The heart of Ani has been weighed, and his soul has stood as witness for him.',
        },
      ],
    },
    {
      id: 'char_ra',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Ra (Re)',
      summary:
        'Supreme solar deity and creator god of Heliopolis. Traverses the sky in the Mandjet boat by day and journeys through the twelve hours of the underworld in the Mesektet boat by night.',
      attributes: {
        Domain: ['Sun', 'Creation', 'Cosmic Sovereignty'],
        Forms: ['Khepri (Dawn scarab)', 'Ra (Noon solar disk)', 'Atum (Evening ram-headed elder)'],
        Crown: 'Solar disk encircled by the Uraeus cobra',
      },
      source_refs: [
        {
          text: 'Book of Caverns & Book of Amduat',
          chapter: 'First Hour',
          citation_quote: 'The Majesty of this great god enters into the deep gateway of the Western horizon; the gods of the Netherworld rejoice at his shining.',
        },
      ],
    },
    {
      id: 'char_ammit',
      type: 'Character',
      corpus_id: 'egyptian-mythology',
      label: 'Ammit (The Devourer)',
      summary:
        'Fearsome chimera demon with the head of a crocodile, forequarters of a lion, and hindquarters of a hippopotamus. Devours the hearts of those found unworthy at the Scales of Ma’at, condemning them to non-existence.',
      attributes: {
        Role: 'Executioner of the Unworthy',
        Epithets: ['Devourer of the Dead', 'Eater of Hearts', 'Great of Death'],
      },
      source_refs: [
        {
          text: 'Book of the Dead',
          chapter: 'Spell 125 Vignette',
          citation_quote: 'Ammit sits crouching beside the balance, waiting to swallow the heart heavy with sins.',
        },
      ],
    },
    {
      id: 'place_duat',
      type: 'Place',
      corpus_id: 'egyptian-mythology',
      label: 'The Duat (The Netherworld)',
      summary:
        'The magical underworld realm beneath the earth containing twelve guarded gates, lakes of boiling fire, demons, and the Field of Reeds (Aaru).',
      attributes: {
        Ruler: 'Osiris',
        Divisions: '12 Hours / Gates guarded by fearsome knife-wielding deities',
        Final_Paradise: 'Sekhet-Aaru (Field of Reeds)',
      },
      source_refs: [
        {
          text: 'Book of the Dead',
          chapter: 'Spell 144 (The Seven Arits)',
          citation_quote: 'O you gatekeeper of the first portal of the Duat, let the justified spirit pass into the realm of the blessed.',
        },
      ],
    },
    {
      id: 'place_abydos',
      type: 'Place',
      corpus_id: 'egyptian-mythology',
      label: 'Abydos (Abdju)',
      summary:
        'Holy necropolis and principal pilgrimage city of Osiris, believed to contain his sacred head and the mythological tomb of the god.',
      attributes: {
        Significance: 'Sacred center of the Osiris Mysteries and national passion plays',
        Landmark: 'The Osireion subterranean cenotaph',
      },
      source_refs: [
        {
          text: 'Ikhernofret Stela (Berlin Museum 1204)',
          passage: 'Lines 12-24',
          citation_quote: 'I organized the procession of Osiris when he went forth to the tomb in Abydos.',
        },
      ],
    },
    {
      id: 'obj_eye_of_horus',
      type: 'Object',
      corpus_id: 'egyptian-mythology',
      label: 'The Eye of Horus (Wedjat)',
      summary:
        'The left eye of Horus, gouged out and shattered by Set during their battle, restored and healed by Thoth. Symbol of protection, wholeness, sacrifice, and cosmic healing.',
      attributes: {
        Symbolism: ['Protection', 'Royal Power', 'Healing / Wholeness (Udja)', 'Fractions of Measurement'],
        Restorer: 'Thoth',
      },
      source_refs: [
        {
          text: 'Pyramid Texts',
          chapter: 'Utterance 356',
          citation_quote: 'Horus has given you his Eye; your heart shall not be weary with it; take the Eye of Horus that your flesh may be made sound.',
        },
      ],
    },
    {
      id: 'obj_ankh',
      type: 'Object',
      corpus_id: 'egyptian-mythology',
      label: 'The Ankh (Key of Life)',
      summary:
        'Ancient Egyptian hieroglyphic symbol representing eternal life, breath of life, and divine vitality held by gods to the nostrils of kings and righteous souls.',
      attributes: {
        Meaning: 'Life / Eternal Existence (Ankh)',
        Material: 'Gold, faience, bronze',
      },
      source_refs: [
        {
          text: 'Coffin Texts',
          chapter: 'Spell 80',
          citation_quote: 'I live upon the air of life; I am the Ankh that issues from the sun god.',
        },
      ],
    },
    {
      id: 'event_murder_of_osiris',
      type: 'Event',
      corpus_id: 'egyptian-mythology',
      label: 'The Murder & Dismemberment of Osiris',
      summary:
        'Set tricks Osiris into a lavish wooden chest sealed with molten lead, casts it into the Nile, and later tears his corpse into fourteen pieces scattered across Egypt.',
      attributes: {
        Perpetrator: 'Set with 72 conspirators',
        Pieces: '14 sacred relics gathered by Isis and Nephthys',
      },
      source_refs: [
        {
          text: 'Plutarch, De Iside et Osiride',
          chapter: 'Section 13-18',
          citation_quote: 'Set fabricated a wondrous coffer matching Osiris’s measurements, and when Osiris lay down inside, they nailed the lid and poured hot lead.',
        },
      ],
      timeline_order: 1,
    },
    {
      id: 'event_weighing_of_the_heart',
      type: 'Event',
      corpus_id: 'egyptian-mythology',
      label: 'The Weighing of the Heart (Psychostasia)',
      summary:
        'The supreme judgment in the Hall of the Two Truths where the deceased recites the Negative Confession before 42 divine judges as Anubis balances the heart (Ib) against the Feather of Ma’at.',
      attributes: {
        Location: 'Hall of Ma’ati in the Duat',
        Witnesses: '42 Assessors of the Dead, Thoth, Osiris, Anubis, Ammit',
      },
      source_refs: [
        {
          text: 'Book of the Dead (Papyrus of Ani)',
          chapter: 'Spell 125',
          citation_quote: 'My heart, my mother! My heart that I had upon earth! Do not stand up against me as a witness before the great tribunal.',
        },
      ],
      timeline_order: 5,
    },
    {
      id: 'concept_maat',
      type: 'Concept',
      corpus_id: 'egyptian-mythology',
      label: 'Ma’at (Truth, Balance & Cosmic Order)',
      summary:
        'The foundational principle of cosmic harmony, justice, truth, and reciprocity established at the moment of creation. The antithesis of chaos (Isfet).',
      attributes: {
        Personification: 'Goddess Ma’at wearing an ostrich feather',
        Antithesis: 'Isfet (Chaos, falsehood, violence)',
        Requirement: 'Pharaoh must uphold Ma’at daily before the gods',
      },
      source_refs: [
        {
          text: 'The Maxims of Ptahhotep',
          passage: 'Maxim 5',
          citation_quote: 'Great is Ma’at, enduring and efficacious; it has not been disturbed since the time of Osiris.',
        },
      ],
    },
    {
      id: 'concept_ka_ba',
      type: 'Concept',
      corpus_id: 'egyptian-mythology',
      label: 'Ka and Ba (The Soul Dualism)',
      summary:
        'The components of human spiritual anatomy: the Ka (vital life force requiring nourishment) and Ba (personality/soul depicted as a human-headed bird able to travel between realms).',
      attributes: {
        Ka: 'Life force / spiritual double',
        Ba: 'Personality / soul in human-headed bird form',
        Akh: 'Transfigured radiant spirit united in the afterlife',
      },
      source_refs: [
        {
          text: 'Book of the Dead',
          chapter: 'Spell 89',
          citation_quote: 'Spell for causing the Ba-soul to be united to its physical corpse in the Netherworld.',
        },
      ],
    },
  ],
  edges: [
    {
      id: 'e_osi_isi',
      source: 'char_osiris',
      target: 'char_isis',
      type: 'SPOUSE_OF',
      label: 'Spouse & Sister of',
      description: 'Isis searched across the Mediterranean to recover Osiris and conceived Horus over his resurrected body.',
      source_refs: [{ text: 'Great Hymn to Osiris', passage: 'Col. 14-16' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_osi_hor',
      source: 'char_osiris',
      target: 'char_horus',
      type: 'PARENT_OF',
      label: 'Father of',
      description: 'Horus was posthumously conceived through Isis’s magical rites to avenge Osiris.',
      source_refs: [{ text: 'Pyramid Texts', chapter: 'Utterance 366' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_isi_hor',
      source: 'char_isis',
      target: 'char_horus',
      type: 'PARENT_OF',
      label: 'Mother & Protector of',
      description: 'Isis raised Horus secretly in the marshes of Khemmis to protect him from Set.',
      source_refs: [{ text: 'Metternich Stela', passage: 'Lines 45-70' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_set_osi',
      source: 'char_set',
      target: 'char_osiris',
      type: 'SLAYED',
      label: 'Murdered & Dismembered',
      description: 'Set assassinated Osiris out of jealousy to usurp the throne of Egypt.',
      source_refs: [{ text: 'Pyramid Texts', chapter: 'Utterance 477' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_hor_set',
      source: 'char_horus',
      target: 'char_set',
      type: 'FOUGHT',
      label: 'Fought for the Cosmic Throne',
      description: 'Horus and Set fought in multiple trials on land and water before the divine tribunal.',
      source_refs: [{ text: 'Chester Beatty Papyrus I', passage: 'Page 3-12' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_anu_osi',
      source: 'char_anubis',
      target: 'char_osiris',
      type: 'TRANSFORMED_INTO',
      label: 'Embalmed & Preserved',
      description: 'Anubis wrapped the dismembered flesh of Osiris in linen, inventing the first mummy.',
      source_refs: [{ text: 'Book of the Dead', chapter: 'Spell 151' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_anu_weighing',
      source: 'char_anubis',
      target: 'event_weighing_of_the_heart',
      type: 'RULES_OVER',
      label: 'Master of the Scales',
      description: 'Anubis checks the plumb-line of the balance during judgment.',
      source_refs: [{ text: 'Book of the Dead', chapter: 'Spell 125' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_thoth_weighing',
      source: 'char_thoth',
      target: 'event_weighing_of_the_heart',
      type: 'RULES_OVER',
      label: 'Divine Recorder',
      description: 'Thoth records the verdict on his papyrus palette for Osiris.',
      source_refs: [{ text: 'Book of the Dead', chapter: 'Spell 125' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_ammit_weighing',
      source: 'char_ammit',
      target: 'event_weighing_of_the_heart',
      type: 'GUARDS',
      label: 'Awaits the Damned',
      description: 'Ammit devours hearts that outweigh the feather of truth.',
      source_refs: [{ text: 'Book of the Dead', chapter: 'Spell 125' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_osi_duat',
      source: 'char_osiris',
      target: 'place_duat',
      type: 'RULES_OVER',
      label: 'Sovereign Lord of',
      description: 'Osiris sits upon the golden throne of the underworld evaluating all departed spirits.',
      source_refs: [{ text: 'Book of the Dead', chapter: 'Hymn to Osiris' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_osi_abydos',
      source: 'char_osiris',
      target: 'place_abydos',
      type: 'WORSHIPPED_AS',
      label: 'Principal Cult Center',
      description: 'Abydos hosted the annual mystery plays enacting Osiris’s triumph over death.',
      source_refs: [{ text: 'Ikhernofret Stela', passage: 'Line 14' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_hor_eye',
      source: 'char_horus',
      target: 'obj_eye_of_horus',
      type: 'ORIGIN_OF',
      label: 'Sacrificed & Restored',
      description: 'Horus lost his eye in battle against Set and presented it to Osiris to restore his father’s sight.',
      source_refs: [{ text: 'Pyramid Texts', chapter: 'Utterance 356' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_thoth_eye',
      source: 'char_thoth',
      target: 'obj_eye_of_horus',
      type: 'TRANSFORMED_INTO',
      label: 'Healed & Reassembled',
      description: 'Thoth gathered the six fragments of the eye and spit upon them to make it whole (Wedjat).',
      source_refs: [{ text: 'Book of the Dead', chapter: 'Spell 17' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_set_murder',
      source: 'char_set',
      target: 'event_murder_of_osiris',
      type: 'TOOK_PLACE_AT',
      label: 'Architect of Treason',
      description: 'Set plotted the chest trap at the feast.',
      source_refs: [{ text: 'Plutarch, De Iside et Osiride', chapter: '13' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_weighing_maat',
      source: 'event_weighing_of_the_heart',
      target: 'concept_maat',
      type: 'EMBODIES',
      label: 'Ultimate Test of',
      description: 'The soul is judged strictly against the immutable standard of Ma’at.',
      source_refs: [{ text: 'Book of the Dead', chapter: 'Spell 125' }],
      corpus_id: 'egyptian-mythology',
    },
    {
      id: 'e_ra_duat',
      source: 'char_ra',
      target: 'place_duat',
      type: 'DESCENDED_TO',
      label: 'Nightly Solar Voyage',
      description: 'Ra descends each night through the 12 hours of the Duat, merging with Osiris at midnight.',
      source_refs: [{ text: 'Book of Amduat', chapter: 'Hour 6' }],
      corpus_id: 'egyptian-mythology',
    },
  ],
};
