import { CliCommand } from "../CliCommand";
import { Command } from "commander";
import { FileServer } from "./FileServer";
import { Server } from "./Server";
import { root } from "../../const/root";
import path from "path";

export interface ServeOptions {
  port?: number | string;
  sketchesDir?: string;
  outDir?: string;
}

export class ServeCommand extends CliCommand {
  constructor(command: Command) {
    super(command);
  }

  protected setOptions(command: Command) {
    command
      .option("-p, --port <port>", "Port to start the server on", "3000")
      .option(
        "-d, --sketchesDir <path>",
        "Directory that contains the sketches",
        "."
      )
      .option(
        "-o, --outDir <path>",
        "Directory that contains the rendered sketches",
        "./renders"
      );
  }

  protected async run({
    port,
    sketchesDir,
    outDir,
  }: ServeOptions): Promise<void> {
    const fileServer = new FileServer(path.join(root, "sketches"), {
      root: sketchesDir,
    });
    const server = new Server(root, fileServer, {
      port,
      rendersPath: outDir,
    });
    fileServer.start();
    server.start();
  }
}
