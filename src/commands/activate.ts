import { Command } from "commander";
import { loadConfig, saveConfig } from "../config.js";
import { printBanner } from "../ui/banner.js";
import { hostname } from "node:os";

const DODO_API = "https://test.dodopayments.com";
const PRODUCT_ID = "pdt_0Nc8gQhIoOESkdNGoFnfT";

export const activateCommand = new Command("activate")
  .description("Activate heydad Pro with your license key")
  .argument("<key>", "Your license key")
  .action(async (key: string) => {
    printBanner(loadConfig().pro);

    const instanceName = `heydad-${hostname()}`;

    console.log("  Activating license...\n");

    try {
      const res = await fetch(`${DODO_API}/licenses/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          license_key: key,
          name: instanceName,
        }),
      });

      if (res.status === 200 || res.status === 201) {
        const data = await res.json() as { id: string };
        const config = loadConfig();
        config.license_key = key;
        config.license_instance = data.id;
        config.pro = true;
        saveConfig(config);

        console.log("  \x1b[32m\x1b[1mLICENSE ACTIVATED!\x1b[0m\n");
        console.log("  Welcome to heydad Pro. Dad is so proud of you.\n");
        console.log("  Premium voice packs are now unlocked.\n");
      } else if (res.status === 404) {
        console.log("  \x1b[31mInvalid license key. Check your email and try again.\x1b[0m\n");
        process.exit(1);
      } else if (res.status === 422) {
        console.log("  \x1b[31mActivation limit reached for this key.\x1b[0m\n");
        process.exit(1);
      } else if (res.status === 403) {
        console.log("  \x1b[31mThis license key has been deactivated.\x1b[0m\n");
        process.exit(1);
      } else {
        const body = await res.text();
        console.log(`  \x1b[31mActivation failed (${res.status}): ${body}\x1b[0m\n`);
        process.exit(1);
      }
    } catch (err: any) {
      console.log(`  \x1b[31mCouldn't reach license server: ${err.message}\x1b[0m\n`);
      console.log("  Check your internet connection and try again.\n");
      process.exit(1);
    }
  });

export const deactivateCommand = new Command("deactivate")
  .description("Deactivate heydad Pro on this machine")
  .action(async () => {
    const config = loadConfig();
    printBanner(config.pro);

    if (!config.pro || !config.license_key) {
      console.log("  No active license found.\n");
      return;
    }

    const instanceName = `heydad-${hostname()}`;

    try {
      await fetch(`${DODO_API}/licenses/deactivate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          license_key: config.license_key,
          name: instanceName,
        }),
      });
    } catch {
      // Deactivate locally even if network fails
    }

    config.license_key = undefined;
    config.license_instance = undefined;
    config.pro = false;
    saveConfig(config);

    console.log("  License deactivated. Dad will miss you.\n");
  });
