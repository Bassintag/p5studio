import {
  CustomSketchResolution,
  PredefinedSketchResolution,
  SketchResolution,
} from "../../../../types";

const presets: Record<PredefinedSketchResolution, CustomSketchResolution> = {
  A4: {
    w: 210,
    h: 297,
  },
  "A4 Portrait": {
    w: 210,
    h: 297,
  },
  "A4 Landscape": {
    w: 297,
    h: 210,
  },
  A3: {
    w: 297,
    h: 420,
  },
  "A3 Portrait": {
    w: 297,
    h: 420,
  },
  "A3 Landscape": {
    w: 420,
    h: 297,
  },
};

export const getSketchResolution = (
  size: SketchResolution
): CustomSketchResolution => {
  if (typeof size === "string") {
    return presets[size];
  } else {
    return size;
  }
};
