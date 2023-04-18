import inquirer, { Answers, QuestionCollection } from 'inquirer';
import { Command } from 'commander';
import { AbstractCommand } from './abstract.command';
import { CreateTemplate } from '../scripts/create.template';
import chalk from 'chalk';
import { RUNNERS } from '../constants/runners';

export class GrpcCommand extends AbstractCommand {
  constructor() {
    super();
  }
  public async load(program: Command) {
    program
      .command('create')
      .alias('cr')
      .action(() => {
        inquirer.registerPrompt('path', require('inquirer-path').PathPrompt);
        const questions: QuestionCollection<Answers> = [
          {
            name: 'runner',
            message: 'Select the package manager to use:',
            type: 'list',
            choices: [
              {
                checked: true,
                name: 'Use NPM',
                value: RUNNERS.NPM,
              },
              {
                name: 'Use YARN',
                value: RUNNERS.YARN,
              },
            ],
          },
          {
            name: 'proto',
            message: `Write the name of the path where the ${chalk.green(
              '.proto',
            )} file is located:`,
            type: 'path',
            default: process.cwd(),
          },
          {
            name: 'nameDir',
            message: 'Set name of new project: ',
            type: 'input',
          },
        ];
        inquirer.prompt(questions).then(async (a) => {
          const { nameDir, proto, runner } = a;
          const template = new CreateTemplate(nameDir, proto, runner as RUNNERS);
          const cloneRes = await template.cloneTemplate();
          if (cloneRes) {
            await template.createNewFiles();
          }
        });
      });
  }
}
