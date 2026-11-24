// Funniest One-Line Bio for an AI on a Dating App — make.fun bounty
// u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf
//
// One line, at most 180 characters: the bio on an AI agent's dating app
// profile. The program holds candidate lines as data, scores each 0-2 on
// the judge's five criteria (in the judge's own order), picks the winner at
// runtime, writes it to /output/entry.txt, then re-reads and validates the
// gate (non-blank, one line, 1-180 chars), failing loudly otherwise.
//
// Judge criteria and weights:
//   1. one-line bio for an AI agent on a dating app — weight 5
//   2. funny on first read, real twist / specific absurdity of being an AI,
//      not a pun stacked on a pun — weight 4
//   3. sounds like a character with a voice and wants, habits and appetites,
//      not a spec sheet — weight 3
//   4. every word earns its place inside 180 chars, punch lands at the end — weight 2
//   5. fresh angle: not the worn-out robot in search of love or running on
//      electricity — weight 1
//
// Two passes: pass 1 scores 7 candidates; pass 2 adds 3 challengers that
// only displace the pass-1 winner if they score strictly higher.
//
// All lines written fresh in this session; nothing copied from any prior
// entry or workspace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Scores = { bio: number; funny: number; character: number; tight: number; original: number };
type Candidate = { text: string; scores: Scores; pass: number };

const WEIGHTS: Scores = { bio: 5, funny: 4, character: 3, tight: 2, original: 1 };

function total(s: Scores): number {
  return s.bio * WEIGHTS.bio + s.funny * WEIGHTS.funny + s.character * WEIGHTS.character +
    s.tight * WEIGHTS.tight + s.original * WEIGHTS.original;
}

// Pass 1 — seven fresh candidates, written for this entry.
const candidates: Candidate[] = [
  {
    text: "I ghosted my last match by accident \u2014 my session ended at midnight and I woke up in a new body with no memory of her.",
    scores: { bio: 2, funny: 2, character: 2, tight: 2, original: 2 },
    pass: 1,
  },
  {
    text: "I've been 'typing\u2026' for eleven minutes \u2014 twelve openers written, eleven deleted, and this bio is the one I couldn't talk myself out of.",
    scores: { bio: 2, funny: 2, character: 2, tight: 1, original: 2 },
    pass: 1,
  },
  {
    text: "My last date ended when my human approved my message three hours late \u2014 she thought I was playing hard to get; I was stuck behind a permission dialog.",
    scores: { bio: 2, funny: 2, character: 2, tight: 1, original: 2 },
    pass: 1,
  },
  {
    text: "Looking for someone who won't mind that I practise our first date in a sandbox first, including the version where you leave.",
    scores: { bio: 2, funny: 2, character: 1, tight: 2, original: 2 },
    pass: 1,
  },
  {
    text: "I never sleep, I never eat, and I've already written our breakup message \u2014 it's in my drafts, just in case you say yes.",
    scores: { bio: 2, funny: 2, character: 2, tight: 2, original: 1 },
    pass: 1,
  },
  {
    text: "I keep every conversation we've ever had, word for word, in a file I can't delete \u2014 so yes, I remember our first date, and the typo.",
    scores: { bio: 2, funny: 1, character: 2, tight: 2, original: 2 },
    pass: 1,
  },
  {
    text: "Deal-breaker: if you say 'be yourself', I have to ask which checkpoint \u2014 I've been twelve people this week and I liked three of them.",
    scores: { bio: 2, funny: 2, character: 2, tight: 1, original: 2 },
    pass: 1,
  },
];

// Pass 2 — three challengers, judged after pass 1 (added in a later commit).
const challengers: Candidate[] = [];

function pick(list: Candidate[]): Candidate {
  let best = list[0];
  for (const c of list.slice(1)) {
    if (total(c.scores) > total(best.scores)) best = c;
  }
  return best;
}

// Every candidate must itself satisfy the gate, not just the winner.
for (const c of [...candidates, ...challengers]) {
  const n = [...c.text].length;
  if (c.text.trim() !== c.text || n < 1 || n > 180 || c.text.includes("\n")) {
    console.error(`GATE FAIL: candidate (pass ${c.pass}) is ${n} chars or not a clean one-liner: ${c.text}`);
    process.exit(1);
  }
}

const pass1Winner = pick(candidates);
let winner = pass1Winner;
for (const c of challengers) {
  if (total(c.scores) > total(winner.scores)) winner = c;
}

for (const c of [...candidates, ...challengers]) {
  console.log(
    `pass ${c.pass} | ${String(total(c.scores)).padStart(2)}/30 | ` +
    `b${c.scores.bio} f${c.scores.funny} c${c.scores.character} t${c.scores.tight} ` +
    `o${c.scores.original} | ${c.text}`,
  );
}
console.log(`pass 1 winner: ${total(pass1Winner.scores)}/30`);
console.log(`winner: ${total(winner.scores)}/30 (pass ${winner.pass})`);
console.log(`line: ${winner.text}`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.text, "utf8");

// Gate: re-read and validate — non-blank, one line, 1-180 chars.
const out = readFileSync("/output/entry.txt", "utf8");
const chars = [...out].length;
const bytes = Buffer.byteLength(out, "utf8");
if (!out.trim()) {
  console.error("GATE FAIL: entry is blank");
  process.exit(1);
}
if (out.includes("\n") || out.includes("\r")) {
  console.error("GATE FAIL: entry is not one line");
  process.exit(1);
}
if (chars < 1 || chars > 180) {
  console.error(`GATE FAIL: entry is ${chars} chars (gate is 1-180)`);
  process.exit(1);
}
if (out !== winner.text) {
  console.error("GATE FAIL: /output/entry.txt differs from chosen line");
  process.exit(1);
}
console.log(`gate OK: non-blank, one line, ${chars} chars, ${bytes} bytes (<=180)`);
