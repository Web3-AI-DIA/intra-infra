import path from 'path';
import { ensureDir, readJson, writeFile, writeJson } from '../utils/fsUtils';
import { GenerateOptions } from '../utils/typeUtils';
import { AbiSchema } from '../utils/validators';
import { compileTemplate } from '../utils/templateUtils';

export async function generateFvmIndexer(options: GenerateOptions) {
  if (!options.abi) throw new Error('--abi is required for FVM indexer');
  if (!options.address) throw new Error('--address is required for FVM indexer');

  const outDir = path.join(process.cwd(), 'generated', options.name);
  await ensureDir(outDir);
  await ensureDir(path.join(outDir, 'src'));

  const rawAbi = await readJson(options.abi);
  const abi = AbiSchema.parse(rawAbi);
  await writeJson(path.join(outDir, 'src', 'abi.json'), abi);

  const events = abi.filter((item) => item.type === 'event');

  const config = {
    name: options.name,
    address: options.address,
    events: events.filter(e => e.name).map(e => e.name)
  };
  await writeJson(path.join(outDir, 'src', 'indexer.json'), config);

  const templateContext = {
    name: options.name,
    events: config.events
  };

  const runtimeTs = await compileTemplate('fvm/index.ts.hbs', templateContext);
  await writeFile(path.join(outDir, 'src', 'index.ts'), runtimeTs);

  const packageJson = {
    name: options.name,
    version: "0.1.0",
    scripts: {
      "start": "ts-node src/index.ts"
    },
    dependencies: {
      "ethers": "^6.10.0"
    },
    devDependencies: {
      "ts-node": "^10.9.2",
      "typescript": "^5.3.3"
    }
  };
  await writeJson(path.join(outDir, 'package.json'), packageJson);

  const tsconfig = {
    "compilerOptions": {
      "target": "es2022",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "resolveJsonModule": true
    }
  };
  await writeJson(path.join(outDir, 'tsconfig.json'), tsconfig);

  console.log(`✅ FVM Indexer generated successfully in ./generated/${options.name}`);
  console.log(`Run 'cd ./generated/${options.name} && npm install && npm start' to run.`);
}
