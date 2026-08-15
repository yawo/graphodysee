# GraphOdyssée 🌌📜

> **Interactive corpus-agnostic mythology knowledge-graph explorer and GraphRAG podcast generator.**

GraphOdyssée bridges ancient mythic storytelling and modern AI knowledge-graph exploration. It enables users to navigate interconnected mythologies through interactive graph canvases, discover relational paths between mythic entities, perform grounded GraphRAG semantic queries, and generate narrative audio podcast episodes with real-time fact citations.

---

## ✨ Features

- **Interactive Knowledge-Graph Canvas**:
  - Physics-driven 2D/3D-isometric canvas with spring physics, particle links, and neighborhood isolation.
  - 3 viewing modes: **Force-Directed Layout**, **Radial Type Clustering**, and **Chronological / Epochal Flow**.
  - Type-filtered entity nodes: `Character`, `Place`, `Object`, `Event`, and `Concept`.
  - Responsive pan, zoom, search-to-center, and entity dossiers.

- **Pre-Seeded Historical Mythology Corpora**:
  - **Homer’s Odyssey** (*Greek Epic Tradition*): Odysseus, Athena, Penelope, Telemachus, Circe, Polyphemus, Ithaca, Olympus, Underworld.
  - **Heliopolitan Cosmogony & Book of the Dead** (*Ancient Egyptian*): Ra, Osiris, Isis, Horus, Set, Anubis, Duat, Eye of Ra, Weighing of the Heart.
  - **The Prose & Poetic Eddas** (*Norse Mythology*): Odin, Thor, Loki, Freya, Yggdrasil, Mjölnir, Ragnarök.
  - **The Mahabharata & Ramayana** (*Vedic Lore & Hindu Epics*): Krishna, Arjuna, Rama, Sita, Ravana, Kurukshetra, Brahmastra.
  - **The Golden Legend & Hagiographies** (*Celestial Chronicles & Medieval Lore*): Archangel Michael, Saint George, Joan of Arc, The Grail.

- **Custom Corpus Ingestion Studio**:
  - Paste any mythological, historical, or literary text or prompt Gemini to extract structured entities, relational edges, and direct source citations into an instant interactive knowledge graph.

- **GraphRAG-Powered Podcast Studio**:
  - Synthesize structured, dramatic podcast episodes anchored strictly in the knowledge graph sub-network and verified text citations.
  - Multiple narrative styles: *Scholarly Analysis*, *Dramatic Storytelling*, *Mythic Mystery*, and *Children's Storybook*.
  - Built-in podcast player featuring animated waveform equalizers, playback speed controls (0.75x–1.5x), chapter navigation, synchronized transcripts, and live citation inspection.

- **Mythic Shortest-Path Finder**:
  - Discover relational links between any two arbitrary entities (e.g. *How is the Lotus Tree connected to Zeus?*).
  - Graph-traversal algorithm displays step-by-step edge relationships with interactive canvas highlighting.

- **GraphRAG Semantic QA Search**:
  - Ask natural language questions (e.g. *"Why did Poseidon curse Odysseus?"* or *"What role did Isis play in the resurrection of Osiris?"*).
  - Retrieves grounded answers linked directly to graph entities and primary sources.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Lucide React icons.
- **Backend & Middleware**: Node.js, Express, Vite middleware integration.
- **AI & GraphRAG**: Google GenAI SDK (`@google/genai` with `gemini-2.5-flash` / `gemini-2.5-pro`).
- **Audio & Synthesis**: Web Speech Synthesis API with custom waveform visualization and playback controls.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or bun
- A Google Gemini API Key (set as `GEMINI_API_KEY`)

### Installation

1. **Clone or download the project files**:
   ```bash
   git clone <repo-url>
   cd graphodyssee
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 📦 Available Scripts

- `npm run dev`: Runs the full-stack development server with TSX and Vite middleware on port 3000.
- `npm run build`: Builds the Vite production bundle and compiles the Express server to `dist/server.cjs`.
- `npm run start`: Runs the compiled production server.
- `npm run lint`: Checks TypeScript types with `tsc --noEmit`.
- `npm run clean`: Cleans generated `dist` artifacts.

---

## 📂 Project Structure

```
├── server.ts                  # Express backend with Gemini API proxy & Vite middleware
├── src/
│   ├── main.tsx               # Client entry point
│   ├── App.tsx                # Main application orchestrator
│   ├── api/                   # Client API methods (Graph, Podcast, QA, Extraction)
│   ├── components/            # React UI components
│   │   ├── Navbar.tsx         # Header, corpus switcher & quick actions
│   │   ├── GraphCanvas.tsx    # 2D/3D interactive canvas simulation
│   │   ├── EntityDossier.tsx  # Detailed entity sidebar with citations & relationships
│   │   ├── PodcastModal.tsx   # Episode audio player & script viewer
│   │   ├── PodcastLibraryModal.tsx # Saved podcast archives
│   │   ├── HybridSearchModal.tsx   # GraphRAG QA modal
│   │   ├── PathFinderModal.tsx     # Shortest path discovery modal
│   │   └── CorpusExtractorModal.tsx# AI myth text ingestion studio
│   ├── data/                  # Pre-seeded mythology corpora datasets
│   ├── types/                 # TypeScript interfaces for nodes, edges, podcasts
│   └── utils/                 # Audio synthesizer, path algorithms, force layout
├── metadata.json              # Application metadata & capabilities
└── package.json               # Dependencies and scripts
```

---

## 📜 License

MIT License. Crafted for exploring the world's mythological heritage through knowledge graphs and generative storytelling.
