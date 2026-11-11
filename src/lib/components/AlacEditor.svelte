<script lang="ts">
	import type { AlacProblem } from '$lib/problems';
	import type { Draft, Mode } from '$lib/store.svelte';
	import { SECTIONS, words, type Section } from './sections';

	let {
		draft,
		mode,
		boxes,
		onsubmit
	}: {
		draft: Draft;
		mode: Mode;
		/** Subject-specific starters and placeholders (e.g. StatCon's "Jurisprudence provides that…"). */
		boxes?: AlacProblem['boxes'];
		onsubmit: () => void;
	} = $props();

	const sections: Section[] = $derived(SECTIONS.map((s) => ({ ...s, ...boxes?.[s.k] })));

	const refs: Record<string, HTMLTextAreaElement | undefined> = $state({});

	function insert(s: Section, text: string) {
		const cur = draft[s.k];
		draft[s.k] = cur && !/\s$/.test(cur) ? `${cur} ${text}` : cur + text;
		const el = refs[s.k];
		if (el) {
			requestAnimationFrame(() => {
				el.focus();
				el.setSelectionRange(el.value.length, el.value.length);
			});
		}
	}

	function keydown(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			e.preventDefault();
			onsubmit();
		}
	}
</script>

{#if mode === 'guided'}
	{#each sections as s (s.k)}
		<section class="sec card" class:app={s.app}>
			<div class="sec-h">
				<span class="letter" aria-hidden="true">{s.L}</span>
				<div class="stack" style="gap:2px;flex:1">
					<label class="sec-t" for="f-{s.k}">
						{s.title}
						{#if s.app}<span class="tag tag-accent core">Core reasoning</span>{/if}
					</label>
					<span class="muted" style="font-size:14px">{s.prompt}</span>
				</div>
			</div>
			<textarea id="f-{s.k}" rows={s.rows} placeholder={s.placeholder} bind:value={draft[s.k]} bind:this={refs[s.k]} onkeydown={keydown}></textarea>
			<div class="starters" aria-label="Sentence starters for {s.title}">
				{#each s.starters as st (st)}
					<button type="button" class="starter" onclick={() => insert(s, st)}>{st.trim()}…</button>
				{/each}
			</div>
			<div class="meta"><span class="num">{words(draft[s.k])} words</span></div>
		</section>
	{/each}
{:else}
	<section class="sec card">
		<label class="sec-t" for="f-full" style="display:block;margin-bottom:8px">Your answer</label>
		<textarea
			id="f-full"
			rows="16"
			placeholder="Answer. Legal basis. Application. Conclusion. Write it the way you would in the exam booklet."
			bind:value={draft.full}
			onkeydown={keydown}
		></textarea>
		<div class="meta"><span>A · L · A · C, in that order</span><span class="num">{words(draft.full)} words</span></div>
	</section>
{/if}

<style>
	.sec {
		padding: 16px 18px;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}
	.sec:focus-within {
		border-color: var(--accent-line);
		box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.08);
	}
	.sec.app {
		border-color: var(--border-strong);
	}
	.sec.app .letter {
		background: var(--text);
		color: var(--surface);
		border-color: var(--text);
	}
	.sec-h {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		margin-bottom: 10px;
	}
	.sec-t {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.core {
		letter-spacing: 0;
		text-transform: none;
		margin-left: 6px;
	}
	.starters {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 8px;
	}
	.starter {
		min-height: 30px;
		padding: 0 10px;
		border-radius: 4px;
		border: 1px dashed var(--border-strong);
		background: transparent;
		color: var(--text-2);
		font-size: 12.5px;
		cursor: pointer;
		font-family: var(--legal);
	}
	.starter:hover {
		border-color: var(--accent);
		color: var(--text);
	}
	.meta {
		display: flex;
		justify-content: space-between;
		gap: 8px;
		margin-top: 6px;
		font-size: 12px;
		color: var(--text-2);
	}
</style>
