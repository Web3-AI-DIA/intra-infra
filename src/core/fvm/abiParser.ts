export interface FvmAbiItem {
  type: string;
  name?: string;
  inputs?: { name: string; type: string; indexed?: boolean }[];
  outputs?: { name: string; type: string }[];
}

export function extractFvmEvents(abi: FvmAbiItem[]): FvmAbiItem[] {
  return abi.filter((item) => item.type === 'event');
}
