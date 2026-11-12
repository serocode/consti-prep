<script lang="ts">
	import McqChoices from '../McqChoices.svelte';
	import type { QRef } from '$lib/crimpro';

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
</script>

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

<McqChoices {q} {order} {picked} {reveal} {locked} {keys} {onpick} />
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
</style>
