# heydad

**Your terminal has feelings now.**

A CLI that roasts you like a disappointed dad when your code fails, and hypes you up like a proud dad when it passes.

<!-- TODO: Replace with actual demo GIF -->
<!-- ![demo](assets/demo.gif) -->

```
$ dad test
Running: npm test

  FAIL  src/auth.test.ts

😞  I'm not mad. I'm just disappointed.
```

```
$ dad test
Running: npm test

  PASS  src/auth.test.ts

🎉  LETS GOOOOO! THAT'S MY BOY!
```

## Install

```bash
npm install -g heydad
```

Or try it instantly:

```bash
npx heydad test
```

## Commands

### `dad test`

Runs your tests. Dad reacts based on the result.

```bash
dad test                    # Auto-detects your test runner
dad test --cmd "pytest"     # Custom test command
dad test --cmd "cargo test" # Works with any language
```

Auto-detects: **npm**, **pytest**, **cargo**, **go test**, **make test**

### `dad commit`

Commits your code. Dad reacts based on the diff size.

```bash
dad commit -m "fix typo"           # Small commit → calm praise
dad commit -m "refactored auth"    # Big commit → ABSOLUTE LEGEND
```

| Lines Changed | Dad's Energy |
|---|---|
| < 10 | "Nice. Keep it up." |
| 10-50 | Random hype line |
| 50-200 | HYPE MODE |
| 200+ | "ABSOLUTE LEGEND. I'M SO PROUD OF YOU." |

### Global Options

```bash
dad --silent test    # No voice, just text
dad --version        # Show version
```

## Voice

On macOS, dad **talks to you** using the built-in `say` command. No dependencies needed.

- **Disappointment:** Slow, somber Daniel voice
- **Hype:** Fast, excited Alex voice

On other platforms, you get emoji reactions in the terminal.

## Why?

Developers spend hours alone, staring at terminals. Test failures feel defeating. Successes go uncelebrated. There's no emotional feedback loop — just cold exit codes.

**heydad** fixes that. Finally, the mass-validation you needed.

## License

MIT
