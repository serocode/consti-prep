<script lang="ts">
	import type { AlacProblem } from '$lib/problems';
	import { BANDS, CHECK_ITEMS, REASONING_ITEM, emptyCheck, scoreFromCheck, type Check, type CheckItem } from '$lib/rubric';
	import type { Answer } from '$lib/store.svelte';
	import Reference from './Reference.svelte';
	import ScoreScale from './ScoreScale.svelte';
	import { SECTIONS } from './sections';

	let {
		problem,
		answer,
		onsave,
		oncancel
	}: {
		problem: AlacProblem;
		answer: Answer;
		onsave: (check: Check, score: number, overridden: boolean) => void;
		oncancel: () => void;
	} = $props();

	const check: Check = $state(emptyCheck());
	let override: number | null = $state(null);

	const computed = $derived(scoreFromCheck(check, false));
	const score = $derived(override ?? computed);

	const items: CheckItem[] = $derived(
		check.conclusion ? CHECK_ITEMS : [CHECK_ITEMS[0], REASONING_ITEM, CHECK_ITEMS.find((i) => i.key === 'application')!]
	);

	function toggle(k: keyof Check) {
		check[k] = !check[k];
		override = null;
	}
</script>

<section class="card" aria-labelledby="cmp-h">
	<div class="head">
		<h2 id="cmp-h">Check your answer against the reference</h2>
		<p class="muted" style="font-size:13.5px">Read both side by side. Be strict: the bar gives credit for the idea, but not for a rule you didn’t write.</p>
	</div>

	{#if answer.mode === 'guided'}
		<div class="pairs">
			<div class="ph hide-sm"></div>
			<div class="ph eyebrow hide-sm">Your answer</div>
			<div class="ph eyebrow hide-sm">Reference</div>
			{#each SECTIONS as s, i (s.k)}
				<div class="pl"><span class="letter sm" title={s.title}>{s.L}</span></div>
				<div class="pc mine">
					<span class="eyebrow show-sm">Your {s.title.toLowerCase()}</span>
					{#if answer[s.k]}<p>{answer[s.k]}</p>{:else}<p class="faint">(blank)</p>{/if}
				</div>
				<div class="pc ref">
					<span class="eyebrow show-sm">Reference</span>
					<p>{problem.alac[i]}</p>
				</div>
			{/each}
		</div>
	{:else}
		<div class="two">
			<div class="pc mine"><span class="eyebrow">Your answer</span><p style="white-space:pre-wrap">{answer.full}</p></div>
			<div class="pc ref">
				<span class="eyebrow">Reference</span>
				{#each problem.alac as line, i (i)}<p><strong>{'ALAC'[i]}.</strong> {line}</p>{/each}
			</div>
		</div>
	{/if}

	<div class="pad"><div class="note note-warn"><strong>Key point.</strong> {problem.key}</div></div>

	<div class="pad stack" style="gap:10px">
		<h3 class="t">Tick what is true of your answer</h3>
		{#each items as it (it.key)}
			<label class="chk" class:on={check[it.key]}>
				<input type="checkbox" checked={check[it.key]} onchange={() => toggle(it.key)} />
				<span class="stack" style="gap:2px">
					<span class="cl">{it.label}</span>
					<span class="muted" style="font-size:13px">{it.help}</span>
				</span>
			</label>
		{/each}
	</div>

	<div class="pad stack" style="gap:10px">
		<div class="between wrap">
			<h3 class="t">Your score</h3>
			{#if override !== null}
				<button class="btn btn-ghost btn-sm" onclick={() => (override = null)}>Use the checklist score ({computed})</button>
			{/if}
		</div>
		<div class="row" style="gap:14px;align-items:baseline">
			<span class="big num">{score}<small>/ 5</small></span>
			<span style="font-weight:600">{BANDS[score]}</span>
		</div>
		<ScoreScale {score} onpick={(n) => (override = n === computed ? null : n)} />
		<p class="muted" style="font-size:12.5px">The checklist sets the score. Tap a band to adjust it if the checklist doesn’t fit.</p>
	</div>

	<div class="actions">
		<button class="btn btn-ghost" onclick={oncancel}>Back to editing</button>
		<button class="btn btn-primary" onclick={() => onsave($state.snapshot(check), score, override !== null)}>Save score</button>
	</div>

	<Reference {problem} />
</section>

<style>
	.head {
		padding: 20px 24px 12px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	h2 {
		font-size: 16px;
		font-weight: 600;
	}
	.t {
		font-size: 14.5px;
		font-weight: 600;
	}
	.pairs {
		display: grid;
		grid-template-columns: 34px minmax(0, 1fr) minmax(0, 1fr);
		gap: 8px 10px;
		padding: 4px 24px 16px;
	}
	.two {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
		gap: 10px;
		padding: 4px 24px 16px;
	}
	.pl {
		padding-top: 10px;
	}
	.pc {
		border-radius: 6px;
		padding: 10px 12px;
		font-family: var(--legal);
		font-size: 15.5px;
		line-height: 1.55;
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
		overflow-wrap: anywhere;
	}
	.pc .eyebrow {
		font-family: var(--ui);
	}
	.mine {
		background: var(--surface-2);
	}
	.ref {
		background: var(--success-soft);
	}
	.show-sm {
		display: none;
	}
	.pad {
		padding: 0 24px 18px;
	}
	.chk {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		padding: 12px 14px;
		border: 1px solid var(--border-strong);
		border-radius: 6px;
		cursor: pointer;
		min-height: 44px;
	}
	.chk.on {
		border-color: var(--success);
		background: var(--success-soft);
	}
	.chk input {
		width: 18px;
		height: 18px;
		margin: 2px 0 0;
		accent-color: var(--success);
		flex: none;
	}
	.cl {
		font-weight: 600;
		font-size: 14px;
	}
	.big {
		font-size: 40px;
		line-height: 1;
		font-weight: 600;
		letter-spacing: -0.03em;
	}
	.big small {
		font-size: 15px;
		color: var(--text-2);
		margin-left: 3px;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 10px;
		padding: 14px 24px;
		border-top: 1px solid var(--border);
		background: var(--surface-2);
	}
	@media (max-width: 640px) {
		.head,
		.pad {
			padding-left: 16px;
			padding-right: 16px;
		}
		.pairs {
			grid-template-columns: minmax(0, 1fr);
			padding: 4px 16px 16px;
		}
		.pl {
			padding-top: 6px;
		}
		.show-sm {
			display: block;
		}
		.two {
			padding: 4px 16px 16px;
		}
		.actions {
			padding: 12px 16px;
		}
	}
</style>
