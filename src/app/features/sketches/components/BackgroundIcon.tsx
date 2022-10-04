import { Box, createStyles } from "@mantine/core";

const useStyles = createStyles(
  (theme, { background }: BackgroundIconProps) => ({
    button: {
      width: "12px",
      height: "12px",
      borderRadius: "6px",
      border: "1px solid black",
      background,
    },
  })
);

export interface BackgroundIconProps {
  background: string;
}

export const BackgroundIcon = (props: BackgroundIconProps) => {
  const { classes } = useStyles(props);

  return <div className={classes.button} />;
};
