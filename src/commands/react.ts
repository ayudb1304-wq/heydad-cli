import { Command } from "commander";
import { loadConfig } from "../config.js";
import { getVoiceLines } from "../lines/index.js";
import { speak } from "../voice/speak.js";
import { printBanner, printReaction } from "../ui/banner.js";

export const reactCommand = new Command("react")
  .description("React to an event (used by git hooks)")
  .option("--lines <number>", "Lines changed", "0")
  .option("--trigger <type>", "What triggered this", "commit")
  .action((opts) => {
    const linesChanged = parseInt(opts.lines, 10) || 0;
    const config = loadConfig();
    const voice = getVoiceLines(config.voice);

    printBanner();

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
