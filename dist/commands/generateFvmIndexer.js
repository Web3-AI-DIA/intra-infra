"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFvmIndexer = generateFvmIndexer;
const path_1 = __importDefault(require("path"));
const fsUtils_1 = require("../utils/fsUtils");
const validators_1 = require("../utils/validators");
const templateUtils_1 = require("../utils/templateUtils");
async function generateFvmIndexer(options) {
    if (!options.abi)
        throw new Error('--abi is required for FVM indexer');
    if (!options.address)
        throw new Error('--address is required for FVM indexer');
    const outDir = path_1.default.join(process.cwd(), 'generated', options.name);
    await (0, fsUtils_1.ensureDir)(outDir);
    await (0, fsUtils_1.ensureDir)(path_1.default.join(outDir, 'src'));
    const rawAbi = await (0, fsUtils_1.readJson)(options.abi);
    const abi = validators_1.AbiSchema.parse(rawAbi);
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'src', 'abi.json'), abi);
    const events = abi.filter((item) => item.type === 'event');
    const config = {
        name: options.name,
        address: options.address,
        events: events.filter(e => e.name).map(e => e.name)
    };
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'src', 'indexer.json'), config);
    const templateContext = {
        name: options.name,
        events: config.events
    };
    const runtimeTs = await (0, templateUtils_1.compileTemplate)('fvm/index.ts.hbs', templateContext);
    await (0, fsUtils_1.writeFile)(path_1.default.join(outDir, 'src', 'index.ts'), runtimeTs);
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
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'package.json'), packageJson);
    const tsconfig = {
        "compilerOptions": {
            "target": "es2022",
            "module": "commonjs",
            "strict": true,
            "esModuleInterop": true,
            "resolveJsonModule": true
        }
    };
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'tsconfig.json'), tsconfig);
    console.log(`✅ FVM Indexer generated successfully in ./generated/${options.name}`);
    console.log(`Run 'cd ./generated/${options.name} && npm install && npm start' to run.`);
}
