import { Command } from "commander";
import { loadConfig } from "../config.js";
import { printBanner } from "../ui/banner.js";

const CHECKOUT_URL = "https://checkout.dodopayments.com/buy/pdt_0Nc8gQhIoOESkdNGoFnfT";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

export const proCommand = new Command("pro")
  .description("Show Pro status or upgrade")
  .action(() => {
    printBanner();

    const config = loadConfig();

    if (config.pro) {
      console.log(`  ${GREEN}${BOLD}heydad Pro${RESET} ${GREEN}— ACTIVE${RESET}\n`);
      console.log(`  ${GREEN}✓${RESET} Premium voice packs`);
      console.log(`  ${GREEN}✓${RESET} All future voice packs included`);
      console.log(`  ${GREEN}✓${RESET} Dad's eternal approval\n`);
      console.log(`  ${DIM}Run 'heydad deactivate' to remove license from this machine.${RESET}\n`);
    } else {
      console.log(`  ${BOLD}heydad Pro${RESET} — $7 one-time\n`);
      console.log(`  ${DIM}✗${RESET} Premium voice packs (Drill Sergeant, Gordon Ramsay, more coming)`);
      console.log(`  ${DIM}✗${RESET} All future voice packs included`);
      console.log(`  ${DIM}✗${RESET} Dad's eternal approval\n`);
      console.log(`  ${BOLD}Get it:${RESET} ${CHECKOUT_URL}\n`);
      console.log(`  After purchase, activate with: ${BOLD}heydad activate <your-key>${RESET}\n`);
    }
  });
