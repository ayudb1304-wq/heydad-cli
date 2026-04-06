import { Command } from "commander";
import { getRandomDadLine } from "../lines/dad.js";
import { getRandomHypeLine } from "../lines/hype.js";
import { speak } from "../voice/speak.js";
import { printBanner, printReaction } from "../ui/banner.js";

function getCommitReaction(linesChanged: number): { line: string; mood: "dad" | "hype" } {
  if (linesChanged === 0) {
    return { line: getRandomDadLine(), mood: "dad" };
  }
  if (linesChanged < 10) {
    return { line: "Nice. Keep it up.", mood: "hype" };
  }
  if (linesChanged < 50) {
    return { line: getRandomHypeLine(), mood: "hype" };
  }
  if (linesChanged < 200) {
    return { line: "LETS GOOOOO! " + getRandomHypeLine(), mood: "hype" };
  }
  return { line: "ABSOLUTE LEGEND. I'M SO PROUD OF YOU.", mood: "hype" };
}

export const reactCommand = new Command("react")
  .description("React to an event (used by git hooks)")
  .option("--lines <number>", "Lines changed", "0")
  .option("--trigger <type>", "What triggered this", "commit")
  .action((opts) => {
    const linesChanged = parseInt(opts.lines, 10) || 0;

    printBanner();

    const { line, mood } = getCommitReaction(linesChanged);
    printReaction(line, mood);
    if (linesChanged > 0) {
      console.log(`  (${linesChanged} lines changed)\n`);
    }
    speak(line, mood);
  });
