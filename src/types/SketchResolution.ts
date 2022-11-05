export interface CustomSketchResolution {
  w: number;
  h: number;
}

export type PredefinedSketchResolution =
  | "A4"
  | "A3"
  | "A4 Landscape"
  | "A4 Portrait"
  | "A3 Landscape"
  | "A3 Portrait";

export type SketchResolution =
  | PredefinedSketchResolution
  | CustomSketchResolution;
