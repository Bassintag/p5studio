import { SocketHandler } from "./SocketHandler";
import {
  SocketMessage,
  SocketResponse,
} from "../../../../common/messages/SocketMessage";
import path from "path";
import * as fs from "fs";
import chalk from "chalk";

export class SaveSocketHandler extends SocketHandler<"save"> {
  constructor(private readonly rendersRoot: string) {
    super("save");
  }

  protected async handleMessage(
    data: SocketMessage<"save">
  ): Promise<SocketResponse<"save">> {
    const outPath = path.join(this.rendersRoot, data.fileName);
    console.log(chalk.yellow("Saving:"), chalk.gray(outPath));
    await fs.promises.mkdir(path.dirname(outPath), {
      recursive: true,
    });
    await fs.promises.writeFile(outPath, data.sketchData, "utf-8");
    return { path: outPath };
  }
}
