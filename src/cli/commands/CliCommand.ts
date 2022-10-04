import { Command } from "commander";

export abstract class CliCommand {
  protected constructor(command: Command) {
    command.action(this.run);
    this.setOptions(command);
  }

  protected abstract setOptions(command: Command): void;

  protected abstract run(...params: unknown[]): Promise<void>;
}
