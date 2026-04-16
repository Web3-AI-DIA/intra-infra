import path from 'path';
import { ensureDir, readJson, writeFile, writeJson } from '../utils/fsUtils';
import { GenerateOptions, parseCommaSeparated } from '../utils/typeUtils';
import { AbiSchema } from '../utils/validators';
import { compileTemplate } from '../utils/templateUtils';

function mapSolidityTypeToGraphQL(type: string): string {
  if (type.includes('int')) return 'BigInt';
  if (type === 'address') return 'Bytes';
  if (type === 'bool') return 'Boolean';
  if (type.includes('bytes')) return 'Bytes';
  return 'String';
}

export async function generateEvmSubgraph(options: GenerateOptions) {
  if (!options.abi) throw new Error('--abi is required for EVM subgraph');
  if (!options.address) throw new Error('--address is required for EVM subgraph');
  if (!options.network) throw new Error('--network is required for EVM subgraph');

  const outDir = path.join(process.cwd(), 'generated', options.name);
  await ensureDir(outDir);
  await ensureDir(path.join(outDir, 'abis'));
  await ensureDir(path.join(outDir, 'src'));

  const rawAbi = await readJson(options.abi);
  const abi = AbiSchema.parse(rawAbi);
  await writeJson(path.join(outDir, 'abis', 'Contract.json'), abi);

  let events = abi.filter((item) => item.type === 'event');
  const targetEvents = parseCommaSeparated(options.events);
  if (targetEvents.length > 0) {
    events = events.filter((e) => e.name && targetEvents.includes(e.name));
  }

  const templateEvents = events.filter(e => e.name).map(e => ({
    name: e.name,
    inputs: (e.inputs || []).map((i, index) => ({
      name: i.name || `param${index}`,
      graphqlType: mapSolidityTypeToGraphQL(i.type)
    }))
  }));

  const schemaContext = { events: templateEvents };
  const schema = await compileTemplate('evm/schema.graphql.hbs', schemaContext);
  await writeFile(path.join(outDir, 'schema.graphql'), schema);

  const subgraphContext = {
    network: options.network,
    address: options.address,
    entities: events.filter(e => e.name).map(e => e.name),
    eventHandlers: events.filter(e => e.name).map(e => {
      const inputs = (e.inputs || []).map((i) => `${i.indexed ? 'indexed ' : ''}${i.type}`).join(',');
      return {
        eventSignature: `${e.name}(${inputs})`,
        handlerName: `handle${e.name}`
      };
    })
  };
  const subgraphYaml = await compileTemplate('evm/subgraph.yaml.hbs', subgraphContext);
  await writeFile(path.join(outDir, 'subgraph.yaml'), subgraphYaml);

  const mappingContext = { events: templateEvents };
  const mappingTs = await compileTemplate('evm/mapping.ts.hbs', mappingContext);
  await writeFile(path.join(outDir, 'src', 'mapping.ts'), mappingTs);

  const packageJson = {
    name: options.name,
    version: "0.1.0",
    scripts: {
      "codegen": "graph codegen",
      "build": "graph build"
    },
    dependencies: {
      "@graphprotocol/graph-cli": "^0.68.0",
      "@graphprotocol/graph-ts": "^0.32.0"
    }
  };
  await writeJson(path.join(outDir, 'package.json'), packageJson);

  const tsconfig = {
    "extends": "@graphprotocol/graph-ts/types/tsconfig.base.json",
    "compilerOptions": {
      "target": "es2020",
      "module": "commonjs",
      "strict": true
    }
  };
  await writeJson(path.join(outDir, 'tsconfig.json'), tsconfig);

  console.log(`✅ EVM Subgraph generated successfully in ./generated/${options.name}`);
  console.log(`Run 'cd ./generated/${options.name} && npm install && npm run codegen' to build.`);
}
