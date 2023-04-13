import { FileGrpcReader } from "./grpc.reader.action";
import * as fs from "fs";
import path from "path";
import { RpcDelcare } from "../interfaces/grpc.action.interface";

enum PATH_MANAGER {
  FOLDER_SAVE = "test-file",
  REGISTER_FILE_NAME = "service.register.ts",
}

export class GrpcFileGenerate extends FileGrpcReader {
  constructor(pathFile: string) {
    super(pathFile);
    this.handlersGenerate();
  }

  serviceRegisterGenerate() {
    const dataGrpcReader = this.grpcFileMapper();
    //console.log(JSON.stringify(dataGrpcReader))
    const reader = fs
      .readFileSync(path.join(process.cwd(), "layers/service.register.txt"))
      .toString();
    let textToModificate = reader;

    textToModificate = this.replacement(
      textToModificate,
      "&*&namePackage&*&",
      dataGrpcReader.namePackage,
      true
    );

    textToModificate = this.replacement(
      textToModificate,
      "&*&packageFileName&*&",
      dataGrpcReader.packageFileName
    );

    textToModificate = this.replacement(
      textToModificate,
      "&*&importHanlders&*&",
      dataGrpcReader.services
        .map((x) => `import { ${x.nameClass} } from './${x.nameHandlerFile}';`)
        .join("\n")
    );

    textToModificate = this.replacement(
      textToModificate,
      "&*&servicesInyect&*&",
      dataGrpcReader.services
        .map(
          (x) => `
        {
          handler: ${x.nameClass},
          nameService: '${x.nameService}'
        },`
        )
        .join("")
    );

    // fs.writeFileSync(
    //   path.join(
    //     process.cwd(),
    //     `${PATH_MANAGER.FOLDER_SAVE}/${PATH_MANAGER.REGISTER_FILE_NAME}`
    //   ),
    //   textToModificate
    // );
  }

  handlersGenerate() {
    const dataGrpcReader = this.grpcFileMapper();
    const reader = fs
      .readFileSync(path.join(process.cwd(), "layers/handler.txt"))
      .toString();
    const services = dataGrpcReader.services;

    for (let i = 0; i < services.length; i++) {
      let textToModificate = reader;
      let importsInit: string[] = [];
      let createFunctions: string[] = [];
      for (let g = 0; g < services[i].rpc.length; g++) {
        const keysRepeat = Object.keys(services[i].rpc[g]);

        const collectImports = keysRepeat
          .filter((f) => f !== "nameRpc")
          .map(
            (key) =>
              `import { ${
                services[i].rpc[g][key as keyof RpcDelcare]
              } } from "./interfaces/${dataGrpcReader.namePackage}/${
                services[i].rpc[g][key as keyof RpcDelcare]
              }";`
          );

        importsInit.push(...collectImports);
        createFunctions.push(`
      ${services[i].rpc[g].nameRpc}(
        call: ServerUnaryCall<${services[i].rpc[g].input}, ${services[i].rpc[g].output}>,
        callback: sendUnaryData<${services[i].rpc[g].output}>
      ) {
        //Code here
      }
`);
      }
      const imports = [...new Set(importsInit)];
      textToModificate = this.replacement(
        textToModificate,
        "&*&importsInterfaceServices&*&",
        imports.join("\n")
      );
      textToModificate = this.replacement(
        textToModificate,
        "&*&nameClass&*&",
        services[i].nameClass
      );

      textToModificate = this.replacement(
        textToModificate,
        "&*&importHandler&*&",
        `import { ${services[i].nameHandlerExtends} } from "./interfaces/mailer/${services[i].nameService}";`
      );
      textToModificate = this.replacement(
        textToModificate,
        "&*&hanlder&*&",
        services[i].nameHandlerExtends
      );
      textToModificate = this.replacement(
        textToModificate,
        "&*&functionsClass&*&",
        createFunctions.join("")
      );
      fs.writeFileSync(
        path.join(
          process.cwd(),
          `${PATH_MANAGER.FOLDER_SAVE}/${services[i].nameHandlerFile}`
        ),
        textToModificate
      );
    }
  }

  private replacement(
    dataString: string,
    oldParam:
      | "&*&importHanlders&*&"
      | "&*&packageFileName&*&"
      | "&*&namePackage&*&"
      | "&*&servicesInyect&*&"
      | "&*&functionsClass&*&"
      | "&*&importsInterfaceServices&*&"
      | "&*&nameClass&*&"
      | "&*&importHandler&*&"
      | "&*&hanlder&*&",
    newParam: string,
    replaceAll: boolean = false
  ) {
    return replaceAll
      ? dataString.replaceAll(oldParam, newParam)
      : dataString.replace(oldParam, newParam);
  }
}

new GrpcFileGenerate("example/mailer.proto");
