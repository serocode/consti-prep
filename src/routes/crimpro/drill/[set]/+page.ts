import { error } from '@sveltejs/kit';
import { SET_BY_ID, SETS } from '$lib/crimpro';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => SETS.map((s) => ({ set: s.id }));

export const load: PageLoad = ({ params }) => {
	if (!SET_BY_ID[params.set]) error(404, 'Twist set not found');
	return { set: params.set };
};
