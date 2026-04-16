"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSuiIndexerConfig = generateSuiIndexerConfig;
exports.generateSuiRuntime = generateSuiRuntime;
function generateSuiIndexerConfig(name, module) {
    return {
        name,
        moduleName: module.name,
        structs: Object.keys(module.structs || {}),
        functions: Object.keys(module.exposedFunctions || {})
    };
}
function generateSuiRuntime(module) {
    return `import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import config from './indexer.json';

async function main() {
  const client = new SuiClient({ url: getFullnodeUrl('mainnet') });
  console.log(\`Starting Sui Indexer for module \${config.moduleName}\`);

  // Subscribe to events
  const unsubscribe = await client.subscribeEvent({
    filter: { MoveModule: { package: "YOUR_PACKAGE_ID", module: config.moduleName } },
    onMessage: (event) => {
      console.log('Received event:', event);
      // TODO: Handle event based on config.structs
    }
  });
}

main().catch(console.error);
`;
}
