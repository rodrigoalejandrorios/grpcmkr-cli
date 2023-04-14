import inquirer, { Answers, QuestionCollection } from "inquirer";
import { program, Command } from "commander";

export class GrpcCommand {
  public async load(program: Command) {
    program
      .version("1.0.0")
      .description("An example CLI for managing a directory")
      .option("c, create", "Create a new gRPC Proyect")
      .parse(process.argv);

    return program.opts();
  }

  public async readFile(program: Command) {
    const questions: QuestionCollection<Answers> = [
      {
        name: "proto",
        message: "Write the name of the path where the .proto file is located:",
        type: "input",
      },
    ];
    inquirer.prompt(questions).then((a) => {});
  }
}
