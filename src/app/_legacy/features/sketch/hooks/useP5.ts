import { Sketch } from "@types";
import { useEffect, useState } from "react";
import p5 from "p5";
// @ts-ignore
import initP5Svg from "p5.js-svg";

initP5Svg(p5);

export const useP5 = (sketch: Sketch, ref: React.RefObject<HTMLElement>) => {
  let [sketchElement, setSketchElement] = useState<SVGElement | null>(null);

  useEffect(() => {
    if (ref.current == null) {
      throw new Error("Ref not initialized");
    }

    setSketchElement(null);

    const instance = new p5((p: p5) => {
      p.setup = () => {
        const { w, h } = sketch.metadata?.resolution ?? {
          w: 100,
          h: 100,
        };
        p.createCanvas(w, h, (p as any).SVG);
        sketch.setup?.(p);
        if (sketch.metadata?.fps) {
          p.frameRate(sketch.metadata.fps);
        } else {
          p.noLoop();
        }
      };

      p.draw = () => {
        sketch.draw?.(p);
      };
    }, ref.current);

    setSketchElement(ref.current.getElementsByTagName("svg")[0]);

    return () => {
      instance.remove();
      if (ref.current) {
        const elements = ref.current?.getElementsByClassName("p5Canvas");
        for (let i = 0; i < elements.length; i += 1) {
          elements[i].remove();
        }
      }
    };
  }, [sketch, ref]);

  return sketchElement;
};
