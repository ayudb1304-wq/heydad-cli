import { Command } from "commander";
import { loadConfig } from "../config.js";
import { printBanner } from "../ui/banner.js";

const CHECKOUT_URL = "https://test.checkout.dodopayments.com/buy/pdt_0Nc8gQhIoOESkdNGoFnfT?quantity=1&redirect_url=https://www.npmjs.com/package/heydad";

const GREEN = "\x1b[32m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

function printEnterpriseTier(): void {
  console.log(`  ${DIM}────────────────────────────────────────${RESET}\n`);
  console.log(`  ${BOLD}heydad Enterprise${RESET} — $49/user/month\n`);
  console.log(`  ${DIM}Finally, company-wide disappointment at scale.${RESET}`);
  console.log(`  ${DIM}• Slack integration (coming soon)${RESET}`);
  console.log(`  ${DIM}• Manager dashboard: "who disappointed dad the most this week"${RESET}`);
  console.log(`  ${DIM}• Custom company voice ("Jeff from accounting is disappointed in the QA team")${RESET}`);
  console.log(`  ${DIM}• SAML SSO (lol)${RESET}\n`);
  console.log(`  ${DIM}Contact: enterprise@heydad.dev${RESET}\n`);
}

export const proCommand = new Command("pro")
  .description("Show Pro status or upgrade")
  .action(() => {
    const config = loadConfig();
    printBanner(config.pro);

    if (config.pro) {
      console.log(`  ${GREEN}${BOLD}heydad Pro${RESET} ${GREEN}— ACTIVE${RESET}\n`);
      console.log(`  ${GREEN}✓${RESET} All 20 Irish Dad lines (disappointed + hype)`);
      console.log(`  ${GREEN}✓${RESET} Grandma calls at 10-streak`);
      console.log(`  ${GREEN}✓${RESET} Dad literally cries on 200+ line commits`);
      console.log(`  ${GREEN}✓${RESET} Premium voice packs (Optimus Prime + more coming)`);
      console.log(`  ${GREEN}✓${RESET} All future content included`);
      console.log(`  ${GREEN}✓${RESET} Dad's eternal approval\n`);
      console.log(`  ${DIM}Run 'heydad deactivate' to remove license from this machine.${RESET}\n`);
    } else {
      console.log(`  ${BOLD}heydad Pro${RESET} — $9 one-time\n`);
      console.log(`  ${DIM}✗${RESET} 10 more Irish Dad lines (disappointed + hype)`);
      console.log(`  ${DIM}✗${RESET} Grandma calls at 10-streak`);
      console.log(`  ${DIM}✗${RESET} Premium voice packs (Optimus Prime + more coming)`);
      console.log(`  ${DIM}✗${RESET} All future content included`);
      console.log(`  ${DIM}✗${RESET} Dad's eternal approval\n`);
      console.log(`  ${BOLD}Get it:${RESET} ${CHECKOUT_URL}\n`);
      console.log(`  After purchase, activate with: ${BOLD}heydad activate <your-key>${RESET}\n`);
    }

    printEnterpriseTier();
  });
