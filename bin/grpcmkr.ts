#!/usr/bin/env node
import { program } from "commander";
import { CommandLoader } from "../commands/loader.command";

const bootstrap = async () => {
  console.log('Desde webpack2')
  program
    .version(
      require("../package.json").version,
      "-v, --version",
      "Output the current version."
    )
    .usage("<command>")
    .helpOption("-h, --help", "Output usage information.");

  await CommandLoader.load(program);
  program.parseAsync(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
