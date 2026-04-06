import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { detectTestRunner } from "../../src/utils/detect.js";

describe("detectTestRunner", () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "heydad-test-"));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("detects npm project with test script", () => {
    writeFileSync(
      join(dir, "package.json"),
      JSON.stringify({ scripts: { test: "vitest" } })
    );
    const result = detectTestRunner(dir);
    expect(result).toEqual({ command: "npm test", label: "npm" });
  });

  it("ignores default npm test script", () => {
    writeFileSync(
      join(dir, "package.json"),
      JSON.stringify({
        scripts: { test: 'echo "Error: no test specified" && exit 1' },
      })
    );
    const result = detectTestRunner(dir);
    expect(result).toBeNull();
  });

  it("detects pytest project", () => {
    writeFileSync(join(dir, "pytest.ini"), "");
    const result = detectTestRunner(dir);
    expect(result).toEqual({ command: "pytest", label: "pytest" });
  });

  it("detects cargo project", () => {
    writeFileSync(join(dir, "Cargo.toml"), "");
    const result = detectTestRunner(dir);
    expect(result).toEqual({ command: "cargo test", label: "cargo" });
  });

  it("detects go project", () => {
    writeFileSync(join(dir, "go.mod"), "");
    const result = detectTestRunner(dir);
    expect(result).toEqual({ command: "go test ./...", label: "go" });
  });

  it("detects makefile with test target", () => {
    writeFileSync(join(dir, "Makefile"), "test:\n\techo hi\n");
    const result = detectTestRunner(dir);
    expect(result).toEqual({ command: "make test", label: "make" });
  });

  it("ignores makefile without test target", () => {
    writeFileSync(join(dir, "Makefile"), "build:\n\techo hi\n");
    const result = detectTestRunner(dir);
    expect(result).toBeNull();
  });

  it("returns null for empty directory", () => {
    const result = detectTestRunner(dir);
    expect(result).toBeNull();
  });
});
