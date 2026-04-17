EVM Subgraph Generator (Planned Module)

This directory contains the planned implementation for the EVM → Subgraph
generator. The work here is intentionally unimplemented and represents the next
major milestone for Intra-Infra, pending grant funding from The Graph
Foundation.

The goal of this module is to enable developers to generate complete subgraph
scaffolds directly from EVM contract ABIs, including:

- schema.graphql
- subgraph.yaml
- Mapping templates (TypeScript)
- Entities and relationships
- Event handler stubs
- Multi-contract support

This module will extend the existing multi-chain architecture already used for
Solana (Anchor IDL → indexer scaffolds).

Planned Architecture

The EVM generator will consist of the following components:

1. ABI Parser (parser.ts)
Extracts events, parameters, and types from ABI JSON and normalizes them for
schema and mapping generation.

2. Schema Generator (schema.ts)
Converts ABI event definitions into GraphQL entities, including type mapping,
relationships, and ID strategies.

3. Manifest Generator (manifest.ts)
Produces a complete subgraph.yaml file, including data sources, event
handlers, and contract configuration.

4. Mapping Generator (mappings.ts)
Generates TypeScript handler stubs for each event, following The Graph’s
AssemblyScript conventions.

5. Type Utilities (types.ts)
Maps EVM ABI types to AssemblyScript types used in subgraph mappings.

6. Templates (templates/)
Contains base templates for schema, manifest, and mapping files. This folder is
currently empty and will be populated during development.

CLI Integration

A new command will be added to the CLI:

`
intra-infra generate evm --abi <path> --out <folder>
`

This command will generate a complete subgraph scaffold from a provided ABI.

Status

This module is not yet implemented.  
All work in this directory will be completed as part of the EVM grant
milestones.

See TODO.md for the detailed implementation plan.
