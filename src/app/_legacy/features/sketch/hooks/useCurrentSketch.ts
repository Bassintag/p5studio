import { useParams } from "react-router-dom";
import { useSketch } from "./useSketch";

export const useCurrentSketch = () => {
  const { sketchId } = useParams<{ sketchId: string }>();
  return useSketch(sketchId as string);
};
