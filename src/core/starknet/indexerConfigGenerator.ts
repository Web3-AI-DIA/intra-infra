import { CairoAbiItem } from './cairoParser';

export function generateStarknetIndexerConfig(name: string, events: CairoAbiItem[], functions: CairoAbiItem[]): any {
  return {
    name,
    events: events.map(e => e.name),
    functions: functions.map(f => f.name)
  };
}

export function generateStarknetRuntime(): string {
  return `import { Provider, RpcProvider } from 'starknet';
import config from './indexer.json';

async function main() {
  const provider = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.public.blastapi.io' });
  console.log(\`Starting Starknet Indexer for \${config.name}\`);

  // TODO: Implement block polling or WebSocket subscription
  setInterval(async () => {
    try {
      const block = await provider.getBlock('latest');
      console.log('Latest block:', block.block_number);
    } catch (e) {
      console.error(e);
    }
  }, 10000);
}

main().catch(console.error);
`;
}
