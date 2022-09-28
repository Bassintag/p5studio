import { SketchFn } from "./SketchFn";

export interface SketchResolution {
  w: number;
  h: number;
}

export interface SketchMetadata {
  name?: string;

  resolution?: SketchResolution;

  fps?: number;
}

export interface Sketch {
  name: string;

  metadata?: SketchMetadata;

  setup?: SketchFn;
  draw?: SketchFn;
}
