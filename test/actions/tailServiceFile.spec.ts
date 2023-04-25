import path from 'path';
import { GrpcDefinition } from '../../interfaces/grpc.action.interface';
import { FileGrpcReader } from '../../actions/grpc.reader.action';

describe('Use last position service in proto file', () => {
  let mock: GrpcDefinition;
  let filePath: string;

  beforeAll(() => {
    filePath = path.join(process.cwd(), 'test/mocks/tail-service.proto');
    mock = {
      namePackage: 'mailer',
      packageFileName: 'tail-service.proto',
      services: [
        {
          nameService: 'MailerService',
          nameHandlerFile: 'mailerService.handler.ts',
          nameHandlerImport: 'mailerService.handler',
          nameClass: 'HandlerClassMailerService',
          nameHandlerExtends: 'MailerServiceHandlers',
          rpc: [
            {
              input: 'ValidateAccountParams',
              output: 'Results',
              nameRpc: 'ValidateAccount',
            },
            {
              input: 'ResetPasswordParams',
              output: 'Results',
              nameRpc: 'ResetPassword',
            },
          ],
        },
      ],
    };
  });

  describe('FileGrpcReader | Verify use tail position service', () => {
      it('FileGrpcReader.grpcFileMapper use', () => {
        const grpcReader: FileGrpcReader = new FileGrpcReader(filePath);
      const tobe = grpcReader.grpcFileMapper();
      expect(mock).toStrictEqual(tobe);
    });
  });
});
