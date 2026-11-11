<script lang="ts">
	import { page } from '$app/state';

	const tabs = [
		{ href: '/', label: 'ALAC problems', match: (p: string) => p === '/' || p.startsWith('/p/') },
		{ href: '/consti/focus', label: '★ Exam focus' },
		{ href: '/consti/cases', label: 'Case digests' },
		{ href: '/consti/numbers', label: 'Numbers' }
	];
	const path = $derived(page.url.pathname);
</script>

<nav class="subtabs" aria-label="Consti I sections">
	{#each tabs as t (t.href)}
		<a href={t.href} aria-current={(t.match ? t.match(path) : path === t.href) ? 'page' : undefined}>{t.label}</a>
	{/each}
</nav>
