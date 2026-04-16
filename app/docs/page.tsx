import React from 'react';
import Link from 'next/link';
import { Terminal, ArrowLeft } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-gray-50 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="border-b border-gray-900 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tight text-white flex items-center gap-3">
            <img src="/logo.png" alt="Intra-Infra Logo" className="w-12 h-12 object-contain" />
            Intra-Infra Docs
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Getting Started</h3>
            <ul className="space-y-3 mb-8">
              <li><a href="#introduction" className="text-blue-400 hover:text-blue-300">Introduction</a></li>
              <li><a href="#installation" className="text-gray-300 hover:text-white">Installation</a></li>
              <li><a href="#quickstart" className="text-gray-300 hover:text-white">Quickstart</a></li>
            </ul>

            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Supported Chains</h3>
            <ul className="space-y-3">
              <li><a href="#evm" className="text-gray-300 hover:text-white">EVM / The Graph</a></li>
              <li><a href="#solana" className="text-gray-300 hover:text-white">Solana</a></li>
              <li><a href="#sui" className="text-gray-300 hover:text-white">Sui</a></li>
              <li><a href="#aptos" className="text-gray-300 hover:text-white">Aptos</a></li>
              <li><a href="#starknet" className="text-gray-300 hover:text-white">Starknet</a></li>
              <li><a href="#fvm" className="text-gray-300 hover:text-white">Filecoin (FVM)</a></li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow prose prose-invert prose-blue max-w-none">
          <h1 id="introduction" className="text-4xl font-extrabold tracking-tight text-white mb-6">Introduction</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Intra-Infra is a universal, open-source, public-good indexing generator. It allows developers to automatically generate indexing scaffolds for multiple chains and backends from a single CLI.
          </p>

          <h2 id="installation" className="text-2xl font-bold text-white mt-12 mb-4 border-b border-gray-800 pb-2">Installation</h2>
          <p className="text-gray-400 mb-4">You can install the CLI globally using npm:</p>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8 font-mono text-sm text-gray-300">
            npm install -g intra-infra
          </div>

          <h2 id="quickstart" className="text-2xl font-bold text-white mt-12 mb-4 border-b border-gray-800 pb-2">Quickstart</h2>
          <p className="text-gray-400 mb-4">To generate a new indexer, run the CLI with the target chain and required flags. For example, to generate an EVM subgraph:</p>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8 font-mono text-sm text-gray-300">
            intra-infra --chain evm --name my-indexer --network mainnet --address 0x123... --abi ./abi.json --events &quot;Transfer,Approval&quot;
          </div>
          <p className="text-gray-400 mb-8">
            The CLI will validate your inputs, parse your ABI, and generate a complete project inside the <code>./generated/my-indexer</code> directory.
          </p>

          <div className="mt-16 p-6 bg-blue-900/20 border border-blue-900/50 rounded-xl">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Documentation Under Construction</h3>
            <p className="text-gray-400">
              This documentation site is currently being built. More detailed guides for specific chains, advanced configuration options, and contribution guidelines will be added soon.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
