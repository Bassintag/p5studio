import { createStyles } from "@mantine/core";
import { SketchBackgroundMenu } from "./SketchBackgroundMenu";
import { SketchDownloadButton } from "./SketchDownloadButton";
import { SketchRefreshButton } from "./SketchRefreshButton";
import { SketchAutoRefreshSwitch } from "./SketchAutoRefreshSwitch";
import { SketchSaveButton } from "./SketchSaveButton";
import { SketchZoomSlider } from "./SketchZoomSlider";

const useStyles = createStyles((theme) => ({
  toolbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "4px 12px",
    borderBottom: "1px solid",
    borderColor: theme.colors.gray[4],
  },
}));

export const SketchToolbar = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.toolbar}>
      <SketchZoomSlider />
      <SketchBackgroundMenu />
      <SketchDownloadButton />
      <SketchSaveButton />
      <SketchRefreshButton />
      <SketchAutoRefreshSwitch />
    </div>
  );
};
