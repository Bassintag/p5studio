import express from "express";
import path from "path";
import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { FileServer } from "./FileServer";
import { Folder } from "../../../common/Document";
import chalk from "chalk";
import debounce from "lodash.debounce";
import { SocketHandler } from "./socket-handlers/SocketHandler";
import { SaveSocketHandler } from "./socket-handlers/SaveSocketHandler";

export interface ServerOptions {
  port?: string | number;
  rendersPath?: string;
}

export class Server {
  private readonly appRoot: string;
  private readonly indexRoot: string;
  private readonly sketchesRoot: string;

  readonly port: string | number;
  private httpServer?: HttpServer;
  private socketServer?: SocketServer;

  private readonly handlers: SocketHandler[];

  constructor(
    root: string,
    private readonly fileServer: FileServer,
    { port = 3000, rendersPath = "renders" }: ServerOptions
  ) {
    this.appRoot = path.resolve(path.join(root, "app"));
    this.indexRoot = path.join(this.appRoot, "index.html");
    this.sketchesRoot = path.join(root, "sketches");
    this.port = port;
    const rendersRoot = path.join(process.cwd(), rendersPath);
    this.handlers = [new SaveSocketHandler(rendersRoot)];
  }

  private handleFileChange(sketchId: string) {
    this.socketServer?.emit("message", "fileChange", sketchId);
  }

  private handleFilesChange(state: Folder) {
    this.socketServer?.emit("message", "files", state);
  }

  start(): void {
    const app = express();
    app.use(express.static(this.appRoot));
    app.use("/sketches", express.static(this.sketchesRoot));
    app.get("/state", (req, res) => {
      res.json(this.fileServer.files);
    });
    app.get("/*", (req, res) => {
      if (
        req.path.endsWith(".ico") ||
        req.path.match(/^\/(^:assets|sketches)\//)
      ) {
        return res.status(404).json({
          error: "Not found",
          status: 404,
        });
      }
      res.sendFile(this.indexRoot);
    });
    this.httpServer = app.listen(this.port);
    this.socketServer = new SocketServer(this.httpServer);

    this.fileServer.on(
      "change",
      debounce((state: Folder) => {
        this.handleFilesChange(state);
      }, 100)
    );

    this.fileServer.on("fileChange", (sketchId: string) =>
      this.handleFileChange(sketchId)
    );

    this.socketServer.on("connection", (socket) => {
      if (this.fileServer.files) {
        socket.send("files", this.fileServer.files);
        for (const handler of this.handlers) {
          handler.on(socket);
        }
      }
    });

    console.log(
      chalk.green("Started server on:"),
      chalk.white(`http://localhost:${this.port}`)
    );
  }
}
