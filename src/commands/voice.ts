import { Command } from "commander";
import { loadConfig, saveConfig, VOICE_PACKS, type VoicePack } from "../config.js";
import { printBanner } from "../ui/banner.js";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

export const voiceCommand = new Command("voice")
  .description("Switch voice packs")
  .argument("[pack]", "Voice pack to switch to")
  .action((pack?: string) => {
    printBanner();

    const config = loadConfig();

    if (!pack) {
      // List available packs
      console.log(`  ${BOLD}Voice Packs${RESET}\n`);
      for (const vp of VOICE_PACKS) {
        const active = config.voice === vp.id ? ` ${GREEN}← active${RESET}` : "";
        const locked = vp.pro && !config.pro ? ` ${RED}[PRO]${RESET}` : "";
        console.log(`  ${vp.id} — ${vp.name}${locked}${active}`);
      }
      console.log(`\n  ${DIM}Usage: heydad voice <pack-name>${RESET}\n`);
      return;
    }

    const selected = VOICE_PACKS.find((vp) => vp.id === pack);
    if (!selected) {
      console.log(`  ${RED}Unknown voice pack: ${pack}${RESET}\n`);
      console.log(`  Available: ${VOICE_PACKS.map((vp) => vp.id).join(", ")}\n`);
      process.exit(1);
    }

    if (selected.pro && !config.pro) {
      console.log(`  ${RED}${selected.name} is a Pro voice pack.${RESET}\n`);
      console.log(`  Run ${BOLD}heydad pro${RESET} to upgrade.\n`);
      process.exit(1);
    }

    config.voice = pack as VoicePack;
    saveConfig(config);
    console.log(`  Voice switched to ${BOLD}${selected.name}${RESET}.\n`);
  });
