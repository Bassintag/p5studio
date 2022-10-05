#! /usr/bin/env node

import { bin, version } from "../../package.json";
import { Command } from "commander";
import { ServeCommand } from "./commands/serve/ServeCommand";
import { GenerateCommand } from "./commands/generate/GenerateCommand";
import { NewCommand } from "./commands/new/NewCommand";

const program = new Command();

program.name(Object.keys(bin)[0]).version(version);

new ServeCommand(program.command("serve"));
new GenerateCommand(program.command("generate").alias("g"));
new NewCommand(program.command("new"));

program.parse();
