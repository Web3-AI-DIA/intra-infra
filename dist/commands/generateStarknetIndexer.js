"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStarknetIndexer = generateStarknetIndexer;
const path_1 = __importDefault(require("path"));
const fsUtils_1 = require("../utils/fsUtils");
const validators_1 = require("../utils/validators");
const templateUtils_1 = require("../utils/templateUtils");
async function generateStarknetIndexer(options) {
    if (!options.cairo)
        throw new Error('--cairo is required for Starknet indexer');
    const outDir = path_1.default.join(process.cwd(), 'generated', options.name);
    await (0, fsUtils_1.ensureDir)(outDir);
    await (0, fsUtils_1.ensureDir)(path_1.default.join(outDir, 'src'));
    const rawAbi = await (0, fsUtils_1.readJson)(options.cairo);
    const abi = validators_1.CairoAbiSchema.parse(rawAbi);
    const events = abi.filter((item) => item.type === 'event');
    const functions = abi.filter((item) => item.type === 'function');
    const config = {
        name: options.name,
        events: events.map(e => e.name),
        functions: functions.map(f => f.name)
    };
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'indexer.json'), config);
    const templateContext = {
        name: options.name,
        events: config.events
    };
    const runtimeTs = await (0, templateUtils_1.compileTemplate)('starknet/index.ts.hbs', templateContext);
    await (0, fsUtils_1.writeFile)(path_1.default.join(outDir, 'src', 'index.ts'), runtimeTs);
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
    console.log(`✅ Starknet Indexer generated successfully in ./generated/${options.name}`);
    console.log(`Run 'cd ./generated/${options.name} && npm install && npm start' to run.`);
}
