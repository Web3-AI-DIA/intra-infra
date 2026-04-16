"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInstructionDecoders = generateInstructionDecoders;
exports.mapIdlTypeToTs = mapIdlTypeToTs;
function generateInstructionDecoders(idl) {
    let code = `import { PublicKey } from '@solana/web3.js';\n\n`;
    for (const ix of idl.instructions) {
        code += `export interface ${ix.name}Instruction {\n`;
        for (const arg of ix.args) {
            code += `  ${arg.name}: ${mapIdlTypeToTs(arg.type)};\n`;
        }
        code += `}\n\n`;
        code += `export function decode${ix.name}(data: Buffer): ${ix.name}Instruction {\n`;
        code += `  // TODO: Implement Borsh decoding based on IDL\n`;
        code += `  return {} as any;\n`;
        code += `}\n\n`;
    }
    return code;
}
function mapIdlTypeToTs(type) {
    if (typeof type === 'string') {
        if (type.includes('u8') || type.includes('i8') || type.includes('u16') || type.includes('i16') || type.includes('u32') || type.includes('i32'))
            return 'number';
        if (type.includes('u64') || type.includes('i64') || type.includes('u128') || type.includes('i128'))
            return 'bigint';
        if (type === 'bool')
            return 'boolean';
        if (type === 'string')
            return 'string';
        if (type === 'publicKey')
            return 'PublicKey';
    }
    return 'any';
}
