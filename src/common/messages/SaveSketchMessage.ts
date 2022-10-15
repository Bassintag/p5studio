export interface SaveSketchMessage {
  fileName: string;

  sketchData: string;

  options?: {
    optimize?: boolean;
  };
}

export type SaveSketchResponse = {
  path: string;
};
