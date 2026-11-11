<script lang="ts">
	import ConstiTabs from '$lib/components/ConstiTabs.svelte';

	let { children } = $props();
</script>

<main class="page">
	<div class="intro">
		<span class="eyebrow">Arts. VI–IX · 28 assigned cases</span>
		<h1>Consti I Finals Kit</h1>
	</div>
	<ConstiTabs />
	{@render children()}
</main>

<style>
	.intro {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 12px;
	}
	h1 {
		font-size: 24px;
		font-weight: 600;
		letter-spacing: -0.015em;
	}
</style>
