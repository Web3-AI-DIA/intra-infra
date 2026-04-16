# Intra-Infra

## Project Overview
Intra-Infra is a universal, open-source, public-good indexing generator that supports multiple chains and multiple indexer backends.

Multi-chain indexing is painful because each blockchain ecosystem has its own unique indexing tools, ABIs, IDLs, and architectures. Intra-Infra solves this by providing a unified CLI that automatically generates indexing scaffolds for multiple chains from their respective contract definitions (ABI, IDL, Move modules, Cairo contracts). It is a public-good developer tool designed to accelerate multi-chain dApp development.

## Supported Chains
- **EVM** → The Graph subgraph
- **Solana** → Anchor IDL → Solana Indexer scaffold
- **Sui** → Move module → Sui Indexer scaffold
- **Aptos** → Move module → Aptos Indexer scaffold (Coming soon)
- **Starknet** → Cairo contract → Starknet Indexer scaffold (Coming soon)
- **Filecoin/FVM** → ABI → FVM indexer scaffold (Coming soon)

## Key Features
- Multi-chain ABI/IDL parsing.
- Automatic code generation.
- Extensible architecture.
- CLI-first developer experience.

## Installation Instructions

### macOS (Homebrew)
```bash
brew install node
npm install -g intra-infra
```

### Linux (apt + nvm)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm install node
npm install -g intra-infra
```

### Windows (Node installer)
1. Download and install Node.js from [nodejs.org](https://nodejs.org/).
2. Open Command Prompt or PowerShell and run:
```cmd
npm install -g intra-infra
```

## Installing The Graph CLI
For EVM subgraph generation, you will need The Graph CLI:
```bash
npm install -g @graphprotocol/graph-cli
graph --version
```

## Usage Examples

### EVM (The Graph Subgraph)
```bash
intra-infra generate subgraph-evm --network mainnet --address 0x123... --abi ./Contract.json --name MyEvmIndexer
```

### Solana
```bash
intra-infra generate indexer-solana --idl ./idl.json --name MySolanaIndexer
```

### Sui
```bash
intra-infra generate indexer-sui --module ./module.json --name MySuiIndexer
```

### Aptos
```bash
intra-infra generate indexer-aptos --module ./module.json --name MyAptosIndexer
```

### Starknet
```bash
intra-infra generate indexer-starknet --cairo ./contract.json --name MyStarknetIndexer
```

### Filecoin/FVM
```bash
intra-infra generate indexer-fvm --network filecoin --address f01234 --abi ./Contract.json --name MyFvmIndexer
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
MIT License
