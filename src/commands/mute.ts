import { Command } from "commander";
import { loadConfig, saveConfig } from "../config.js";

export const muteCommand = new Command("mute")
  .description("Mute dad. He'll still text you, but silently.")
  .action(() => {
    const config = loadConfig();
    config.muted = true;
    saveConfig(config);
    console.log("\n  Dad has been muted. He's not angry. He's just disappointed.\n");
  });

export const unmuteCommand = new Command("unmute")
  .description("Unmute dad. You missed his voice, admit it.")
  .action(() => {
    const config = loadConfig();
    config.muted = false;
    saveConfig(config);
    console.log("\n  Dad is back. Did you really think you could get rid of me?\n");
  });
