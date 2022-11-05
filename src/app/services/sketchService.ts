import { Sketch } from "@types";

interface SketchChangeListener {
  (sketch: Sketch): void;
}

const listeners: Record<string, SketchChangeListener[]> = {};
const modules: Record<string, Promise<Sketch>> = {};

export const loadSketch = (sketchId: string) => {
  console.log("Loading sketch:", sketchId);
  modules[sketchId] = import(
    `/sketches/${sketchId}.js?_nonce=${Date.now()}`
  ).then((module) => {
    const sketchModule = module as Sketch;
    const sketch: Sketch = {
      name: sketchModule.metadata?.name ?? sketchId,
      metadata: sketchModule.metadata,
      draw: sketchModule.draw,
      setup: sketchModule.setup,
    };
    console.log("Loaded sketch:", sketch.name);
    if (sketchId in listeners) {
      for (const listener of listeners[sketchId]) {
        listener(sketch);
      }
    }
    return sketch;
  });
};

export const getSketch = (sketchId: string) => {
  if (!(sketchId in modules)) {
    loadSketch(sketchId);
  }
  return modules[sketchId];
};

export const onSketchChange = (
  sketchId: string,
  callback: SketchChangeListener
) => {
  if (!(sketchId in listeners)) {
    listeners[sketchId] = [];
  }
  listeners[sketchId].push(callback);
  return () => {
    const index = listeners[sketchId]?.indexOf(callback);
    if (index != null && index >= 0) {
      listeners[sketchId].splice(index, 1);
    }
  };
};
