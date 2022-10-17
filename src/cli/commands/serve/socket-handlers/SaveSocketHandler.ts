import { SocketHandler } from "./SocketHandler";
import {
  SocketMessage,
  SocketResponse,
} from "../../../../common/messages/SocketMessage";
import path from "path";
import * as fs from "fs";
import chalk from "chalk";
import { SketchOptimization } from "../../../../types";
import { ChildProcess, exec, spawn } from "child_process";
import { rejects } from "assert";

const vpypeCommands: Record<SketchOptimization, string> = {
  lineMerge: "linemerge",
  lineSimplify: "linesimplify",
  lineSort: "linesort",
  reLoop: "reloop",
};

export class SaveSocketHandler extends SocketHandler<"save"> {
  constructor(private readonly rendersRoot: string) {
    super("save");
  }

  private async runVpype(
    optimizations: SketchOptimization[],
    filePath: string
  ): Promise<void> {
    if (optimizations.length === 0) {
      return;
    }
    const mapped = optimizations.map((o) => vpypeCommands[o]).join(" ");
    const command = `vpype read "${filePath}" ${mapped} write "${filePath}"`;
    console.log(chalk.yellow("Running cmd:"), chalk.gray(command));
    return new Promise((resolve, reject) => {
      const cmd = exec(command);
      cmd.stdout?.pipe(process.stdout);
      cmd.stderr?.pipe(process.stderr);
      cmd.once("exit", (code) => {
        if (code !== 0) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  protected async handleMessage({
    fileName,
    sketchData,
    options = {},
  }: SocketMessage<"save">): Promise<SocketResponse<"save">> {
    const outPath = path.join(this.rendersRoot, fileName);
    console.log(chalk.yellow("Saving:"), chalk.gray(outPath));
    await fs.promises.mkdir(path.dirname(outPath), {
      recursive: true,
    });
    const { optimizations = [] } = options;
    await fs.promises.writeFile(outPath, sketchData, "utf-8");
    try {
      await this.runVpype(optimizations, outPath);
    } catch (e) {
      console.log(
        chalk.red("vpype cmd failed, please make sure it is installed")
      );
    }
    return { path: outPath };
  }
}
