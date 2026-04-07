import { describe, it, expect, vi, beforeEach } from "vitest";

describe("speak", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("does nothing when silent is true", async () => {
    const { speak, setSilent } = await import("../../src/voice/speak.js");
    setSilent(true);
    // Should not throw — just silently returns
    expect(() => speak("test", "dad")).not.toThrow();
  });

  it("accepts optional lineIndex parameter", async () => {
    const { speak, setSilent } = await import("../../src/voice/speak.js");
    setSilent(true);
    // Should not throw with lineIndex
    expect(() => speak("test", "dad", 5)).not.toThrow();
  });
});
