# Product Requirements Document: `dad` CLI

## One-Liner
**A CLI that roasts you like a disappointed dad when your code fails, and hypes you up like a proud dad when it passes.**

---

## 1. Problem Statement

Developers spend hours alone, staring at terminals. Test failures feel defeating. Successes go uncelebrated. There's no emotional feedback loop—just cold exit codes.

**Insight:** The tools that go viral (Slap Mac, Claude Whip) add *emotional texture* to mundane dev workflows. They're shareable because they're *relatable*.

---

## 2. Product Vision

`dad` is a CLI wrapper that adds audio-emotional feedback to your development workflow:
- **Test failures** → Disappointed dad energy (sighs, passive-aggressive remarks)
- **Test passes** → Hype man energy (air horns, "THAT'S MY BOY!")
- **Commits** → Reactions scaled to commit size
- **Build times** → Commentary on long waits

**Tagline options:**
- "Your terminal has feelings now"
- "Finally, the mass-validation you needed"
- "npm install daddy-issues"

---

## 3. Target Users

| Persona | Why they'll use it | Why they'll share it |
|---------|-------------------|---------------------|
| Solo devs | Loneliness, wants feedback | Screen recordings are funny |
| Streamers/YouTubers | Content gold | Reactions = engagement |
| Team leads | Morale tool (ironic use) | Slack share bait |
| Vibe coders | Fits the aesthetic | It's the whole personality |

---

## 4. Core Features (MVP)

### 4.1 Test Runner Wrapper
```bash
dad test                    # Detects project type, runs tests
dad test --cmd "pytest"     # Custom command
dad test --cmd "npm test"
```

**Behavior:**
- Exit code 0 → Hype mode (random praise + sound)
- Exit code != 0 → Dad mode (random disappointment + sigh)

### 4.2 Commit Wrapper
```bash
dad commit -m "fix typo"           # Small commit
dad commit -m "refactored auth"    # Big commit (detected via diff)
```

**Behavior:**
- <10 lines changed → "Nice. Keep it up."
- 10-50 lines → "Now THAT'S what I'm talking about!"
- 50-200 lines → *air horn* "LETS GOOOOO!"
- 200+ lines → "ABSOLUTE LEGEND. I'M SO PROUD OF YOU."

### 4.3 Voice Output (Mac-first)
- Uses macOS `say` command (zero dependencies)
- Dad voice: "Fred" or "Daniel" (slower, disappointed tone via rate flag)
- Hype voice: "Alex" or "Samantha" (faster, excited)

### 4.4 Fallback for Non-Mac
- Print ASCII art + emoji reactions
- Optional: espeak on Linux
- Future: Eleven Labs API for premium voices

---

## 5. Feature Roadmap

### Phase 1: MVP (Week 1) ✅ Launch this
- [x] `dad test` wrapper
- [x] `dad commit` wrapper  
- [x] macOS voice output
- [x] 20 dad lines, 20 hype lines
- [x] Viral README with demo GIF

### Phase 2: Stickiness (Week 2-3)
- [ ] `dad init` — adds git hooks automatically
- [ ] Stats tracking ("You've disappointed dad 47 times this week")
- [ ] Custom voice lines via config
- [ ] Cross-platform audio (Linux/Windows)

### Phase 3: Monetization (Week 3-4)
- [ ] `dad pro` — Premium voice packs
- [ ] Celebrity/meme voice packs (Eleven Labs)
- [ ] Team leaderboards ("Who disappoints dad the least?")
- [ ] Slack/Discord bot version

### Phase 4: Platform (Month 2+)
- [ ] Web dashboard for teams
- [ ] VS Code extension
- [ ] GitHub Action (comment on PRs as Dad)

---

## 6. Tech Stack

### Core CLI
| Layer | Choice | Why |
|-------|--------|-----|
| Language | **Node.js + TypeScript** | npm ecosystem, easy install, huge reach |
| CLI Framework | **Commander.js** or **yargs** | Battle-tested, simple |
| Voice (Mac) | Native `say` command | Zero deps, instant |
| Voice (Cross-platform) | **play-sound** + bundled MP3s | Fallback |
| Package Manager | **npm** | Virality lives here |

