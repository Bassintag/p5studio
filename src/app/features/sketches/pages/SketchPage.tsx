import { useSketchId } from "../hooks/useSketchId";
import { useSketch } from "../hooks/useSketch";
import { SketchCanvas } from "../components/SketchCanvas";
import { createStyles, Loader } from "@mantine/core";
import { SketchCanvasProvider } from "../contexts/SketchCanvasContext";
import { SketchToolbar } from "../components/SketchToolbar/SketchToolbar";
import { SketchFooter } from "../components/SketchFooter/SketchFooter";

const useStyles = createStyles({
  wrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    overflow: "hidden",
  },
});

export const SketchPage = () => {
  const sketchId = useSketchId();
  const sketch = useSketch(sketchId);
  const { classes } = useStyles();

  return sketch ? (
    <SketchCanvasProvider sketch={sketch}>
      <div className={classes.wrapper}>
        <SketchToolbar />
        <SketchCanvas />
        <SketchFooter />
      </div>
    </SketchCanvasProvider>
  ) : (
    <Loader />
  );
};
