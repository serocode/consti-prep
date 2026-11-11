<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fmtTime } from '$lib/crimpro-exam';
	import { modelEnumeration, type Kit } from '$lib/kit';
	import { answered, endExam, enumOf, itemKey, probOf, submitExam, termOf } from '$lib/kit-exam';
	import type { KitExam } from '$lib/store.svelte';
	import { answerKey } from '$lib/answerkey.svelte';

	let { kit, x }: { kit: Kit; x: KitExam } = $props();

	let now = $state(Date.now());
	const timer = setInterval(() => (now = Date.now()), 1000);
	onDestroy(() => clearInterval(timer));

	const enums = $derived(x.items.filter((it) => it.kind === 'enum'));
	const terms = $derived(x.items.filter((it) => it.kind === 'term'));
	const probs = $derived(x.items.filter((it) => it.kind === 'prob'));
	const done = $derived(x.items.filter((it) => answered(x, it)).length);

	let confirmSubmit = $state(false);
	let confirmQuit = $state(false);
	function trySubmit() {
		if (done < x.items.length && !confirmSubmit) confirmSubmit = true;
		else {
			submitExam(kit);
			window.scrollTo(0, 0);
		}
	}

	const ALAC: [string, string, string][] = [
		['a', 'A', 'Answer'],
		['l', 'L', 'Legal Basis'],
		['p', 'A', 'Application'],
		['c', 'C', 'Conclusion']
	];
</script>

<div class="col" style="max-width:800px;margin:0">
	<div class="between wrap">
		<div class="stack" style="gap:2px">
			<span class="eyebrow">{x.label}</span>
			<span class="num" style="font-weight:600">{done} of {x.items.length} answered</span>
		</div>
		<span class="clock num" aria-label="Time elapsed">{fmtTime((now - x.started) / 1000)}</span>
	</div>

	{#if enums.length}
		<section class="part">
			<h2 class="ph">I. Enumeration</h2>
			<p class="muted pi">Enumerate, and briefly explain each item.</p>
			{#each enums as it, k (it.id)}
				{@const e = enumOf(kit, it)}
				<div class="q card">
					<p class="qt legal"><span class="qn num">{k + 1}.</span> {e.t}.</p>
					<textarea rows="6" bind:value={x.answers[itemKey(it)]} placeholder="There are … They are: (1) … — this means …" aria-label="Answer to: {e.t}"></textarea>
					{#if answerKey.on}<p class="key">🔑 {modelEnumeration(e)}</p>{/if}
				</div>
			{/each}
		</section>
	{/if}

	{#if terms.length}
		<section class="part">
			<h2 class="ph">II. Definition of terms</h2>
			<p class="muted pi">Define each term.</p>
			{#each terms as it, k (it.id)}
				{@const t = termOf(kit, it)}
				<div class="q card">
					<p class="qt legal"><span class="qn num">{k + 1}.</span> {t.t}</p>
					<textarea rows="3" bind:value={x.answers[itemKey(it)]} placeholder="{t.t} is …" aria-label="Define {t.t}"></textarea>
					{#if answerKey.on}<p class="key">🔑 {t.d}</p>{/if}
				</div>
			{/each}
		</section>
	{/if}

	{#if probs.length}
		<section class="part">
			<h2 class="ph">III. Problems</h2>
			<p class="muted pi">Answer each problem in ALAC: Answer, Legal Basis, Application, Conclusion.</p>
			{#each probs as it, k (it.id)}
				{@const p = probOf(kit, it)}
				<div class="q card">
					<p class="qt legal"><span class="qn num">{k + 1}.</span> {p.facts}</p>
					{#if p.q}<p class="qt legal" style="font-weight:600">{p.q}</p>{/if}
					{#each ALAC as [s, L, title], i (s)}
						<label class="alac">
							<span class="letter sm" title={title}>{L}</span>
							<textarea
								rows={s === 'p' ? 4 : s === 'l' ? 3 : 2}
								bind:value={x.answers[`${itemKey(it)}:${s}`]}
								placeholder={p.boxes?.[s as 'a' | 'l' | 'p' | 'c']?.placeholder ?? ['Yes / No.', 'The law provides that …', 'Here, …', 'Therefore, …'][i]}
								aria-label="{title} for problem {k + 1}"
							></textarea>
						</label>
						{#if answerKey.on}<p class="key">🔑 {p.alac[i]}</p>{/if}
					{/each}
				</div>
			{/each}
		</section>
	{/if}

	{#if confirmSubmit}
		<div class="note note-warn row wrap" role="alert">
			<span style="flex:1;min-width:200px">{x.items.length - done} question{x.items.length - done === 1 ? ' is' : 's are'} blank. A blank answer gets no points.</span>
			<button class="btn btn-primary btn-sm" onclick={trySubmit}>Submit anyway</button>
			<button class="btn btn-ghost btn-sm" onclick={() => (confirmSubmit = false)}>Keep writing</button>
		</div>
	{/if}

	<div class="between wrap">
		<button class="btn btn-primary btn-lg" onclick={trySubmit}>Submit and check my answers</button>
		{#if confirmQuit}
			<div class="row">
				<span class="muted" style="font-size:13px">Discard this exam?</span>
				<button class="btn btn-sm" style="background:var(--error);color:#fff" onclick={() => endExam(kit)}>Discard</button>
				<button class="btn btn-ghost btn-sm" onclick={() => (confirmQuit = false)}>Keep going</button>
			</div>
		{:else}
			<button class="btn btn-ghost btn-sm" onclick={() => (confirmQuit = true)}>Quit</button>
		{/if}
	</div>
	<p class="faint" style="font-size:12.5px">Your answers save as you type. You can leave and come back.</p>
</div>

<style>
	.clock {
		font-size: 18px;
		font-weight: 600;
		padding: 4px 12px;
		border-radius: 999px;
		background: var(--surface);
		border: 1px solid var(--border);
	}
	.part {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.ph {
		font-family: var(--legal);
		font-size: 19px;
		font-weight: 600;
		margin-top: 8px;
	}
	.pi {
		margin-top: -6px;
		font-size: 14px;
	}
	.q {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.qt {
		font-size: 16.5px;
		line-height: 1.6;
	}
	.qn {
		font-weight: 600;
		margin-right: 4px;
	}
	.alac {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 10px;
		align-items: start;
	}
	.alac textarea,
	.q textarea {
		font-size: 15.5px;
	}
	.key {
		font-size: 13.5px;
		padding: 8px 10px;
		border-radius: 6px;
		background: var(--accent-soft);
		border: 1px solid var(--accent-line);
	}
</style>
