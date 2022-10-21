import { SocketHandler } from "./SocketHandler";
import {
  SocketMessage,
  SocketResponse,
} from "../../../../common/messages/SocketMessage";
import path from "path";
import * as fs from "fs";
import chalk from "chalk";
import { SketchGCodeOptions, SketchOptimization } from "../../../../types";
import { exec } from "child_process";
import kebabCase from "lodash.kebabcase";

export class SaveSocketHandler extends SocketHandler<"save"> {
  constructor(private readonly rendersRoot: string) {
    super("save");
  }

  private executeCmd(command: string) {
    console.log(chalk.yellow("Running cmd:"), chalk.gray(command));
    return new Promise<void>((resolve, reject) => {
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

  private commandFromOptimization(optimization: SketchOptimization): string {
    if (typeof optimization === "string") {
      return optimization.toLowerCase();
    } else {
      const { type, ...args } = optimization;
      let command = type.toLowerCase();
      for (let [arg, value] of Object.entries(args)) {
        if (value) {
          command += ` --${kebabCase(arg)}`;
          switch (typeof value) {
            case "number":
              command += ` ${value}`;
              break;
            case "string":
              command += ` ${value}`;
              break;
          }
        }
      }
      return command;
    }
  }

  private async runVpypeOptimizations(
    optimizations: SketchOptimization[],
    filePath: string
  ): Promise<void> {
    if (optimizations.length === 0) {
      return;
    }
    const mapped = optimizations
      .map((o) => this.commandFromOptimization(o))
      .join(" ");
    const command = `vpype read "${filePath}" ${mapped} write "${filePath}"`;
    return this.executeCmd(command);
  }

  private async runVpypeGcode(
    filePath: string,
    profile: string
  ): Promise<void> {
    const dir = path.dirname(filePath);
    const basename = path.basename(filePath, ".svg");
    const outPath = path.join(dir, `${basename}.gcode`);
    const command = `vpype read "${filePath}" gwrite --profile "${profile}" "${outPath}"`;
    return this.executeCmd(command);
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
    const { optimizations = [], gCode = false } = options;
    await fs.promises.writeFile(outPath, sketchData, "utf-8");
    try {
      await this.runVpypeOptimizations(optimizations, outPath);
      if (gCode) {
        const { profile = "gcode" }: SketchGCodeOptions =
          typeof gCode === "object" ? gCode : {};
        await this.runVpypeGcode(outPath, profile);
      }
    } catch (e) {
      console.log(
        chalk.red("vpype cmd failed, please make sure it is installed")
      );
    }
    return { path: outPath };
  }
}
