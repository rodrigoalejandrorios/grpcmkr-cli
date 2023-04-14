import sh from "child_process";
import ora from "ora";

export class CreateTemplate {
  public nameDir!: string;
  public execClone!: boolean;
  constructor(nameDir: string) {
    this.nameDir = nameDir;
  }
  public async cloneTemplate() {
    const spinner = ora({
      spinner: {
        interval: 120,
        frames: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"],
      },
      text: "Creating new project...",
    });

    const command = `cd ${process.cwd()} && git clone https://github.com/rodrigoalejandrorios/grpc-service-template.git ${
      this.nameDir
    }`;
    spinner.start();
    const resolver: Promise<boolean> = new Promise((resolve, _reject) => {
      sh.exec(command, (error, stdout, stderr) => {
        if (error !== null) {
          console.log(spinner.fail(error.message));
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

  public customizationProject() {
    const spinner = ora({
      spinner: {
        interval: 120,
        frames: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"],
      },
      text: "Customize project...",
    });
    spinner.start();
    const command = `cd ${process.cwd()}/${
      this.nameDir
    } && rm -rf src/interfaces && rm -rf src/proto && rm -rf src/hello.handler.ts && rm -rf src/service.register.ts`;
    const resolverDelete = new Promise((resolve, _reject) => {
      sh.exec(command, (error, stdout, stderr) => {
        if (error !== null) {
          console.log(spinner.fail(error.message));
          resolve(false);
        }
        setTimeout(() => {
          spinner.succeed("Project cutomize!");
          resolve(true);
        }, 2000);
      });
    });

    const commandCopy = `cd ${process.cwd()}/${
        this.nameDir
      } && mkdir src/proto`;
    const resolver = new Promise((resolve, _reject) => {
        sh.exec(command, (error, stdout, stderr) => {
          if (error !== null) {
            console.log(spinner.fail(error.message));
            resolve(false);
          }
          setTimeout(() => {
            spinner.succeed("Project cutomize!");
            resolve(true);
          }, 2000);
        });
      });
    return resolver;
  }
}
