export interface RpcDelcare {
  nameRpc: string;
  input: string;
  output: string;
}
export interface GrpcServiceDefinitions {
  nameService: string;
  nameHandlerFile: string;
  nameHandlerImport: string;
  nameClass: string;
  nameHandlerExtends: string;
  rpc: RpcDelcare[];
}

export interface GrpcDefinition {
  namePackage: string;
  packageFileName: string;
  services: GrpcServiceDefinitions[];
}
