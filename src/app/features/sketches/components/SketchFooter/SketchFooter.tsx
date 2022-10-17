import { Button, createStyles, Tabs } from "@mantine/core";
import {
  AiOutlineConsoleSql,
  AiOutlineDown,
  AiOutlineFileText,
  AiOutlineUp,
} from "react-icons/ai";
import { SketchLogs } from "./SketchLogs/SketchLogs";
import { SketchInfos } from "./SketchInfos/SketchInfos";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  selectSketchCollapseFooter,
  setCollapseFooter,
} from "../../sketchSlice";

const useStyles = createStyles((theme, isCollapsed: boolean) => ({
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
    minHeight: isCollapsed ? undefined : "256px",
    height: isCollapsed ? "128px" : "30vh",
    background: theme.colors.gray[0],
    overflowY: "auto",
  },
  collapseButton: {
    marginLeft: "auto",
    color: "black",
  },
}));

export const SketchFooter = () => {
  const dispatch = useAppDispatch();
  const collapseFooter = useAppSelector(selectSketchCollapseFooter);

  const { classes } = useStyles(collapseFooter);

  return (
    <Tabs defaultValue="infos" className={classes.wrapper}>
      <Tabs.List className={classes.tabs}>
        <Tabs.Tab value="infos" icon={<AiOutlineFileText />}>
          Infos
        </Tabs.Tab>
        <Tabs.Tab value="logs" icon={<AiOutlineConsoleSql />}>
          Logs
        </Tabs.Tab>
        <Button
          className={classes.collapseButton}
          variant="subtle"
          color="gray"
          size="xs"
          onClick={() => {
            dispatch(setCollapseFooter(!collapseFooter));
          }}
        >
          {collapseFooter ? <AiOutlineUp /> : <AiOutlineDown />}
        </Button>
      </Tabs.List>
      <Tabs.Panel value="infos" className={classes.panel}>
        <SketchInfos />
      </Tabs.Panel>
      <Tabs.Panel value="logs" className={classes.panel}>
        <SketchLogs />
      </Tabs.Panel>
    </Tabs>
  );
};
