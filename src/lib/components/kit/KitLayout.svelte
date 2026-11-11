<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import type { Kit } from '$lib/kit';

	type Tab = { path: string; label: string };
	/**
	 * Subject-specific tabs: `mid` sits between Definitions and the problems (case digests, numbers),
	 * `extra` before the answer guide. The order follows the study order: focus → lists → terms → cases →
	 * numbers → scenarios.
	 */
	let { kit, mid = [], extra = [], children }: { kit: Kit; mid?: Tab[]; extra?: Tab[]; children: Snippet } = $props();

	const tabs = $derived([
		{ href: kit.base, label: 'Overview' },
		{ href: `${kit.base}/focus`, label: '★ Exam focus' },
		{ href: `${kit.base}/enumerations`, label: 'Enumerations' },
		{ href: `${kit.base}/terms`, label: 'Definitions' },
		...mid.map((t) => ({ href: `${kit.base}/${t.path}`, label: t.label })),
		{ href: `${kit.base}/problems`, label: 'ALAC problems' },
		{ href: `${kit.base}/exam`, label: 'Mock exam' },
		{ href: `${kit.base}/drill`, label: 'Flashcards' },
		...extra.map((t) => ({ href: `${kit.base}/${t.path}`, label: t.label })),
		{ href: `${kit.base}/guide`, label: 'Answer guide' }
	]);
	const path = $derived(page.url.pathname);
</script>

<main class="page">
	<div class="intro">
		<span class="eyebrow">{kit.eyebrow}</span>
		<h1>{kit.title}</h1>
	</div>

	<nav class="subtabs" aria-label="{kit.name} sections">
		{#each tabs as t (t.href)}
			<a href={t.href} aria-current={path === t.href ? 'page' : undefined}>{t.label}</a>
		{/each}
	</nav>

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
