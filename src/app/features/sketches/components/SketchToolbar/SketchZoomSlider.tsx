import { Slider } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { selectSketchZoomAmount, setZoomAmount } from "../../sketchSlice";

const sliderMarks = [
  {
    value: 0.2,
  },
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
];

export const SketchZoomSlider = () => {
  const zoomAmount = useAppSelector(selectSketchZoomAmount);
  const dispatch = useAppDispatch();

  const handleSetZoom = (value: number) => {
    dispatch(setZoomAmount(value));
  };

  const formatLabel = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <Slider
      value={zoomAmount}
      onChange={handleSetZoom}
      marks={sliderMarks}
      label={formatLabel}
      min={0.2}
      max={5}
      step={0.1}
      size="sm"
      styles={{
        root: {
          width: "256px",
        },
        label: {
          top: "12px",
        },
      }}
    />
  );
};
