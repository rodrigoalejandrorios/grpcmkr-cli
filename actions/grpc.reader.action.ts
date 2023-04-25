import {
  GrpcDefinition,
  GrpcServiceDefinitions,
  RpcDelcare,
} from '../interfaces/grpc.action.interface';
import { AbstractAction } from './abstract.action';
import { toCamelCase } from '../utils/text-case.utils';

export class FileGrpcReader extends AbstractAction {
  constructor(pathStr: string) {
    super(pathStr);
    //this.grpcFileMapper();
  }
  public grpcFileMapper(): GrpcDefinition {
    const en = this.createStringByFile.fileContent;
    const separation = en
      .split('\n')
      .map((c) => c.trim())
      .join('-')
      .split('--');
    const namePackage = separation
      .filter((x) => x.includes('package'))[0]
      .split(' ')[1]
      .replace(';', '');
    const initServices = separation.filter((s) => s.includes('service'));

    const definitionServices: GrpcServiceDefinitions[] = [];
    initServices.map((init) => {
      let nameService = init.split(' {-')[0].replace('service ', '');
      nameService = nameService.replace('-','')
      const rpcsDef = init
        .split('-rpc')
        .filter((x) => !x.includes('service'))
        .map((x) => x.replace('-}', ''))
        .map((x) => x.trim())
        .map(
          (c) =>
            ({
              nameRpc: c.split(' (')[0],
              input: c.split(' (')[1].split(') ')[0],
              output: c.split(' (')[2].split(') ')[0],
            } as RpcDelcare),
        );
      definitionServices.push({
        nameService,
        nameHandlerFile: `${toCamelCase(nameService)}.handler.ts`,
        nameHandlerImport: `${toCamelCase(nameService)}.handler`,
        nameClass: `HandlerClass${nameService}`,
        nameHandlerExtends: `${nameService}Handlers`,
        rpc: rpcsDef,
      });
    });
    const definitions: GrpcDefinition = {
      namePackage,
      packageFileName: this.createStringByFile.fileName,
      services: definitionServices,
    };
    return definitions;
  }
}
