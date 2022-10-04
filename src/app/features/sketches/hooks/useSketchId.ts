import { useParams } from "react-router-dom";

export const useSketchId = () => {
  const { sketchId } = useParams<{ sketchId: string }>();
  return sketchId as string;
};
