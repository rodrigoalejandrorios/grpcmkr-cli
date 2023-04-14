#!/usr/bin/env node
import { program } from "commander";
import figlet from "figlet";
import { CommandLoader } from "../commands/loader.command";
import path from "path";

const bootstrap = async () => {
  program.version(
    require(path.join(process.cwd(), "./package.json")).version,
    "-v, --version",
    "Version of program"
  );
  console.log(figlet.textSync("grpcmkr"));
  
  await CommandLoader.load(program);
  program.parseAsync(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
