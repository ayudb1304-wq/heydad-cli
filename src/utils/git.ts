import { execSync } from "node:child_process";

export function getStagedLinesChanged(): number {
  try {
    const output = execSync("git diff --cached --numstat", { encoding: "utf-8" });
    let total = 0;
    for (const line of output.trim().split("\n")) {
      if (!line) continue;
      const [added, removed] = line.split("\t");
      total += (parseInt(added, 10) || 0) + (parseInt(removed, 10) || 0);
    }
    return total;
  } catch {
    return 0;
  }
}

export function gitCommit(message: string): void {
  execSync(`git commit -m ${JSON.stringify(message)}`, { stdio: "inherit" });
}

export function hasStagedChanges(): boolean {
  try {
    const output = execSync("git diff --cached --name-only", { encoding: "utf-8" });
    return output.trim().length > 0;
  } catch {
    return false;
  }
}
