import { Command } from "commander";
import chalk from "chalk";
import { GrpcCommand } from "./grpc.command";
import figlet from "figlet";

export class CommandLoader {
  public static async load(program: Command) {
    
    new GrpcCommand().load(program);
    this.handleInvalidCommand(program);
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
