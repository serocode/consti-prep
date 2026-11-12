<script lang="ts">
	import CaseDigests from '$lib/components/CaseDigests.svelte';
	import raw from '$lib/data/consti-digests.json';
	import type { Digest } from '$lib/digest';
	import { LIKELY_CASES } from '$lib/focus/consti';
	import { CASES, PARTS, PART_SHORT, type PartNo } from '$lib/problems';

	const D = raw as Record<string, { facts: string; issue: string; ruling: string }>;
	const cases: Digest[] = CASES.map((c) => ({
		id: c.id,
		name: c.name,
		cite: c.cite,
		group: c.part,
		...D[c.id],
		doctrine: c.rule,
		star: LIKELY_CASES[c.id],
		points: c.doc,
		trap: c.key,
		practice: { href: `/p/${c.id}-drill`, label: 'Practice the case drill' },
		hook: c.hook
	}));
	const groups = ([1, 2, 3, 4] as PartNo[]).map((n) => ({ id: n, label: PART_SHORT[n], title: PARTS[n] }));
</script>

<svelte:head><title>Case digests · Consti I · 1Law-C</title></svelte:head>

<CaseDigests {cases} {groups} intro="Each of the 28 cases in four parts: Facts, Issue, Ruling, and Doctrine. The digests are short on purpose; read the full text of the ★ Likely cases." />
