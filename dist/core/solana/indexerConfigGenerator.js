"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIndexerConfig = generateIndexerConfig;
exports.generateSolanaRuntime = generateSolanaRuntime;
function generateIndexerConfig(name, idl) {
    return {
        name,
        programId: "YOUR_PROGRAM_ID_HERE",
        instructions: idl.instructions.map(ix => ix.name),
        accounts: (idl.accounts || []).map(acc => acc.name),
        events: (idl.events || []).map(ev => ev.name)
    };
}
function generateSolanaRuntime() {
    return `import { Connection, PublicKey } from '@solana/web3.js';
import config from './indexer.json';

async function main() {
  const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
  const programId = new PublicKey(config.programId);

  console.log(\`Starting Solana Indexer for \${config.name} (\${programId.toBase58()})\`);

  connection.onLogs(programId, (logs, ctx) => {
    console.log('Received logs:', logs.signature);
    // TODO: Parse instructions and events
  }, 'confirmed');
}

main().catch(console.error);
`;
}
