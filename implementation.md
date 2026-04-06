# Implementation Plan: `heydad` CLI

**Package name:** `heydad`  
**npm install:** `npm install -g heydad`  
**CLI command:** `heydad`  
**Tagline:** "Your terminal has feelings now"  
**Current version:** 0.3.1  
**npm:** https://www.npmjs.com/package/heydad  
**GitHub:** https://github.com/ayudb1304-wq/heydad-cli

---

## Project Structure (Current)

```
heydad-cli/
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
├── .gitignore
├── README.md
├── GTM.md                        # Go-to-market launch plan
├── implementation.md
├── src/
│   ├── index.ts                  # CLI entry point (commander)
│   ├── config.ts                 # Config (~/.heydadrc.json) + voice pack registry
│   ├── commands/
│   │   ├── test.ts               # heydad test
│   │   ├── commit.ts             # heydad commit
│   │   ├── init.ts               # heydad init (git hooks)
│   │   ├── mute.ts               # heydad mute / unmute
│   │   ├── react.ts              # heydad react (used by git hooks)
│   │   ├── activate.ts           # heydad activate / deactivate (Dodo Payments)
│   │   ├── pro.ts                # heydad pro (status + checkout link)
│   │   └── voice.ts              # heydad voice (switch voice packs)
│   ├── voice/
│   │   └── speak.ts              # MP3 playback (afplay/mpv)
│   ├── lines/
│   │   ├── index.ts              # Voice pack router
│   │   ├── dad.ts                # Irish Dad disappointed lines (20)
│   │   ├── hype.ts               # Irish Dad hype lines (20)
│   │   └── optimus-dad.ts        # Optimus Prime lines (40)
│   └── ui/
│       └── banner.ts             # ASCII banner + taglines + reaction box
│   └── utils/
│       ├── detect.ts             # Project type detection
│       └── git.ts                # Git helpers
├── assets/
│   └── audio/
│       ├── dad/                  # Irish Dad disappointed MP3s (20)
│       ├── hype/                 # Irish Dad hype MP3s (20)
│       ├── optimus-dad/          # Optimus Prime disappointed MP3s (20)
│       └── optimus-hype/         # Optimus Prime hype MP3s (20)
├── demo/
│   ├── fail.sh                   # Demo script for video recording
│   └── pass.sh                   # Demo script for video recording
├── scripts/                      # (gitignored) Audio generation scripts
└── test/
    ├── lines/lines.test.ts
    ├── utils/detect.test.ts
    ├── utils/git.test.ts
    └── voice/speak.test.ts
```

---

## What's Built

### Phase 1: MVP — DONE

- [x] `heydad test` — auto-detects test runner, runs tests, reacts
- [x] `heydad test --cmd "custom"` — custom test command
- [x] `heydad commit -m "msg"` — commits, reacts based on diff size
- [x] `--silent` flag suppresses voice
- [x] 40 ElevenLabs Irish Dad voice clips (disappointed + hype)
- [x] ASCII banner with rotating funny taglines
- [x] 14 passing tests
- [x] Published to npm as `heydad`
- [x] README with install instructions

### Phase 2: Stickiness — DONE

- [x] `heydad init` — installs post-commit git hook
- [x] `heydad mute` / `heydad unmute` — silence audio, keep text
- [x] Voice pack system with switchable packs

### Phase 3: Monetization — DONE

- [x] `heydad pro` — shows Pro status + Dodo Payments checkout link ($7)
- [x] `heydad activate <key>` — license activation via Dodo Payments public API
- [x] `heydad deactivate` — remove license from machine
- [x] `heydad voice` — list and switch voice packs, Pro gate on premium packs
- [x] Optimus Prime voice pack (40 clips) — Pro only

---

## Tech Stack

| Layer | Choice |
|---|---|
| Language | TypeScript (ESM) |
| CLI Framework | Commander.js |
| Build | tsup (single-file bundle, shebang injection) |
| Tests | vitest |
| Voice | ElevenLabs-generated MP3s, played via afplay (Mac) / mpv (Linux) |
| Payments | Dodo Payments (license key activation, no backend needed) |
| Config | ~/.heydadrc.json |

**Runtime dependencies:** `commander` only.

---

## Voice Packs

| Pack | Lines | Audio | Tier |
|---|---|---|---|
| Irish Dad | 20 dad + 20 hype | 40 MP3s (1.3x speed) | Free |
| Optimus Prime | 20 dad + 20 hype | 40 MP3s | Pro ($7) |

Audio generated via ElevenLabs `eleven_multilingual_v2` model.

---

## Commands Reference

| Command | Description |
|---|---|
| `heydad test` | Run tests, dad reacts |
| `heydad test --cmd "..."` | Custom test command |
| `heydad commit -m "..."` | Commit with dad reaction |
| `heydad init` | Install git hooks |
| `heydad mute` | Mute audio (text still shows) |
| `heydad unmute` | Unmute audio |
| `heydad voice` | List voice packs |
| `heydad voice <pack>` | Switch voice pack |
| `heydad pro` | Show Pro status / upgrade link |
| `heydad activate <key>` | Activate Pro license |
| `heydad deactivate` | Remove Pro license |
| `heydad --silent <cmd>` | Suppress all audio for one run |

---

## Payments Flow

```
heydad pro → checkout link → Dodo Payments ($7) → license key emailed
→ heydad activate <key> → Dodo /licenses/activate (public API, no key needed)
→ Pro unlocked locally in ~/.heydadrc.json
```

Product ID: `pdt_0Nc8gQhIoOESkdNGoFnfT`  
Checkout: `https://checkout.dodopayments.com/buy/pdt_0Nc8gQhIoOESkdNGoFnfT`

---

## TODO (Next)

### Deferred Features
- [ ] Welcome voice lines on `heydad init` (needs ElevenLabs credits)
- [ ] Stats tracking ("You've disappointed dad 47 times this week")
- [ ] Custom voice lines via config
- [ ] Cross-platform audio testing (Linux/Windows)
- [ ] More voice packs (Drill Sergeant, Gordon Ramsay, Therapist)

### Phase 4: Platform (Month 2+)
- [ ] Web dashboard for teams
- [ ] VS Code extension
- [ ] GitHub Action (comment on PRs as Dad)
- [ ] Slack/Discord bot version
- [ ] Team leaderboards
