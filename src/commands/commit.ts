import { Command } from "commander";
import { getStagedLinesChanged, gitCommit, hasStagedChanges } from "../utils/git.js";
import { loadConfig } from "../config.js";
import { getVoiceLines } from "../lines/index.js";
import { speak } from "../voice/speak.js";
import { printBanner, printReaction } from "../ui/banner.js";
import { checkFirstRun, checkBigCommitPromo } from "../moments/upsells.js";

export const commitCommand = new Command("commit")
  .description("Commit your code. Dad has opinions.")
  .requiredOption("-m, --message <message>", "Commit message")
  .action((opts) => {
    printBanner();
    checkFirstRun();

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
      const { text: line, index } = voice.getRandomDadLine(config.pro);
      printReaction(line, "dad");
      speak(line, "dad", index);
      process.exit(1);
    }

    let line: string;
    let mood: "dad" | "hype";
    let lineIndex: number | undefined;

    if (linesChanged === 0) {
      const pick = voice.getRandomDadLine(config.pro);
      line = pick.text;
      mood = "dad";
      lineIndex = pick.index;
    } else if (linesChanged < 10) {
      line = "Nice. Keep it up.";
      mood = "hype";
    } else if (linesChanged < 50) {
      const pick = voice.getRandomHypeLine(config.pro);
      line = pick.text;
      mood = "hype";
      lineIndex = pick.index;
    } else if (linesChanged < 200) {
      const pick = voice.getRandomHypeLine(config.pro);
      line = "LETS GOOOOO! " + pick.text;
      mood = "hype";
      lineIndex = pick.index;
    } else {
      line = "ABSOLUTE LEGEND. I'M SO PROUD OF YOU.";
      mood = "hype";
    }

    printReaction(line, mood);
    if (linesChanged > 0) {
      console.log(`  (${linesChanged} lines changed)\n`);
    }
    speak(line, mood, lineIndex);

    checkBigCommitPromo(linesChanged);
  });
