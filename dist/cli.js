
#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generateEvmSubgraph_1 = require("./commands/generateEvmSubgraph");
const generateSolanaIndexer_1 = require("./commands/generateSolanaIndexer");
const generateSuiIndexer_1 = require("./commands/generateSuiIndexer");
const generateAptosIndexer_1 = require("./commands/generateAptosIndexer");
const generateStarknetIndexer_1 = require("./commands/generateStarknetIndexer");
const generateFvmIndexer_1 = require("./commands/generateFvmIndexer");
const program = new commander_1.Command();
program
    .name('intra-infra')
    .description('Universal multi-chain indexing generator')
    .version('1.0.4');
program
    .command('generate <target>')
    .description('Generate an indexer scaffold for a specific chain')
    .option('--network <network>', 'Target network (e.g., mainnet, devnet)')
    .option('--address <address>', 'Contract address (EVM, FVM)')
    .option('--abi <path>', 'Path to ABI JSON file (EVM, FVM)')
    .option('--idl <path>', 'Path to Anchor IDL file (Solana)')
    .option('--module <path>', 'Path to Move module JSON (Sui, Aptos)')
    .option('--cairo <path>', 'Path to Cairo contract JSON (Starknet)')
    .option('--name <name>', 'Project name', 'my-indexer')
    .option('--events <events>', 'Comma-separated event names (EVM)')
    .option('--functions <functions>', 'Comma-separated function names')
    .action(async (target, options) => {
    try {
        switch (target) {
            case 'subgraph-evm':
                await (0, generateEvmSubgraph_1.generateEvmSubgraph)(options);
                break;
            case 'indexer-solana':
                await (0, generateSolanaIndexer_1.generateSolanaIndexer)(options);
                break;
            case 'indexer-sui':
                await (0, generateSuiIndexer_1.generateSuiIndexer)(options);
                break;
            case 'indexer-aptos':
                await (0, generateAptosIndexer_1.generateAptosIndexer)(options);
                break;
            case 'indexer-starknet':
                await (0, generateStarknetIndexer_1.generateStarknetIndexer)(options);
                break;
            case 'indexer-fvm':
                await (0, generateFvmIndexer_1.generateFvmIndexer)(options);
                break;
            default:
                console.error(`Unknown target: ${target}`);
                console.log('Supported targets: subgraph-evm, indexer-solana, indexer-sui, indexer-aptos, indexer-starknet, indexer-fvm');
                process.exit(1);
        }
    }
    catch (error) {
        console.error(`Error generating ${target}:`, error.message);
        process.exit(1);
    }
});
program.parse(process.argv);
