'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, Layers } from 'lucide-react';

function CopyableCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg p-3 mt-4 group">
      <code className="text-sm text-gray-300 font-mono overflow-x-auto whitespace-nowrap mr-4 scrollbar-hide">
        {command}
      </code>
      <button 
        onClick={handleCopy}
        className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-md transition-colors flex-shrink-0"
        title="Copy to clipboard"
        aria-label="Copy command to clipboard"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
    </div>
  );
}

// Custom SVG Icons for Chains
const EthereumIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.925 23.969L15.875 24v7.5l15.875-22.35-15.875 14.819z" fill="#8C8C8C"/>
    <path d="M15.925 23.969v-14.82L0 9.15l15.925 14.819z" fill="#fff"/>
    <path d="M15.925 22.169l15.875-14.819-15.875-7.15v21.969z" fill="#8C8C8C"/>
    <path d="M15.925 22.169v-21.97L0 7.35l15.925 14.819z" fill="#fff"/>
  </svg>
);

const SolanaIcon = () => (
  <svg width="28" height="28" viewBox="0 0 397 311" xmlns="http://www.w3.org/2000/svg">
    <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="#00FFA3"/>
    <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" fill="#DC1FFF"/>
    <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="#00FFA3"/>
  </svg>
);

const SuiIcon = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50z" fill="#4CA2FF"/>
    <path d="M50 25c-13.807 0-25 11.193-25 25s11.193 25 25 25 25-11.193 25-25-11.193-25-25-25zm0 37.5c-6.904 0-12.5-5.596-12.5-12.5S43.096 37.5 50 37.5 62.5 43.096 62.5 50 56.904 62.5 50 62.5z" fill="#fff"/>
  </svg>
);

const AptosIcon = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10L10 80h20l20-35 20 35h20L50 10z" fill="#fff"/>
  </svg>
);

const StarknetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10L10 50l40 40 40-40L50 10zm0 15l25 25-25 25-25-25 25-25z" fill="#fff"/>
  </svg>
);

const FilecoinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#0090FF"/>
    <path d="M35 35h30v10H35V35zm0 20h20v10H35V55z" fill="#fff"/>
  </svg>
);

const MainLogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
    <defs>
      <linearGradient id="gradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0011FF" />
        <stop offset="100%" stopColor="#8A2BE2" />
      </linearGradient>
      <linearGradient id="gradMid" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A2BE2" />
        <stop offset="100%" stopColor="#E6005C" />
      </linearGradient>
      <linearGradient id="gradRight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E6005C" />
        <stop offset="100%" stopColor="#FF0000" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Left Link */}
    <rect x="10" y="30" width="80" height="60" rx="30" fill="none" stroke="#000" strokeWidth="16" />
    <rect x="10" y="30" width="80" height="60" rx="30" fill="none" stroke="url(#gradLeft)" strokeWidth="10" filter="url(#glow)" />

    {/* Right Link */}
    <rect x="190" y="30" width="80" height="60" rx="30" fill="none" stroke="#000" strokeWidth="16" />
    <rect x="190" y="30" width="80" height="60" rx="30" fill="none" stroke="url(#gradRight)" strokeWidth="10" filter="url(#glow)" />

    {/* Middle Link (Stretched) */}
    <rect x="60" y="30" width="160" height="60" rx="30" fill="none" stroke="#000" strokeWidth="16" />
    <rect x="60" y="30" width="160" height="60" rx="30" fill="none" stroke="url(#gradMid)" strokeWidth="10" filter="url(#glow)" />

    {/* Interlocking Fix: Redraw Left Link's Top Right Arc */}
    <path d="M 60 30 A 30 30 0 0 1 90 60" fill="none" stroke="#000" strokeWidth="16" />
    <path d="M 60 30 A 30 30 0 0 1 90 60" fill="none" stroke="url(#gradLeft)" strokeWidth="10" filter="url(#glow)" />

    {/* Interlocking Fix: Redraw Right Link's Bottom Left Arc */}
    <path d="M 220 90 A 30 30 0 0 1 190 60" fill="none" stroke="#000" strokeWidth="16" />
    <path d="M 220 90 A 30 30 0 0 1 190 60" fill="none" stroke="url(#gradRight)" strokeWidth="10" filter="url(#glow)" />

    {/* CLI Symbol inside Middle Link (Gradient + Glow) */}
    <path d="M 122 48 L 134 60 L 122 72" fill="none" stroke="#000" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="138" y="66" width="26" height="12" fill="#000" rx="2" />
    
    <path d="M 122 48 L 134 60 L 122 72" fill="none" stroke="url(#gradMid)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
    <rect x="141" y="69" width="20" height="6" fill="url(#gradMid)" filter="url(#glow)" rx="1" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-50 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="border-b border-gray-900 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tight text-white flex items-center gap-3">
            <img src="/logo.png" alt="Intra-Infra Logo" className="w-12 h-12 object-contain" />
            Intra-Infra
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="/docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
            <a href="https://github.com/yourusername/intra-infra" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="border-b border-gray-900 py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10"></div>
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <img src="/logo.png" alt="Intra-Infra Main Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Intra-Infra
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            A universal, open-source, public-good indexing generator. 
            Automatically generate indexing scaffolds for multiple chains and backends from a single CLI.
          </p>
          <div className="max-w-md mx-auto">
            <CopyableCommand command="npm install -g intra-infra" />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Supported Chains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<EthereumIcon />}
              title="EVM"
              description="Generates The Graph subgraphs from Solidity ABIs."
              command="intra-infra generate subgraph-evm --network mainnet --address 0x123... --abi ./Contract.json --name MyEvmIndexer"
            />
            <FeatureCard 
              icon={<SolanaIcon />}
              title="Solana"
              description="Generates Solana indexers from Anchor IDLs."
              command="intra-infra generate indexer-solana --idl ./idl.json --name MySolanaIndexer"
            />
            <FeatureCard 
              icon={<SuiIcon />}
              title="Sui"
              description="Generates Sui indexers from Move module ABIs."
              command="intra-infra generate indexer-sui --module ./module.json --name MySuiIndexer"
            />
            <FeatureCard 
              icon={<AptosIcon />}
              title="Aptos"
              description="Generates Aptos indexers from Move module ABIs."
              command="intra-infra generate indexer-aptos --module ./module.json --name MyAptosIndexer"
            />
            <FeatureCard 
              icon={<StarknetIcon />}
              title="Starknet"
              description="Generates Starknet indexers from Cairo ABIs."
              command="intra-infra generate indexer-starknet --cairo ./contract.json --name MyStarknetIndexer"
            />
            <FeatureCard 
              icon={<FilecoinIcon />}
              title="Filecoin/FVM"
              description="Generates FVM indexers from Solidity ABIs."
              command="intra-infra generate indexer-fvm --network filecoin --address f01234 --abi ./Contract.json --name MyFvmIndexer"
            />
          </div>
        </div>
      </section>

      {/* CLI Reference Section */}
      <section className="py-24 px-6 bg-gray-950 border-t border-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">CLI Options & Flags</h2>
          <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="text-xs text-gray-500 uppercase bg-gray-900/50 border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4 font-medium">Option</th>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Required By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-blue-400">--name &lt;projectName&gt;</td>
                    <td className="px-6 py-4">Name of the generated project. Output goes to <code className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">./generated/&lt;projectName&gt;</code></td>
                    <td className="px-6 py-4"><span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">All (Defaults to my-indexer)</span></td>
                  </tr>
                  <tr className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-blue-400">--network &lt;network&gt;</td>
                    <td className="px-6 py-4">Target network (e.g., mainnet, testnet).</td>
                    <td className="px-6 py-4"><span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">EVM, FVM</span></td>
                  </tr>
                  <tr className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-blue-400">--address &lt;contractAddress&gt;</td>
                    <td className="px-6 py-4">The deployed contract address to index.</td>
                    <td className="px-6 py-4"><span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">EVM, FVM</span></td>
                  </tr>
                  <tr className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-blue-400">--abi &lt;pathToAbiJson&gt;</td>
                    <td className="px-6 py-4">Path to the Solidity ABI JSON file.</td>
                    <td className="px-6 py-4"><span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">EVM, FVM</span></td>
                  </tr>
                  <tr className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-blue-400">--idl &lt;pathToAnchorIDL&gt;</td>
                    <td className="px-6 py-4">Path to the Solana Anchor IDL JSON file.</td>
                    <td className="px-6 py-4"><span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">Solana</span></td>
                  </tr>
                  <tr className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-blue-400">--module &lt;pathToMoveModule&gt;</td>
                    <td className="px-6 py-4">Path to the Sui/Aptos Move module JSON.</td>
                    <td className="px-6 py-4"><span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">Sui, Aptos</span></td>
                  </tr>
                  <tr className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-blue-400">--cairo &lt;pathToCairoContract&gt;</td>
                    <td className="px-6 py-4">Path to the Starknet Cairo ABI JSON.</td>
                    <td className="px-6 py-4"><span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">Starknet</span></td>
                  </tr>
                  <tr className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-blue-400">--events &lt;commaSeparated&gt;</td>
                    <td className="px-6 py-4">Filter specific events to index (e.g., <code className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">Transfer,Approval</code>).</td>
                    <td className="px-6 py-4"><span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">EVM (Optional)</span></td>
                  </tr>
                  <tr className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-blue-400">--functions &lt;commaSeparated&gt;</td>
                    <td className="px-6 py-4">Filter specific functions to index.</td>
                    <td className="px-6 py-4"><span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">Solana, Sui, Aptos, Starknet, FVM (Optional)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-24 px-6 border-t border-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-10 h-10 bg-blue-900/30 text-blue-400 rounded-lg flex items-center justify-center mb-4 border border-blue-900/50">
                <Check size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Strict Validation</h3>
              <p className="text-gray-400 leading-relaxed">
                Intra-Infra uses Zod to strictly validate your ABIs, IDLs, and Move modules before generating any code. This prevents cryptic compilation errors down the line and provides helpful error messages if your inputs are malformed.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-purple-900/30 text-purple-400 rounded-lg flex items-center justify-center mb-4 border border-purple-900/50">
                <Layers size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Production Ready</h3>
              <p className="text-gray-400 leading-relaxed">
                Generates full TypeScript scaffolds complete with <code className="text-gray-300">package.json</code>, <code className="text-gray-300">tsconfig.json</code>, dynamic layout decoders (Borsh/BCS), and typed event handlers.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-green-900/30 text-green-400 rounded-lg flex items-center justify-center mb-4 border border-green-900/50">
                <Terminal size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Zero Configuration</h3>
              <p className="text-gray-400 leading-relaxed">
                Everything is output directly into <code className="text-gray-300">./generated/&lt;projectName&gt;</code>. The CLI prints a summary of generated files so you can immediately <code className="text-gray-300">npm install</code> and run your new indexer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-6 border-t border-gray-900">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500">Intra-Infra is an open-source public good.</p>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
            <a href="https://github.com/yourusername/intra-infra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="https://npmjs.com/package/intra-infra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">NPM Registry</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, command }: { icon: React.ReactNode, title: string, description: string, command: string }) {
  return (
    <div className="bg-gray-950 p-8 rounded-2xl border border-gray-800 shadow-sm hover:border-gray-700 transition-colors flex flex-col h-full">
      <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{description}</p>
      <div className="mt-auto">
        <CopyableCommand command={command} />
      </div>
    </div>
  );
}
