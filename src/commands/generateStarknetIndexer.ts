import path from 'path';
import { ensureDir, readJson, writeFile, writeJson } from '../utils/fsUtils';
import { GenerateOptions } from '../utils/typeUtils';
import { CairoAbiSchema } from '../utils/validators';
import { compileTemplate } from '../utils/templateUtils';

export async function generateStarknetIndexer(options: GenerateOptions) {
  if (!options.cairo) throw new Error('--cairo is required for Starknet indexer');

  const outDir = path.join(process.cwd(), 'generated', options.name);
  await ensureDir(outDir);
  await ensureDir(path.join(outDir, 'src'));

  const rawAbi = await readJson(options.cairo);
  const abi = CairoAbiSchema.parse(rawAbi);
  
  const events = abi.filter((item) => item.type === 'event');
  const functions = abi.filter((item) => item.type === 'function');

  const config = {
    name: options.name,
    events: events.map(e => e.name),
    functions: functions.map(f => f.name)
  };
  await writeJson(path.join(outDir, 'indexer.json'), config);

  const templateContext = {
    name: options.name,
    events: config.events
  };

  const runtimeTs = await compileTemplate('starknet/index.ts.hbs', templateContext);
  await writeFile(path.join(outDir, 'src', 'index.ts'), runtimeTs);

  const packageJson = {
    name: options.name,
    version: "0.1.0",
    scripts: {
      "start": "ts-node src/index.ts"
    },
    dependencies: {
      "starknet": "^6.11.0"
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
      "esModuleInterop": true
    }
  };
  await writeJson(path.join(outDir, 'tsconfig.json'), tsconfig);

  console.log(`✅ Starknet Indexer generated successfully in ./generated/${options.name}`);
  console.log(`Run 'cd ./generated/${options.name} && npm install && npm start' to run.`);
}
