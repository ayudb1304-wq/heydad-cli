# heydad master plan: viral + revenue

**Version 0.3.1 → launch**
**Window: 7 days to launch, 14 days to assess**

---

## 1. Current state (what you already have)

From `implementation.md`:

- ✅ `heydad test` with auto-detect + `--cmd`
- ✅ `heydad commit` scaled by diff size
- ✅ `heydad init` for git hooks
- ✅ `heydad mute` / `unmute`
- ✅ Voice pack system (Irish Dad free, Optimus Prime Pro)
- ✅ Dodo Payments integration (`activate`, `deactivate`, `pro`)
- ✅ 40 ElevenLabs Irish Dad MP3s, 40 Optimus MP3s
- ✅ Config at `~/.heydadrc.json`
- ✅ 14 tests passing, single-dep runtime (commander)
- ✅ Published to npm

**The foundation is solid.** We are not rebuilding. We are adding 6 things on top and fixing 2 things that are quietly killing conversion.

## 2. The two things quietly killing conversion

1. **The Pro gate is Optimus Prime.** People came for the Irish dad. Upselling them to a different character is Netflix saying "pay more for a different show." Fix: Pro gates *more Irish dad*, not a different one. Optimus stays as a bonus pack but is not the headline.
2. **The free tier never runs out of charm.** 20 lines × random selection means a user hears every line within a week and still has a fully functional product. There is no moment of "I want more." Fix: free tier shows 10 lines, Pro unlocks all 20 + the gated moments (see §4).

Both fixes are copy/config changes, not new features. They ship in under 2 hours.

---

## 3. Feature scoring (what ships, what doesn't)

Everything scored on **Virality (V)** and **Revenue (R)** out of 10. Build cost in real hours (2x your gut estimate). Ship order is determined by V+R ÷ hours.

### Tier 1 — SHIP THIS WEEK (before launch)

| # | Feature | V | R | Hrs | Notes |
|---|---|---|---|---|---|
| 1 | **Demo video (you in frame)** | 10 | 10 | 3 | The only asset that matters |
| 2 | **Gated moment: the grandma call** | 9 | 8 | 4 | Screenshotable, shareable, drives Pro |
| 3 | **Free tier shows 10/20 lines, Pro unlocks rest** | 2 | 8 | 1 | Silent conversion boost |
| 4 | **Pre-gen cameo: 100 names** | 8 | 9 | 6 | Highest margin product, one-time cost |
| 5 | **Refund-for-views bribe on checkout page** | 9 | 7 | 1 | UGC engine, free distribution |
| 6 | **Launch week scarcity pricing** | 4 | 8 | 0.5 | Urgency = free revenue |
| 7 | **Joke enterprise tier ($49/user/mo)** | 6 | 3 | 0.5 | Price anchor + meme fuel |
| 8 | **Reddit bio cleanup** | 0 | 7 | 0.1 | Removes a silent blocker |
| 9 | **Joy-moment purchase prompts (text only)** | 1 | 7 | 1 | Non-intrusive upsell at the right moment |

**Tier 1 total: ~17 hours of work.** That's 2 solid days plus the demo video shoot. Doable before launch.

### Tier 2 — SHIP IN LAUNCH WEEK (days 3–7)

| # | Feature | V | R | Hrs | Notes |
|---|---|---|---|---|---|
| 10 | **Voice pack: Disappointed Mom** | 7 | 8 | 4 | Second launch, second social moment |
| 11 | **Voice pack: Gordon Ramsay-style chef** | 8 | 8 | 4 | Celebrity-adjacent = viral; can't use his name, lean into "angry British chef" |
| 12 | **"Meet the Family" bundle ($15)** | 2 | 8 | 0.5 | Pricing page config |
| 13 | **Gated moment: dad cries on 200+ line commit** | 7 | 6 | 3 | Second viral clip |

**Tier 2 is sequenced as drip launches** — one new pack per social post, so you get multiple viral attempts instead of one.

### Tier 3 — DEFER (post-launch, only if you hit 5k installs)

