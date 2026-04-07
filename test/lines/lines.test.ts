import { describe, it, expect } from "vitest";
import { dadLines, dadLineTexts, getRandomDadLine } from "../../src/lines/dad.js";
import { hypeLines, hypeLineTexts, getRandomHypeLine } from "../../src/lines/hype.js";

describe("dad lines", () => {
  it("has 20 lines", () => {
    expect(dadLines).toHaveLength(20);
  });

  it("has 10 free and 10 pro lines", () => {
    const free = dadLines.filter((l) => l.tier === "free");
    const pro = dadLines.filter((l) => l.tier === "pro");
    expect(free).toHaveLength(10);
    expect(pro).toHaveLength(10);
  });

  it("dadLineTexts has 20 text strings", () => {
    expect(dadLineTexts).toHaveLength(20);
    expect(typeof dadLineTexts[0]).toBe("string");
  });

  it("getRandomDadLine(false) returns only free-tier lines", () => {
    const freeTexts = dadLines.filter((l) => l.tier === "free").map((l) => l.text);
    for (let i = 0; i < 50; i++) {
      const pick = getRandomDadLine(false);
      expect(freeTexts).toContain(pick.text);
      expect(pick.index).toBeGreaterThanOrEqual(0);
      expect(pick.index).toBeLessThan(10);
    }
  });

  it("getRandomDadLine(true) can return any line", () => {
    const allTexts = dadLines.map((l) => l.text);
    for (let i = 0; i < 50; i++) {
      const pick = getRandomDadLine(true);
      expect(allTexts).toContain(pick.text);
      expect(pick.index).toBeGreaterThanOrEqual(0);
      expect(pick.index).toBeLessThan(20);
    }
  });
});

describe("hype lines", () => {
  it("has 20 lines", () => {
    expect(hypeLines).toHaveLength(20);
  });

  it("has 10 free and 10 pro lines", () => {
    const free = hypeLines.filter((l) => l.tier === "free");
    const pro = hypeLines.filter((l) => l.tier === "pro");
    expect(free).toHaveLength(10);
    expect(pro).toHaveLength(10);
  });

  it("hypeLineTexts has 20 text strings", () => {
    expect(hypeLineTexts).toHaveLength(20);
    expect(typeof hypeLineTexts[0]).toBe("string");
  });

  it("getRandomHypeLine(false) returns only free-tier lines", () => {
    const freeTexts = hypeLines.filter((l) => l.tier === "free").map((l) => l.text);
    for (let i = 0; i < 50; i++) {
      const pick = getRandomHypeLine(false);
      expect(freeTexts).toContain(pick.text);
      expect(pick.index).toBeGreaterThanOrEqual(0);
      expect(pick.index).toBeLessThan(10);
    }
  });

  it("getRandomHypeLine(true) can return any line", () => {
    const allTexts = hypeLines.map((l) => l.text);
    for (let i = 0; i < 50; i++) {
      const pick = getRandomHypeLine(true);
      expect(allTexts).toContain(pick.text);
      expect(pick.index).toBeGreaterThanOrEqual(0);
      expect(pick.index).toBeLessThan(20);
    }
  });
});
