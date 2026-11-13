<script lang="ts">
	import { page } from '$app/state';
	import { PHILO } from '$lib/philo';

	let { children } = $props();

	// Study order: focus → the four essay types → what you define (terms, lists, thinkers) → cases → differentiate → critique → exam.
	const b = PHILO.base;
	const tabs = [
		{ href: b, label: 'Overview' },
		{ href: `${b}/focus`, label: '★ Exam focus' },
		{ href: `${b}/essays`, label: 'Essay practice' },
		{ href: `${b}/terms`, label: 'Definitions' },
		{ href: `${b}/enumerations`, label: 'Enumerations' },
		{ href: `${b}/thinkers`, label: 'Thinkers' },
		{ href: `${b}/cases`, label: 'Case digests' },
		{ href: `${b}/compare`, label: 'Differentiate' },
		{ href: `${b}/critiques`, label: 'Critiques' },
		{ href: `${b}/exam`, label: 'Mock exam' },
		{ href: `${b}/drill`, label: 'Flashcards' },
		{ href: `${b}/guide`, label: 'Answer guide' }
	];
	const path = $derived(page.url.pathname);
</script>

<main class="page">
	<div class="intro">
		<span class="eyebrow">{PHILO.eyebrow}</span>
		<h1>{PHILO.title}</h1>
	</div>

	<nav class="subtabs" aria-label="Legal Philo sections">
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
