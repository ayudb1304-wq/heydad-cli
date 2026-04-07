import { Command } from "commander";
import { getStagedLinesChanged, gitCommit, hasStagedChanges } from "../utils/git.js";
import { loadConfig } from "../config.js";
import { getVoiceLines } from "../lines/index.js";
import { speak } from "../voice/speak.js";
import { printBanner, printReaction } from "../ui/banner.js";
import { checkFirstRun, checkBigCommitPromo } from "../moments/upsells.js";
import { checkDadCriesMoment } from "../moments/dad-cries.js";

export const commitCommand = new Command("commit")
  .description("Commit your code. Dad has opinions.")
  .requiredOption("-m, --message <message>", "Commit message")
  .action((opts) => {
    printBanner(loadConfig().pro);
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
    } else {
      const pick = voice.getRandomHypeLine(config.pro);
      line = pick.text;
      mood = "hype";
      lineIndex = pick.index;
    }

    printReaction(line, mood);
    if (linesChanged > 0) {
      console.log(`  (${linesChanged} lines changed)\n`);
    }

    const dadCried = checkDadCriesMoment(linesChanged, config.pro);
    if (!dadCried) {
      speak(line, mood, lineIndex);
    }
    checkBigCommitPromo(linesChanged);
  });
