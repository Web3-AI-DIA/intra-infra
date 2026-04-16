export interface AnchorIdl {
  version: string;
  name: string;
  instructions: {
    name: string;
    accounts: { name: string; isMut: boolean; isSigner: boolean }[];
    args: { name: string; type: string }[];
  }[];
  accounts?: {
    name: string;
    type: { kind: string; fields: { name: string; type: string }[] };
  }[];
  events?: {
    name: string;
    fields: { name: string; type: string; index: boolean }[];
  }[];
}
