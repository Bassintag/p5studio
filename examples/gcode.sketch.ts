import { SketchFn, SketchMetadata } from "@types";

export const metadata: SketchMetadata = {
  name: "Gcode",
  resolution: {
    w: 500,
    h: 500,
  },
  // This can be set to true or a config object
  gCode: {
    // See https://pypi.org/project/vpype-gcode/ for more informations
    profile: "gcode",
  },
};

export const setup: SketchFn = (p) => {
  p.noFill();
  p.strokeWeight(5);
  p.stroke("red");
};

export const draw: SketchFn = (p) => {
  p.circle(250, 250, 300);
};
