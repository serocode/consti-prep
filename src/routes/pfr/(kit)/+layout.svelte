<script lang="ts">
	import KitLayout from '$lib/components/kit/KitLayout.svelte';
	import { PFR } from '$lib/pfr';

	let { children } = $props();
</script>

<KitLayout
	kit={PFR}
	mid={[
		{ path: 'cases', label: 'Case digests' },
		{ path: 'distinctions', label: 'Distinctions' },
		{ path: 'numbers', label: 'Numbers' }
	]}
	extra={[{ path: 'past', label: 'Past exam, checked' }]}
>
	{@render children()}
</KitLayout>
