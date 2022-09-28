import { useEffect, useState } from "react";
import { getSketch, onSketchChange } from "../../../services/sketchService";
import { Sketch } from "@types";

export const useSketch = (sketchId: string) => {
  const [sketch, setSketch] = useState<Sketch | undefined>();

  useEffect(() => {
    let canceled = false;
    setSketch(undefined);
    getSketch(sketchId).then((sketch) => {
      if (!canceled) {
        setSketch(sketch);
      }
    });
    const unsubscribe = onSketchChange(sketchId, setSketch);
    return () => {
      canceled = true;
      unsubscribe();
    };
  }, [sketchId]);

  return sketch;
};
