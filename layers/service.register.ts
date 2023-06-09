export const serviceRegisterLayer = `
import { DefinePackageProps, InyectServiceProps } from "./libs/service.register.util";
import { ProtoGrpcType } from './interfaces/&*&packageFileNameNoProto&*&';
&*&importHanlders&*&

export const definePackage: DefinePackageProps<ProtoGrpcType>  = {
    protoFileName: '&*&packageFileName&*&',
    namePackage: '&*&namePackage&*&'
}

export const InyectServiceGrpc: InyectServiceProps[] = [
    &*&servicesInyect&*&
];
`