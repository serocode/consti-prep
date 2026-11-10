<script lang="ts">
	import { goto } from '$app/navigation';
	import { PARTS, PART_SHORT, PROBLEMS, TYPE_LABEL, TYPE_TAG, type CaseData, type PartNo, type Problem } from '$lib/problems';
	import { scoreTag } from '$lib/rubric';
	import { attemptsFor, bestScore, exportJSON, filteredProblems, importJSON, resetAll, store, type Prefs } from '$lib/store.svelte';

	const list = $derived(filteredProblems());
	const answered = $derived(PROBLEMS.filter((p) => bestScore(p.pid) >= 0));
	const scores = $derived(answered.map((p) => bestScore(p.pid)));
	const avg = $derived(scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0);
	const next = $derived(list.find((p) => bestScore(p.pid) < 0) ?? list[0]);

	const groups = $derived.by(() => {
		const out: { c: CaseData; items: Problem[] }[] = [];
		for (const p of list) {
			const g = out[out.length - 1];
			if (g && g.c === p.c) g.items.push(p);
			else out.push({ c: p.c, items: [p] });
		}
		return out;
	});

	const partStats = $derived(
		([1, 2, 3, 4] as PartNo[]).map((n) => {
			const ps = PROBLEMS.filter((p) => p.c.part === n);
			return { n, name: PARTS[n], total: ps.length, done: ps.filter((p) => bestScore(p.pid) >= 0).length };
		})
	);

	const filters: { key: keyof Pick<Prefs, 'part' | 'type' | 'status'>; label: string; opts: [string, string][] }[] = [
		{ key: 'part', label: 'Part', opts: [['all', 'All parts'], ['1', 'I · President'], ['2', 'II · Budget'], ['3', 'III · Judiciary'], ['4', 'IV · Commissions']] },
		{ key: 'type', label: 'Type', opts: [['all', 'All types'], ['drill', 'Case drills'], ['same', 'Same rule'], ['twist', 'Twists']] },
		{ key: 'status', label: 'Status', opts: [['all', 'All'], ['new', 'Not yet'], ['weak', 'Below 4']] }
	];

	function random() {
		const pool = list.filter((p) => bestScore(p.pid) < 0);
		const from = pool.length ? pool : list.length ? list : PROBLEMS;
		goto(`/p/${from[Math.floor(Math.random() * from.length)].pid}`);
	}

	// ---- backup ----
	let backupMsg = $state('');
	let confirmReset = $state(false);
	let fileInput: HTMLInputElement;

	function download() {
		const blob = new Blob([exportJSON()], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `1law-c-backup-${new Date().toISOString().slice(0, 10)}.json`;
		document.body.appendChild(a);
		a.click();
		a.remove();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
		backupMsg = 'Backup downloaded.';
	}
	async function restore(e: Event) {
		const f = (e.currentTarget as HTMLInputElement).files?.[0];
		if (!f) return;
		const r = importJSON(await f.text());
		backupMsg = r.ok ? `Restored progress on ${r.count} problems.` : r.error;
		(e.currentTarget as HTMLInputElement).value = '';
	}
</script>

<svelte:head><title>Consti I · 1Law-C</title></svelte:head>

<main class="page">
	<div class="between wrap intro">
		<div class="stack" style="gap:6px">
			<h1>Answer the way the bar grades you.</h1>
			<p class="muted" style="max-width:62ch">
				{PROBLEMS.length} problems from your Consti I finals coverage: 28 case drills and 84 twin problems. Write in ALAC, check yourself against the reference and the 0–5 rubric, then rebuild your answer.
			</p>
		</div>
		<div class="row wrap">
			<button class="btn btn-secondary" onclick={random}>Random problem</button>
			{#if next}<a class="btn btn-primary" href="/p/{next.pid}">{answered.length ? 'Continue' : 'Start practicing'}</a>{/if}
		</div>
	</div>

	<section class="kpis card" aria-label="Your progress">
		<div class="kpi">
			<span class="k">Answered</span>
			<b>{answered.length}<small>/ {PROBLEMS.length}</small></b>
			<div class="bar"><i style="width:{(answered.length / PROBLEMS.length) * 100}%"></i></div>
		</div>
		<div class="kpi">
			<span class="k">Average best score</span>
			<b>{scores.length ? avg.toFixed(1) : '—'}<small>/ 5</small></b>
			<span class="s">{scores.length ? 'Across answered problems' : 'Answer one to see it'}</span>
		</div>
		<div class="kpi">
			<span class="k">Scored 5</span>
			<b>{scores.filter((s) => s === 5).length}</b>
			<span class="s">Correct, right bases, polished</span>
		</div>
		<div class="kpi">
			<span class="k">Below 4</span>
			<b>{scores.filter((s) => s < 4).length}</b>
			<span class="s">Worth another attempt</span>
		</div>
	</section>

	<div class="parts">
		{#each partStats as ps (ps.n)}
			<button class="card part" onclick={() => (store.prefs.part = String(ps.n) as Prefs['part'])} aria-label="Show {ps.name}">
				<span class="between"><span class="pn">{ps.name}</span><span class="muted num" style="font-size:12px">{ps.done}/{ps.total}</span></span>
				<span class="bar"><i style="width:{(ps.done / ps.total) * 100}%"></i></span>
			</button>
		{/each}
	</div>

	<div class="filters">
		{#each filters as f (f.key)}
			<div class="seg" role="group" aria-label={f.label}>
				{#each f.opts as [v, label] (v)}
					<button aria-pressed={store.prefs[f.key] === v} onclick={() => ((store.prefs[f.key] as string) = v)}>{label}</button>
				{/each}
			</div>
		{/each}
	</div>

	{#if !list.length}
		<div class="card empty">
			<p style="font-weight:600">No problems match these filters.</p>
			<p class="muted">{store.prefs.status === 'weak' ? 'Nothing below 4 here.' : 'Try another part or type.'}</p>
		</div>
	{:else}
		{#each groups as g (g.c.id)}
			<section class="card group">
				<div class="group-h">
					<span class="tag tag-line">{PART_SHORT[g.c.part]}</span>
					<h2>{g.c.name}</h2>
					<span class="muted cite hide-sm">{g.c.cite}</span>
				</div>
				<ul>
					{#each g.items as p (p.pid)}
						{@const b = bestScore(p.pid)}
						{@const n = attemptsFor(p.pid).length}
						<li>
							<a class="prow" href="/p/{p.pid}">
								<span class="muted num no">{p.no}</span>
								<span class="lbl">{p.label}</span>
								<span class="{TYPE_TAG[p.type]} hide-sm">{TYPE_LABEL[p.type]}</span>
								{#if b >= 0}
									<span class="{scoreTag(b)} pill num" title="Best of {n} attempt{n > 1 ? 's' : ''}">{b}/5</span>
								{:else}
									<span class="tag pill">New</span>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	{/if}

	<section class="card backup" aria-labelledby="bk">
		<div class="stack" style="gap:2px">
			<h2 id="bk">Backup</h2>
			<p class="muted" style="font-size:13.5px">Progress is saved in this browser only. Export it to move to another device, then import it there.</p>
			{#if backupMsg}<p style="font-size:13.5px;font-weight:600" role="status">{backupMsg}</p>{/if}
		</div>
		<div class="row wrap">
			<button class="btn btn-secondary btn-sm" onclick={download}>Export progress</button>
			<button class="btn btn-secondary btn-sm" onclick={() => fileInput.click()}>Import</button>
			<input bind:this={fileInput} type="file" accept="application/json,.json" hidden onchange={restore} />
			{#if confirmReset}
				<button class="btn btn-sm" style="background:var(--error);color:#fff" onclick={() => { resetAll(); confirmReset = false; backupMsg = 'All progress cleared.'; }}>Yes, clear everything</button>
				<button class="btn btn-ghost btn-sm" onclick={() => (confirmReset = false)}>Cancel</button>
			{:else}
				<button class="btn btn-ghost btn-sm" onclick={() => (confirmReset = true)}>Clear progress</button>
			{/if}
		</div>
	</section>
</main>

<style>
	.intro {
		margin-bottom: 20px;
		align-items: flex-end;
	}
	h1 {
		font-size: 24px;
		font-weight: 600;
		letter-spacing: -0.015em;
		text-wrap: balance;
	}
	.kpis {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
		overflow: hidden;
		margin-bottom: 16px;
	}
	.kpi {
		padding: 16px 20px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		border-right: 1px solid var(--border);
	}
	.kpi:last-child {
		border-right: 0;
	}
	.kpi .k {
		font-size: 13px;
		color: var(--text-2);
	}
	.kpi .s {
		font-size: 12px;
		color: var(--text-2);
	}
	.kpi b {
		font-size: 26px;
		line-height: 1.1;
		font-weight: 600;
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
	}
	.kpi b small {
		font-size: 13px;
		color: var(--text-2);
		font-weight: 500;
		margin-left: 3px;
	}
	.parts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
		gap: 10px;
		margin-bottom: 24px;
	}
	.part {
		padding: 12px 14px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		text-align: left;
		cursor: pointer;
	}
	.part:hover {
		border-color: var(--border-strong);
	}
	.pn {
		font-size: 13px;
		font-weight: 600;
	}
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-bottom: 18px;
	}
	.empty {
		padding: 32px;
		text-align: center;
	}
	.group {
		margin-bottom: 12px;
	}
	.group-h {
		display: flex;
		align-items: baseline;
		gap: 10px;
		padding: 14px 16px 8px;
		flex-wrap: wrap;
	}
	.group-h h2 {
		font-size: 14.5px;
		font-weight: 600;
	}
	.cite {
		font-family: var(--legal);
		font-style: italic;
		font-size: 13px;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	.prow {
		display: flex;
		align-items: center;
		gap: 12px;
		min-height: 48px;
		padding: 8px 16px;
		border-top: 1px solid var(--border);
		text-decoration: none;
		color: var(--text);
	}
	.prow:hover {
		background: var(--surface-2);
	}
	.no {
		width: 28px;
		font-size: 12px;
	}
	.lbl {
		flex: 1;
		min-width: 0;
		font-size: 14px;
	}
	.pill {
		min-width: 44px;
		justify-content: center;
	}
	.backup {
		margin-top: 28px;
		padding: 16px 20px;
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
		justify-content: space-between;
	}
	.backup h2 {
		font-size: 14.5px;
		font-weight: 600;
	}
	@media (max-width: 640px) {
		.kpi {
			border-right: 0;
			border-bottom: 1px solid var(--border);
		}
	}
</style>