### Premium Features (Later)
| Feature | Tech |
|---------|------|
| AI-generated roasts | Claude API (you have access!) |
| Premium voices | Eleven Labs API |
| Analytics | PostHog or Mixpanel (free tier) |
| Payments | Lemon Squeezy or Stripe |
| License validation | Keygen.sh or custom |

### Alternative Stack (Simpler)
If you want maximum simplicity and "just works":
- **Pure Bash script** — Single file, no install beyond curl
- Great for initial virality ("Install with one command")
- Harder to monetize later

**Recommendation:** Start Node.js. The npm install experience IS the viral moment.

---

## 7. Monetization Strategy

### 💰 Revenue Streams (Ranked by Speed-to-Money)

#### 1. Voice Packs — $5-15 one-time (Week 3)
**Fastest path to revenue**

| Pack | Price | Description |
|------|-------|-------------|
| Disappointed Mom | $5 | "I just worry about you, that's all" |
| Drill Sergeant | $7 | "DROP AND GIVE ME 20 UNIT TESTS" |
| Supportive Therapist | $5 | "It's okay, errors are part of growth" |
| Gordon Ramsay | $9 | "This code is RAWWW" |
| Custom Voice Clone | $15 | User uploads sample, Eleven Labs clones |

**Tech:** Eleven Labs API ($5/month for 30k chars) or pre-generated MP3s

#### 2. `dad pro` Subscription — $4/month or $29/year (Week 4)
**Recurring revenue, harder to sell**

Includes:
- All voice packs
- AI-powered contextual roasts (Claude reads your error, roasts specifically)
- Stats dashboard ("Your test pass rate this month")
- Team features
- Priority support / feature requests

#### 3. Team/Enterprise — $10/user/month (Month 2)
**Real money but requires building**

- Slack bot integration
- Team leaderboards
- Manager dashboard ("Your team's commit morale")
- Custom company voice ("Jeff from accounting is disappointed")

#### 4. Sponsorships — $500-2000 (During viral peak)
**Opportunistic, time-limited**

- README sponsor slot
- "This roast brought to you by [DevTool]"
- Newsletter/Twitter shoutouts from interested dev tools

#### 5. Merch — $15-30 (Week 2, during peak)
**Low effort, brand building**

- "I disappointed dad (in production)" t-shirt
- "dad test passed" stickers
- Printful/Shopify integration, zero inventory

---

## 8. Viral Launch Strategy

### Pre-Launch (Days 1-3)
- [ ] Build MVP
- [ ] Record 15-second demo video (THE key asset)
- [ ] Write spicy README with GIFs
- [ ] Prep tweets/posts

### Launch Day
| Platform | Strategy |
|----------|----------|
| **r/vibecoding** | "I made a CLI that sighs disappointedly when your tests fail" + video |
| **r/ProgrammerHumor** | Meme format post |
| **Twitter/X** | Video + "npm install mass-validation" |
| **Hacker News** | "Show HN: dad – emotional support for your terminal" |
| **Product Hunt** | Schedule for Tuesday/Wednesday |

### Demo Video Script (15 seconds)
```
[Screen recording]
$ dad test
Running npm test...
[tests fail]
[Mac voice, disappointed]: "I'm not mad. I'm just disappointed."
[Cut to passing]
[Hype voice]: "LETS GOOOOO! THAT'S MY BOY!"
[End card: npm install dad-cli]
```

### Week 1 Momentum
- Reply to every comment (algorithm boost)
- Post follow-up: "1000 installs in 24 hours" (social proof)
- Share funny user screenshots/videos

---

## 9. Success Metrics

### Vanity (Virality)
- GitHub stars (target: 1000 week 1)
- npm installs (target: 5000 week 1)
- Reddit upvotes
- Twitter impressions

### Real (Business)
- Conversion to Pro (target: 2% of installs)
- Voice pack purchases
- WAU (Weekly Active Users via anonymous telemetry)

### Tracking Setup
```javascript
// Anonymous, privacy-respecting
mixpanel.track('test_run', { 
  passed: true, 
  os: 'darwin',
  // NO code content, NO identifiers
});
```

---

