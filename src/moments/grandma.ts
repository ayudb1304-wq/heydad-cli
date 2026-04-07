import { join } from "node:path";
import { playFile, findAudioDir } from "../voice/speak.js";

const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

const CHECKOUT_URL = "https://checkout.dodopayments.com/buy/pdt_0Nc8gQhIoOESkdNGoFnfT";

export function checkGrandmaMoment(streak: number, pro: boolean): void {
  if (streak !== 10) return;

  if (pro) {
    console.log(`\n  ${YELLOW}${BOLD}INCOMING CALL FROM GRANDMA...${RESET}\n`);
    console.log(`  ${GREEN}"Mam? Mam, it's me. Listen, you won't believe this.`);
    console.log(`  The young one, yeah the one writing the computers.`);
    console.log(`  Passed all the tests. Ten in a row, Mam. Ten.`);
    console.log(`  No, I'm not crying, you're crying.`);
    console.log(`  Italia '90 was the last time I felt like this, I swear to God.`);
    console.log(`  I have to go, the tests are running again. I love you, Mam."${RESET}\n`);

    const audioDir = findAudioDir();
    if (audioDir) {
      playFile(join(audioDir, "moments", "grandma-call.mp3"));
    }
  } else {
    console.log(`\n  ${YELLOW}${BOLD}that's 10 in a row.${RESET}`);
    console.log(`  ${DIM}dad wants to call grandma and brag about you.${RESET}`);
    console.log(`  ${DIM}hear the call -> heydad pro${RESET}\n`);
  }
}
