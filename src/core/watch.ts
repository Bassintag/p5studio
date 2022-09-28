import * as chokidar from "chokidar";
import { Stats } from "fs";

export const watch = (root: string, callback: (path: string) => void) => {
  const handleFileChange = (path: string, stats?: Stats) => {
    if (
      stats != null &&
      stats.isFile() &&
      path.toLowerCase().match(/\.sketch\.[jt]s/)
    ) {
      callback(path);
    }
  };

  const handle = chokidar
    .watch(root, {
      ignoreInitial: false,
      usePolling: false,
      ignored: /node_modules/,
    })
    .on("add", handleFileChange)
    .on("change", handleFileChange);

  console.log("Watching directory for changes:", root);

  return async () => {
    await handle.close();
  };
};
