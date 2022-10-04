import { useCurrentSketch } from "./hooks/useCurrentSketch";
import { SketchWrapper } from "./SketchWrapper";

export const SketchPage = () => {
  const sketch = useCurrentSketch();

  return (
    <>{sketch == null ? "Loading..." : <SketchWrapper sketch={sketch} />}</>
  );
};
