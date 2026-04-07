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
heydad commit -m "refactored auth"    # Big commit → dad literally cries
```

### `heydad init`

Install git hooks. Dad reacts to every commit automatically.

```bash
heydad init     # Dad is always watching now
heydad mute     # Silence audio (text stays)
heydad unmute   # Dad's back
```

## Voice Packs

Ships with **80+ AI-generated voice clips** across multiple characters.

| Pack | Clips | Tier |
|---|---|---|
| Irish Dad (default) | 40 | Free (10 lines) / Pro (all 20) |
| Optimus Prime | 40 | Pro |
| More coming... | | Pro |

Switch packs: `heydad voice <pack>`

## heydad Pro

- 20 Irish Dad lines (free gets 10)
- Optimus Prime voice pack
- Dad calls grandma at 10-streak to brag about you
- Dad literally cries on 200+ line commits
- All future voice packs included
- Dad's eternal approval

```bash
heydad pro                    # See what you're missing
heydad activate <your-key>    # After purchase
```

## Get a full refund

Post a demo of heydad on X, TikTok, or Reels.

- Video hits **5k views** → 50% refund
- Video hits **25k views** → full refund + every future pack free

No LinkedIn. No Threads. Only platforms where the joke lives. Tag **@heydad** so we can find you.

## Why?

Developers spend hours alone, staring at terminals. Test failures feel defeating. Successes go uncelebrated. There's no emotional feedback loop — just cold exit codes.

**heydad** fixes that. Finally, the mass-validation you needed.

## License

MIT
