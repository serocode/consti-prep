<script lang="ts">
	import { fmtTime } from '$lib/crimpro-exam';
	import type { Kit } from '$lib/kit';
	import { poolSizes, startExam } from '$lib/kit-exam';

	let { kit }: { kit: Kit } = $props();

	// The page remounts per kit, so seeding from the initial prop is intended.
	// svelte-ignore state_referenced_locally
	let groups: number[] = $state(kit.groups.map((g) => g.id));
	let enums = $state(3);
	let terms = $state(5);
	let probs = $state(2);

	const sizes = $derived(poolSizes(kit, groups));
	const n = $derived({ enums: Math.min(enums, sizes.enums), terms: Math.min(terms, sizes.terms), probs: Math.min(probs, sizes.probs) });
	const total = $derived(n.enums + n.terms + n.probs);
	const history = $derived(kit.state().exams.slice(-6).reverse());

	function toggle(g: number) {
		groups = groups.includes(g) ? groups.filter((x) => x !== g) : [...groups, g].sort((a, b) => a - b);
	}
	function start() {
		startExam(kit, { ...n, groups });
		window.scrollTo(0, 0);
	}
	const fmtDate = (t: number) => new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
	const parts: { key: 'enums' | 'terms' | 'probs'; label: string; help: string; opts: number[] }[] = [
		{ key: 'enums', label: 'I. Enumeration', help: 'List the items and explain each in one line.', opts: [0, 2, 3, 4, 5] },
		{ key: 'terms', label: 'II. Definition of terms', help: 'Define each term in a sentence or two.', opts: [0, 3, 5, 8, 10] },
		{ key: 'probs', label: 'III. Problems (ALAC)', help: 'Answer each scenario in Answer, Legal Basis, Application, Conclusion.', opts: [0, 1, 2, 3, 4] }
	];
	const get = (k: 'enums' | 'terms' | 'probs') => ({ enums, terms, probs })[k];
	function set(k: 'enums' | 'terms' | 'probs', v: number) {
		if (k === 'enums') enums = v;
		else if (k === 'terms') terms = v;
		else probs = v;
	}
</script>

<div class="col" style="max-width:760px;margin:0">
	<p class="muted">
		A written exam: enumerations, definitions, and ALAC problems. Write every answer, submit, then mark yourself against the model answers.
		Your marks feed the flashcards, so what you miss comes back first.
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
						<button aria-pressed={get(p.key) === v} disabled={v > sizes[p.key] && v !== 0} onclick={() => set(p.key, v)}>{v || 'None'}</button>
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