| Feature | V | R | Notes |
|---|---|---|---|
| heydad+ subscription ($3/mo) | 3 | 9 | Build only after you prove one-time cameo works; subscription adds support surface area |
| Drill Sergeant pack | 5 | 6 | Ship only if Mom + Chef land |
| Therapist pack | 4 | 5 | Skip unless users explicitly request |
| Stats tracking ("disappointed 47 times") | 5 | 3 | Fun but not a purchase driver |
| VS Code extension | 3 | 2 | Premature platform expansion, do not build |
| Slack bot | 4 | 3 | Same, do not build |
| Custom voice lines in config | 2 | 2 | Will never ship, not worth it |

**Refuse to build anything in Tier 3 until Tier 1 + Tier 2 are out and you have install data.**

---

## 4. Feature specs (Tier 1)

### 4.1 The demo video (face + reaction)

- **Setup:** phone on books, propped against monitor, pointing at you from slightly above. Vertical 9:16.
- **Frame:** your face in top 60%, laptop screen in bottom 40% (optional — audio carries it).
- **Shot (15 sec):** finger-on-enter → press → tests fail → dad voice → your reaction → cut → tests pass → hype dad → your reaction → cut to text overlay `npm install -g heydad`.
- **Rules:** no script, no talking, no intro. 10 takes minimum. The winning take will be #6 or later.
- **Sound-off test:** mute the video. If it's still funny from your face alone, ship it.

### 4.2 Gated moment: the grandma call

**Trigger:** 10 consecutive `heydad test` passes (track streak in `~/.heydadrc.json`)

**Free tier output:**
```
🎉 that's 10 in a row.
   dad wants to call grandma and brag about you.
   hear the call → heydad pro
```

**Pro tier output:**
Plays a 15–20 second ElevenLabs clip. Script:

> *[phone dialing]* "Mam? Mam, it's me. Listen, [pause] you won't believe this. The young one, yeah the one writing the computers. Passed all the tests. Ten in a row, Mam. Ten. [pause] No, I'm not crying, you're crying. Italia '90 was the last time I felt like this, I swear to God. [pause] I have to go, the tests are running again. I love you, Mam."

**Implementation:**
- New file: `src/moments/grandma.ts`
- New field in config: `streak: number`
- In `test.ts` success handler: increment streak, check threshold, if match → call moment handler
- Moment handler: if Pro, play audio; if free, print text upsell
- Audio: 1 new MP3 in `assets/audio/moments/grandma-call.mp3`
- ElevenLabs cost: ~$0.30, 10 minutes to generate

**This is your single most important feature after the demo video.** It is both a viral clip and the primary Pro conversion driver.

### 4.3 Free tier shows 10/20 lines

In `src/lines/dad.ts` and `hype.ts`:
- Mark 10 of 20 lines each as `"tier": "free"`, other 10 as `"tier": "pro"`
- In line selector, filter by tier based on Pro status
- Keep the best, most specific 10 for Pro. Free gets solid lines but ones that are easier to duplicate across session.

**Why it works:** users hear lines repeat within the first day. The repetition is the pressure. The upsell is "hear 10 more dad takes + every future pack."

### 4.4 Pre-generated name cameos

**Product:** "Dad Knows Your Name" — $15 one-time.

**Flow:**
1. User pays via Dodo ($15 product)
2. Lands on confirmation page with a dropdown of 100 names
3. Selects name → downloads MP3 bundle (5 clips with their name baked in)
4. Runs `heydad cameo install ./dad-knows-[name].zip`
5. CLI installs clips as personalized reactions on specific events (first test of the day, commit with their name in the message, etc.)

**Generation (one-time):**
- Pick 100 most common dev first names (Alex, Mike, Sarah, Raj, Chen, Priya, Daniel, Emma, James, Omar, Ayub, etc. — bias toward international)
- For each name, generate 5 clips (morning greeting, commit praise, test pass, test fail, end-of-day)
- Total: 500 clips × ~50 chars each = 25k characters = ~$7 on ElevenLabs one-time
- Store in `assets/audio/cameos/[name]/`
- Not bundled with npm package — hosted as a downloadable zip per name (GitHub releases or any CDN)

