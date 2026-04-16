export interface CairoAbiItem {
  type: string;
  name: string;
  inputs?: { name: string; type: string }[];
  outputs?: { name: string; type: string }[];
  members?: { name: string; type: string }[];
}

export function extractCairoEvents(abi: CairoAbiItem[]): CairoAbiItem[] {
  return abi.filter((item) => item.type === 'event');
}

export function extractCairoFunctions(abi: CairoAbiItem[]): CairoAbiItem[] {
  return abi.filter((item) => item.type === 'function');
}
