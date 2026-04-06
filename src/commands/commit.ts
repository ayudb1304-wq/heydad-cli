import { Command } from "commander";
import { getStagedLinesChanged, gitCommit, hasStagedChanges } from "../utils/git.js";
import { getRandomDadLine } from "../lines/dad.js";
import { getRandomHypeLine } from "../lines/hype.js";
import { speak } from "../voice/speak.js";

function getReaction(linesChanged: number): { line: string; mood: "dad" | "hype" } {
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

function colorize(text: string, color: "red" | "green"): string {
  const codes = { red: "\x1b[31m", green: "\x1b[32m" };
  return `${codes[color]}${text}\x1b[0m`;
}

export const commitCommand = new Command("commit")
  .description("Commit your code. Dad has opinions.")
  .requiredOption("-m, --message <message>", "Commit message")
  .action((opts) => {
    if (!hasStagedChanges()) {
      console.log("No staged changes. Stage some files first (git add).");
      process.exit(1);
    }

    const linesChanged = getStagedLinesChanged();

    try {
      gitCommit(opts.message);
    } catch {
      const line = getRandomDadLine();
      console.log(colorize(`\n  ${line}`, "red"));
      speak(line, "dad");
      process.exit(1);
    }

    const { line, mood } = getReaction(linesChanged);
    const color = mood === "hype" ? "green" : "red";
    console.log(colorize(`\n  ${line}`, color));
    if (linesChanged > 0) {
      console.log(`  (${linesChanged} lines changed)`);
    }
    speak(line, mood);
  });
