import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { dadLines } from "../lines/dad.js";
import { hypeLines } from "../lines/hype.js";
import { sayMac } from "./mac.js";
import { sayFallback } from "./fallback.js";
import { loadConfig } from "../config.js";

let silent = false;

export function setSilent(value: boolean): void {
  silent = value;
}

function findAudioDir(): string | null {
  // When installed via npm, dist/ is at package root
  // assets/audio/ is at package root too
  const distDir = dirname(fileURLToPath(import.meta.url));
  const packageRoot = join(distDir, "..");
  const audioDir = join(packageRoot, "assets", "audio");
  return existsSync(audioDir) ? audioDir : null;
}

function playMp3(filePath: string): void {
  // afplay on macOS, mpv/aplay on Linux
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

  const audioDir = findAudioDir();
  if (audioDir) {
    // Find the index of this line to play the matching MP3
    const lines = mood === "dad" ? dadLines : hypeLines;
    const idx = lines.indexOf(text);
    if (idx !== -1) {
      const file = join(audioDir, mood, `${String(idx + 1).padStart(2, "0")}.mp3`);
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
