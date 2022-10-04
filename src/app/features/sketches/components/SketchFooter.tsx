import { createStyles, Tabs } from "@mantine/core";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { SketchLogs } from "./SketchLogs/SketchLogs";

const useStyles = createStyles((theme) => ({
  wrapper: {
    background: theme.colors.gray[1],
  },
  tabs: {
    paddingLeft: "16px",
    paddingRight: "16px",
    borderTop: "1px solid",
    borderColor: theme.colors.gray[4],
  },
  panel: {
    position: "relative",
    minHeight: "256px",
    height: "30vh",
    background: theme.colors.gray[0],
    "> div": {
      width: "100%",
      height: "100%",
      overflow: "auto",
    },
  },
}));

export const SketchFooter = () => {
  const { classes } = useStyles();

  return (
    <Tabs defaultValue="logs" className={classes.wrapper}>
      <Tabs.List className={classes.tabs}>
        <Tabs.Tab value="logs" icon={<AiOutlineConsoleSql />}>
          Logs
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="logs" className={classes.panel}>
        <SketchLogs />
      </Tabs.Panel>
    </Tabs>
  );
};
