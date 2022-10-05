import { CliCommand } from "../CliCommand";
import { Command } from "commander";
import path from "path";
import * as fs from "fs";
import { getResource } from "../../utils/getResource";
import Mustache from "mustache";
import {
  version as packageVersion,
  name as packageName,
} from "../../../../package.json";
import chalk from "chalk";
import prompts from "prompts";
import { spawn } from "child_process";

export interface CreateOptions {
  out: string;
}

export class NewCommand extends CliCommand {
  constructor(command: Command) {
    super(command);
  }

  protected async run(name: string, { out }: CreateOptions): Promise<void> {
    const outDir = path.resolve(out);
    const projectDir = path.join(outDir, name);
    const srcDir = path.join(projectDir, "src");
    if (fs.existsSync(projectDir)) {
      console.log(
        chalk.red("Directory already exists:"),
        chalk.gray(projectDir)
      );
      return process.exit(1);
    }
    await fs.promises.mkdir(projectDir);
    console.log(chalk.green("Created directory:"), chalk.gray(projectDir));
    await fs.promises.mkdir(srcDir);
    console.log(chalk.green("Created directory:"), chalk.gray(srcDir));
    const [packageTemplate, sketchTemplate] = await Promise.all([
      getResource("package.json.mustache"),
      getResource("sketch.ts.mustache"),
    ]);
    const renderedPackage = Mustache.render(packageTemplate, {
      packageName,
      packageVersion,
      name,
    });
    const packagePath = path.join(projectDir, "package.json");
    await fs.promises.writeFile(packagePath, renderedPackage);
    console.log(chalk.green("Created file:"), chalk.gray(packagePath));
    const renderedExampleSketch = Mustache.render(sketchTemplate, {
      packageName,
      name: "Example Sketch",
    });
    const sketchPath = path.join(srcDir, "example.sketch.ts");
    await fs.promises.writeFile(sketchPath, renderedExampleSketch);
    console.log(chalk.green("Created file:"), chalk.gray(sketchPath));
    const { cmd } = await prompts({
      type: "select",
      name: "cmd",
      message: "Pick your favorite package manager",
      choices: [
        {
          title: "Yarn",
          value: "yarn",
          selected: true,
        },
        {
          title: "Npm",
          value: "npm i",
        },
      ],
    });
    const proc = spawn(cmd, {
      cwd: projectDir,
      shell: true,
    });
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("exit", (code) => {
      process.exit(code ?? 0);
    });
  }

  protected setOptions(command: Command): void {
    command
      .argument("name", "Name of the project to create")
      .option("-o, --out <path>", "Path of output directory", ".");
  }
}
