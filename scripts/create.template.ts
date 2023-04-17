import sh from "child_process";
import ora from "ora";
import { GrpcFileGenerate } from "../actions/grpc.generate.action";
import { GrpcCommand } from "../commands/grpc.command";
import * as path from "path";

export class CreateTemplate {
  public nameDir!: string;
  public namePathProto!: string;
  public execClone!: boolean;
  constructor(nameDir: string, proto: string) {
    this.nameDir = nameDir;
    this.namePathProto = proto;
  }
  public async cloneTemplate() {
    const spinner = ora({
      spinner: {
        interval: 120,
        frames: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"],
      },
      text: "Creating new project...",
    });

    const protoArr: string[] = this.namePathProto.split("/");
    const isProto = protoArr[protoArr.length - 1];
    if (!isProto.includes("proto")) {
      spinner.fail("This file doesn't proto");
      process.exit(1);
    }

    const command = `cd ${process.cwd()} && git clone https://github.com/rodrigoalejandrorios/grpc-service-template.git ${
      this.nameDir
    }`;
    spinner.start();
    const resolver: Promise<boolean> = new Promise((resolve, _reject) => {
      sh.exec(command, (error, stdout, stderr) => {
        if (error !== null) {
          spinner.fail(error.message);
          resolve(false);
        }
        setTimeout(() => {
          spinner.succeed("Project create!");
          resolve(true);
        }, 2000);
      });
    });
    return resolver;
  }

  public async deleteFilesProject(proto: string) {
    const spinner = ora({
      spinner: {
        interval: 120,
        frames: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"],
      },
      text: "Step 1: Customize project...",
    });
    spinner.start();
    const command = `cd ${process.cwd()}/${
      this.nameDir
    } && rm -rf src/interfaces/* && rm -rf src/proto/* && rm -rf src/hello.handler.ts && rm -rf src/service.register.ts`;
    const resolverDelete = new Promise((resolve, _reject) => {
      sh.exec(command, (error, stdout, stderr) => {
        if (error !== null) {
          spinner.fail(error.message);
          resolve(false);
        }
        setTimeout(() => {
          spinner.succeed("Customize step 1: Ok!");
          resolve(true);
        }, 1500);
      });
    });

    return resolverDelete;
  }

  public async createNewFiles() {
    const spinner = ora({
      spinner: {
        interval: 120,
        frames: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"],
      },
      text: "Step 2: Customize project...",
    });
    spinner.start();
    const deleteFiles = await this.deleteFilesProject(this.namePathProto);
    if (deleteFiles) {
      const execOk = await new GrpcFileGenerate(
        this.namePathProto,
        this.nameDir
      ).generate();

      if (execOk) {
        spinner.succeed("Customize step 2: Ok!");
        const spinnerFinish = ora({
          spinner: {
            interval: 120,
            frames: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"],
          },
          text: "Installing dependencies and configure project...",
        });
        spinnerFinish.start();
        new Promise((resolve, _reject) => {
          const command = `cd ${process.cwd()}/${
            this.nameDir
          } && npm install && npm run proto:build`;
          sh.exec(command, (error, stdout, stderr) => {
            if (error !== null) {
              spinnerFinish.fail(error.message);
              resolve(false);
            }
            setTimeout(() => {
              spinnerFinish.succeed("Work finish");
              spinnerFinish.info(`Run cd ${this.nameDir} and start work :)`);
              spinnerFinish.info(
                `Remember create .env file with environment variables`
              );
              resolve(true);
            }, 1500);
          });
        });
      }
    }
  }
}
