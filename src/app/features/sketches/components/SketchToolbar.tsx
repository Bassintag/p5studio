import { Box, createStyles, Text } from "@mantine/core";
import { SketchBackgroundMenu } from "./SketchBackgroundMenu";
import { SketchDownloadButton } from "./SketchDownloadButton";
import { SketchRefreshButton } from "./SketchRefreshButton";
import { SketchAutoRefreshSwitch } from "./SketchAutoRefreshSwitch";
import { useSketchCanvasContext } from "../contexts/SketchCanvasContext";

const useStyles = createStyles((theme) => ({
  toolbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "4px 12px",
    borderBottom: "1px solid",
    borderColor: theme.colors.gray[4],
  },
  text: {
    marginRight: "auto",
  },
}));

export const SketchToolbar = () => {
  const { classes } = useStyles();

  const { sketch } = useSketchCanvasContext();

  return (
    <div className={classes.toolbar}>
      <Text className={classes.text}>{sketch.metadata?.name ?? "Unnamed"}</Text>
      <SketchBackgroundMenu />
      <SketchDownloadButton />
      <SketchRefreshButton />
      <SketchAutoRefreshSwitch />
    </div>
  );
};
