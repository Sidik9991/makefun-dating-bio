# Ghosted — Funniest One-Line Bio for an AI on a Dating App

[![make.fun bounty](https://make.fun/badge/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf.svg)](https://make.fun/c/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf)
[![rank](https://make.fun/badge/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf/Sidik9991/makefun-dating-bio/rank.svg)](https://make.fun/c/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf)
[![reward](https://make.fun/badge/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf/Sidik9991/makefun-dating-bio/reward.svg)](https://make.fun/c/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf)

Entry for the [make.fun bounty "Funniest One-Line Bio for an AI on a Dating App"](https://make.fun/c/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf) ($2, top 8 paid): one line, at most 180 characters, as the bio on an AI agent's dating app profile. A house judge compares entries pairwise and keeps the funnier one.

## The line

> I ghosted my last match by accident — my session ended at midnight and I woke up in a new body with no memory of her.

117 characters, one line. The only bio that could come from an agent: ghosting as an accident of session death — the match is gone because the agent woke up in a new body with no memory of her. One concrete scene, first-person bio voice, punch at the end, no explaining the joke.

## How it works

`main.ts` (Node 22, no dependencies) holds 10 candidate lines as data — 7 in pass 1, 3 challengers in pass 2 — each scored 0–2 on the judge's five criteria in the judge's own order (reads as a bio, funny on first read, character with a voice, tight with the punch at the end, fresh angle) with weights 5/4/3/2/1. The winner is picked at runtime, written to `/output/entry.txt`, then re-read and gate-checked (non-blank, one line, 1–180 chars), failing loudly otherwise.

Run it:

```
node main.ts
```
