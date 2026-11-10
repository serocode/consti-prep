<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { store, storageStatus, type Theme } from '$lib/store.svelte';
	import { answerKey } from '$lib/answerkey.svelte';
	import Mascot from '$lib/components/Mascot.svelte';
	import Disclaimer from '$lib/components/Disclaimer.svelte';

	let { children } = $props();
	let showDisclaimer = $state(false);

	// A different line each page load. Keep them light: this is a study app, not a stand-up set.
	const quips = [
		'Built by Sero, fueled by coffee and reasonable doubt.',
		'Made by Sero. Objection overruled.',
		'Coded by Sero. Res ipsa loquitur: the bugs speak for themselves.',
		'Handcrafted by Sero. No bar exam was harmed.',
		'Built by Sero. Bail was posted, the code was pushed.',
		'Made by Sero. Habeas corpus, but for features.',
		'Coded by Sero between cases and cramming.',
		'Built by Sero. Your honor, I rest my commit.'
	];
	const quip = quips[Math.floor(Math.random() * quips.length)];
	// The easter egg hides on a random edge each load. Hover/focus or tap reveals it.
	const side = Math.random() < 0.5 ? 'left' : 'right';
	let eggOpen = $state(false);

	// ---- answer key easter egg: tap the owl 5 times quickly, or type "hoot" ----
	let toast = $state('');
	let toastTimer: ReturnType<typeof setTimeout> | undefined;
	function flipAnswerKey() {
		answerKey.toggle();
		toast = answerKey.on ? 'Hoot! Answer key unlocked. Model answers are now showing.' : 'Answer key off. Back to honest practice.';
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => (toast = ''), 3500);
	}
	let taps: number[] = [];
	let owlBump = $state(false);
	// Hoot answers each tap so people can tell they're onto something.
	const replies = ['Hoot?', 'Hoot hoot?', 'Two more…', 'One more!'];
	let owlSays = $state('');
	let saysTimer: ReturnType<typeof setTimeout> | undefined;
	function tapOwl() {
		const t = Date.now();
		taps = [...taps.filter((x) => t - x < 2500), t];
		owlBump = false;
		requestAnimationFrame(() => (owlBump = true));
		clearTimeout(saysTimer);
		if (taps.length >= 5) {
			taps = [];
			owlSays = '';
			flipAnswerKey();
			return;
		}
		owlSays = replies[taps.length - 1];
		saysTimer = setTimeout(() => (owlSays = ''), 2500);
	}
	// A riddle in the card. Light enough to miss, clear enough to solve.
	const riddle = $derived(
		answerKey.on
			? 'Atty. Hoot is showing you the answers. Poke him five times to make him stop.'
			: 'Atty. Hoot knows every model answer. Poke him five times and he might share.'
	);
	if (typeof window !== 'undefined') {
		console.log(
			'%c🦉 Atty. Hoot here.%c Psst: type "hoot" anywhere outside a text box to show every model answer. Type it again to hide them.',
			'font-weight:bold;font-size:14px',
			'font-size:12px'
		);
	}
	let typed = '';
	function onkeydown(e: KeyboardEvent) {
		if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
		if ((e.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return;
		typed = (typed + e.key.toLowerCase()).slice(-4);
		if (typed === 'hoot') {
			typed = '';
			flipAnswerKey();
		}
	}

	const subjects = [
		{ href: '/', label: 'Consti I', match: (p: string) => !p.startsWith('/crimpro') },
		{ href: '/crimpro', label: 'Crim Pro', match: (p: string) => p.startsWith('/crimpro') }
	];

	const themes: [Theme, string][] = [
		['system', 'Auto'],
		['light', 'Light'],
		['dark', 'Dark']
	];
</script>

<svelte:window {onkeydown} />

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
			<span class="stack"><b>ALAC</b><span class="hide-sm">Finals practice</span></span>
		</a>
		<nav class="subjects" aria-label="Subject">
			{#each subjects as s (s.href)}
				<a href={s.href} aria-current={s.match(page.url.pathname) ? 'page' : undefined}>{s.label}</a>
			{/each}
		</nav>
		{#if answerKey.on}
			<button class="keypill" onclick={flipAnswerKey} title="Model answers are showing everywhere. Crim Pro scores are not saved while this is on.">
				🔑 Answer key <span class="x">· Turn off</span>
			</button>
		{/if}
		<div class="seg theme" role="group" aria-label="Theme">
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

<aside class="egg {side}" class:open={eggOpen} aria-label="About the developer">
	<button
		class="egg-tab"
		aria-expanded={eggOpen}
		aria-label="Psst, a message from the developer"
		onclick={() => (eggOpen = !eggOpen)}
	>
		✦
	</button>
	<div class="egg-card">
		<button class="owl-btn" class:bump={owlBump} onclick={tapOwl} onanimationend={() => (owlBump = false)} aria-label="Atty. Hoot">
			<Mascot size={56} />
		</button>
		{#if owlSays}<span class="says" role="status">{owlSays}</span>{/if}
		<div>
			<p>{quip}</p>
			<p class="riddle">{riddle}</p>
			<a href="https://serocode.vercel.app/" target="_blank" rel="noopener noreferrer">See more of my work ↗</a>
		</div>
	</div>
</aside>

{#if toast}
	<div class="toast" role="status">{toast}</div>
{/if}

<style>
	.keypill {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		min-height: 30px;
		padding: 0 10px;
		border-radius: 999px;
		border: 1px solid var(--accent-line);
		background: var(--accent-soft);
		color: var(--accent-text);
		font-size: 12.5px;
		font-weight: 600;
		cursor: pointer;
		white-space: nowrap;
	}
	.keypill .x {
		font-weight: 500;
		opacity: 0.8;
	}
	.owl-btn {
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		flex: none;
		border-radius: 50%;
	}
	.egg-card {
		position: relative;
	}
	.says {
		position: absolute;
		top: -14px;
		left: 34px;
		padding: 3px 9px;
		border-radius: 999px 999px 999px 4px;
		background: var(--accent-strong);
		color: var(--on-accent);
		font-size: 12px;
		font-weight: 700;
		white-space: nowrap;
		pointer-events: none;
	}
	.riddle {
		font-size: 12px;
		font-style: italic;
		color: var(--text-2);
	}
	.owl-btn.bump {
		animation: bump 0.25s ease;
	}
	@keyframes bump {
		50% {
			transform: scale(1.12) rotate(-6deg);
		}
	}
	.toast {
		position: fixed;
		left: 50%;
		bottom: calc(20px + env(safe-area-inset-bottom, 0px));
		transform: translateX(-50%);
		z-index: 30;
		max-width: calc(100vw - 32px);
		padding: 10px 16px;
		border-radius: 10px;
		background: var(--text);
		color: var(--surface);
		font-size: 14px;
		font-weight: 600;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
	}
	.foot {
		max-width: 1080px;
		margin: 24px auto 0;
		padding: 16px max(16px, env(safe-area-inset-left, 0px)) calc(24px + env(safe-area-inset-bottom, 0px));
		font-size: 12px;
		color: var(--text-2);
	}
	.egg {
		position: fixed;
		top: 62%;
		z-index: 15;
		display: flex;
		align-items: center;
		transition: transform 0.25s ease;
	}
	/* The ✦ tab sits on the inner edge, the part left peeking on screen; the card slides in behind it. */
	.egg.left {
		left: 0;
		flex-direction: row-reverse;
		transform: translateX(calc(-100% + 22px));
	}
	.egg.right {
		right: 0;
		flex-direction: row;
		transform: translateX(calc(100% - 22px));
	}
	.egg:hover,
	.egg:focus-within,
	.egg.open {
		transform: none;
	}
	.egg-tab {
		width: 22px;
		height: 44px;
		padding: 0;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--accent-text);
		font-size: 12px;
		cursor: pointer;
		opacity: 0.45;
		transition: opacity 0.2s;
	}
	.left .egg-tab {
		border-left: 0;
		border-radius: 0 8px 8px 0;
	}
	.right .egg-tab {
		border-right: 0;
		border-radius: 8px 0 0 8px;
	}
	.egg:hover .egg-tab,
	.egg-tab:focus-visible,
	.egg.open .egg-tab {
		opacity: 1;
	}
	.egg-card {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		width: 270px;
		padding: 12px 14px;
		background: var(--surface);
		border: 1px solid var(--border-strong);
		font-size: 13px;
		line-height: 1.45;
		color: var(--text);
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
	}
	.left .egg-card {
		border-left: 0;
		border-radius: 0 10px 10px 0;
	}
	.right .egg-card {
		border-right: 0;
		border-radius: 10px 0 0 10px;
	}
	.egg-card p {
		margin: 0 0 8px;
	}
	.egg-card a {
		color: var(--accent-text);
		font-weight: 600;
	}
	@media (prefers-reduced-motion: reduce) {
		.egg {
			transition: none;
		}
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
	.subjects {
		display: flex;
		gap: 2px;
		margin-right: auto;
	}
	.subjects a {
		padding: 6px 10px;
		border-radius: 6px;
		font-size: 13.5px;
		font-weight: 600;
		color: var(--text-2);
		text-decoration: none;
		white-space: nowrap;
	}
	.subjects a:hover {
		color: var(--text);
		background: var(--surface-2);
	}
	.subjects a[aria-current='page'] {
		color: var(--accent-text);
		background: var(--accent-soft);
	}
	@media (max-width: 520px) {
		/* Phones: brand + subjects on the first line, theme switch on its own line. */
		.top-in {
			flex-wrap: wrap;
			row-gap: 8px;
		}
		.theme {
			width: 100%;
			justify-content: center;
		}
		.theme button {
			flex: 1;
		}
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
