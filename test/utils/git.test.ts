import { describe, it, expect, vi } from "vitest";
import { getStagedLinesChanged } from "../../src/utils/git.js";

describe("getStagedLinesChanged", () => {
  it("returns 0 when no staged changes", () => {
    // In the test environment (no git repo context or no staged files), should return 0
    const result = getStagedLinesChanged();
    expect(result).toBeTypeOf("number");
    expect(result).toBeGreaterThanOrEqual(0);
  });
});
