import { z } from 'zod';

// EVM / FVM ABI Schema
export const AbiItemSchema = z.object({
  type: z.string(),
  name: z.string().optional(),
  inputs: z.array(z.object({
    name: z.string(),
    type: z.string(),
    indexed: z.boolean().optional()
  })).optional(),
  outputs: z.array(z.object({
    name: z.string(),
    type: z.string()
  })).optional(),
  stateMutability: z.string().optional(),
  anonymous: z.boolean().optional()
});
export const AbiSchema = z.array(AbiItemSchema);

// Solana Anchor IDL Schema
export const AnchorIdlSchema = z.object({
  version: z.string(),
  name: z.string(),
  instructions: z.array(z.object({
    name: z.string(),
    accounts: z.array(z.object({
      name: z.string(),
      isMut: z.boolean(),
      isSigner: z.boolean()
    })),
    args: z.array(z.object({
      name: z.string(),
      type: z.any() // Can be complex, keeping it any for basic validation
    }))
  })),
  accounts: z.array(z.object({
    name: z.string(),
    type: z.object({
      kind: z.string(),
      fields: z.array(z.object({
        name: z.string(),
        type: z.any()
      }))
    })
  })).optional(),
  events: z.array(z.object({
    name: z.string(),
    fields: z.array(z.object({
      name: z.string(),
      type: z.any(),
      index: z.boolean()
    }))
  })).optional()
});

// Sui Move Module Schema
export const SuiMoveModuleSchema = z.object({
  name: z.string(),
  structs: z.record(z.string(), z.object({
    fields: z.array(z.object({
      name: z.string(),
      type: z.string()
    }))
  })).optional(),
  exposedFunctions: z.record(z.string(), z.object({
    parameters: z.array(z.any())
  })).optional()
});

// Aptos Move Module Schema
export const AptosMoveModuleSchema = z.object({
  name: z.string(),
  structs: z.array(z.object({
    name: z.string(),
    is_event: z.boolean(),
    fields: z.array(z.object({
      name: z.string(),
      type: z.string()
    }))
  })).optional(),
  exposed_functions: z.array(z.object({
    name: z.string(),
    params: z.array(z.string())
  })).optional()
});

// Starknet Cairo ABI Schema
export const CairoAbiItemSchema = z.object({
  type: z.string(),
  name: z.string(),
  inputs: z.array(z.object({
    name: z.string(),
    type: z.string()
  })).optional(),
  outputs: z.array(z.object({
    name: z.string(),
    type: z.string()
  })).optional(),
  members: z.array(z.object({
    name: z.string(),
    type: z.string()
  })).optional()
});
export const CairoAbiSchema = z.array(CairoAbiItemSchema);
