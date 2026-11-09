<script lang="ts">
	import '../app.css';
	import { store, storageStatus, type Theme } from '$lib/store.svelte';
	import Disclaimer from '$lib/components/Disclaimer.svelte';

	let { children } = $props();
	let showDisclaimer = $state(false);

	const themes: [Theme, string][] = [
		['system', 'Auto'],
		['light', 'Light'],
		['dark', 'Dark']
	];
</script>

<header class="top">
	<div class="top-in">
		<a class="brand" href="/" aria-label="ALAC home">
			<svg width="26" height="26" viewBox="0 0 28 28" aria-hidden="true">
				<rect width="28" height="28" rx="6" style="fill:var(--text)" />
				<rect x="7" y="8" width="14" height="2" rx="1" style="fill:var(--surface)" />
				<rect x="7" y="12" width="10" height="2" rx="1" style="fill:var(--surface)" />
				<rect x="7" y="16" width="14" height="2" rx="1" style="fill:#EA580C" />
				<rect x="7" y="20" width="8" height="2" rx="1" style="fill:var(--surface)" />
			</svg>
			<span class="stack"><b>ALAC</b><span>Consti I · Finals practice</span></span>
		</a>
		<div class="seg" role="group" aria-label="Theme">
			{#each themes as [value, label] (value)}
				<button aria-pressed={store.prefs.theme === value} onclick={() => (store.prefs.theme = value)}>{label}</button>
			{/each}
		</div>
	</div>
</header>

{#if !storageStatus.ok}
	<div class="page" style="padding-block:12px 0">
		<div class="note note-bad" role="alert">
			This browser is not saving your progress (private mode or storage is full). Export a backup from the home page before you close the tab.
		</div>
	</div>
{/if}

{@render children()}

<footer class="foot">
	All review material and model answers are AI-generated and may contain errors.
	<button class="btn-link" onclick={() => (showDisclaimer = true)}>Read the disclaimer</button>
</footer>

<Disclaimer bind:open={showDisclaimer} />

<style>
	.foot {
		max-width: 1080px;
		margin: 24px auto 0;
		padding: 16px max(16px, env(safe-area-inset-left, 0px)) calc(24px + env(safe-area-inset-bottom, 0px));
		font-size: 12px;
		color: var(--text-2);
	}
	.btn-link {
		background: none;
		border: 0;
		padding: 0;
		font: inherit;
		color: var(--accent-text);
		text-decoration: underline;
		cursor: pointer;
	}
	.top {
		position: sticky;
		top: 0;
		z-index: 20;
		background: var(--surface);
		border-bottom: 1px solid var(--border);
		padding-top: env(safe-area-inset-top, 0px);
	}
	.top-in {
		max-width: 1080px;
		margin: 0 auto;
		padding-left: max(16px, env(safe-area-inset-left, 0px));
		padding-right: max(16px, env(safe-area-inset-right, 0px));
		padding-block: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		color: var(--text);
	}
	.brand b {
		letter-spacing: 0.14em;
		font-size: 15px;
	}
	.brand span span {
		font-size: 12px;
		color: var(--text-2);
	}
</style>
