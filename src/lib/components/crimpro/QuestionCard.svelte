<script lang="ts">
	import type { QRef } from '$lib/crimpro';
	import { md } from '$lib/text';

	let {
		ref,
		order,
		picked,
		reveal = false,
		locked = false,
		context = false,
		keys = true,
		onpick
	}: {
		ref: QRef;
		/** Display order of the choices (indexes into `q.o`). */
		order: number[];
		picked: number | null;
		/** Mark right/wrong and show the explanation. */
		reveal?: boolean;
		/** Choices can no longer be changed. */
		locked?: boolean;
		/** Show the earlier twists of this case file (for questions met outside their set). */
		context?: boolean;
		/** Answer with A–D or 1–4. */
		keys?: boolean;
		onpick?: (oi: number) => void;
	} = $props();

	const q = $derived(ref.q);
	const earlier = $derived(ref.set.qs.slice(1, ref.k).filter((x) => x.tw));
	const LETTERS = 'ABCD';

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

<section class="card file">
	<span class="eyebrow">Case file · {ref.set.title}</span>
	<p class="legal">{ref.set.base}</p>
	{#if context && earlier.length}
		<details class="earlier">
			<summary>Earlier twists in this case file ({earlier.length})</summary>
			<ol>{#each earlier as e, k (k)}<li>{e.tw}</li>{/each}</ol>
		</details>
	{/if}
</section>

{#if q.tw}
	<section class="twist">
		<span class="eyebrow">What changed</span>
		<p class="legal">{q.tw}</p>
	</section>
{/if}

<h2 class="q">{q.q}</h2>

<div class="opts" role="group" aria-label="Choices">
	{#each order as oi, pos (oi)}
		<button
			class:sel={!reveal && oi === picked}
			class:right={reveal && oi === q.a}
			class:wrong={reveal && oi === picked && oi !== q.a}
			aria-pressed={oi === picked}
			disabled={locked}
			onclick={() => onpick?.(oi)}
		>
			<span class="letter sm">{LETTERS[pos]}</span>
			<span>{q.o[oi]}</span>
		</button>
	{/each}
</div>

{#if reveal}
	{@const ok = picked === q.a}
	<div class="fb" class:ok aria-live="polite">
		<b class="fb-h">{ok ? 'Correct' : picked === null ? 'Not answered' : 'Not this time'}</b>
		{#if !ok}<p><strong>Answer:</strong> {q.o[q.a]}</p>{/if}
		<p>{@html md(q.ex)}</p>
	</div>
{/if}

<style>
	.file {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.earlier {
		margin-top: 6px;
		font-size: 13.5px;
		color: var(--text-2);
	}
	.earlier summary {
		cursor: pointer;
		font-weight: 600;
	}
	.earlier ol {
		margin-top: 6px;
		padding-left: 1.3em;
		display: grid;
		gap: 4px;
	}
	.twist {
		padding: 12px 14px;
		border-radius: 8px;
		background: var(--accent-soft);
		border: 1px solid var(--accent-line);
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.twist .eyebrow {
		color: var(--accent-text);
	}
	.legal {
		font-size: 16px;
		line-height: 1.6;
	}
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
