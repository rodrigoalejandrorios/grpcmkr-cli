import chalk from 'chalk';
import sh from 'child_process';
import ora from 'ora';
import { GrpcFileGenerate } from '../actions/grpc.generate.action';
import { RUNNERS } from '../constants/runners';
import { EMOJIS } from '../utils/ui';
import { validatorEmptyFile } from '../utils/validatorEmptyFile';

export class CreateTemplate {
  public nameDir!: string;
  public runner!: RUNNERS;
  public namePathProto!: string;
  public execClone!: boolean;
  constructor(nameDir: string, proto: string, runner: RUNNERS) {
    this.nameDir = nameDir;
    this.namePathProto = proto;
    this.runner = runner;
  }
  public async cloneTemplate() {
    const spinner = ora({
      spinner: {
        interval: 120,
        frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
      },
      text: 'Creating new project...',
    });

    const protoArr: string[] = this.namePathProto.split('/');
    const isProto = protoArr[protoArr.length - 1];
    if (!isProto.includes('proto')) {
      spinner.fail(
        chalk.red(
          `The file doesn't have the ".proto" extension or is a directory ${EMOJIS.CRYING}`,
        ),
      );
      process.exit(1);
    }

    if (!validatorEmptyFile(this.namePathProto)) {
      spinner.fail(
        chalk.red(
          `The file is empty${EMOJIS.CRYING}`,
        ),
      );
      process.exit(1);
    }

    const command = `cd ${process.cwd()} && git clone https://github.com/rodrigoalejandrorios/grpc-service-template.git ${
      this.nameDir
    } && cd ${this.nameDir} && git remote remove origin`;
    spinner.start();
    const resolver: Promise<boolean> = new Promise((resolve, _reject) => {
      sh.exec(command, (error, stdout, stderr) => {
        if (error !== null) {
          spinner.fail(error.message);
          resolve(false);
        }
        setTimeout(() => {
          spinner.succeed(`Project create! ${EMOJIS.SUNGLASSES}`);
          resolve(true);
        }, 2000);
      });
    });
    return resolver;
  }

  public async deleteFilesProject() {
    const spinner = ora({
      spinner: {
        interval: 120,
        frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
      },
      text: 'Step 1: Templetizing project...',
    });
    spinner.start();
    const command = `cd ${process.cwd()}/${
      this.nameDir
    } && rm -rf src/interfaces/* && rm -rf src/proto/* && rm -rf src/hello.handler.ts && rm -rf src/service.register.ts && rm -rf package-lock.json`;
    const resolverDelete = new Promise((resolve, _reject) => {
      sh.exec(command, (error, stdout, stderr) => {
        if (error !== null) {
          spinner.fail(error.message);
          resolve(false);
        }
        setTimeout(() => {
          spinner.succeed(`Templetize: Ok! ${EMOJIS.SUNGLASSES}`);
          resolve(true);
        }, 1500);
      });
    });

    return resolverDelete;
  }

  public async createNewFiles() {
    const deleteFiles = await this.deleteFilesProject();
    if (deleteFiles) {
      const spinner = ora({
        spinner: {
          interval: 120,
          frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
        },
        text: 'Step 2: Customize project...',
      });
      spinner.start();
      const execOk = await new GrpcFileGenerate(
        this.namePathProto,
        this.nameDir,
      ).generate();

      setTimeout(() => {
        if (execOk) {
          spinner.succeed(`Customize: Ok! ${EMOJIS.SUNGLASSES}`);
          const spinnerFinish = ora({
            spinner: {
              interval: 120,
              frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
            },
            text: `${EMOJIS.DRUMS} Installing dependencies and configuring project...`,
          });
          spinnerFinish.start();
          new Promise((resolve, _reject) => {
            switch (this.runner) {
              case RUNNERS.NPM:
                const commandNpm = `cd ${process.cwd()}/${
                  this.nameDir
                } && npm install && npm run proto:build`;
                sh.exec(commandNpm, (error, stdout, stderr) => {
                  if (error !== null) {
                    spinnerFinish.fail(error.message);
                    resolve(false);
                  }
                  setTimeout(() => {
                    spinnerFinish.succeed(`${EMOJIS.ROCKET}Completed work!`);
                    spinnerFinish.info(
                      `Run cd "${this.nameDir}" and start work ${EMOJIS.BEER}`,
                    );
                    spinnerFinish.info(
                      `Remember to create an ".env" file to define your environment variables`,
                    );
                    resolve(true);
                  }, 1500);
                });
                break;
              case RUNNERS.YARN:
                const commandYarn = `cd ${process.cwd()}/${
                  this.nameDir
                } && touch yarn.lock && yarn install && yarn run proto:build`;
                sh.exec(commandYarn, (error, stdout, stderr) => {
                  if (error !== null) {
                    spinnerFinish.fail(error.message);
                    resolve(false);
                  }
                  setTimeout(() => {
                    spinnerFinish.succeed(`${EMOJIS.ROCKET}Completed work!`);
                    spinnerFinish.info(
                      `Run cd "${this.nameDir}" and start work ${EMOJIS.BEER}`,
                    );
                    spinnerFinish.info(
                      `Remember to create an ".env" file to define your environment variables`,
                    );
                    resolve(true);
                  }, 1500);
                });
                break;
              default:
                const commandDef = `cd ${process.cwd()}/${
                  this.nameDir
                } && npm install && npm run proto:build`;
                sh.exec(commandDef, (error, stdout, stderr) => {
                  if (error !== null) {
                    spinnerFinish.fail(error.message);
                    resolve(false);
                  }
                  setTimeout(() => {
                    spinnerFinish.succeed(`${EMOJIS.ROCKET}Completed work!`);
                    spinnerFinish.info(
                      `Run cd "${this.nameDir}" and start work ${EMOJIS.BEER}`,
                    );
                    spinnerFinish.info(
                      `Remember to create an ".env" file to define your environment variables`,
                    );
                    resolve(true);
                  }, 1500);
                });
                break;
            }
          });
        }
      }, 1500);
    }
  }
}
