"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CairoAbiSchema = exports.CairoAbiItemSchema = exports.AptosMoveModuleSchema = exports.SuiMoveModuleSchema = exports.AnchorIdlSchema = exports.AbiSchema = exports.AbiItemSchema = void 0;
const zod_1 = require("zod");
// EVM / FVM ABI Schema
exports.AbiItemSchema = zod_1.z.object({
    type: zod_1.z.string(),
    name: zod_1.z.string().optional(),
    inputs: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        type: zod_1.z.string(),
        indexed: zod_1.z.boolean().optional()
    })).optional(),
    outputs: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        type: zod_1.z.string()
    })).optional(),
    stateMutability: zod_1.z.string().optional(),
    anonymous: zod_1.z.boolean().optional()
});
exports.AbiSchema = zod_1.z.array(exports.AbiItemSchema);
// Solana Anchor IDL Schema
exports.AnchorIdlSchema = zod_1.z.object({
    version: zod_1.z.string(),
    name: zod_1.z.string(),
    instructions: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        accounts: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            isMut: zod_1.z.boolean(),
            isSigner: zod_1.z.boolean()
        })),
        args: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            type: zod_1.z.any() // Can be complex, keeping it any for basic validation
        }))
    })),
    accounts: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        type: zod_1.z.object({
            kind: zod_1.z.string(),
            fields: zod_1.z.array(zod_1.z.object({
                name: zod_1.z.string(),
                type: zod_1.z.any()
            }))
        })
    })).optional(),
    events: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        fields: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            type: zod_1.z.any(),
            index: zod_1.z.boolean()
        }))
    })).optional()
});
// Sui Move Module Schema
exports.SuiMoveModuleSchema = zod_1.z.object({
    name: zod_1.z.string(),
    structs: zod_1.z.record(zod_1.z.string(), zod_1.z.object({
        fields: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            type: zod_1.z.string()
        }))
    })).optional(),
    exposedFunctions: zod_1.z.record(zod_1.z.string(), zod_1.z.object({
        parameters: zod_1.z.array(zod_1.z.any())
    })).optional()
});
// Aptos Move Module Schema
exports.AptosMoveModuleSchema = zod_1.z.object({
    name: zod_1.z.string(),
    structs: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        is_event: zod_1.z.boolean(),
        fields: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            type: zod_1.z.string()
        }))
    })).optional(),
    exposed_functions: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        params: zod_1.z.array(zod_1.z.string())
    })).optional()
});
// Starknet Cairo ABI Schema
exports.CairoAbiItemSchema = zod_1.z.object({
    type: zod_1.z.string(),
    name: zod_1.z.string(),
    inputs: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        type: zod_1.z.string()
    })).optional(),
    outputs: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        type: zod_1.z.string()
    })).optional(),
    members: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        type: zod_1.z.string()
    })).optional()
});
exports.CairoAbiSchema = zod_1.z.array(exports.CairoAbiItemSchema);
