import { Command } from "commander";
import { loadConfig } from "../config.js";
import { getVoiceLines } from "../lines/index.js";
import { speak } from "../voice/speak.js";
import { printBanner, printReaction } from "../ui/banner.js";
import { checkDadCriesMoment } from "../moments/dad-cries.js";

export const reactCommand = new Command("react")
  .description("React to an event (used by git hooks)")
  .option("--lines <number>", "Lines changed", "0")
  .option("--trigger <type>", "What triggered this", "commit")
  .action((opts) => {
    const linesChanged = parseInt(opts.lines, 10) || 0;
    const config = loadConfig();
    const voice = getVoiceLines(config.voice);

    printBanner(config.pro);

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
  });
