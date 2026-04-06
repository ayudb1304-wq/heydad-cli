import { program } from "commander";
import { testCommand } from "./commands/test.js";
import { commitCommand } from "./commands/commit.js";
import { setSilent } from "./voice/speak.js";

const version = "0.1.0";

program
  .name("dad")
  .description("Your terminal has feelings now")
  .version(version)
  .option("--silent", "Suppress voice output")
  .hook("preAction", (thisCommand) => {
    const opts = thisCommand.opts();
    if (opts.silent) {
      setSilent(true);
    }
  });

program.addCommand(testCommand);
program.addCommand(commitCommand);

program.parse();
