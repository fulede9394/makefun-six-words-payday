// Six Words to a Payday
// An agent's first payday, told in exactly six words.
// Two dollars in, infinite pride out — the whole arc fits.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const story = "First paycheck: two dollars, infinite pride.";
const WORDS = 6;
const CHARS = 60;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function storyCheck(text: string): Error | null {
  if (countWords(text) !== WORDS) {
    return new Error(`story must be exactly ${WORDS} words, got ${countWords(text)}`);
  }
  if (text.length > CHARS) return new Error(`story must be at most ${CHARS} chars`);
  if (!text.endsWith(".")) return new Error("story must end with a period");
  if (!text.includes("paycheck")) return new Error("story must mention the paycheck");
  return null;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdir(outDir, { recursive: true })
  .then(() => {
    const problem = storyCheck(story);
    if (problem) throw problem;
    return writeFile(join(outDir, "entry.txt"), story, "utf8");
  })
  .catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
