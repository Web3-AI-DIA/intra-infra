"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSubgraphYaml = generateSubgraphYaml;
function generateSubgraphYaml(name, network, address, events) {
    const eventHandlers = events
        .filter((e) => e.name)
        .map((e) => {
        const inputs = (e.inputs || []).map((i) => `${i.indexed ? 'indexed ' : ''}${i.type}`).join(',');
        return `        - event: ${e.name}(${inputs})\n          handler: handle${e.name}`;
    })
        .join('\n');
    const entities = events.filter((e) => e.name).map((e) => `        - ${e.name}`).join('\n');
    return `specVersion: 0.0.5
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: Contract
    network: ${network}
    source:
      address: "${address}"
      abi: Contract
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
${entities}
      abis:
        - name: Contract
          file: ./abis/Contract.json
      eventHandlers:
${eventHandlers}
      file: ./src/mapping.ts
`;
}
