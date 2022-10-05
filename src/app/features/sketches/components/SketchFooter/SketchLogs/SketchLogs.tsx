import { useSketchId } from "../../../hooks/useSketchId";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import { clearSketchLogs, selectSketchLogs } from "../../../sketchSlice";
import { Box, Button, createStyles, Text } from "@mantine/core";
import { SketchLogTitle } from "./SketchLogTitle";
import { SketchLogTimestamp } from "./SketchLogTimestamp";
import { AiOutlineClear } from "react-icons/ai";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "stretch",
    position: "relative",
  },
  button: {
    position: "absolute",
    bottom: "16px",
    right: "16px",
  },
  line: {
    padding: "4px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    ":nth-child(even)": {
      background: theme.colors.gray[2],
    },
  },
  part: {
    marginRight: "4px",
  },
}));

export const SketchLogs = () => {
  const sketchId = useSketchId();

  const logs = useAppSelector((state) => selectSketchLogs(state, sketchId));

  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  return (
    <Box className={classes.wrapper}>
      {logs.map((log, i) => (
        <Box key={i} className={classes.line}>
          <SketchLogTimestamp log={log} className={classes.part} />
          <SketchLogTitle log={log} className={classes.part} />
          <Text className={classes.part}>[{log.level}]</Text>
          {log.parts.map((part, i) => (
            <Text key={i} className={classes.part}>
              {part as string}
            </Text>
          ))}
        </Box>
      ))}
      {logs.length > 0 && (
        <Button
          className={classes.button}
          onClick={() => {
            dispatch(clearSketchLogs(sketchId));
          }}
          variant="subtle"
          color="red"
          size="sm"
          leftIcon={<AiOutlineClear />}
        >
          Clear
        </Button>
      )}
    </Box>
  );
};
