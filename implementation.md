# Implementation Plan: `heydad` CLI

**Package name:** `heydad`  
**npm install:** `npm install -g heydad`  
**Tagline:** "Your terminal has feelings now"

---

## Branding Updates (from PRD)

| PRD Reference | Updated |
|---|---|
| `dad` / `dad-cli` | `heydad` |
| `npm install dad-cli` | `npm install -g heydad` |
| Binary/command name | `dad` (short, memorable — the npm package is `heydad` but the CLI command is `dad`) |
| Demo video end card | `npx heydad test` |
| Merch references | "I disappointed dad (in production)" stays |

---

## Phase 1: MVP Implementation

### Step 1 — Project Scaffolding

**Files to create:**

```
heydad-cli/
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
├── src/
│   ├── index.ts              # CLI entry point (bin)
│   ├── commands/
│   │   ├── test.ts           # dad test
│   │   └── commit.ts         # dad commit
│   ├── voice/
│   │   ├── speak.ts          # Voice output abstraction
│   │   ├── mac.ts            # macOS `say` command wrapper
│   │   └── fallback.ts       # ASCII/emoji fallback (non-Mac)
│   ├── lines/
│   │   ├── dad.ts            # Disappointed dad lines
│   │   └── hype.ts           # Hype lines
│   └── utils/
│       ├── detect.ts         # Project type detection
│       └── git.ts            # Git helpers (diff size, commit)
└── test/
    ├── commands/
    │   ├── test.test.ts
    │   └── commit.test.ts
    ├── voice/
    │   └── speak.test.ts
    └── utils/
        └── detect.test.ts
```

**Dependencies:**

| Package | Purpose |
|---|---|
| `commander` | CLI framework |
| `typescript` | Language |
| `tsup` | Build/bundle (fast, zero-config) |
| `vitest` | Testing |

Zero runtime dependencies beyond `commander`. Voice uses native OS commands.

**package.json key fields:**
```json
{
  "name": "heydad",
  "version": "0.1.0",
  "bin": { "dad": "./dist/index.js" },
  "description": "Your terminal has feelings now",
  "keywords": ["cli", "dad", "test", "funny", "voice", "terminal"]
}
```

---

### Step 2 — Project Type Detection (`src/utils/detect.ts`)

Auto-detect the project's test runner by checking for config files in cwd:

| Check (in order) | Test Command |
|---|---|
| `package.json` has `scripts.test` | `npm test` |
| `pytest.ini` or `pyproject.toml` | `pytest` |
| `Cargo.toml` | `cargo test` |
| `go.mod` | `go test ./...` |
| `Makefile` with `test` target | `make test` |

Returns `{ command: string, label: string }` or `null` if nothing detected.

---

### Step 3 — Voice Output (`src/voice/`)

**`speak.ts`** — Abstraction layer:
```ts
speak(text: string, mood: 'dad' | 'hype'): void
```

- Checks `process.platform === 'darwin'` → use `mac.ts`
- Otherwise → use `fallback.ts`
- Respects `--silent` global flag (skip voice, still print text)

**`mac.ts`** — macOS `say` wrapper:
- Dad mood: voice `Daniel`, rate `140` (slow, disappointed)
- Hype mood: voice `Alex`, rate `220` (fast, excited)
- Spawns `say` as fire-and-forget child process (non-blocking)

**`fallback.ts`** — Non-Mac:
- Prints the line with emoji prefix
- Dad: `😞 <line>`
- Hype: `🎉 <line>` / `📢 <line>`

---

### Step 4 — Dad & Hype Lines (`src/lines/`)

Ship with 20 lines each (from PRD Appendix A), exported as arrays. Random selection via `Math.random()`.

**Disappointed dad lines** (samples):
- "I'm not mad. I'm just disappointed."
- "Your brother's code compiled on the first try."
- "We need to talk about your test coverage."

**Hype lines** (samples):
- "LETS GOOOOO!"
- "THAT'S MY BOY!"
- "Tests passing? In THIS economy?"

---

### Step 5 — `dad test` Command (`src/commands/test.ts`)

```
dad test                    # Auto-detect and run
dad test --cmd "pytest"     # Custom command
dad test --silent           # No voice, just text
```

**Flow:**
1. If `--cmd` provided, use it. Otherwise call `detect()`.
2. If nothing detected, print error: "Couldn't figure out your test command. Use `dad test --cmd \"your command\"`"
3. Print: `Running: <command>...`
4. Spawn command with `child_process.spawn`, inherit stdio so user sees test output live.
5. On exit:
   - Exit code `0` → pick random hype line, `speak(line, 'hype')`, print green text, exit `0`
   - Exit code `!= 0` → pick random dad line, `speak(line, 'dad')`, print red text, exit with same code

