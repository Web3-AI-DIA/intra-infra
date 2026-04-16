export interface GenerateOptions {
  network?: string;
  address?: string;
  abi?: string;
  idl?: string;
  module?: string;
  cairo?: string;
  name: string;
  events?: string;
  functions?: string;
}

export function parseCommaSeparated(value?: string): string[] {
  if (!value) return [];
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}
