import { spawn } from "node:child_process";

const VOICES = {
  dad: { voice: "Daniel", rate: 140 },
  hype: { voice: "Alex", rate: 220 },
} as const;

export function sayMac(text: string, mood: "dad" | "hype"): void {
  const { voice, rate } = VOICES[mood];
  const child = spawn("say", ["-v", voice, "-r", String(rate), text], {
    stdio: "ignore",
    detached: true,
  });
  child.unref();
}
