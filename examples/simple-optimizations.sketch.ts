import { SketchFn, SketchMetadata } from "@types";

export const metadata: SketchMetadata = {
  name: "Simple Optimizations",
  resolution: {
    w: 500,
    h: 500,
  },
  optimizations: ["lineSimplify", "lineMerge", "reLoop", "lineSort"],
};

export const setup: SketchFn = (p) => {
  p.noFill();
  p.strokeWeight(2);
  p.stroke("black");
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
