import { createStyles, Loader, Table } from "@mantine/core";
import { useSketchCanvasContext } from "../../../contexts/SketchCanvasContext";
import { SketchMetadata } from "../../../../../../types";

const formatResolution = (metadata?: SketchMetadata) => {
  if (
    metadata &&
    metadata.resolution &&
    metadata.resolution.w != null &&
    metadata.resolution.h != null
  ) {
    return `${metadata.resolution.w} x ${metadata.resolution.h}`;
  } else {
    return "default";
  }
};

const useStyles = createStyles((theme) => ({
  rowTitle: {
    fontWeight: "bold",
  },
  row: {
    ":nth-child(even)": {
      background: theme.colors.gray[2],
    },
  },
}));

export const SketchInfos = () => {
  const { sketch } = useSketchCanvasContext();

  const { classes } = useStyles();

  return sketch ? (
    <Table>
      <tbody>
        <tr className={classes.row}>
          <td className={classes.rowTitle}>Name</td>
          <td>{sketch.metadata?.name ?? sketch.name}</td>
        </tr>
        <tr className={classes.row}>
          <td className={classes.rowTitle}>Frames per second</td>
          <td>{sketch.metadata?.fps ?? "Render once"}</td>
        </tr>
        <tr className={classes.row}>
          <td className={classes.rowTitle}>Resolution</td>
          <td>{formatResolution(sketch.metadata)}</td>
        </tr>
      </tbody>
    </Table>
  ) : (
    <Loader />
  );
};
