#!/usr/bin/env node
const program = require("commander");
const { name, version } = require("../package.json");
const { init } = require("../lib/action");

program
  .name(name)
  .version(version, "-v, -V, --version", "output the current version");

program
  .command("init <project_name> [language]")
  .description("Generate a new project from a language")
  .action(init);

program.on("command:*", (operands) => {
  console.error(`error: unknown command ${operands[0]}`);
})

program.parse(process.argv);