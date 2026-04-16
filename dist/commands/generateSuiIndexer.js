"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSuiIndexer = generateSuiIndexer;
const path_1 = __importDefault(require("path"));
const fsUtils_1 = require("../utils/fsUtils");
const validators_1 = require("../utils/validators");
const templateUtils_1 = require("../utils/templateUtils");
function mapToBcsType(type) {
    if (type.includes('u8'))
        return 'u8';
    if (type.includes('u16'))
        return 'u16';
    if (type.includes('u32'))
        return 'u32';
    if (type.includes('u64'))
        return 'u64';
    if (type.includes('u128'))
        return 'u128';
    if (type.includes('u256'))
        return 'u256';
    if (type.includes('bool'))
        return 'bool';
    if (type.includes('String'))
        return 'string';
    if (type.includes('address'))
        return 'address';
    return 'vector(bcs.u8())'; // fallback
}
async function generateSuiIndexer(options) {
    if (!options.module)
        throw new Error('--module is required for Sui indexer');
    const outDir = path_1.default.join(process.cwd(), 'generated', options.name);
    await (0, fsUtils_1.ensureDir)(outDir);
    await (0, fsUtils_1.ensureDir)(path_1.default.join(outDir, 'src'));
    const rawModule = await (0, fsUtils_1.readJson)(options.module);
    const parsedModule = validators_1.SuiMoveModuleSchema.parse(rawModule);
    const config = {
        name: options.name,
        moduleName: parsedModule.name,
        structs: Object.keys(parsedModule.structs || {}),
        functions: Object.keys(parsedModule.exposedFunctions || {})
    };
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'indexer.json'), config);
    const structs = Object.entries(parsedModule.structs || {}).map(([name, struct]) => ({
        name,
        fields: struct.fields.map((f) => ({
            name: f.name,
            bcsType: mapToBcsType(f.type)
        }))
    }));
    const templateContext = {
        name: options.name,
        structs
    };
    const runtimeTs = await (0, templateUtils_1.compileTemplate)('sui/index.ts.hbs', templateContext);
    await (0, fsUtils_1.writeFile)(path_1.default.join(outDir, 'src', 'index.ts'), runtimeTs);
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
    console.log(`✅ Sui Indexer generated successfully in ./generated/${options.name}`);
    console.log(`Run 'cd ./generated/${options.name} && npm install && npm start' to run.`);
}
