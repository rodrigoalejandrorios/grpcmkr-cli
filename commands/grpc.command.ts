import inquirer, { Answers, QuestionCollection } from "inquirer";
import { Command } from "commander";
import { AbstractCommand } from "./abstract.command";
import { CreateTemplate } from "../scripts/create.template";
import chalk from "chalk";

export class GrpcCommand extends AbstractCommand {
  constructor() {
    super();
  }
  public async load(program: Command) {
    program
      .command("create")
      .alias("cr")
      .action(() => {
        inquirer.registerPrompt("path", require("inquirer-path").PathPrompt);
        const questions: QuestionCollection<Answers> = [
          {
            name: "proto",
            message: `Write the name of the path where the ${chalk.green(
              ".proto"
            )} file is located:`,
            type: "path",
            default: process.cwd(),
          },
          {
            name: "nameDir",
            message: "Set name of new project: ",
            type: "input",
          },
        ];
        inquirer.prompt(questions).then(async (a) => {
          const { nameDir, proto } = a;

          const cloneRes = await new CreateTemplate(
            nameDir,
            proto
          ).cloneTemplate();
          if (cloneRes) {
            await new CreateTemplate(nameDir, proto).createNewFiles();
          }
          //new GrpcFileGenerate(path.join(process.cwd(), a.proto)).generate();
        });
      });
  }
}
