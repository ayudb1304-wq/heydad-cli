import type { VoicePack } from "../config.js";
import type { LinePick } from "./dad.js";
import { dadLineTexts, getRandomDadLine } from "./dad.js";
import { hypeLineTexts, getRandomHypeLine } from "./hype.js";
import { optimusDadLines, optimusHypeLines, getRandomOptimusDadLine, getRandomOptimusHypeLine } from "./optimus-dad.js";

export type { LinePick } from "./dad.js";

export interface VoiceLines {
  dadLines: string[];
  hypeLines: string[];
  getRandomDadLine: (pro: boolean) => LinePick;
  getRandomHypeLine: (pro: boolean) => LinePick;
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
        dadLines: dadLineTexts,
        hypeLines: hypeLineTexts,
        getRandomDadLine,
        getRandomHypeLine,
        audioDadDir: "dad",
        audioHypeDir: "hype",
      };
  }
}
