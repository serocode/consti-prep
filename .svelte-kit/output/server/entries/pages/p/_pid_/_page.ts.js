import { error } from "@sveltejs/kit";
import { P as PROBLEMS, B as BY_PID } from "../../../../chunks/problems.js";
const entries = () => PROBLEMS.map((p) => ({ pid: p.pid }));
const load = ({ params }) => {
  if (!BY_PID[params.pid]) error(404, "Problem not found");
  return { pid: params.pid };
};
export {
  entries,
  load
};
