<script lang="ts">
	import { QUESTIONS, RULES } from '$lib/crimpro';
	import { fmtTime, pool, startFrom, type Source } from '$lib/crimpro-exam';
	import { store, type Session } from '$lib/store.svelte';

	let kind: Session['kind'] = $state('exam');
	let source: Source = $state('all');
	let length = $state(20);
	let pace = $state(60);

	const available = $derived(pool(source).length);
	const missed = $derived(pool('missed').length);
	const fresh = $derived(pool('new').length);
	const count = $derived(Math.min(length, available));
	const exams = $derived(store.crimpro.exams.slice(-6).reverse());

	const lengths: [number, string][] = [
		[10, '10'],
		[20, '20'],
		[40, '40'],
		[QUESTIONS.length, 'All']
	];
	const paces: [number, string][] = [
		[0, 'No timer'],
		[60, '1 min each'],
		[45, '45 s each']
	];

	function start() {
		startFrom(kind, source, length, kind === 'exam' ? pace : 0);
		window.scrollTo(0, 0);
	}
	const fmtDate = (t: number) => new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
</script>

<div class="col">
	<p class="muted" style="max-width:64ch">
		On the exam you won't know which rule comes next, and you won't see the case file build up one twist at a time. This
		mixes questions from every set so you practice spotting the issue cold.
	</p>

	<section class="card form">
		<div class="field">
			<span class="lbl">Mode</span>
			<div class="seg" role="group" aria-label="Mode">
				<button aria-pressed={kind === 'exam'} onclick={() => (kind = 'exam')}>Mock exam</button>
				<button aria-pressed={kind === 'practice'} onclick={() => (kind = 'practice')}>Practice</button>
			</div>
			<span class="hint">
				{kind === 'exam'
					? 'Answers and explanations at the end. You can go back and change answers before you submit.'
					: 'See the answer and explanation after each question.'}
			</span>
		</div>

		<div class="field">
			<label class="lbl" for="src">Questions from</label>
			<select id="src" bind:value={source}>
				<option value="all">All rules ({QUESTIONS.length})</option>
				<option value="missed" disabled={!missed}>Questions I missed ({missed})</option>
				<option value="new" disabled={!fresh}>Not yet answered ({fresh})</option>
				<optgroup label="One rule">
					{#each RULES as r (r.id)}
						{@const n = pool(`rule:${r.id}`).length}
						<option value="rule:{r.id}" disabled={!n}>Rule {r.id} · {r.name} ({n})</option>
					{/each}
				</optgroup>
			</select>
		</div>

		<div class="field">
			<span class="lbl">How many</span>
			<div class="seg" role="group" aria-label="Number of questions">
				{#each lengths as [n, label] (n)}
					<button aria-pressed={length === n} onclick={() => (length = n)}>{label}</button>
				{/each}
			</div>
		</div>

		{#if kind === 'exam'}
			<div class="field">
				<span class="lbl">Timer</span>
				<div class="seg" role="group" aria-label="Timer">
					{#each paces as [p, label] (p)}
						<button aria-pressed={pace === p} onclick={() => (pace = p)}>{label}</button>
					{/each}
				</div>
				{#if pace && count}<span class="hint num">{fmtTime(pace * count)} total. The exam submits itself when time runs out.</span>{/if}
			</div>
		{/if}

		<div class="row wrap">
			<button class="btn btn-primary btn-lg" disabled={!count} onclick={start}>
				Start {kind === 'exam' ? 'exam' : 'practice'} · {count} question{count === 1 ? '' : 's'}
			</button>
		</div>
	</section>

	{#if exams.length}
		<section class="card hist" aria-labelledby="hist-h">
			<h2 id="hist-h" class="eyebrow">Recent mock exams</h2>
			<table>
				<tbody>
					{#each exams as e (e.at)}
						{@const pct = Math.round((e.score / e.total) * 100)}
						<tr>
							<td class="muted">{fmtDate(e.at)}</td>
							<td class="num"><b>{e.score}/{e.total}</b></td>
							<td><span class="tag num {pct >= 75 ? 'tag-ok' : pct >= 50 ? 'tag-warn' : 'tag-bad'}">{pct}%</span></td>
							<td class="muted num hide-sm">{fmtTime(e.secs)}{e.timed ? ' · timed' : ''}</td>
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
		font-size: 13px;
		font-weight: 600;
	}
	.hint {
		font-size: 13px;
		color: var(--text-2);
	}
	select {
		width: 100%;
		max-width: 480px;
		min-height: 40px;
		padding: 0 10px;
		background: var(--surface);
		border: 1px solid var(--border-strong);
		border-radius: 6px;
	}
	select:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: var(--focus);
	}
	.hist {
		padding: 14px 16px;
	}
	.hist h2 {
		margin-bottom: 6px;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		font-size: 14px;
	}
	td {
		padding: 6px 8px 6px 0;
		border-top: 1px solid var(--border);
	}
</style>