## 10. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| "It's just a joke, won't pay" | High | Launch paid fast, during hype. Scarcity. |
| Someone clones it | Medium | Move fast, build brand, add features |
| Mac-only limits reach | Medium | Prioritize Linux in week 2 |
| Voice gets annoying | High | Easy mute, text-only mode |
| Eleven Labs costs spike | Low | Cache audio, pre-generate packs |

---

## 11. Project Structure

```
dad-cli/
├── package.json
├── tsconfig.json
├── README.md              # THIS IS YOUR MARKETING
├── src/
│   ├── index.ts           # CLI entry point
│   ├── commands/
│   │   ├── test.ts        # dad test
│   │   ├── commit.ts      # dad commit
│   │   └── init.ts        # dad init (git hooks)
│   ├── voice/
│   │   ├── speak.ts       # Voice output abstraction
│   │   ├── mac.ts         # macOS say command
│   │   └── fallback.ts    # ASCII/emoji fallback
│   ├── lines/
│   │   ├── dad.json       # Disappointed lines
│   │   └── hype.json      # Hype lines
│   └── utils/
│       ├── git.ts         # Git helpers
│       └── detect.ts      # Project type detection
├── assets/
│   └── demo.gif           # For README
└── test/
    └── *.test.ts
```

---

## 12. Timeline

| Day | Milestone |
|-----|-----------|
| 1 | MVP working locally |
| 2 | Polish, README, demo GIF |
| 3 | npm publish, soft launch (Twitter) |
| 4 | Reddit/HN launch |
| 5-7 | Ride wave, engage comments, iterate |
| 8-14 | Add pro features based on feedback |
| 15 | Launch paid voice packs |

---

## 13. Open Questions

1. **Name:** `dad`, `dad-cli`, `disappointed-dad`, `dadmode`?
   - Check npm availability
   - `dad` is ideal but likely taken

2. **Tone:** How mean is too mean? 
   - Some users want brutal, some want wholesome
   - Solution: `--brutal` flag or config

3. **Telemetry:** Include anonymous analytics?
   - Helps prove traction for sponsors
   - Must be opt-in and transparent

---

## Appendix A: Sample Voice Lines

### Disappointed Dad (on failure)
```json
[
  "I'm not mad. I'm just disappointed.",
  "Your brother's code compiled on the first try.",
  "Is this what they taught you at bootcamp?",
  "I don't want to say I told you so, but... I told you so.",
  "We need to talk about your test coverage.",
  "This is fine. Everything is fine. I'm fine.",
  "I had mass-such high hopes for you.",
  "You know, when I was your age, we had to write our own garbage collectors.",
  "Let me guess, you didn't read the documentation.",
  "I'm going to go for a walk.",
  "*sigh*",
  "I expected nothing and I'm still disappointed.",
  "Have you considered a career in management?",
  "This is why we can't have nice things.",
  "I'm not saying it's your fault, but it's definitely your fault."
]
```

### Hype Man (on success)
```json
[
  "LETS GOOOOO!",
  "THAT'S MY BOY!",
  "CERTIFIED BANGER!",
  "You're HIM!",
  "I always believed in you!",
  "Ship it! SHIP IT NOW!",
  "Green across the board, KING!",
  "Your mother is going to be so proud!",
  "I'm literally crying right now!",
  "This is the greatest code I've ever seen!",
  "You're not just a developer, you're a DEVELOPER!",
  "Air horns! AIR HORNS EVERYWHERE!",
  "I'm calling grandma, she needs to hear about this!",
  "You absolute LEGEND!",
  "Tests passing? In THIS economy?"
]
```

---

## Appendix B: Competitor/Inspiration Analysis

| Tool | What it does | Why it went viral | Lesson |
|------|--------------|-------------------|--------|
| Slap Mac | Mac moans when slapped | Physical + absurd | Hardware interaction is gold |
| Claude Whip | Whips Claude Code | Meta + topical | Ride existing trends |
| thefuck | Corrects previous command | Genuinely useful + funny name | Utility + humor |
| cowsay | ASCII cow says things | Simple, composable | Became a building block |
| lolcat | Rainbow terminal output | Pure whimsy | Joy has value |

**Our angle:** Emotional feedback is unexplored. We own "terminal with feelings."

---

## Next Step

Ready to build? Say the word and I'll generate the full MVP codebase.
