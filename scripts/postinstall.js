import { exec } from "child_process";
import chalk from "chalk";

const cmd = exec("python3 -m pip install vpype");

cmd.stderr.pipe(process.stderr);
cmd.stdout.pipe(process.stdout);

cmd.once("exit", (code, signal) => {
  if (code === 0) {
    console.info("Vpype installed successfully");
  } else {
    console.error(
      chalk.bold(
        chalk.red(
          "Warning: vpype installation failed please make sure python 3 is installed and python is available in path"
        )
      )
    );
  }
});
