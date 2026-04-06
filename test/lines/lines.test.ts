import { describe, it, expect } from "vitest";
import { dadLines, getRandomDadLine } from "../../src/lines/dad.js";
import { hypeLines, getRandomHypeLine } from "../../src/lines/hype.js";

describe("dad lines", () => {
  it("has 20 lines", () => {
    expect(dadLines).toHaveLength(20);
  });

  it("getRandomDadLine returns a line from the list", () => {
    const line = getRandomDadLine();
    expect(dadLines).toContain(line);
  });
});

describe("hype lines", () => {
  it("has 20 lines", () => {
    expect(hypeLines).toHaveLength(20);
  });

  it("getRandomHypeLine returns a line from the list", () => {
    const line = getRandomHypeLine();
    expect(hypeLines).toContain(line);
  });
});
