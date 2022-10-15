import { Button } from "@mantine/core";
import { AiOutlineDownload } from "react-icons/ai";
import { useSketchCanvasContext } from "../../contexts/SketchCanvasContext";
import { saveAs } from "file-saver";

export const SketchDownloadButton = () => {
  const { sketch, canvasRef } = useSketchCanvasContext();

  const handleDownload = () => {
    if (canvasRef.current) {
      const svg = canvasRef.current.getElementsByTagName("svg")[0];
      if (svg != null) {
        saveAs(new Blob([svg.outerHTML]), `${sketch.name}.svg`);
      }
    }
  };

  return (
    <Button
      variant="subtle"
      color="gray"
      onClick={handleDownload}
      leftIcon={<AiOutlineDownload />}
    >
      Download
    </Button>
  );
};
