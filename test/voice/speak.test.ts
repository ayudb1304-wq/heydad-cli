import { describe, it, expect, vi, beforeEach } from "vitest";

describe("speak", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("does nothing when silent is true", async () => {
    const macMock = vi.fn();
    vi.doMock("../../src/voice/mac.js", () => ({ sayMac: macMock }));
    vi.doMock("../../src/voice/fallback.js", () => ({ sayFallback: vi.fn() }));

    const { speak, setSilent } = await import("../../src/voice/speak.js");
    setSilent(true);
    speak("test", "dad");

    expect(macMock).not.toHaveBeenCalled();
  });
});
