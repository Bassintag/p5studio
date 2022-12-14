import { createStyles, Loader, Table } from "@mantine/core";
import { useSketchCanvasContext } from "../../../contexts/SketchCanvasContext";
import { SketchMetadata } from "../../../../../../types";

const formatResolution = (metadata?: SketchMetadata) => {
  if (metadata && metadata.resolution) {
    if (typeof metadata.resolution === "string") {
      return metadata.resolution;
    } else {
      return `${metadata.resolution.w} x ${metadata.resolution.h}`;
    }
  } else {
    return "A4";
  }
};

const formatOptimizations = (metadata?: SketchMetadata) => {
  if (metadata && metadata.optimizations) {
    return metadata.optimizations
      .map((o) => (typeof o === "object" ? o.type : o))
      .join(", ");
  } else {
    return "none";
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
        <tr className={classes.row}>
          <td className={classes.rowTitle}>Optimizations</td>
          <td>{formatOptimizations(sketch.metadata)}</td>
        </tr>
      </tbody>
    </Table>
  ) : (
    <Loader />
  );
};
