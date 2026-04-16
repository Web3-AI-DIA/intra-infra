import { AbiItem } from './abiParser';

export function generateSchema(events: AbiItem[]): string {
  let schema = '';

  for (const event of events) {
    if (!event.name) continue;
    schema += `type ${event.name} @entity {\n`;
    schema += `  id: ID!\n`;
    
    if (event.inputs) {
      for (const input of event.inputs) {
        const graphqlType = mapSolidityTypeToGraphQL(input.type);
        const fieldName = input.name || 'param';
        schema += `  ${fieldName}: ${graphqlType}!\n`;
      }
    }
    
    schema += `  blockNumber: BigInt!\n`;
    schema += `  blockTimestamp: BigInt!\n`;
    schema += `  transactionHash: Bytes!\n`;
    schema += `}\n\n`;
  }

  return schema;
}

function mapSolidityTypeToGraphQL(type: string): string {
  if (type.includes('int')) return 'BigInt';
  if (type === 'address') return 'Bytes';
  if (type === 'bool') return 'Boolean';
  if (type.includes('bytes')) return 'Bytes';
  return 'String';
}
