"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAptosIndexer = generateAptosIndexer;
const path_1 = __importDefault(require("path"));
const fsUtils_1 = require("../utils/fsUtils");
const validators_1 = require("../utils/validators");
const templateUtils_1 = require("../utils/templateUtils");
async function generateAptosIndexer(options) {
    if (!options.module)
        throw new Error('--module is required for Aptos indexer');
    const outDir = path_1.default.join(process.cwd(), 'generated', options.name);
    await (0, fsUtils_1.ensureDir)(outDir);
    await (0, fsUtils_1.ensureDir)(path_1.default.join(outDir, 'src'));
    const rawModule = await (0, fsUtils_1.readJson)(options.module);
    const parsedModule = validators_1.AptosMoveModuleSchema.parse(rawModule);
    const config = {
        name: options.name,
        moduleName: parsedModule.name,
        events: (parsedModule.structs || []).filter(s => s.is_event).map(s => s.name),
        functions: (parsedModule.exposed_functions || []).map(f => f.name)
    };
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'indexer.json'), config);
    const templateContext = {
        name: options.name,
        events: config.events
    };
    const runtimeTs = await (0, templateUtils_1.compileTemplate)('aptos/index.ts.hbs', templateContext);
    await (0, fsUtils_1.writeFile)(path_1.default.join(outDir, 'src', 'index.ts'), runtimeTs);
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
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'package.json'), packageJson);
    const tsconfig = {
        "compilerOptions": {
            "target": "es2022",
            "module": "commonjs",
            "strict": true,
            "esModuleInterop": true
        }
    };
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'tsconfig.json'), tsconfig);
    console.log(`✅ Aptos Indexer generated successfully in ./generated/${options.name}`);
    console.log(`Run 'cd ./generated/${options.name} && npm install && npm start' to run.`);
}
