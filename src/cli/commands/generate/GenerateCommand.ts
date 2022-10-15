import { CliCommand } from "../CliCommand";
import { Command } from "commander";
import * as fs from "fs";
import path from "path";
import chalk from "chalk";
import kebabCase from "lodash.kebabcase";
import { getResource } from "../../utils/getResource";
import Mustache from "mustache";
import { name as packageName } from "../../../../package.json";

export interface GenerateOptions {
  out: string;
}

export class GenerateCommand extends CliCommand {
  constructor(command: Command) {
    super(command);
  }

  protected async run(name: string, { out }: GenerateOptions): Promise<void> {
    const fileName = `${kebabCase(name)}.sketch.ts`;
    const dirPath = path.resolve(path.join(process.cwd(), out));
    const filePath = path.join(dirPath, fileName);
    if (fs.existsSync(filePath)) {
      console.log(chalk.red("File already exists:"), chalk.gray(filePath));
      return process.exit(1);
    }
    await fs.promises.mkdir(dirPath, {
      recursive: true,
    });
    const template = await getResource("sketch.ts.mustache");
    const rendered = Mustache.render(template, {
      name,
      packageName,
    });
    await fs.promises.writeFile(filePath, rendered);
    console.log(chalk.green("Generated file:"), chalk.gray(filePath));
  }

  protected setOptions(command: Command): void {
    command
      .argument("name", "Name of the sketch to create")
      .option("-o, --out <path>", "Path of output directory", ".");
  }
}
