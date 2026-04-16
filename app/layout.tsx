import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Intra-Infra | Universal Indexing Generator',
  description: 'A universal, open-source, public-good indexing generator. Automatically generate indexing scaffolds for EVM, Solana, Sui, Aptos, Starknet, and FVM from a single CLI.',
  keywords: ['indexer', 'blockchain', 'web3', 'cli', 'evm', 'solana', 'sui', 'aptos', 'starknet', 'fvm', 'the graph', 'subgraph'],
  openGraph: {
    title: 'Intra-Infra | Universal Indexing Generator',
    description: 'Automatically generate indexing scaffolds for multiple chains and backends from a single CLI.',
    type: 'website',
    siteName: 'Intra-Infra',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intra-Infra | Universal Indexing Generator',
    description: 'Automatically generate indexing scaffolds for multiple chains and backends from a single CLI.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
