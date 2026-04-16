export interface SuiMoveModule {
  name: string;
  structs: {
    [key: string]: {
      fields: { name: string; type: string }[];
    };
  };
  exposedFunctions: {
    [key: string]: {
      parameters: string[];
    };
  };
}
