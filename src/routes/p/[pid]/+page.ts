import { error } from '@sveltejs/kit';
import { BY_PID, PROBLEMS } from '$lib/problems';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => PROBLEMS.map((p) => ({ pid: p.pid }));

export const load: PageLoad = ({ params }) => {
	if (!BY_PID[params.pid]) error(404, 'Problem not found');
	return { pid: params.pid };
};
