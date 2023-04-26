import path from 'path';
import { GrpcDefinition } from '../../interfaces/grpc.action.interface';
import { FileGrpcReader } from '../../actions/grpc.reader.action';

describe('File system testing', () => {
  let mock: GrpcDefinition;
  let filePath: string;

  beforeAll(() => {
    filePath = path.join(process.cwd(), 'test/mocks/example.proto');
    mock = {
      namePackage: 'events',
      packageFileName: 'example.proto',
      services: [
        {
          nameService: 'EventsService',
          nameHandlerFile: 'eventsService.handler.ts',
          nameHandlerImport: 'eventsService.handler',
          nameClass: 'HandlerClassEventsService',
          nameHandlerExtends: 'EventsServiceHandlers',
          rpc: [
            {
              input: 'CreateEventBody',
              output: 'CreateEventResponse',
              nameRpc: 'CreateEvent',
            },
            {
              input: 'EventSearch',
              output: 'Event',
              nameRpc: 'GetEventById',
            },
            {
              input: 'AutoInviteBody',
              output: 'Event',
              nameRpc: 'AutoInvite',
            },
            {
              input: 'EventId',
              output: 'Void',
              nameRpc: 'DeleteEvent',
            },
          ],
        },
      ],
    };
  });

  describe('Reader file', () => {
    it('FileGrpcReader.grpcFileMapper use', () => {
      const grpcReader: FileGrpcReader = new FileGrpcReader(filePath);
      const tobe = grpcReader.grpcFileMapper();
      expect(mock).toStrictEqual(tobe);
    });
  });
});
