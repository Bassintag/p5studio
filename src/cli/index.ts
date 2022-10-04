#! /usr/bin/env node

import { bin, version } from "../../package.json";
import { Command } from "commander";
import { ServeCommand } from "./commands/serve/ServeCommand";
import { CreateCommand } from "./commands/create/CreateCommand";

const program = new Command();

program.name(Object.keys(bin)[0]).version(version);

new ServeCommand(program.command("serve"));
new CreateCommand(program.command("create"));

program.parse();
