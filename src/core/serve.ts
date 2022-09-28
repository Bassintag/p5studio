import { Server } from "socket.io";
import { watch } from "./watch";
import esbuild from "esbuild";
import express from "express";
import path from "path";
import { root } from "./root";

const appRoot = path.join(root, "app");
const indexRoot = path.join(appRoot, "index.html");
const sketchesRoot = path.join(appRoot, "sketches");

export const serve = () => {
  let sketches: string[] = [];
  const app = express();
  app.use(express.static(appRoot));
  app.get("/*", (req, res) => {
    if (
      req.path.endsWith(".ico") ||
      req.path.match(/^\/(^:assets|sketches)\//)
    ) {
      return res.status(404).send({
        error: "Not found",
        status: 404,
      });
    }
    res.sendFile(indexRoot);
  });
  const server = app.listen(3000);
  const io = new Server(server);

  const closeWatch = watch(".", async (filePath) => {
    const fileName = path.basename(filePath);
    const name = fileName.split(".sketch")[0];
    const outfile = path.join(sketchesRoot, `${name}.js`);

    console.log("Building file:", filePath);
    await esbuild.build({
      entryPoints: [filePath],
      outfile,
      minify: true,
    });
    console.log("Built file:", filePath);
    if (!sketches.includes(name)) {
      sketches.push(name);
    }
    io.emit("message", "sketchChanged", name);
  });

  io.on("connection", (socket) => {
    socket.send("sketches", sketches);
  });

  return async () => {
    server.close();
    await closeWatch();
  };
};
