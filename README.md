# heydad

**Your terminal has feelings now.**

A CLI that roasts you like a disappointed Irish dad when your code fails, and hypes you up like a proud dad when it passes. With real voice acting.

<!-- TODO: Replace with actual demo GIF -->
<!-- ![demo](assets/demo.gif) -->

```
$ heydad test
Running: npm test

  FAIL  src/auth.test.ts

😞  I spent thirty years working the farm so you could go to university
    and write code that doesn't even compile. Thirty. Years.
```

```
$ heydad test
Running: npm test

  PASS  src/auth.test.ts

🎉  JAYSUS CHRIST ON A BICYCLE! GREEN ACROSS THE BOARD!
    I'M SO PROUD I MIGHT ACTUALLY CRY AND I HAVEN'T CRIED SINCE ITALIA '90!
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

### `heydad test`

Runs your tests. Dad reacts based on the result.

```bash
heydad test                    # Auto-detects your test runner
heydad test --cmd "pytest"     # Custom test command
heydad test --cmd "cargo test" # Works with any language
```

Auto-detects: **npm**, **pytest**, **cargo**, **go test**, **make test**

### `heydad commit`

Commits your code. Dad reacts based on the diff size.

```bash
heydad commit -m "fix typo"           # Small commit → calm praise
heydad commit -m "refactored auth"    # Big commit → ABSOLUTE LEGEND
```

| Lines Changed | Dad's Energy |
|---|---|
| < 10 | "Nice. Keep it up." |
| 10-50 | Random hype line |
| 50-200 | HYPE MODE |
| 200+ | "ABSOLUTE LEGEND. I'M SO PROUD OF YOU." |

### Global Options

```bash
heydad --silent test    # No voice, just text
heydad --version        # Show version
```

## Voice

Ships with **40 AI-generated voice clips** featuring a disappointed Irish dad and a hype Irish dad.

- **Test fails** → Disappointed Irish dad guilt-trips you
- **Test passes** → Irish dad loses his mind with pride

Falls back to text + emoji on systems without audio support.

## Why?

Developers spend hours alone, staring at terminals. Test failures feel defeating. Successes go uncelebrated. There's no emotional feedback loop — just cold exit codes.

**heydad** fixes that. Finally, the mass-validation you needed.

## License

MIT
