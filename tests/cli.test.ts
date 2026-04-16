import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

describe('CLI Generation', () => {
  const testDir = path.join(__dirname, '../generated/test-evm-cli');

  beforeAll(() => {
    // Create dummy ABI and IDL
    fs.ensureDirSync(path.join(__dirname, 'fixtures'));
    fs.writeJsonSync(path.join(__dirname, 'fixtures/abi.json'), [
      {
        type: 'event',
        name: 'Transfer',
        inputs: [
          { name: 'from', type: 'address', indexed: true },
          { name: 'to', type: 'address', indexed: true },
          { name: 'value', type: 'uint256', indexed: false }
        ]
      }
    ]);
    fs.writeJsonSync(path.join(__dirname, 'fixtures/idl.json'), {
      version: '0.1.0',
      name: 'counter',
      instructions: [],
      events: [
        {
          name: 'CounterIncremented',
          fields: [
            { name: 'newCount', type: 'u64', index: false }
          ]
        }
      ]
    });
  });

  afterAll(() => {
    fs.removeSync(testDir);
    fs.removeSync(path.join(__dirname, '../generated/test-solana-cli'));
    fs.removeSync(path.join(__dirname, 'fixtures'));
  });

  it('should generate an EVM subgraph successfully', () => {
    execSync(`node dist/cli.js generate subgraph-evm --name test-evm-cli --network mainnet --address 0x1234567890123456789012345678901234567890 --abi tests/fixtures/abi.json`, { stdio: 'inherit' });
    
    expect(fs.existsSync(path.join(testDir, 'package.json'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'subgraph.yaml'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'schema.graphql'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'src/mapping.ts'))).toBe(true);
  });

  it('should generate a Solana indexer successfully', () => {
    execSync(`node dist/cli.js generate indexer-solana --name test-solana-cli --idl tests/fixtures/idl.json`, { stdio: 'inherit' });
    
    const solanaDir = path.join(__dirname, '../generated/test-solana-cli');
    expect(fs.existsSync(path.join(solanaDir, 'package.json'))).toBe(true);
    expect(fs.existsSync(path.join(solanaDir, 'indexer.json'))).toBe(true);
    expect(fs.existsSync(path.join(solanaDir, 'src/index.ts'))).toBe(true);
  });
});
