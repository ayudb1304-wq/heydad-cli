import { Command } from "commander";
import { spawn } from "node:child_process";
import { detectTestRunner } from "../utils/detect.js";
import { getRandomDadLine } from "../lines/dad.js";
import { getRandomHypeLine } from "../lines/hype.js";
import { speak } from "../voice/speak.js";

function colorize(text: string, color: "red" | "green"): string {
  const codes = { red: "\x1b[31m", green: "\x1b[32m" };
  return `${codes[color]}${text}\x1b[0m`;
}

export const testCommand = new Command("test")
  .description("Run your tests. Dad is watching.")
  .option("--cmd <command>", "Custom test command")
  .action(async (opts) => {
    let command: string;

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
      console.log(`Detected ${detected.label} project`);
    }

    console.log(`\nRunning: ${command}\n`);

    const child = spawn(command, {
      stdio: "inherit",
      shell: true,
      cwd: process.cwd(),
    });

    child.on("close", (code) => {
      console.log(); // blank line after test output

      if (code === 0) {
        const line = getRandomHypeLine();
        console.log(colorize(`  ${line}`, "green"));
        speak(line, "hype");
      } else {
        const line = getRandomDadLine();
        console.log(colorize(`  ${line}`, "red"));
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
