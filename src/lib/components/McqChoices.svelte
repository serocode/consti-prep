<script lang="ts">
	import { md } from '$lib/text';
	import { answerKey } from '$lib/answerkey.svelte';
	import type { Mcq } from '$lib/mcq';

	let {
		q,
		order,
		picked,
		reveal = false,
		locked = false,
		keys = true,
		onpick
	}: {
		q: Mcq;
		/** Display order of the choices (indexes into `q.o`). */
		order: number[];
		picked: number | null;
		/** Mark right/wrong, show each "Why not" and the explanation. */
		reveal?: boolean;
		/** Choices can no longer be changed. */
		locked?: boolean;
		/** Answer with A–D or 1–4. Turn off when several questions share a page. */
		keys?: boolean;
		onpick?: (oi: number) => void;
	} = $props();

	/** Answer-key easter egg: show the right choice before (or without) a reveal. */
	const keyed = $derived(answerKey.on && !reveal);
	const LETTERS = 'ABCDEFG';

	function onkeydown(e: KeyboardEvent) {
		if (!keys || locked || !onpick || e.metaKey || e.ctrlKey || e.altKey) return;
		const t = e.target as HTMLElement;
		if (t.closest('input, textarea, select, [contenteditable]')) return;
		const k = e.key.toLowerCase();
		let pos = 'abcd'.indexOf(k);
		if (pos < 0) pos = '1234'.indexOf(k);
		if (pos < 0 || pos >= order.length) return;
		e.preventDefault();
		onpick(order[pos]);
	}
</script>

<svelte:window {onkeydown} />

<h2 class="q">{q.q}</h2>

<div class="opts" role="group" aria-label="Choices">
	{#each order as oi, pos (oi)}
		<button
			class:sel={!reveal && oi === picked}
			class:right={(reveal || keyed) && oi === q.a}
			class:wrong={reveal && oi === picked && oi !== q.a}
			aria-pressed={oi === picked}
			disabled={locked}
			onclick={() => onpick?.(oi)}
		>
			<span class="letter sm">{LETTERS[pos]}</span>
			<span>
				{q.o[oi]}
				{#if (reveal || keyed) && oi !== q.a && q.why[oi]}<span class="why">Why not: {q.why[oi]}</span>{/if}
			</span>
		</button>
	{/each}
</div>

{#if keyed}
	<div class="fb key">
		<b class="fb-h">🔑 Answer key</b>
		<p><strong>Answer:</strong> {q.o[q.a]}</p>
		<p>{@html md(q.ex)}</p>
	</div>
{:else if reveal}
	{@const ok = picked === q.a}
	<div class="fb" class:ok aria-live="polite">
		<b class="fb-h">{ok ? 'Correct' : picked === null ? 'Not answered' : 'Not this time'}</b>
		{#if !ok}<p><strong>Answer:</strong> {q.o[q.a]}</p>{/if}
		<p>{@html md(q.ex)}</p>
	</div>
{/if}

<style>
	.q {
		font-family: var(--legal);
		font-size: 20px;
		font-weight: 600;
		line-height: 1.35;
		text-wrap: balance;
	}
	.opts {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.opts button {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 12px;
		align-items: start;
		text-align: left;
		padding: 11px 13px;
		background: var(--surface);
		border: 1.5px solid var(--border-strong);
		border-radius: 8px;
		cursor: pointer;
		line-height: 1.45;
	}
	.opts button > span:last-child {
		padding-top: 2px;
	}
	.opts button:not(:disabled):hover {
		border-color: var(--text-3);
		background: var(--surface-2);
	}
	.opts button:disabled {
		cursor: default;
	}
	.why {
		display: block;
		margin-top: 4px;
		font-size: 13px;
		color: var(--text-2);
	}
	.opts button.sel {
		border-color: var(--accent);
		background: var(--accent-soft);
	}
	.opts button.sel .letter {
		background: var(--accent-strong);
		border-color: var(--accent-strong);
		color: var(--on-accent);
	}
	.opts button.right {
		border-color: var(--success);
		background: var(--success-soft);
	}
	.opts button.wrong {
		border-color: var(--error);
		background: var(--error-soft);
	}
	.opts button.right .letter {
		background: var(--success);
		border-color: var(--success);
		color: var(--surface);
	}
	.opts button.wrong .letter {
		background: var(--error);
		border-color: var(--error);
		color: var(--surface);
	}
	.fb {
		padding: 12px 14px;
		border-radius: 8px;
		background: var(--error-soft);
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.fb.ok {
		background: var(--success-soft);
	}
	.fb.key {
		background: var(--accent-soft);
		border: 1px solid var(--accent-line);
	}
	.fb.key .fb-h {
		color: var(--accent-text);
	}
	.fb-h {
		font-size: 12px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--error);
	}
	.fb.ok .fb-h {
		color: var(--success);
	}
</style>
