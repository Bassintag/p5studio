import { SketchFn } from "./SketchFn";
import { SketchOptimization } from "./SketchOptimization";
import { SketchResolution } from "./SketchResolution";

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
