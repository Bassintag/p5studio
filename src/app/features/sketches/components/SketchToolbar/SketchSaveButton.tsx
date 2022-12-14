import { Button } from "@mantine/core";
import { useSendSaveMessage } from "../../../socket/hooks/useSendSaveMessage";
import { AiOutlineSave } from "react-icons/ai";
import { useSketchCanvasContext } from "../../contexts/SketchCanvasContext";
import { format } from "date-fns";
import { showNotification, updateNotification } from "@mantine/notifications";

export const SketchSaveButton = () => {
  const { sketch, canvasRef } = useSketchCanvasContext();
  const save = useSendSaveMessage();

  const handleSave = () => {
    if (!canvasRef.current) {
      return;
    }
    const svg = canvasRef.current.getElementsByTagName("svg")[0];
    if (svg == null) {
      return;
    }
    const clone = svg.cloneNode(true) as SVGElement;
    const width = clone.getAttribute("width");
    const height = clone.getAttribute("height");
    clone.setAttribute("width", `${width}mm`);
    clone.setAttribute("height", `${height}mm`);
    const timestamp = format(new Date(), "yyMMdd-hhmmss");
    const fileName = `${sketch.metadata?.name ?? sketch.name}.${timestamp}.svg`;
    const id = fileName;
    showNotification({
      id,
      title: "Saving render",
      message: "Loading...",
      color: "orange",
      loading: true,
      autoClose: false,
    });
    save(
      {
        fileName,
        sketchData: clone.outerHTML,
        options: sketch.metadata,
      },
      ({ path }) => {
        updateNotification({
          id,
          title: "Saved render",
          message: path,
          color: "green",
          loading: false,
          autoClose: true,
        });
      }
    );
    console.log(clone);
  };

  return (
    <Button
      variant="subtle"
      color="gray"
      onClick={handleSave}
      leftIcon={<AiOutlineSave />}
    >
      Save
    </Button>
  );
};
