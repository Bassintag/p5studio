import { SketchMetadata } from "@types";

export interface SaveSketchMessage {
  fileName: string;

  sketchData: string;

  options?: SketchMetadata;
}

export type SaveSketchResponse = {
  path: string;
};
