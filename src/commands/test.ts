import { Command } from "commander";
import { spawn } from "node:child_process";
import { detectTestRunner } from "../utils/detect.js";
import { loadConfig, saveConfig } from "../config.js";
import { getVoiceLines } from "../lines/index.js";
import { speak } from "../voice/speak.js";
import { printBanner, printReaction } from "../ui/banner.js";
import { checkGrandmaMoment } from "../moments/grandma.js";
import { checkFirstRun, checkStreakPromo } from "../moments/upsells.js";

export const testCommand = new Command("test")
  .description("Run your tests. Dad is watching.")
  .option("--cmd <command>", "Custom test command")
  .action(async (opts) => {
    let command: string;

    printBanner(loadConfig().pro);
    const isFirstRun = checkFirstRun();

    if (opts.cmd) {
      command = opts.cmd;
    } else {
      const detected = detectTestRunner();
      if (!detected) {
        console.error(
          "Couldn't figure out your test command. Use: heydad test --cmd \"your command\""
        );
        process.exit(1);
      }
      command = detected.command;
      console.log(`  Detected ${detected.label} project`);
    }

    console.log(`  Running: ${command}\n`);

    const child = spawn(command, {
      stdio: "inherit",
      shell: true,
      cwd: process.cwd(),
    });

    child.on("close", (code) => {
      const config = loadConfig();
      const voice = getVoiceLines(config.voice);

      if (code === 0) {
        config.streak = (config.streak || 0) + 1;
        saveConfig(config);

        const { text: line, index } = voice.getRandomHypeLine(config.pro);
        printReaction(line, "hype");

        const momentPlayed = isFirstRun || checkGrandmaMoment(config.streak, config.pro);
        if (!momentPlayed) {
          speak(line, "hype", index);
        }
        checkStreakPromo(config.streak);
      } else {
        config.streak = 0;
        saveConfig(config);

        const { text: line, index } = voice.getRandomDadLine(config.pro);
        printReaction(line, "dad");
        if (!isFirstRun) {
          speak(line, "dad", index);
        }
      }

      process.exit(code ?? 1);
    });

    child.on("error", (err) => {
      console.error(`Failed to run: ${command}`);
      console.error(err.message);
      process.exit(1);
    });
  });
