#!/usr/bin/env node
import { program } from "commander";
import figlet from "figlet";

const bootstrap = async () => {
  console.log(figlet.textSync("grpcmkr"));
  program.version(
    require("../package.json").version,
    "-v, --version",
    "Version of program"
  );
  program.parseAsync(process.argv);
};

bootstrap();
