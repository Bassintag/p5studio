import { SketchFn, SketchMetadata } from "@types";

export const metadata: SketchMetadata = {
  name: "Advanced Optimizations",
  resolution: {
    w: 500,
    h: 500,
  },
  // Options are all vpype defaults
  // See https://vpype.readthedocs.io/en/latest/reference.html for more informations
  optimizations: [
    {
      type: "lineSimplify",
      tolerance: "0.05mm",
      layer: "all",
    },
    {
      type: "lineMerge",
      tolerance: "0.05mm",
      noFlip: false,
      layer: "all",
    },
    {
      type: "reLoop",
      tolerance: "0.05mm",
      layer: "all",
    },
    {
      type: "lineSort",
      noFlip: false,
      twoOpt: false,
      passes: 250,
      layer: "all",
    },
  ],
};

export const setup: SketchFn = (p) => {
  p.noFill();
  p.strokeWeight(2);
  p.stroke("orange");
};

export const draw: SketchFn = (p) => {
  for (let i = -5; i <= 5; i += 1) {
    const x = 250 - i * 25;
    // Without optimization this will generate a lot of connected segments
    // With optimizations they will all be connected to a single line
    for (let j = 0; j < 10; j += 1) {
      const y = 100 + 30 * j;
      p.line(x, y, x, y + 30);
    }
  }
};
