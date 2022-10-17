import { SketchOptimization } from "@types";

export interface SaveSketchMessage {
  fileName: string;

  sketchData: string;

  options?: {
    optimizations?: SketchOptimization[];
  };
}

export type SaveSketchResponse = {
  path: string;
};
