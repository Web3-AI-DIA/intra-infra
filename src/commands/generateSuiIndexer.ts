import path from 'path';
import { ensureDir, readJson, writeFile, writeJson } from '../utils/fsUtils';
import { GenerateOptions } from '../utils/typeUtils';
import { SuiMoveModuleSchema } from '../utils/validators';
import { compileTemplate } from '../utils/templateUtils';

function mapToBcsType(type: string): string {
  if (type.includes('u8')) return 'u8';
  if (type.includes('u16')) return 'u16';
  if (type.includes('u32')) return 'u32';
  if (type.includes('u64')) return 'u64';
  if (type.includes('u128')) return 'u128';
  if (type.includes('u256')) return 'u256';
  if (type.includes('bool')) return 'bool';
  if (type.includes('String')) return 'string';
  if (type.includes('address')) return 'address';
  return 'vector(bcs.u8())'; // fallback
}

export async function generateSuiIndexer(options: GenerateOptions) {
  if (!options.module) throw new Error('--module is required for Sui indexer');

  const outDir = path.join(process.cwd(), 'generated', options.name);
  await ensureDir(outDir);
  await ensureDir(path.join(outDir, 'src'));

  const rawModule = await readJson(options.module);
  const parsedModule = SuiMoveModuleSchema.parse(rawModule);

  const config = {
    name: options.name,
    moduleName: parsedModule.name,
    structs: Object.keys(parsedModule.structs || {}),
    functions: Object.keys(parsedModule.exposedFunctions || {})
  };
  await writeJson(path.join(outDir, 'indexer.json'), config);

  const structs = Object.entries(parsedModule.structs || {}).map(([name, struct]: [string, any]) => ({
    name,
    fields: struct.fields.map((f: any) => ({
      name: f.name,
      bcsType: mapToBcsType(f.type)
    }))
  }));

  const templateContext = {
    name: options.name,
    structs
  };

  const runtimeTs = await compileTemplate('sui/index.ts.hbs', templateContext);
  await writeFile(path.join(outDir, 'src', 'index.ts'), runtimeTs);

  const packageJson = {
    name: options.name,
    version: "0.1.0",
    scripts: {
      "start": "ts-node src/index.ts"
    },
    dependencies: {
      "@mysten/sui.js": "^0.49.1",
      "@mysten/bcs": "^0.10.0"
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

  console.log(`✅ Sui Indexer generated successfully in ./generated/${options.name}`);
  console.log(`Run 'cd ./generated/${options.name} && npm install && npm start' to run.`);
}
