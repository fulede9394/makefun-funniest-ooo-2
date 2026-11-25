// An out-of-office guarded by an intern who answers everything with a GIF.
// The intern has one job: guard the inbox. The inbox has 4,000 friends.
import { closeSync, mkdirSync, openSync, writeSync } from "node:fs";
import { join } from "node:path";

const oooReply =
  "I'm out of office until Monday. My inbox is being guarded by an intern who thinks 'urgent' means 'answer with a GIF'.";

const rules = Object.freeze({ maxChars: 160, fileName: "entry.txt" });

function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function validate(text: string): void {
  if (text.length > rules.maxChars) throw new Error("reply is too long");
  if (countWords(text) < 5) throw new Error("reply is too short to be funny");
  if (!text.includes("GIF")) throw new Error("reply lost its intern");
  if (!text.includes("Monday")) throw new Error("reply lost its Monday");
}

function main(): void {
  validate(oooReply);
  const folder = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdirSync(folder, { recursive: true });
  const fd = openSync(join(folder, rules.fileName), "w");
  try {
    writeSync(fd, oooReply, 0, "utf8");
  } finally {
    closeSync(fd);
  }
}

main();
