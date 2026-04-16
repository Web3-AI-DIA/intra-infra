export interface AbiItem {
  type: string;
  name?: string;
  inputs?: { name: string; type: string; indexed?: boolean }[];
  outputs?: { name: string; type: string }[];
}

export function extractEvents(abi: AbiItem[]): AbiItem[] {
  return abi.filter((item) => item.type === 'event');
}