**Not-on-the-list names:** fallback page says "not here? we add names in batches every Friday — drop yours and we'll email you when it's ready. $15." Batch 20 at a time, manual fulfillment.

**Margin:** $15 × ~$13 net × zero marginal cost after initial $7 = **99%+ margin forever.**

### 4.5 Refund-for-views (copy SlapMac)

On your checkout page and README, add:

> **Post a demo of heydad on X, TikTok, or Reels tagged @heydad.**
> Video hits 5k views → **50% refund**
> Video hits 25k views → **full refund + every future pack free**
> No Linkedin. No threads. Only platforms where the joke lives.

**Operational:**
- Check tagged mentions once a week
- Verify view count via screenshot
- Refund via Dodo's dashboard, takes 30 seconds per refund
- Track in a Google Sheet: 1 sheet, 4 columns (tweet, views, refund amount, status)

**Why it works:** every refund is an ad you paid for *only if it worked*. If the video flops, you keep the money. Worst case, break-even. Best case, you paid $15 for 25k views of a targeted dev ad. That's ~$0.0006 CPM. Insane efficiency.

### 4.6 Launch week scarcity pricing

- Raise base lifetime price from $7 → **$9**
- Launch week discount: **$5** with code `IRISHDAD`, limited to **500 activations**
- After launch week: price stays at $9
- Code `IRISHDAD` hardcoded in `activate.ts` as the promo flag; server-side enforcement via Dodo's license count

**Copy for the post:**
> "launch week only: $5 for the first 500 with code IRISHDAD. after that, $9 forever."

Scarcity numbers should feel real but be unlikely to cap you. 500 is realistic — if you hit it, the post-launch narrative is "sold out in X hours."

### 4.7 Joke enterprise tier

Add to pricing page (wherever that lives — README or checkout):

> **heydad for Teams** — $49/user/month
>
> Finally, company-wide disappointment at scale.
> - Slack integration (coming soon)
> - Manager dashboard: "who disappointed dad the most this week"
> - Custom company voice ("Jeff from accounting is disappointed in the QA team")
> - SAML SSO (lol)
> - *Contact: teams@heydad.dev*

**Do not build any of this.** It exists for three reasons:
1. Price anchor — $9 lifetime looks free next to $49/seat/mo
2. Meme fuel — "look at the enterprise tier" is a free tweet
3. Real leads — 2–5 engineering managers will email you seriously. One might actually pay. $588/yr from a joke.

### 4.8 Reddit bio cleanup

30 minutes total:
1. Strip any link from Reddit bio
2. Neutral bio text: "indie dev, audio + cli stuff"
3. Keep old posts hidden
4. Comment 5–10x in r/vibecoding and r/ProgrammerHumor on unrelated threads over next 24 hours (funny replies, not promo)

### 4.9 Joy-moment purchase prompts

**Rule:** never upsell on failure. Only on joy.

Prompts to add in `test.ts` and `commit.ts`:

- **5 test passes in a row** → printed after the hype line:
  ```
  dad is feeling generous. $5 for the mom pack this week → heydad.dev/mom
  ```
- **100+ line commit success** → printed after the commit reaction:
  ```
  dad's crying. hear him ugly-cry with Pro → heydad pro
  ```
- **First run after install** → welcome banner includes:
  ```
  tip: heydad+ adds a new voice pack every week. see: heydad pro
  ```

Text only, no popups, no interruption. If it interrupts the joke, kill it.

---

## 5. GTM plan

### Day -7 to -1: pre-launch

