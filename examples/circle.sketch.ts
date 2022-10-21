import { SketchFn, SketchMetadata } from "p5-studio";

export const metadata: SketchMetadata = {
  name: "Circle",
  resolution: {
    w: 500,
    h: 500,
  },
};

export const setup: SketchFn = (p) => {
  p.noFill();
  p.strokeWeight(5);
  p.stroke("green");
};

export const draw: SketchFn = (p) => {
  p.circle(250, 250, 300);
};
