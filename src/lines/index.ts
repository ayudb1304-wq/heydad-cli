import type { VoicePack } from "../config.js";
import { dadLines, getRandomDadLine } from "./dad.js";
import { hypeLines, getRandomHypeLine } from "./hype.js";
import { optimusDadLines, optimusHypeLines, getRandomOptimusDadLine, getRandomOptimusHypeLine } from "./optimus-dad.js";

export interface VoiceLines {
  dadLines: string[];
  hypeLines: string[];
  getRandomDadLine: () => string;
  getRandomHypeLine: () => string;
  audioDadDir: string;
  audioHypeDir: string;
}

export function getVoiceLines(voice: VoicePack): VoiceLines {
  switch (voice) {
    case "optimus-prime":
      return {
        dadLines: optimusDadLines,
        hypeLines: optimusHypeLines,
        getRandomDadLine: getRandomOptimusDadLine,
        getRandomHypeLine: getRandomOptimusHypeLine,
        audioDadDir: "optimus-dad",
        audioHypeDir: "optimus-hype",
      };
    case "irish-dad":
    default:
      return {
        dadLines,
        hypeLines,
        getRandomDadLine,
        getRandomHypeLine,
        audioDadDir: "dad",
        audioHypeDir: "hype",
      };
  }
}
