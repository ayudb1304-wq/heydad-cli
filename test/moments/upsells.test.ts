import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/config.js", () => {
  let mockConfig = { pro: false, firstRun: true, muted: false, voice: "irish-dad", streak: 0 };
  return {
    loadConfig: vi.fn(() => ({ ...mockConfig })),
    saveConfig: vi.fn((c: any) => { mockConfig = c; }),
    isPro: vi.fn(() => mockConfig.pro),
    __setMockConfig: (c: any) => { mockConfig = { ...mockConfig, ...c }; },
  };
});

describe("upsells", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const { __setMockConfig } = await import("../../src/config.js") as any;
    __setMockConfig({ pro: false, firstRun: true });
  });

  it("checkFirstRun prints tip on first run for free users", async () => {
    const { checkFirstRun } = await import("../../src/moments/upsells.js");
    checkFirstRun();
    const output = consoleSpy.mock.calls.map((c) => c[0]).join("\n");
    expect(output).toContain("heydad Pro");
  });

  it("checkStreakPromo prints promo at streak 5 for free users", async () => {
    const { checkStreakPromo } = await import("../../src/moments/upsells.js");
    checkStreakPromo(5);
    const output = consoleSpy.mock.calls.map((c) => c[0]).join("\n");
    expect(output).toContain("heydad pro");
  });

  it("checkStreakPromo does nothing at streak != 5", async () => {
    const { checkStreakPromo } = await import("../../src/moments/upsells.js");
    checkStreakPromo(3);
    expect(consoleSpy).not.toHaveBeenCalled();
    checkStreakPromo(6);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("checkBigCommitPromo prints promo at 100+ lines for free users", async () => {
    const { checkBigCommitPromo } = await import("../../src/moments/upsells.js");
    checkBigCommitPromo(100);
    const output = consoleSpy.mock.calls.map((c) => c[0]).join("\n");
    expect(output).toContain("heydad pro");
  });

  it("checkBigCommitPromo does nothing under 100 lines", async () => {
    const { checkBigCommitPromo } = await import("../../src/moments/upsells.js");
    checkBigCommitPromo(99);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("checkStreakPromo skips for pro users", async () => {
    const { __setMockConfig } = await import("../../src/config.js") as any;
    __setMockConfig({ pro: true });
    const { checkStreakPromo } = await import("../../src/moments/upsells.js");
    checkStreakPromo(5);
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
