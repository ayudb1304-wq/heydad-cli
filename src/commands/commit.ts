import { Command } from "commander";
import { getStagedLinesChanged, gitCommit, hasStagedChanges } from "../utils/git.js";
import { loadConfig } from "../config.js";
import { getVoiceLines } from "../lines/index.js";
import { speak } from "../voice/speak.js";
import { printBanner, printReaction } from "../ui/banner.js";

export const commitCommand = new Command("commit")
  .description("Commit your code. Dad has opinions.")
  .requiredOption("-m, --message <message>", "Commit message")
  .action((opts) => {
    printBanner();

    if (!hasStagedChanges()) {
      console.log("  No staged changes. Stage some files first (git add).\n");
      process.exit(1);
    }

    const linesChanged = getStagedLinesChanged();
    const config = loadConfig();
    const voice = getVoiceLines(config.voice);

    try {
      gitCommit(opts.message);
    } catch {
      const line = voice.getRandomDadLine();
      printReaction(line, "dad");
      speak(line, "dad");
      process.exit(1);
    }

    let line: string;
    let mood: "dad" | "hype";

    if (linesChanged === 0) {
      line = voice.getRandomDadLine();
      mood = "dad";
    } else if (linesChanged < 10) {
      line = "Nice. Keep it up.";
      mood = "hype";
    } else if (linesChanged < 50) {
      line = voice.getRandomHypeLine();
      mood = "hype";
    } else if (linesChanged < 200) {
      line = "LETS GOOOOO! " + voice.getRandomHypeLine();
      mood = "hype";
    } else {
      line = "ABSOLUTE LEGEND. I'M SO PROUD OF YOU.";
      mood = "hype";
    }

    printReaction(line, mood);
    if (linesChanged > 0) {
      console.log(`  (${linesChanged} lines changed)\n`);
    }
    speak(line, mood);
  });
