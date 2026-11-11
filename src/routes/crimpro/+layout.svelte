<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const tabs = [
		{ href: '/crimpro/focus', label: '★ Exam focus' },
		{ href: '/crimpro', label: 'Twist drills', match: (p: string) => p === '/crimpro' || p.startsWith('/crimpro/drill/') },
		{ href: '/crimpro/exam', label: 'Mock exam' },
		{ href: '/crimpro/rules', label: 'Rules 110–127' },
		{ href: '/crimpro/flips', label: 'One fact flips it' },
		{ href: '/crimpro/numbers', label: 'Numbers' }
	];
	const path = $derived(page.url.pathname);
	const isCurrent = (t: (typeof tabs)[number]) => (t.match ? t.match(path) : path === t.href);
</script>

<main class="page">
	<div class="intro">
		<span class="eyebrow">Rules 110–127 · Revised Rules of Criminal Procedure</span>
		<h1>Crim Pro Twist Kit</h1>
	</div>

	<nav class="subtabs" aria-label="Crim Pro sections">
		{#each tabs as t (t.href)}
			<a href={t.href} aria-current={isCurrent(t) ? 'page' : undefined}>{t.label}</a>
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
