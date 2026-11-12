<script lang="ts">
	import CaseDigests from '$lib/components/CaseDigests.svelte';
	import { DIGESTS, GROUP_LABEL, PFR } from '$lib/pfr';
	import { store } from '$lib/store.svelte';

	const groups = PFR.groups.filter((g) => DIGESTS.some((c) => c.group === g.id)).map((g) => ({ id: g.id, label: GROUP_LABEL[g.id], title: g.title }));
</script>

<svelte:head><title>Case digests · PFR · 1Law-C</title></svelte:head>

<CaseDigests cases={DIGESTS} {groups} ratings={store.pfr.ratings} />
