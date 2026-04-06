const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

const BANNER = `
${YELLOW}${BOLD}  __                        __              __
 / /_   ___   __  __   ____/ /  ____ _  ___/ /
/ __ \\ / _ \\ / / / /  / __  /  / __ \`/ / __  /
/ / / //  __// /_/ /  / /_/ /  / /_/ / / /_/ /
/_/ /_/ \\___/ \\__, /   \\__,_/   \\__,_/  \\__,_/
             /____/${RESET}
`;

const TAGLINES = [
  "your terminal has feelings now",
  "finally, someone who cares about your exit codes",
  "emotional damage as a service",
  "the mass-validation you never got",
  "now with 100% more Irish guilt",
  "making developers cry since 2026",
  "you could have been a doctor",
  "at least the tests are honest with you",
  "guilt-driven development",
  "i'm not angry, i'm just rendering",
];

function getRandomTagline(): string {
  return TAGLINES[Math.floor(Math.random() * TAGLINES.length)];
}

export function printBanner(): void {
  console.log(BANNER);
  console.log(`${DIM}  ${getRandomTagline()}${RESET}`);
  console.log();
}

export function printReaction(text: string, mood: "dad" | "hype"): void {
  const color = mood === "hype" ? GREEN : RED;
  const border = mood === "hype" ? "+" : "-";
  const line = border.repeat(Math.min(text.length + 4, 70));

  console.log();
  console.log(`${color}  ${line}`);
  console.log(`  ${border} ${BOLD}${text}${RESET}${color} ${border}`);
  console.log(`  ${line}${RESET}`);
  console.log();
}
