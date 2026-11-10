<script lang="ts">
	const steps: [string, string][] = [
		['Breathe slowly, twice.', 'Pen down. In for four counts, out for four counts.'],
		['Underline the STAGE.', 'Before or after arraignment/plea? Before or after the prosecution rests? Before or after the judgment is final? Most answers turn on this.'],
		['Circle WHO acted or consented.', 'The accused, the prosecutor, the offended party, or the court on its own?'],
		['Box the NUMBER.', 'The penalty (4y 2m 1d? over 6 years? reclusion perpetua?) and the days counted.'],
		['In a follow-up question, name what changed.', 'Write it in the margin. The answer can only flip because of that change.'],
		['Cross out choices that break a rule you’re sure of.', 'Two choices usually go fast. Choose between the last two using the stage, who, and number.'],
		['Answer and move on.', 'Change an answer only if you find a rule-based reason, not a feeling.']
	];
	const five = [
		'Has the accused pleaded yet?',
		'Did the accused consent, or did he move?',
		'Is the dismissal on the merits (evidence, speedy trial)?',
		'What is the penalty bracket?',
		'Is the judgment already final?'
	];
</script>

<svelte:head><title>MCQ reset · Crim Pro · 1Law-C</title></svelte:head>

<div class="stack" style="gap:14px">
	<div class="stack" style="gap:6px">
		<h2 class="h">Stuck on an MCQ? Reset here.</h2>
		<p class="muted" style="max-width:64ch">
			Going blank is stress, not forgetting. Tricky MCQs are solved by spotting a few details, not by recalling whole
			provisions. Work through these steps on the question in front of you.
		</p>
	</div>

	<ol class="steps">
		{#each steps as [t, d], k (k)}
			<li class="card">
				<span class="n" aria-hidden="true">{k + 1}</span>
				<div><strong>{t}</strong> {d}</div>
			</li>
		{/each}
	</ol>

	<div class="grid">
		<div class="blk purple">
			<h3>Five questions that solve most twists</h3>
			<ol>{#each five as f (f)}<li>{f}</li>{/each}</ol>
		</div>
		<div class="blk red">
			<h3>Highest-yield numbers</h3>
			<ul>
				<li>PI: at least <b>4 y, 2 m, 1 d</b></li>
				<li>Provisional dismissal: <b>1 yr</b> (≤ 6 yrs) / <b>2 yrs</b> (&gt; 6 yrs)</li>
				<li>Bail denied pending appeal: penalty <b>&gt; 6 yrs</b> + a listed circumstance</li>
				<li>Search warrant valid <b>10 days</b></li>
				<li>Appeal: <b>15 days</b>, fresh period after MR/MNT denial</li>
				<li>Demurrer leave: <b>5 days</b>; demurrer: <b>10 days</b></li>
				<li>Inquest PI: ask within <b>5 days</b> of learning; finish in <b>15 days</b></li>
			</ul>
		</div>
	</div>

	<div class="row"><a class="btn btn-primary" href="/crimpro">Back to the drills</a></div>
</div>

<style>
	.h {
		font-size: 20px;
		font-weight: 600;
	}
	.steps {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.steps li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 12px;
		align-items: start;
		padding: 12px 14px;
	}
	.steps strong {
		display: block;
	}
	.n {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-family: var(--legal);
		font-weight: 600;
		background: var(--accent-soft);
		color: var(--accent-text);
		border: 1px solid var(--accent-line);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
		gap: 12px;
	}
	.blk {
		border-radius: 8px;
		padding: 12px 14px;
	}
	.blk h3 {
		font-size: 11.5px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin-bottom: 6px;
	}
	.blk ol,
	.blk ul {
		padding-left: 1.3em;
		display: grid;
		gap: 3px;
	}
	.purple {
		background: var(--purple-soft);
	}
	.purple h3 {
		color: var(--purple);
	}
	.red {
		background: var(--error-soft);
	}
	.red h3 {
		color: var(--error);
	}
</style>
