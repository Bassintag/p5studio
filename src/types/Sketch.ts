import { SketchFn } from "./SketchFn";
import { SketchOptimization } from "./SketchOptimization";

export interface SketchResolution {
  w: number;
  h: number;
}

export type SketchGCodeProfile =
  | "ninja"
  | "gcode"
  | "gcode_relative"
  | "csv"
  | "json"
  | "isvg"
  | string;

export interface SketchGCodeOptions {
  profile?: SketchGCodeProfile;
}

export interface SketchMetadata {
  name?: string;

  resolution?: SketchResolution;

  fps?: number;

  optimizations?: SketchOptimization[];

  gCode?: boolean | SketchGCodeOptions;
}

export interface Sketch {
  name: string;

  metadata?: SketchMetadata;

  setup?: SketchFn;

  draw?: SketchFn;
}
