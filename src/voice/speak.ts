import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getVoiceLines } from "../lines/index.js";
import { sayMac } from "./mac.js";
import { sayFallback } from "./fallback.js";
import { loadConfig } from "../config.js";

let silent = false;

export function setSilent(value: boolean): void {
  silent = value;
}

function findAudioDir(): string | null {
  const distDir = dirname(fileURLToPath(import.meta.url));
  const packageRoot = join(distDir, "..");
  const audioDir = join(packageRoot, "assets", "audio");
  return existsSync(audioDir) ? audioDir : null;
}

function playMp3(filePath: string): void {
  const player = process.platform === "darwin" ? "afplay" : "mpv";
  const args = process.platform === "darwin" ? [filePath] : ["--no-video", filePath];
  const child = spawn(player, args, {
    stdio: "ignore",
    detached: true,
  });
  child.unref();
}

export function speak(text: string, mood: "dad" | "hype"): void {
  if (silent) return;

  const config = loadConfig();
  if (config.muted) return;

  const voiceLines = getVoiceLines(config.voice);
  const audioDir = findAudioDir();

  if (audioDir) {
    const lines = mood === "dad" ? voiceLines.dadLines : voiceLines.hypeLines;
    const subDir = mood === "dad" ? voiceLines.audioDadDir : voiceLines.audioHypeDir;
    const idx = lines.indexOf(text);
    if (idx !== -1) {
      const file = join(audioDir, subDir, `${String(idx + 1).padStart(2, "0")}.mp3`);
      if (existsSync(file)) {
        playMp3(file);
        return;
      }
    }
  }

  // Fallback: macOS say or text
  if (process.platform === "darwin") {
    sayMac(text, mood);
  } else {
    sayFallback(text, mood);
  }
}
