import { join } from "node:path";
import { playFile, findAudioDir } from "../voice/speak.js";

const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

export function checkDadCriesMoment(linesChanged: number, pro: boolean): boolean {
  if (linesChanged < 200) return false;

  if (pro) {
    console.log(`  ${YELLOW}${BOLD}[dad is visibly shaking]${RESET}\n`);
    console.log(`  ${GREEN}"I promised myself I wouldn't cry. I PROMISED myself.`);
    console.log(`  But look at that. ${linesChanged} lines. ${linesChanged} lines of beautiful, working code.`);
    console.log(`  I need a minute. My own child. A legend. An absolute legend.`);
    console.log(`  I'm going to frame this diff and put it on the mantelpiece`);
    console.log(`  right next to your communion photo."${RESET}\n`);

    const audioDir = findAudioDir();
    if (audioDir) {
      playFile(join(audioDir, "moments", "dad-cries.mp3"));
    }
    return true;
  } else {
    console.log(`\n  ${YELLOW}${BOLD}${linesChanged} lines. dad is crying.${RESET}`);
    console.log(`  ${DIM}hear him ugly-cry with Pro -> heydad pro${RESET}\n`);
    return true;
  }
}
