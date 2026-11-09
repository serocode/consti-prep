// @ts-nocheck
import { error } from '@sveltejs/kit';
import { BY_PID, PROBLEMS } from '$lib/problems';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => PROBLEMS.map((p) => ({ pid: p.pid }));

export const load = ({ params }: Parameters<PageLoad>[0]) => {
	if (!BY_PID[params.pid]) error(404, 'Problem not found');
	return { pid: params.pid };
};
