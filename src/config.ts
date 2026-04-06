import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

export interface HeydadConfig {
  muted: boolean;
}

const CONFIG_PATH = join(homedir(), ".heydadrc.json");

const DEFAULTS: HeydadConfig = {
  muted: false,
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

export function getConfigPath(): string {
  return CONFIG_PATH;
}
