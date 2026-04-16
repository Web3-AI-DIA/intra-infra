#!/usr/bin/env node
import { Command } from 'commander';
import { generateEvmSubgraph } from './commands/generateEvmSubgraph';
import { generateSolanaIndexer } from './commands/generateSolanaIndexer';
import { generateSuiIndexer } from './commands/generateSuiIndexer';
import { generateAptosIndexer } from './commands/generateAptosIndexer';
import { generateStarknetIndexer } from './commands/generateStarknetIndexer';
import { generateFvmIndexer } from './commands/generateFvmIndexer';

const program = new Command();

program
  .name('intra-infra')
  .description('Universal multi-chain indexing generator')
  .version('1.0.0');

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
          await generateEvmSubgraph(options);
          break;
        case 'indexer-solana':
          await generateSolanaIndexer(options);
          break;
        case 'indexer-sui':
          await generateSuiIndexer(options);
          break;
        case 'indexer-aptos':
          await generateAptosIndexer(options);
          break;
        case 'indexer-starknet':
          await generateStarknetIndexer(options);
          break;
        case 'indexer-fvm':
          await generateFvmIndexer(options);
          break;
        default:
          console.error(`Unknown target: ${target}`);
          console.log('Supported targets: subgraph-evm, indexer-solana, indexer-sui, indexer-aptos, indexer-starknet, indexer-fvm');
          process.exit(1);
      }
    } catch (error: any) {
      console.error(`Error generating ${target}:`, error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
