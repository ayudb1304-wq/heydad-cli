import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

export type VoicePack = "irish-dad" | "optimus-prime";

export const VOICE_PACKS: { id: VoicePack; name: string; pro: boolean }[] = [
  { id: "irish-dad", name: "Irish Dad (default)", pro: false },
  { id: "optimus-prime", name: "Optimus Prime", pro: true },
];

export interface HeydadConfig {
  muted: boolean;
  license_key?: string;
  license_instance?: string;
  pro: boolean;
  voice: VoicePack;
}

const CONFIG_PATH = join(homedir(), ".heydadrc.json");

const DEFAULTS: HeydadConfig = {
  muted: false,
  pro: false,
  voice: "irish-dad",
};

export function loadConfig(): HeydadConfig {
  if (!existsSync(CONFIG_PATH)) return { ...DEFAULTS };
  try {
    const raw = JSON.parse(readFileSync(CONFIG_PATH, "utf-8"));
    return { ...DEFAULTS, ...raw };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveConfig(config: HeydadConfig): void {
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n");
}

export function isPro(): boolean {
  return loadConfig().pro;
}

export function getConfigPath(): string {
  return CONFIG_PATH;
}
