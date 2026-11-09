import { P as PROBLEMS } from "./problems.js";
const emptyDraft = () => ({ a: "", l: "", p: "", c: "", full: "" });
const defaults = () => ({
  version: 1,
  attempts: {},
  drafts: {},
  prefs: {
    mode: "guided",
    theme: "system",
    part: "all",
    type: "all",
    status: "all"
  }
});
function load() {
  const d = defaults();
  return d;
}
const store = load();
let storageOk = true;
const storageStatus = {
  get ok() {
    return storageOk;
  }
};
function attemptsFor(pid) {
  return store.attempts[pid] ?? [];
}
function bestScore(pid) {
  let b = -1;
  for (const a of attemptsFor(pid)) if (a.score > b) b = a.score;
  return b;
}
function filteredProblems() {
  const { part, type, status } = store.prefs;
  return PROBLEMS.filter((p) => {
    if (part !== "all" && String(p.c.part) !== part) return false;
    if (type !== "all" && p.type !== type) return false;
    const b = bestScore(p.pid);
    if (status === "new" && b >= 0) return false;
    if (status === "weak" && !(b >= 0 && b < 4)) return false;
    return true;
  });
}
function navList(pid) {
  const list = filteredProblems();
  return list.some((p) => p.pid === pid) ? list : PROBLEMS;
}
function draftFor(pid) {
  if (!store.drafts[pid]) store.drafts[pid] = emptyDraft();
  return store.drafts[pid];
}
function setLastScore(pid, score) {
  const a = store.attempts[pid];
  if (!a?.length) return;
  a[a.length - 1].score = score;
  a[a.length - 1].overridden = true;
}
export {
  storageStatus as a,
  bestScore as b,
  attemptsFor as c,
  draftFor as d,
  setLastScore as e,
  filteredProblems as f,
  navList as n,
  store as s
};
