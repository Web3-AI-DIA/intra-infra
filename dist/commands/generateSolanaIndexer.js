"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSolanaIndexer = generateSolanaIndexer;
const path_1 = __importDefault(require("path"));
const fsUtils_1 = require("../utils/fsUtils");
const validators_1 = require("../utils/validators");
const templateUtils_1 = require("../utils/templateUtils");
function mapToBorshType(type) {
    if (typeof type === 'string') {
        if (['u8', 'i8', 'u16', 'i16', 'u32', 'i32', 'f32', 'f64'].includes(type))
            return type;
        if (['u64', 'i64'].includes(type))
            return 'u64'; // Borsh uses u64 for bigints
        if (type === 'bool')
            return 'bool';
        if (type === 'string')
            return 'string';
        if (type === 'publicKey')
            return 'publicKey';
    }
    return 'vecU8'; // fallback
}
async function generateSolanaIndexer(options) {
    if (!options.idl)
        throw new Error('--idl is required for Solana indexer');
    const outDir = path_1.default.join(process.cwd(), 'generated', options.name);
    await (0, fsUtils_1.ensureDir)(outDir);
    await (0, fsUtils_1.ensureDir)(path_1.default.join(outDir, 'src'));
    const rawIdl = await (0, fsUtils_1.readJson)(options.idl);
    const idl = validators_1.AnchorIdlSchema.parse(rawIdl);
    const config = {
        name: options.name,
        programId: "YOUR_PROGRAM_ID_HERE",
        instructions: idl.instructions.map(ix => ix.name),
        accounts: (idl.accounts || []).map(acc => acc.name),
        events: (idl.events || []).map(ev => ev.name)
    };
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'indexer.json'), config);
    // Prepare context for Handlebars
    const templateContext = {
        name: options.name,
        events: (idl.events || []).map(ev => ({
            name: ev.name,
            fields: ev.fields.map(f => ({
                name: f.name,
                borshType: mapToBorshType(f.type)
            }))
        }))
    };
    const runtimeTs = await (0, templateUtils_1.compileTemplate)('solana/index.ts.hbs', templateContext);
    await (0, fsUtils_1.writeFile)(path_1.default.join(outDir, 'src', 'index.ts'), runtimeTs);
    const packageJson = {
        name: options.name,
        version: "0.1.0",
        scripts: {
            "start": "ts-node src/index.ts"
        },
        dependencies: {
            "@solana/web3.js": "^1.87.6",
            "@coral-xyz/borsh": "^0.29.0"
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
    console.log(`✅ Solana Indexer generated successfully in ./generated/${options.name}`);
    console.log(`Run 'cd ./generated/${options.name} && npm install && npm start' to run.`);
}
