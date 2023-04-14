import { Command } from "commander";
import chalk from "chalk";

export class CommandLoader {
  public static async load(program: Command) {
    
  }

  private static handleInvalidCommand(program: Command) {
    program.on("command:*", () => {
      console.error(
        `Invalid command: ${chalk.red("%s")}`,
        program.args.join(" ")
      );
      console.log(
        `See ${chalk.red("--help")} for a list of available commands.\n`
      );
      process.exit(1);
    });
  }
}