---

### Step 6 — `dad commit` Command (`src/commands/commit.ts`)

```
dad commit -m "fix typo"
dad commit -m "refactored auth" --silent
```

**Flow:**
1. Run `git diff --cached --stat` to get lines changed count.
2. If no staged changes, run `git add -A` then recount (matches typical solo dev flow — or prompt user).
3. Run `git commit -m "<message>"`.
4. Based on lines changed, select reaction tier:

| Lines Changed | Reaction |
|---|---|
| < 10 | Calm: "Nice. Keep it up." |
| 10–50 | Excited: random hype line |
| 50–200 | Very excited: hype line + "LETS GOOOOO!" |
| 200+ | Maximum: "ABSOLUTE LEGEND. I'M SO PROUD OF YOU." |

5. Speak the reaction, print it with appropriate emoji.

---

### Step 7 — CLI Entry Point (`src/index.ts`)

```ts
#!/usr/bin/env node
import { program } from 'commander';

program
  .name('dad')
  .description('Your terminal has feelings now')
  .version(/* from package.json */);

// Register commands
program.addCommand(testCommand);
program.addCommand(commitCommand);

program.parse();
```

Global options:
- `--silent` — suppress voice output

---

### Step 8 — Build & Test

**Build:** `tsup src/index.ts --format esm --dts`  
**Test:** `vitest`

Tests to write:
- `detect.test.ts` — mock filesystem checks, verify correct command returned
- `test.test.ts` — mock child_process, verify hype/dad path based on exit code
- `commit.test.ts` — mock git commands, verify tier selection logic
- `speak.test.ts` — mock platform detection, verify correct voice module called

---

### Step 9 — README.md

The README IS the marketing. Structure:

1. **Hero section** — One-liner + demo GIF placeholder
2. **Install** — `npm install -g heydad`
3. **Quick start** — 3 lines of terminal showing `dad test`
4. **Commands** — `dad test`, `dad commit`
5. **Configuration** — `--silent`, `--cmd`
6. **Why?** — Short emotional pitch
7. **Contributing** — Keep it light
8. **License** — MIT

---

## Build Order (Dependency Graph)

```
1. Scaffolding (package.json, tsconfig, .gitignore)
2. Lines (dad.ts, hype.ts) — no dependencies
3. Voice (speak.ts, mac.ts, fallback.ts) — depends on: lines
4. Utils (detect.ts, git.ts) — no dependencies
5. Commands (test.ts, commit.ts) — depends on: voice, utils, lines
6. Entry point (index.ts) — depends on: commands
7. Tests — depends on: everything
8. README — last
```

Steps 2, 3, and 4 can be built in parallel. The critical path is:

**Scaffolding → Lines + Utils → Voice → Commands → Entry Point → Tests → README**

---

## Decisions & Trade-offs

| Decision | Rationale |
|---|---|
| `commander` over `yargs` | Lighter, simpler API, sufficient for 2 commands |
| `tsup` over `tsc` | Single-file output, faster builds, handles shebang |
| `.ts` for lines (not `.json`) | Type-safe, can add metadata later without migration |
| Fire-and-forget voice | Don't block CLI exit waiting for `say` to finish |
| `--silent` not `--no-voice` | Shorter, more intuitive |
| `dad` as bin name, `heydad` as package | `dad` is the viral UX; `heydad` avoids npm conflicts |
| No analytics in MVP | Ship fast, add PostHog in Phase 2 |
| ESM output | Modern Node.js, cleaner imports |

---

## Out of Scope (MVP)

These are Phase 2+ per the PRD and intentionally excluded:

- `dad init` (git hooks)
- Stats tracking
- Custom voice lines config
- Cross-platform audio (Linux `espeak`, Windows)
- AI-generated roasts (Claude API)
- Premium voice packs (Eleven Labs)
- Telemetry/analytics
- Team features

---

## Success Criteria (MVP Done)

- [ ] `npm install -g heydad` works
- [ ] `dad test` detects project type, runs tests, reacts with voice (Mac) or text
- [ ] `dad commit -m "msg"` commits and reacts based on diff size
- [ ] `dad test --cmd "custom"` works
- [ ] `--silent` suppresses voice on all commands
- [ ] Works on macOS with voice, degrades gracefully on Linux/Windows
- [ ] README is compelling with install instructions and demo placeholder
- [ ] All tests pass
