
#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generateSolanaIndexer_1 = require("./commands/generateSolanaIndexer");
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
    .option('--idl <path>', 'Path to Anchor IDL file (Solana)')
    .option('--name <name>', 'Project name', 'my-indexer')
    .option('--events <events>', 'Comma-separated event names (EVM)')
    .option('--functions <functions>', 'Comma-separated function names')
    .action(async (target, options) => {
    try {
        switch (target) {
            case 'indexer-solana':
                await (0, generateSolanaIndexer_1.generateSolanaIndexer)(options);
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
