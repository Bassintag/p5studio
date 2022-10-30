import { Center, createStyles, Paper } from "@mantine/core";
import { useSketchCanvasContext } from "../contexts/SketchCanvasContext";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  selectSketchBackground,
  selectSketchZoomAmount,
  setTranslateAmount,
} from "../sketchSlice";
import { useP5 } from "../hooks/useP5";
import { useDragSketch } from "../hooks/useDragSketch";
import { useEffect } from "react";
import { useMouseWheelZoom } from "../hooks/useMouseWheelZoom";

interface StyleParams {
  zoomAmount: number;
  background: string;
  isGrabbing: boolean;
  translateAmount: [number, number];
}

const useStyles = createStyles(
  (
    theme,
    { zoomAmount, background, isGrabbing, translateAmount }: StyleParams
  ) => ({
    wrapper: {
      flexGrow: 1,
      overflow: "hidden",
      padding: "16px",
      cursor: isGrabbing ? "grabbing" : "grab",
    },
    card: {
      display: "block",
      padding: 0,
      background,
      transform: `scale(${zoomAmount}) translate(${translateAmount[0]}px, ${translateAmount[1]}px)`,
    },
  })
);

export const SketchCanvas = () => {
  const { sketch, canvasRef } = useSketchCanvasContext();

  useP5(sketch, canvasRef);

  const background = useAppSelector(selectSketchBackground);

  const { onMouseDown, translateAmount, isGrabbing } = useDragSketch();
  const { onWheel, zoomAmount } = useMouseWheelZoom();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTranslateAmount([0, 0]));
  }, [sketch, dispatch]);

  const { classes } = useStyles({
    zoomAmount,
    background,
    isGrabbing,
    translateAmount,
  });

  return (
    <Center
      onMouseDown={onMouseDown}
      onWheel={onWheel}
      className={classes.wrapper}
    >
      <Paper className={classes.card} ref={canvasRef} />
    </Center>
  );
};
