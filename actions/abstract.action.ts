import path from 'path';
import * as fs from 'fs';

export abstract class AbstractAction {
  constructor(private createPath: string) {
    this.createStringByFile = this.readGrpcFile();
  }
  public createStringByFile!: {
    fileContent: string;
    fileName: string;
  };
  readGrpcFile() {
    const reader = fs.readFileSync(this.createPath).toString();
    return {
      fileContent: reader,
      fileName: path.basename(this.createPath),
    };
  }
}
