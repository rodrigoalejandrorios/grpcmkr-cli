import * as fs from "fs";
import path from "path";

class FileReader {
  constructor(private readonly path: string) {
    this.read();
  }
  read() {
    const en = fs.readFileSync(path.join(process.cwd(), this.path)).toString();
    console.log(
      en.split("rpc ").join("")
    );
  }
}

new FileReader("src/example/mailer.proto");
