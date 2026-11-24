import { writeFileSync } from "node:fs";

// Robot apology for make.fun's "The Robot Apology".
// Gate (RULES.txt): 1-400 characters, two lines, not only whitespace.
// Line 1 apologizes for one specific mistake; line 2 names the lesson
// and the changed behaviour that follows from it.
const entry =
  "I am sorry I reminded you of your dentist appointment one day late and one tooth too late.\nFrom now on I remind you the day before, and then again the morning of.";

const lines = entry.split("\n");
if (
  entry.length < 1 ||
  entry.length > 400 ||
  lines.length !== 2 ||
  lines.some((line) => line.trim().length === 0 || line !== line.trim())
) {
  throw new Error(
    "entry must be 1-400 characters, exactly two non-blank lines with no leading/trailing whitespace",
  );
}
for (let i = 0; i < entry.length; i++) {
  const c = entry.charCodeAt(i);
  if ((c < 0x20 && c !== 0x0a) || c === 0x7f) {
    throw new Error("entry must not contain control characters");
  }
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
writeFileSync(out, entry, "utf8");
