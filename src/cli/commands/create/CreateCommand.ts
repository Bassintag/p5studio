import { CliCommand } from "../CliCommand";
import { Command } from "commander";
import * as fs from "fs";
import path from "path";
import chalk from "chalk";
import kebabCase from "lodash.kebabcase";

export interface CreateOptions {
  out: string;
}

export class CreateCommand extends CliCommand {
  constructor(command: Command) {
    super(command);
  }

  protected async run(name: string, { out }: CreateOptions): Promise<void> {
    const fileName = `${kebabCase(name)}.sketch.ts`;
    const dirPath = path.resolve(path.join(process.cwd(), out));
    const filePath = path.join(dirPath, fileName);
    if (fs.existsSync(filePath)) {
      console.log(chalk.red("File already exists:"), chalk.gray(filePath));
      process.exit(1);
    }
    await fs.promises.mkdir(dirPath, {
      recursive: true,
    });
    const template = `import { SketchFn, SketchMetadata } from "p5studio";

export const metadata: SketchMetadata = {
  name: "${name}",
  resolution: {
    w: 500,
    h: 500,
  },
};

export const setup: SketchFn = (p5) => {
};

export const draw: SketchFn = (p5) => {
};
`;
    await fs.promises.writeFile(filePath, template);
    console.log(chalk.green("Created file:"), chalk.gray(filePath));
  }

  protected setOptions(command: Command): void {
    command
      .argument("name", "Name of the sketch to create")
      .option("-o, --out <path>", "Path of output directory", ".");
  }
}
