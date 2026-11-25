// An out-of-office guarded by an intern who answers everything with a GIF.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I'm out of office until Monday. My inbox is being guarded by an intern who thinks 'urgent' means 'answer with a GIF'.";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
