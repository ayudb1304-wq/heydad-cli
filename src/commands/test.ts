import { Command } from "commander";
import { spawn } from "node:child_process";
import { detectTestRunner } from "../utils/detect.js";
import { loadConfig } from "../config.js";
import { getVoiceLines } from "../lines/index.js";
import { speak } from "../voice/speak.js";
import { printBanner, printReaction } from "../ui/banner.js";

export const testCommand = new Command("test")
  .description("Run your tests. Dad is watching.")
  .option("--cmd <command>", "Custom test command")
  .action(async (opts) => {
    let command: string;

    printBanner();

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
        const line = voice.getRandomHypeLine();
        printReaction(line, "hype");
        speak(line, "hype");
      } else {
        const line = voice.getRandomDadLine();
        printReaction(line, "dad");
        speak(line, "dad");
      }

      process.exit(code ?? 1);
    });

    child.on("error", (err) => {
      console.error(`Failed to run: ${command}`);
      console.error(err.message);
      process.exit(1);
    });
  });
