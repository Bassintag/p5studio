import { Center, Paper } from "@mantine/core";
import { useSketchCanvasContext } from "../contexts/SketchCanvasContext";
import { useAppSelector } from "../../../store";
import { selectSketchBackground } from "../sketchSlice";
import { useP5 } from "../hooks/useP5";

export const SketchCanvas = () => {
  const { sketch, canvasRef } = useSketchCanvasContext();

  useP5(sketch, canvasRef);

  const background = useAppSelector(selectSketchBackground);

  return (
    <Center
      style={{
        flexGrow: 1,
        overflow: "auto",
        padding: "16px",
      }}
    >
      <Paper
        p="none"
        shadow="md"
        style={{
          display: "inline-block",
          background,
        }}
        ref={canvasRef}
      />
    </Center>
  );
};
