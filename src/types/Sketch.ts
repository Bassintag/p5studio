import { SketchFn } from "./SketchFn";

export interface SketchResolution {
  w: number;
  h: number;
}

export type SketchOptimization =
  | "lineSimplify"
  | "reLoop"
  | "lineMerge"
  | "lineSort";

export interface SketchMetadata {
  name?: string;

  resolution?: SketchResolution;

  fps?: number;

  optimizations?: SketchOptimization[];
}

export interface Sketch {
  name: string;

  metadata?: SketchMetadata;

  setup?: SketchFn;
  draw?: SketchFn;
}
