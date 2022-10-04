import { useEffect, useState } from "react";
import { Sketch } from "../../../../types";
import { getSketch, onSketchChange } from "../../../services/sketchService";

export const useSketch = (sketchId: string) => {
  const [sketch, setSketch] = useState<Sketch>();

  useEffect(() => {
    let mounted = true;

    const handleChange = (sketch: Sketch) => {
      if (mounted) {
        setSketch(sketch);
      }
    };

    getSketch(sketchId).then(handleChange);
    const unsubscribe = onSketchChange(sketchId, handleChange);

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [sketchId]);

  return sketch;
};
