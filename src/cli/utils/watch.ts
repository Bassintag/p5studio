import * as chokidar from "chokidar";
import { Stats } from "fs";
import chalk from "chalk";
import path from "path";

export const watch = (
  root: string,
  callback: (path: string, deleted: boolean) => void
) => {
  const handleFileChange = (
    path: string,
    stats?: Stats,
    log: boolean = true
  ) => {
    if (
      stats != null &&
      stats.isFile() &&
      path.toLowerCase().match(/\.sketch\.[jt]s/)
    ) {
      if (log) {
        console.log(chalk.gray("File changed:", path));
      }
      callback(path, false);
    }
  };

  const handleDelete = (path: string) => {
    if (path.toLowerCase().match(/\.sketch\.[jt]s/)) {
      console.log(chalk.gray("File removed:", path));
      callback(path, true);
    }
  };

  const handle = chokidar
    .watch(root, {
      ignoreInitial: false,
      usePolling: false,
      ignored: /node_modules/,
    })
    .on("add", (path, stats) => handleFileChange(path, stats, false))
    .on("change", (path, stats) => handleFileChange(path, stats, true))
    .on("unlink", handleDelete);

  const absolute = path.resolve(root);

  console.log(
    chalk.yellow("Watching directory for changes:"),
    chalk.gray(absolute)
  );

  return async () => {
    await handle.close();
  };
};
