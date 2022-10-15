import path from "path";

export const root = path.join(
  import.meta.url.replace(
    /^file:\/\/\//,
    process.platform === "win32" ? "" : "/"
  ),
  "../.."
);
