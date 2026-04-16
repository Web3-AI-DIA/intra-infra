"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFvmIndexerConfig = generateFvmIndexerConfig;
exports.generateFvmRuntime = generateFvmRuntime;
function generateFvmIndexerConfig(name, address, events) {
    return {
        name,
        address,
        events: events.filter(e => e.name).map(e => e.name)
    };
}
function generateFvmRuntime() {
    return `import { ethers } from 'ethers';
import config from './indexer.json';
import abi from './abi.json';

async function main() {
  // Filecoin/FVM RPC
  const provider = new ethers.JsonRpcProvider('https://api.node.glif.io');
  console.log(\`Starting FVM Indexer for \${config.name} at \${config.address}\`);

  const contract = new ethers.Contract(config.address, abi, provider);

  for (const eventName of config.events) {
    contract.on(eventName, (...args) => {
      console.log(\`Event \${eventName} received:\`, args);
    });
  }
}

main().catch(console.error);
`;
}
