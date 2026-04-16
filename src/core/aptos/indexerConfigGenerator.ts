import { AptosMoveModule } from './moveParser';

export function generateAptosIndexerConfig(name: string, module: AptosMoveModule): any {
  return {
    name,
    moduleName: module.name,
    events: (module.structs || []).filter(s => s.is_event).map(s => s.name),
    functions: (module.exposed_functions || []).map(f => f.name)
  };
}

export function generateAptosRuntime(module: AptosMoveModule): string {
  return `import { AptosClient } from 'aptos';
import config from './indexer.json';

async function main() {
  const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/v1');
  console.log(\`Starting Aptos Indexer for module \${config.moduleName}\`);

  // TODO: Implement polling for events
  setInterval(async () => {
    try {
      // Example: client.getEventsByEventHandle(...)
      console.log('Polling for events...');
    } catch (e) {
      console.error(e);
    }
  }, 5000);
}

main().catch(console.error);
`;
}
