import { Button } from "@mantine/core";
import { AiOutlineReload } from "react-icons/ai";
import { loadSketch } from "../../../services/sketchService";
import { useSketchId } from "../hooks/useSketchId";

export const SketchRefreshButton = () => {
  const sketchId = useSketchId();

  const handleRefresh = () => {
    loadSketch(sketchId);
  };

  return (
    <Button
      variant="subtle"
      color="gray"
      onClick={handleRefresh}
      leftIcon={<AiOutlineReload />}
    >
      Refresh
    </Button>
  );
};