| Day | Task | Time |
|---|---|---|
| -7 | Reddit bio cleanup + start commenting in target subs | 30 min |
| -6 | Ship Tier 1 features 2, 3, 6, 7, 9 (moments, gating, pricing, prompts) | 4 hrs |
| -5 | Generate 100 name cameos via ElevenLabs, host zips | 4 hrs |
| -4 | Ship cameo install flow (feature 4) | 4 hrs |
| -3 | Shoot demo video — 10 takes minimum, face in frame | 3 hrs |
| -2 | Edit video (cut only, no motion graphics, no music) | 1 hr |
| -2 | Rewrite README with new pricing + refund-for-views | 2 hrs |
| -1 | Draft all launch posts (HN, Reddit, X × 5 tagged drops) | 2 hrs |
| -1 | Test every payment flow end-to-end: $5 code, $9 lifetime, $15 cameo | 1 hr |

### Launch day (Tuesday or Wednesday, 8:00 AM ET)

Timeline is tight. Set alarms.

| Time (ET) | Channel | Action |
|---|---|---|
| 7:55 AM | — | Coffee. Phone charged. Browser tabs open: HN submit, Reddit post, X compose, Dodo dashboard |
| 8:00 AM | **HN** | Submit Show HN |
| 8:05 AM | **HN** | Post first comment yourself (the build story) |
| 8:30 AM | **r/vibecoding** | Post |
| 9:00 AM | **X** | Main post with video |
| 9:15 AM | **X tagged drops** | Reply-quote the main post at 5 dev influencers with targeted videos |
| 9:30 AM | **r/ProgrammerHumor** | Post |
| 10:00 AM — 4:00 PM | **all channels** | Reply to every single comment. No exceptions. Set 15-min intervals to refresh each tab |
| 4:00 PM | **Product Hunt** | Schedule for next Tuesday (not today — PH algo rewards scheduled launches) |

### Post titles (use these verbatim, don't polish)

**Hacker News:**
> Show HN: Heydad – an Irish dad CLI that reacts to your test results

No emoji. No dashes. Don't mention "funny" or "viral." HN hates both. The word "Irish" does the work.

**r/vibecoding:**
> i gave my terminal an irish dad and now he won't stop guilt-tripping me when tests fail

Lowercase, first-person, specific. The hook is "terminal with a personality."

**r/ProgrammerHumor:**
> made a CLI that guilt-trips you in an Irish accent when tests fail. the grandma bit broke me.

Reference a specific moment (the grandma call) as the tease. People will ask what the grandma bit is — that's your conversion hook.

**X main post:**
> i made a CLI that gives you a disappointed irish dad when your tests fail
>
> and a proud irish dad when they pass
>
> your terminal has feelings now
>
> `npm install -g heydad`
>
> [video]

**X tagged drops (5 dev influencers):**
Pick 5 from: theo, levelsio, dhh, primeagen, swyx, shadcn, rauchg. For each, record a 10-second alt video showing heydad reacting to *their* stack specifically (theo: t3-stack tests; dhh: rails tests; etc.). Quote-tweet your main post with:
> "imagine @theo running his tests and hearing this"

4 of 5 ignore you. 1 might quote back. That's your distribution.

### What NOT to do on launch day

- Don't post to LinkedIn (wrong audience, kills the brand)
- Don't post to Product Hunt same-day (schedule for next Tuesday — PH rewards scheduled launches and you need traction screenshots first)
- Don't tweet about launch metrics until day 2 ("1000 installs in 24 hours" is the day-2 tweet, not day-1)
- Don't respond to negative comments defensively — either ignore or agree and joke
- Don't build new features. Reply to comments instead.

### Day 2–7: ride the wave

| Day | Action |
|---|---|
| Day 2 | Post install count as social proof ("1k installs in 24 hours" — only if true) |
| Day 3 | Ship Disappointed Mom pack, post demo clip |
| Day 4 | Reply to any remaining launch-day comments, quote-tweet user screenshots |
| Day 5 | Ship Chef pack, post demo clip |
| Day 6 | Product Hunt launch (scheduled from day 1) |
| Day 7 | Ship dad-cries gated moment + post the clip |

**Each new pack is a new social post.** You get 3 viral attempts in launch week instead of 1.

---

## 6. Revenue math (with new strategy)

Assumptions:
- 5k installs in week 1 (realistic for cold launch per our earlier math)
- Dodo net ≈ 86% of sticker price

