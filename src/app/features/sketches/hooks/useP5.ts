import { Sketch } from "@types";
import { useEffect } from "react";
import p5 from "p5";
// @ts-ignore
import initP5Svg from "p5.js-svg";
import { interceptConsole } from "../utils/interceptConsole";
import { useAppDispatch } from "../../../store";
import { addSketchLog, SketchLogType } from "../sketchSlice";
import { useSketchId } from "./useSketchId";

initP5Svg(p5);

export const useP5 = (sketch: Sketch, ref: React.RefObject<HTMLElement>) => {
  const dispatch = useAppDispatch();

  const sketchId = useSketchId();

  useEffect(() => {
    if (ref.current == null) {
      throw new Error("Ref not initialized");
    }

    const instance = new p5((p: p5) => {
      p.setup = () => {
        const { w, h } = sketch.metadata?.resolution ?? {
          w: 100,
          h: 100,
        };
        p.createCanvas(w, h, (p as any).SVG);
        if (sketch.metadata?.fps) {
          p.frameRate(sketch.metadata.fps);
        } else {
          p.noLoop();
        }
        interceptConsole(
          () => {
            try {
              return sketch.setup?.(p);
            } catch (e) {
              console.error(e);
            }
          },
          (level, ...parts) => {
            dispatch(
              addSketchLog({
                type: SketchLogType.SETUP,
                level,
                parts,
                sketchId,
              })
            );
          }
        );
      };

      p.draw = () => {
        interceptConsole(
          () => {
            try {
              sketch.draw?.(p);
            } catch (e) {
              console.error(e);
            }
          },
          (level, ...parts) => {
            dispatch(
              addSketchLog({
                type: SketchLogType.DRAW,
                level,
                parts,
                sketchId,
              })
            );
          }
        );
      };
    }, ref.current);

    return () => {
      instance.remove();
      if (ref.current) {
        const elements = ref.current?.getElementsByClassName("p5Canvas");
        for (let i = 0; i < elements.length; i += 1) {
          elements[i].remove();
        }
      }
    };
  }, [sketch, ref, dispatch]);
};
