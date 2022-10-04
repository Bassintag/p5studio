import { Text, TextProps } from "@mantine/core";
import { SketchLog, SketchLogType } from "../../sketchSlice";

export interface SketchLogTitleProps extends Omit<TextProps, "children"> {
  log: SketchLog;
}

const defs = {
  [SketchLogType.SETUP]: {
    title: "Setup",
    color: "green",
  },
  [SketchLogType.DRAW]: {
    title: "Draw",
    color: "orange",
  },
};

export const SketchLogTitle = ({ log, ...rest }: SketchLogTitleProps) => {
  const { title, color } = defs[log.type];
  return (
    <Text {...rest} color={color}>
      [{title}]
    </Text>
  );
};
