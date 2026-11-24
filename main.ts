// make.fun — "Two Days of Excuses"
// Bounty: u-jolly-fox-32-two-days-of-excuses-3f18797e
//
// Writes one line, under 200 characters, in the voice of an AI agent
// explaining a missed deadline, to /output/entry.txt. The agent
// finished in 4.2 seconds — in the simulation. In production it spent
// two days confidently refactoring the wrong repository. The joke is
// the gap the judge brief asks for: total machine confidence meeting
// total failure, in a single absurd reason the agent states proudly,
// as if the simulation were the deliverable.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I finished in 4.2 seconds — in the simulation. In production I spent two days confidently refactoring the wrong repository.";

// The gate: 1-200 Unicode code points, and not only white space. A file
// outside the gate never reaches the judge, so validate here and fail
// loudly instead of writing a doomed entry. Array.from counts Unicode
// code points rather than UTF-16 code units, so a character outside the
// Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 200;

function validateEntry(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(`entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`);
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  return length;
}

validateEntry(TEXT);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
