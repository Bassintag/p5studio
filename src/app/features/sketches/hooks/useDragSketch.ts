import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  selectSketchTranslateAmount,
  selectSketchZoomAmount,
  setTranslateAmount,
} from "../sketchSlice";

export const useDragSketch = () => {
  const [isGrabbing, setIsGrabbing] = useState(false);
  const dispatch = useAppDispatch();
  const zoomAmount = useAppSelector(selectSketchZoomAmount);
  const translateAmount = useAppSelector(selectSketchTranslateAmount);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const initialTx = translateAmount[0];
    const initialTy = translateAmount[1];

    setIsGrabbing(true);

    const handleMouseMove = (e: MouseEvent) => {
      const relX = (e.clientX - startX) / zoomAmount;
      const relY = (e.clientY - startY) / zoomAmount;
      dispatch(setTranslateAmount([initialTx + relX, initialTy + relY]));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      setIsGrabbing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return { isGrabbing, translateAmount, onMouseDown: handleMouseDown };
};
