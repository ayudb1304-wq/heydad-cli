import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/voice/speak.js", () => ({
  playFile: vi.fn(),
  findAudioDir: vi.fn(() => "/fake/audio"),
}));

describe("checkGrandmaMoment", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("does nothing when streak is not 10", async () => {
    const { checkGrandmaMoment } = await import("../../src/moments/grandma.js");
    checkGrandmaMoment(5, false);
    expect(consoleSpy).not.toHaveBeenCalled();

    checkGrandmaMoment(9, true);
    expect(consoleSpy).not.toHaveBeenCalled();

    checkGrandmaMoment(11, false);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("prints upsell text for free users at streak 10", async () => {
    const { checkGrandmaMoment } = await import("../../src/moments/grandma.js");
    checkGrandmaMoment(10, false);
    const output = consoleSpy.mock.calls.map((c) => c[0]).join("\n");
    expect(output).toContain("10 in a row");
    expect(output).toContain("heydad pro");
  });

  it("prints grandma call text for pro users at streak 10", async () => {
    const { checkGrandmaMoment } = await import("../../src/moments/grandma.js");
    checkGrandmaMoment(10, true);
    const output = consoleSpy.mock.calls.map((c) => c[0]).join("\n");
    expect(output).toContain("GRANDMA");
    expect(output).toContain("Ten in a row");
  });
});
