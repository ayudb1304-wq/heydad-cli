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

const UPSELL_LINES = [
  "you're missing Optimus Prime roasting your code. just saying.",
  "pro users get dad calling grandma at 10 streaks. you're not ready.",
  "20 lines of Irish guilt, not 10. your shame deserves variety.",
  "Optimus Prime voice pack. because your failures deserve a Transformer.",
  "dad has 10 more things to say to you. unlock his full disappointment.",
  "pro users hear dad open the good whiskey. you get the cheap stuff.",
  "grandma wants to hear about your test results. she's waiting.",
  "you're only getting half the guilt. dad is holding back. for now.",
  "Optimus Prime, grandma calls, 10 extra roasts. less than your coffee.",
  "dad's got 10 lines he's saving for pro users. they're devastating.",
];

function getRandomTagline(): string {
  return TAGLINES[Math.floor(Math.random() * TAGLINES.length)];
}

function getRandomUpsell(): string {
  return UPSELL_LINES[Math.floor(Math.random() * UPSELL_LINES.length)];
}

export function printBanner(isPro: boolean = false): void {
  console.log(BANNER);
  if (isPro) {
    console.log(`${DIM}  ${getRandomTagline()}${RESET}  ${GREEN}${BOLD}PRO${RESET}`);
  } else {
    console.log(`${DIM}  ${getRandomTagline()}${RESET}`);
    console.log(`${YELLOW}  ${getRandomUpsell()} ${BOLD}-> heydad pro${RESET}`);
  }
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
