const EMOJI = {
  dad: "\u{1F61E}",
  hype: "\u{1F389}",
} as const;

export function sayFallback(text: string, mood: "dad" | "hype"): void {
  console.log(`${EMOJI[mood]}  ${text}`);
}
