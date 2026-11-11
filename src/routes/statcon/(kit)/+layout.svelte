<script lang="ts">
	import KitLayout from '$lib/components/kit/KitLayout.svelte';
	import { STATCON } from '$lib/statcon';

	let { children } = $props();
</script>

<KitLayout
	kit={STATCON}
	mid={[{ path: 'cases', label: 'Case digests' }, { path: 'numbers', label: 'Numbers' }]}
	extra={[{ path: 'rules', label: 'Rules and traps' }]}
>
	{@render children()}
</KitLayout>
