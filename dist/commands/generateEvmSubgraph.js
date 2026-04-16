"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEvmSubgraph = generateEvmSubgraph;
const path_1 = __importDefault(require("path"));
const fsUtils_1 = require("../utils/fsUtils");
const typeUtils_1 = require("../utils/typeUtils");
const validators_1 = require("../utils/validators");
const templateUtils_1 = require("../utils/templateUtils");
function mapSolidityTypeToGraphQL(type) {
    if (type.includes('int'))
        return 'BigInt';
    if (type === 'address')
        return 'Bytes';
    if (type === 'bool')
        return 'Boolean';
    if (type.includes('bytes'))
        return 'Bytes';
    return 'String';
}
async function generateEvmSubgraph(options) {
    if (!options.abi)
        throw new Error('--abi is required for EVM subgraph');
    if (!options.address)
        throw new Error('--address is required for EVM subgraph');
    if (!options.network)
        throw new Error('--network is required for EVM subgraph');
    const outDir = path_1.default.join(process.cwd(), 'generated', options.name);
    await (0, fsUtils_1.ensureDir)(outDir);
    await (0, fsUtils_1.ensureDir)(path_1.default.join(outDir, 'abis'));
    await (0, fsUtils_1.ensureDir)(path_1.default.join(outDir, 'src'));
    const rawAbi = await (0, fsUtils_1.readJson)(options.abi);
    const abi = validators_1.AbiSchema.parse(rawAbi);
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'abis', 'Contract.json'), abi);
    let events = abi.filter((item) => item.type === 'event');
    const targetEvents = (0, typeUtils_1.parseCommaSeparated)(options.events);
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
    const schema = await (0, templateUtils_1.compileTemplate)('evm/schema.graphql.hbs', schemaContext);
    await (0, fsUtils_1.writeFile)(path_1.default.join(outDir, 'schema.graphql'), schema);
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
    const subgraphYaml = await (0, templateUtils_1.compileTemplate)('evm/subgraph.yaml.hbs', subgraphContext);
    await (0, fsUtils_1.writeFile)(path_1.default.join(outDir, 'subgraph.yaml'), subgraphYaml);
    const mappingContext = { events: templateEvents };
    const mappingTs = await (0, templateUtils_1.compileTemplate)('evm/mapping.ts.hbs', mappingContext);
    await (0, fsUtils_1.writeFile)(path_1.default.join(outDir, 'src', 'mapping.ts'), mappingTs);
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
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'package.json'), packageJson);
    const tsconfig = {
        "extends": "@graphprotocol/graph-ts/types/tsconfig.base.json",
        "compilerOptions": {
            "target": "es2020",
            "module": "commonjs",
            "strict": true
        }
    };
    await (0, fsUtils_1.writeJson)(path_1.default.join(outDir, 'tsconfig.json'), tsconfig);
    console.log(`✅ EVM Subgraph generated successfully in ./generated/${options.name}`);
    console.log(`Run 'cd ./generated/${options.name} && npm install && npm run codegen' to build.`);
}
