import { loadConfig, saveConfig, isPro } from "../config.js";
import { getRandomWelcomeLine } from "../lines/welcome.js";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { findAudioDir, playFile } from "../voice/speak.js";

const YELLOW = "\x1b[33m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

export function checkFirstRun(): boolean {
  const config = loadConfig();
  if (config.firstRun) {
    config.firstRun = false;
    saveConfig(config);

    const { text, index } = getRandomWelcomeLine(config.pro);
    console.log(`  ${YELLOW}${BOLD}"${text}"${RESET}\n`);

    const audioDir = findAudioDir();
    if (audioDir) {
      const file = join(audioDir, "welcome", `${String(index + 1).padStart(2, "0")}.mp3`);
      if (existsSync(file)) {
        playFile(file);
      }
    }

    if (!config.pro) {
      console.log(`  ${DIM}tip: heydad Pro adds 10 more lines + grandma calls. see: heydad pro${RESET}\n`);
    }
    return true;
  }
  return false;
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
