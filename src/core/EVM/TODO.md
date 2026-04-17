# EVM Subgraph Generator — TODO

This folder contains the planned implementation for the EVM → Subgraph generator.  
The work in this directory is intentionally incomplete and represents the next major
milestone for Intra-Infra.

## Overview
The goal of this module is to generate complete subgraph scaffolds directly from
EVM contract ABIs, including:

- `schema.graphql`
- `subgraph.yaml`
- Mapping templates (TypeScript)
- Entities
- Event handlers
- Multi-contract support

## Planned Components

### 1. ABI Parser
- Parse ABI JSON
- Extract events, parameters, and types
- Normalize event signatures
- Infer entity names and relationships

### 2. Schema Generator
- Convert ABI event definitions into GraphQL entities
- Handle primitive and array types
- Generate relationships and ID strategies

### 3. Subgraph Manifest Generator
- Build `subgraph.yaml`
- Configure data sources
- Configure event handlers
- Support multiple contracts

### 4. Mapping Generator
- Create TypeScript handler templates
- Generate event handler stubs
- Map ABI types to AssemblyScript types

### 5. Templates
- Base templates for schema, mappings, and manifest
- ERC-20 and ERC-721 presets (future)

## CLI Integration
A new command will be added:
