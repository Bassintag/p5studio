import { useAppDispatch, useAppSelector } from "../../../store";
import { selectSketchZoomAmount, setZoomAmount } from "../sketchSlice";
import React from "react";

export const useMouseWheelZoom = () => {
  const zoomAmount = useAppSelector(selectSketchZoomAmount);

  const dispatch = useAppDispatch();

  const onWheel = (wheelEvent: React.WheelEvent) => {
    if (wheelEvent.deltaY < 0) {
      dispatch(setZoomAmount(Math.min(3, zoomAmount + 0.1)));
    } else {
      dispatch(setZoomAmount(Math.max(0.1, zoomAmount - 0.1)));
    }
  };

  return {
    zoomAmount,
    onWheel,
  };
};
