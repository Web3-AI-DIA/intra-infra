import { AbiItem } from './abiParser';

export function generateMappingTs(events: AbiItem[]): string {
  let imports = `import { BigInt } from "@graphprotocol/graph-ts"\n`;
  imports += `import { Contract, ${events.map(e => e.name).filter(Boolean).join(', ')} } from "../generated/Contract/Contract"\n`;
  imports += `import { ${events.map(e => e.name).filter(Boolean).join(', ')} as ${events.map(e => e.name + 'Entity').filter(Boolean).join(', ')} } from "../generated/schema"\n\n`;

  let handlers = '';

  for (const event of events) {
    if (!event.name) continue;
    handlers += `export function handle${event.name}(event: ${event.name}): void {\n`;
    handlers += `  let entity = new ${event.name}Entity(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString())\n`;
    
    if (event.inputs) {
      for (const input of event.inputs) {
        const fieldName = input.name || 'param';
        handlers += `  entity.${fieldName} = event.params.${fieldName}\n`;
      }
    }

    handlers += `\n  entity.blockNumber = event.block.number\n`;
    handlers += `  entity.blockTimestamp = event.block.timestamp\n`;
    handlers += `  entity.transactionHash = event.transaction.hash\n\n`;
    handlers += `  entity.save()\n}\n\n`;
  }

  return imports + handlers;
}
