Intra‑Infra

Universal Multi‑Chain Indexer Scaffold Generator

Intra‑Infra is an open‑source CLI tool that generates indexer scaffolds from on‑chain definitions such as IDLs, ABIs, Move modules, and Cairo contracts.

✅ Current Support
- Solana — Anchor IDL → Indexer scaffold generator  
  - Generates schema  
  - Generates mappings  
  - Generates config  
  - Produces a ready‑to‑run indexer folder

🚀 Upcoming (Funding Requested)
- EVM — ABI → Subgraph generator for The Graph  
  - schema.graphql  
  - subgraph.yaml  
  - Mappings (TypeScript)  
  - Entities  
  - Templates  
  - Multi‑contract support  

This work is proposed as part of a Tooling Grant from The Graph Foundation.

---

📦 Installation

`
npm install -g intra-infra
`

---

🧩 Usage (Solana)

Generate a Solana indexer scaffold from an Anchor IDL:

`
intra-infra generate solana --idl ./idl.json --out ./generated
`

Output includes:

- Entities  
- Schema  
- Mappings  
- Config  
- Example handlers  

---

🛠 Architecture

`
src/
  chains/
    solana/   → full implementation
    evm/      → placeholder (funded milestone)
`

The architecture is modular and designed for multi‑chain expansion.

---

🗺 Roadmap

See full roadmap in /docs/roadmap.md.

Completed
- [x] Solana (Anchor IDL → indexer scaffolds)
- [x] CLI framework
- [x] Multi‑chain architecture

Upcoming (Pending Grant Funding)
- [ ] EVM (ABI → Subgraph generator)
- [ ] EVM templates (ERC‑20, ERC‑721, custom events)
- [ ] Mapping generator
- [ ] Schema inference improvements
- [ ] Multi‑contract support

---

🤝 Contributing

Contributions are welcome!  
Templates for new chains can be added under src/chains/<chain>/templates.

---

📄 License

MIT License.

---
