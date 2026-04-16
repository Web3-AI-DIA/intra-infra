export interface AptosMoveModule {
  name: string;
  structs: {
    name: string;
    is_event: boolean;
    fields: { name: string; type: string }[];
  }[];
  exposed_functions: {
    name: string;
    params: string[];
  }[];
}
