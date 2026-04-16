import { AbiItemSchema, AnchorIdlSchema } from '../src/utils/validators';

describe('Validators', () => {
  it('should validate a correct EVM ABI', () => {
    const abi = [
      {
        type: 'event',
        name: 'Transfer',
        inputs: [
          { name: 'from', type: 'address', indexed: true },
          { name: 'to', type: 'address', indexed: true },
          { name: 'value', type: 'uint256', indexed: false }
        ]
      }
    ];
    expect(() => AbiItemSchema.parse(abi[0])).not.toThrow();
  });

  it('should throw on invalid EVM ABI', () => {
    const invalidAbi = { name: 'Transfer' }; // missing type
    expect(() => AbiItemSchema.parse(invalidAbi)).toThrow();
  });

  it('should validate a correct Anchor IDL', () => {
    const idl = {
      version: '0.1.0',
      name: 'counter',
      instructions: [
        {
          name: 'increment',
          accounts: [{ name: 'counter', isMut: true, isSigner: false }],
          args: []
        }
      ]
    };
    expect(() => AnchorIdlSchema.parse(idl)).not.toThrow();
  });
});
