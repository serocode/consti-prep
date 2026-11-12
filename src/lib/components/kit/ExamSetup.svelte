<script lang="ts">
	import { fmtTime } from '$lib/crimpro-exam';
	import type { Kit } from '$lib/kit';
	import { poolSizes, startExam, PART_META } from '$lib/kit-exam';

	let { kit }: { kit: Kit } = $props();

	// The page remounts per kit, so seeding from the initial prop is intended.
	// svelte-ignore state_referenced_locally
	let groups: number[] = $state(kit.groups.map((g) => g.id));
	type Key = 'enums' | 'terms' | 'mcqs' | 'probs';
	const KEY = { enum: 'enums', term: 'terms', mcq: 'mcqs', prob: 'probs' } as const;
	// Only the kit's own exam parts, in its order (PFR: multiple choice, then problems).
	// svelte-ignore state_referenced_locally
	const want: Record<Key, number> = $state({
		enums: kit.examParts.includes('enum') ? PART_META.enum.dflt : 0,
		terms: kit.examParts.includes('term') ? PART_META.term.dflt : 0,
		mcqs: kit.examParts.includes('mcq') ? PART_META.mcq.dflt : 0,
		probs: kit.examParts.includes('prob') ? PART_META.prob.dflt : 0
	});

	const sizes = $derived(poolSizes(kit, groups));
	const n = $derived({
		enums: Math.min(want.enums, sizes.enums),
		terms: Math.min(want.terms, sizes.terms),
		mcqs: Math.min(want.mcqs, sizes.mcqs),
		probs: Math.min(want.probs, sizes.probs)
	});
	const total = $derived(n.enums + n.terms + n.mcqs + n.probs);
	const history = $derived(kit.state().exams.slice(-6).reverse());

	function toggle(g: number) {
		groups = groups.includes(g) ? groups.filter((x) => x !== g) : [...groups, g].sort((a, b) => a - b);
	}
	function start() {
		startExam(kit, { ...n, groups });
		window.scrollTo(0, 0);
	}
	const fmtDate = (t: number) => new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
	const ROMAN = ['I', 'II', 'III', 'IV'];
	const parts = $derived(
		kit.examParts.map((kind, i) => ({
			key: KEY[kind] as Key,
			label: `${ROMAN[i]}. ${PART_META[kind].title}${kind === 'prob' ? ' (ALAC)' : ''}`,
			help: PART_META[kind].setup,
			opts: PART_META[kind].opts
		}))
	);
	const what = $derived(kit.examParts.map((k) => ({ enum: 'enumerations', term: 'definitions', mcq: 'multiple choice', prob: 'ALAC problems' })[k]));
</script>

<div class="col" style="max-width:760px;margin:0">
	<p class="muted">
		A mock exam: {what.slice(0, -1).join(', ')}{what.length > 1 ? ' and ' : ''}{what.at(-1)}. Answer everything, submit, then check
		yourself against the model answers{kit.examParts.includes('mcq') ? ' (multiple choice is checked for you)' : ''}. What you miss comes back first in
		the drills.
	</p>

	<section class="card form">
		<div class="field">
			<span class="lbl">{kit.groupNoun === 'chapter' ? 'Chapters' : 'Parts'}</span>
			<div class="row wrap" style="gap:6px">
				{#each kit.groups as g (g.id)}
					<button class="chip" aria-pressed={groups.includes(g.id)} onclick={() => toggle(g.id)} title={g.title}>{g.short}</button>
				{/each}
			</div>
		</div>

		{#each parts as p (p.key)}
			<div class="field">
				<span class="lbl">{p.label} <span class="muted num" style="font-weight:400">· {sizes[p.key]} available</span></span>
				<div class="seg" role="group" aria-label="{p.label}: how many">
					{#each p.opts as v (v)}
						<button aria-pressed={want[p.key] === v} disabled={v > sizes[p.key] && v !== 0} onclick={() => (want[p.key] = v)}>{v || 'None'}</button>
					{/each}
				</div>
				<span class="hint">{p.help}</span>
			</div>
		{/each}

		<div class="row wrap">
			<button class="btn btn-primary btn-lg" disabled={!total || !groups.length} onclick={start}>Start exam · {total} question{total === 1 ? '' : 's'}</button>
		</div>
	</section>

	{#if history.length}
		<section class="card hist" aria-labelledby="hist-h">
			<h2 id="hist-h" class="eyebrow">Recent mock exams</h2>
			<table>
				<tbody>
					{#each history as e (e.at)}
						{@const pct = Math.round((e.score / e.total) * 100)}
						<tr>
							<td class="muted">{fmtDate(e.at)}</td>
							<td class="num"><b>{e.score}/{e.total}</b></td>
							<td><span class="tag num {pct >= 75 ? 'tag-ok' : pct >= 50 ? 'tag-warn' : 'tag-bad'}">{pct}%</span></td>
							<td class="muted num hide-sm">{fmtTime(e.secs)} · {e.label.replace('Mock exam · ', '')}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>
	{/if}
</div>

<style>
	.form {
		padding: 18px 20px;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	.field {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
	}
	.lbl {
		font-size: 13.5px;
		font-weight: 600;
	}
	.hint {
		font-size: 13px;
		color: var(--text-2);
	}
	.chip {
		min-height: 32px;
		padding: 0 12px;
		border-radius: 999px;
		border: 1px solid var(--border-strong);
		background: var(--surface);
		color: var(--text-2);
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
	}
	.chip[aria-pressed='true'] {
		background: var(--accent-soft);
		border-color: var(--accent-line);
		color: var(--accent-text);
	}
	.seg button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.hist {
		padding: 14px 16px;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		font-size: 14px;
		margin-top: 6px;
	}
	td {
		padding: 6px 8px 6px 0;
		border-top: 1px solid var(--border);
	}
</style>
