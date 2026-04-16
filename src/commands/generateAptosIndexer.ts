import path from 'path';
import { ensureDir, readJson, writeFile, writeJson } from '../utils/fsUtils';
import { GenerateOptions } from '../utils/typeUtils';
import { AptosMoveModuleSchema } from '../utils/validators';
import { compileTemplate } from '../utils/templateUtils';

export async function generateAptosIndexer(options: GenerateOptions) {
  if (!options.module) throw new Error('--module is required for Aptos indexer');

  const outDir = path.join(process.cwd(), 'generated', options.name);
  await ensureDir(outDir);
  await ensureDir(path.join(outDir, 'src'));

  const rawModule = await readJson(options.module);
  const parsedModule = AptosMoveModuleSchema.parse(rawModule);

  const config = {
    name: options.name,
    moduleName: parsedModule.name,
    events: (parsedModule.structs || []).filter(s => s.is_event).map(s => s.name),
    functions: (parsedModule.exposed_functions || []).map(f => f.name)
  };
  await writeJson(path.join(outDir, 'indexer.json'), config);

  const templateContext = {
    name: options.name,
    events: config.events
  };

  const runtimeTs = await compileTemplate('aptos/index.ts.hbs', templateContext);
  await writeFile(path.join(outDir, 'src', 'index.ts'), runtimeTs);

  const packageJson = {
    name: options.name,
    version: "0.1.0",
    scripts: {
      "start": "ts-node src/index.ts"
    },
    dependencies: {
      "aptos": "^1.21.0"
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

  console.log(`✅ Aptos Indexer generated successfully in ./generated/${options.name}`);
  console.log(`Run 'cd ./generated/${options.name} && npm install && npm start' to run.`);
}
