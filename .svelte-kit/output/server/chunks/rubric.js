const BANDS = [
  "No answer, or irrelevant, incoherent or nonsensical text.",
  "Incorrect conclusion, and the answer shows a lack of ability to reason and communicate, though it is a real attempt.",
  "Incorrect conclusion, but the analysis shows capacity for sound legal reasoning and communication.",
  "Correct conclusion, but incorrect legal bases, or correct bases mixed with incorrect, inapplicable or inappropriate ones.",
  "Correct conclusion and correct legal bases, with flaws in grammar or presentation.",
  "Correct conclusion, correct legal bases, and a clear, complete, polished answer with minimal grammar errors."
];
const BAND_SHORT = [
  "Blank / irrelevant",
  "Wrong · weak",
  "Wrong · sound reasoning",
  "Right · wrong basis",
  "Right · grammar flaws",
  "Right · polished"
];
const CHECK_ITEMS = [
  {
    key: "conclusion",
    label: "My conclusion matches the reference",
    help: "Same result (valid/invalid, yes/no), even in different words.",
    fix: "Your conclusion went the other way. Re-read the key point, then decide which way the rule cuts on these facts."
  },
  {
    key: "basis",
    label: "I stated the correct legal basis",
    help: "The governing provision or doctrine. Plain words are fine; exact codal text is not required.",
    fix: "State the governing rule. Start with “The Constitution provides that…” and add the doctrine with “Jurisprudence provides that…”."
  },
  {
    key: "noWrong",
    label: "I cited nothing wrong or inapplicable",
    help: "No wrong article or section, wrong doctrine, or rule that does not apply.",
    fix: "Drop the incorrect or inapplicable basis. Mixing a wrong rule with the right one caps your score at 3."
  },
  {
    key: "application",
    label: "My application uses the facts",
    help: "Each relevant fact is tied to the rule. Not a repeat of the facts.",
    fix: "Start Application with “Here,” and borrow the problem’s own words. Say what each fact proves under the rule."
  },
  {
    key: "polished",
    label: "Clear and polished, minimal grammar errors",
    help: "Complete sentences, correct agreement and tense, ALAC in order.",
    fix: "Polish the English: one idea per sentence, check subject–verb agreement, and end with “Therefore,”."
  }
];
const REASONING_ITEM = {
  key: "reasoning",
  label: "My reasoning was still sound and coherent",
  help: "Even with the wrong result, the answer is organized and refers to legal authority.",
  fix: "Even when unsure of the result, keep the structure: rule, facts matched to the rule, then a conclusion."
};
function fixesFor(c) {
  const out = [];
  for (const it of CHECK_ITEMS) if (!c[it.key]) out.push(it.fix);
  if (!c.conclusion && !c.reasoning) out.push(REASONING_ITEM.fix);
  return out;
}
function scoreTag(s) {
  return s >= 4 ? "tag tag-ok" : s === 3 ? "tag tag-warn" : "tag tag-bad";
}
export {
  BANDS as B,
  CHECK_ITEMS as C,
  REASONING_ITEM as R,
  BAND_SHORT as a,
  fixesFor as f,
  scoreTag as s
};
