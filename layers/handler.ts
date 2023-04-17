export const handlerLayer = `
&*&importHandler&*&
import * as grpc from "@grpc/grpc-js";
import {
  UntypedHandleCall,
  ServerUnaryCall,
  sendUnaryData,
} from "@grpc/grpc-js";
&*&importsInterfaceServices&*&


export class &*&nameClass&*& implements &*&hanlder&*& {
      [name: string]: UntypedHandleCall;
  &*&functionsClass&*&
}
`