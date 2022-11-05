import { useEffect, useState } from "react";
import { Sketch } from "../../../../types";
import { getSketch, onSketchChange } from "../../../services/sketchService";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export const useSketch = (sketchId: string) => {
  const [sketch, setSketch] = useState<Sketch>();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const handleChange = (sketch: Sketch) => {
      if (mounted) {
        setSketch(sketch);
      }
    };

    getSketch(sketchId)
      .then(handleChange)
      .catch(() => {
        showNotification({
          message: "This sketch failed to load",
          color: "red",
        });
        navigate("/");
      });
    const unsubscribe = onSketchChange(sketchId, handleChange);

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [sketchId, navigate]);

  return sketch;
};
