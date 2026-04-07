import { program } from "commander";
import { testCommand } from "./commands/test.js";
import { commitCommand } from "./commands/commit.js";
import { muteCommand, unmuteCommand } from "./commands/mute.js";
import { initCommand } from "./commands/init.js";
import { reactCommand } from "./commands/react.js";
import { activateCommand, deactivateCommand } from "./commands/activate.js";
import { proCommand } from "./commands/pro.js";
import { voiceCommand } from "./commands/voice.js";
import { setSilent } from "./voice/speak.js";

const version = "0.3.1";

program
  .name("heydad")
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
program.addCommand(muteCommand);
program.addCommand(unmuteCommand);
program.addCommand(initCommand);
program.addCommand(reactCommand);
program.addCommand(activateCommand);
program.addCommand(deactivateCommand);
program.addCommand(proCommand);
program.addCommand(voiceCommand);

program.parse();
