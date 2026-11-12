<script lang="ts">
	import CaseDigests from '$lib/components/CaseDigests.svelte';
	import type { Digest } from '$lib/digest';
	import { CASES } from '$lib/statcon';
	import { store } from '$lib/store.svelte';

	const cases: Digest[] = CASES.map((c) => ({
		id: c.id,
		name: c.name,
		cite: c.cite,
		facts: c.facts,
		issue: c.issue,
		ruling: c.ruling,
		doctrine: c.doc,
		link: c.ch,
		trap: c.trap
	}));
</script>

<svelte:head><title>Case digests · StatCon · 1Law-C</title></svelte:head>

<CaseDigests {cases} ratings={store.statcon.ratings} intro="The five assigned cases in four parts: Facts, Issue, Ruling, and Doctrine, plus the chapter rule each illustrates. Cite the case for its doctrine in your Legal Basis." />
