import { error } from '@sveltejs/kit';
import { PROBLEM_BY_PID, STATCON } from '$lib/statcon';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => STATCON.problems.map((p) => ({ pid: p.pid }));

export const load: PageLoad = ({ params }) => {
	if (!PROBLEM_BY_PID[params.pid]) error(404, 'Problem not found');
	return { pid: params.pid };
};
