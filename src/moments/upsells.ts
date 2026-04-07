import { loadConfig, saveConfig, isPro } from "../config.js";

const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

export function checkFirstRun(): void {
  const config = loadConfig();
  if (config.firstRun) {
    config.firstRun = false;
    saveConfig(config);
    if (!config.pro) {
      console.log(`  ${DIM}tip: heydad Pro adds 10 more lines + grandma calls. see: heydad pro${RESET}\n`);
    }
  }
}

export function checkStreakPromo(streak: number): void {
  if (isPro()) return;
  if (streak === 5) {
    console.log(`  ${DIM}dad is feeling generous. grab Pro -> heydad pro${RESET}\n`);
  }
}

export function checkBigCommitPromo(linesChanged: number): void {
  if (isPro()) return;
  if (linesChanged >= 100) {
    console.log(`  ${DIM}dad's crying. hear him ugly-cry with Pro -> heydad pro${RESET}\n`);
  }
}
