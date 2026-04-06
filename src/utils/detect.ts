import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export interface TestRunner {
  command: string;
  label: string;
}

export function detectTestRunner(cwd: string = process.cwd()): TestRunner | null {
  // Node.js / npm
  const pkgPath = join(cwd, "package.json");
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
      if (pkg.scripts?.test && pkg.scripts.test !== 'echo "Error: no test specified" && exit 1') {
        return { command: "npm test", label: "npm" };
      }
    } catch {
      // malformed package.json, skip
    }
  }

  // Python
  if (existsSync(join(cwd, "pytest.ini")) || existsSync(join(cwd, "pyproject.toml"))) {
    return { command: "pytest", label: "pytest" };
  }

  // Rust
  if (existsSync(join(cwd, "Cargo.toml"))) {
    return { command: "cargo test", label: "cargo" };
  }

  // Go
  if (existsSync(join(cwd, "go.mod"))) {
    return { command: "go test ./...", label: "go" };
  }

  // Makefile
  const makefilePath = join(cwd, "Makefile");
  if (existsSync(makefilePath)) {
    try {
      const content = readFileSync(makefilePath, "utf-8");
      if (/^test\s*:/m.test(content)) {
        return { command: "make test", label: "make" };
      }
    } catch {
      // skip
    }
  }

  return null;
}