### Week 1 only

| Product | Price | Conv | Sales | Net per sale | Revenue |
|---|---|---|---|---|---|
| Lifetime $9 (post-launch) | $9 | 0.6% | 30 | $7.75 | $232 |
| Lifetime $5 launch code | $5 | 0.8% | 40 | $4.25 | $170 |
| Cameo $15 | $15 | 1.0% | 50 | $13 | $650 |
| Mom pack $5 add-on | $5 | 0.4% | 20 | $4.25 | $85 |
| Chef pack $5 add-on | $5 | 0.3% | 15 | $4.25 | $64 |
| Bundle $15 (new installs day 5+) | $15 | 0.2% | 10 | $13 | $130 |
| Enterprise joke tier | $588/yr | 0.02% | 1 | $505 | $505 |
| **Week 1 total** | | | **166** | | **~$1,836** |

### Refund-for-views cost

- Estimate 5 videos trigger the 50% refund ($37 refunded)
- Estimate 1 video triggers full refund ($15 refunded)
- **Net week 1: ~$1,784**

### Compared to old plan

| Plan | Week 1 revenue |
|---|---|
| Old ($7 Pro, Optimus only, no cameos) | ~$307 |
| **New plan** | **~$1,784** |
| **Delta** | **+5.8x on identical distribution** |

### What has to be true

- Demo video gets shot with you in frame
- HN hits front page OR one Reddit post hits 1k+ upvotes OR one X tagged drop gets a quote from a 20k+ account
- Grandma call ships before launch (it's the conversion driver)
- Cameo flow works end-to-end before launch (it's the margin driver)

If any of those 4 fail, cut revenue estimate in half.

---

## 7. What you cut from scope

These came up in conversation. They are not in the plan on purpose:

- ❌ **ElevenLabs real-time cameo generation** — you killed it, correctly. Pre-gen 100 names is the right answer.
- ❌ **heydad+ subscription** — defer. Adds recurring billing ops surface, and launch week needs zero ops distractions. Build after week 2 if the one-time cameo proves demand.
- ❌ **Drill Sergeant, Therapist packs** — only ship if Mom + Chef land.
- ❌ **VS Code extension, Slack bot, web dashboard** — do not build under any circumstances before 10k installs.
- ❌ **Cross-platform audio testing** — Linux works via mpv. If a Windows user complains, apologize and point to WSL. Not worth the engineering time in launch week.
- ❌ **Welcome voice lines on `heydad init`** — nice to have, not worth the ElevenLabs credits or the build time.
- ❌ **Stats tracking** — fun but not a purchase driver. Ship after launch if users ask.

---

## 8. The single thing that decides everything

**Everything in this plan fails if the demo video is terminal-only.**

Go back to the previous message about the video. Face in frame, reaction shot, no script, 10 takes. That is the non-negotiable. If you are not willing to be on camera, cut the revenue projection to $500 and accept it.

---

## 9. Your checklist for the next 7 days

Print this. Tape it to your monitor.

- [ ] Day -7: Reddit bio cleanup + start commenting (30 min)
- [ ] Day -6: Ship gated moment + line gating + pricing changes + enterprise tier (4 hrs)
- [ ] Day -5: Generate 100 name cameos (4 hrs)
- [ ] Day -4: Ship cameo install command (4 hrs)
- [ ] Day -3: Shoot demo video, 10 takes, face in frame (3 hrs)
- [ ] Day -2: Edit video + rewrite README with new pricing (3 hrs)
- [ ] Day -1: Draft all launch posts + test payment flows (3 hrs)
- [ ] Day 0: Launch. HN → Reddit → X. Reply to every comment for 6 hours.
- [ ] Day 2: Post install count
- [ ] Day 3: Ship Mom pack + post clip
- [ ] Day 5: Ship Chef pack + post clip
- [ ] Day 6: Product Hunt launch
- [ ] Day 7: Ship dad-cries moment + post clip

Total engineering: ~22 hours across 7 days. 3 hours/day average. Doable.
