"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccountParsers = generateAccountParsers;
const instructionGenerator_1 = require("./instructionGenerator");
function generateAccountParsers(idl) {
    if (!idl.accounts)
        return '';
    let code = `import { PublicKey } from '@solana/web3.js';\n\n`;
    for (const acc of idl.accounts) {
        code += `export interface ${acc.name}Account {\n`;
        for (const field of acc.type.fields) {
            code += `  ${field.name}: ${(0, instructionGenerator_1.mapIdlTypeToTs)(field.type)};\n`;
        }
        code += `}\n\n`;
        code += `export function parse${acc.name}(data: Buffer): ${acc.name}Account {\n`;
        code += `  // TODO: Implement Borsh decoding based on IDL\n`;
        code += `  return {} as any;\n`;
        code += `}\n\n`;
    }
    return code;
}
