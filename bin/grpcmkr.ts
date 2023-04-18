#!/usr/bin/env node
import { program } from "commander";
import { CommandLoader } from "../commands/loader.command";
import chalk from 'chalk';

const bootstrap = async () => {
  const colorCodrr = chalk.hex('#C8FA5F')
  console.log(colorCodrr('GrpcMKR!'))
  program
    .version(
      `Version ${require("../package.json").version}`,
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
