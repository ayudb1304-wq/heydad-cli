import { Command } from "commander";
import { existsSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { printBanner } from "../ui/banner.js";
import { loadConfig } from "../config.js";

// TODO: Generate welcome audio clips when ElevenLabs credits refresh
// const WELCOME_LINES = [
//   "Right, I'm moving in. Don't worry, I won't take up much space. Just your terminal. And your self-esteem.",
//   "Consider this your terminal adoption papers. I'm your dad now. No refunds.",
//   "You could have installed prettier. You could have installed eslint. But no. You installed a dad. Respect.",
// ];

const HOOK_MARKER = "# heydad-hook";

const POST_COMMIT_HOOK = `#!/bin/sh
${HOOK_MARKER}
# heydad reacts to your commits automatically
# Remove this file or run 'heydad deinit' to disable

LINES=$(git diff --numstat HEAD~1 HEAD 2>/dev/null | awk '{s+=$1+$2} END {print s+0}')

if command -v heydad >/dev/null 2>&1; then
  heydad react --lines "$LINES" --trigger commit
fi
`;

export const initCommand = new Command("init")
  .description("Install git hooks. Dad is always watching now.")
  .action(() => {
    printBanner(loadConfig().pro);

    // Check we're in a git repo
    try {
      execSync("git rev-parse --git-dir", { stdio: "ignore" });
    } catch {
      console.log("  This doesn't look like a git repo. Run 'git init' first.\n");
      process.exit(1);
    }

    const gitDir = execSync("git rev-parse --git-dir", { encoding: "utf-8" }).trim();
    const hooksDir = join(gitDir, "hooks");
    const hookPath = join(hooksDir, "post-commit");

    // Check if hook already exists
    if (existsSync(hookPath)) {
      const existing = readFileSync(hookPath, "utf-8");
      if (existing.includes(HOOK_MARKER)) {
        console.log("  Dad is already watching. You can't escape that easily.\n");
        return;
      }
      // Append to existing hook
      const updated = existing + "\n" + POST_COMMIT_HOOK.split("\n").slice(1).join("\n");
      writeFileSync(hookPath, updated);
      chmodSync(hookPath, 0o755);
      console.log("  Added heydad to your existing post-commit hook.\n");
    } else {
      writeFileSync(hookPath, POST_COMMIT_HOOK);
      chmodSync(hookPath, 0o755);
      console.log("  Git hook installed. Dad is watching every commit now.\n");
    }

    console.log("  Run 'heydad mute' if he gets too much. (He won't hold it against you.)\n");
  });
