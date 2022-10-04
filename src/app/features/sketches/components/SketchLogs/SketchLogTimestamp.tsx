import { Text, TextProps } from "@mantine/core";
import { SketchLog, SketchLogType } from "../../sketchSlice";
import { useFormattedTime } from "../../../datetime/hooks/useFormattedTime";

export interface SketchLogTimestampProps extends Omit<TextProps, "children"> {
  log: SketchLog;
}

export const SketchLogTimestamp = ({
  log,
  ...rest
}: SketchLogTimestampProps) => {
  const formatted = useFormattedTime(log.timestamp);

  return <Text {...rest}>[{formatted}]</Text>;
};
