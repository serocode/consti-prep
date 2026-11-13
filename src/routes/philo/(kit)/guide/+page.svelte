<script lang="ts">
	import { kinds, moves, fmt } from '$lib/philo';
	import { CAREFUL, FIVE, WHY_MATTERS } from '$lib/philo-content';

	const habits: [string, string][] = [
		['Name the thinker and the phrase.', '“Ehrlich’s living law”, “Pound’s social engineering”. Precision reads as mastery.'],
		['Anchor in a Philippine case or Civil Code article.', 'The jurisprudence handouts exist for that purpose.'],
		['Take a side.', 'End every differentiate, critique and opinion answer with your own position and one reason.']
	];
</script>

<svelte:head><title>Answer guide · Legal Philo · 1Law-C</title></svelte:head>

<div class="stack" style="gap:20px">
	<p class="note card muted" style="font-size:13.5px">
		Went blank? The routine is the same for every subject: see <a href="/exam-day#blank">Exam day → If I go blank</a>. This
		page keeps what is specific to Legal Philo.
	</p>

	<section class="stack" style="gap:8px">
		<h2 class="h">How to think philosophically</h2>
		<p class="muted" style="max-width:68ch">The professor tests thinking, not recall. Five habits work for every question type.</p>
		<ol class="steps">
			{#each moves as [t, d], i (t)}
				<li class="card"><span class="n num" aria-hidden="true">{i + 1}</span><div><b>{t}</b> {@html fmt(d)}</div></li>
			{/each}
		</ol>
	</section>

	<section class="stack" style="gap:8px">
		<h2 class="h">The four question types</h2>
		<div class="grid">
			{#each kinds as k (k.id)}
				<div class="blk plain">
					<h4>{k.name}</h4>
					<p class="muted">{k.tests}</p>
					<ol>{#each k.formula as f (f)}<li>{f}</li>{/each}</ol>
					<p class="legal first">{k.first}</p>
					<p class="trap-line"><b>Trap:</b> {k.trap}</p>
					<a class="btn btn-secondary btn-sm" style="align-self:flex-start" href="/philo/essays">Practice {k.name.toLowerCase()} questions</a>
				</div>
			{/each}
		</div>
	</section>

	<section class="blk k-doc">
		<h4>Three habits that earn marks</h4>
		<ul>{#each habits as [t, d] (t)}<li><b>{t}</b> {d}</li>{/each}</ul>
	</section>

	<section class="stack" style="gap:8px">
		<h2 class="h">Why this matters to a law student</h2>
		<p class="muted" style="max-width:68ch">
			Material for the opinion question the midterm asked. Pick two or three, make them concrete, and add one sentence from your
			own experience.
		</p>
		<div class="grid">
			{#each WHY_MATTERS as [t, src, eff] (t)}
				<div class="card why">
					<b>{t}</b>
					<span class="muted s">{@html fmt(src)}</span>
					<span class="s eff">{@html fmt(eff)}</span>
				</div>
			{/each}
		</div>
	</section>

	<section class="card five">
		<h2 class="eyebrow">If you remember only five sentences</h2>
		<ol>{#each FIVE as f (f)}<li class="legal">{f}</li>{/each}</ol>
	</section>

	<section class="blk trap">
		<h4>Handle with care: where the handout differs from the usual account</h4>
		<ul>{#each CAREFUL as c (c)}<li>{@html fmt(c)}</li>{/each}</ul>
	</section>
</div>

<style>
	.h {
		font-size: 18px;
		font-weight: 600;
	}
	.s {
		font-size: 13.5px;
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
		padding: 12px 14px;
		font-size: 14.5px;
	}
	.n {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background: var(--accent-soft);
		color: var(--accent-text);
		font-size: 13px;
		font-weight: 700;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		gap: 10px;
	}
	.grid .blk {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.grid ol {
		display: grid;
		gap: 3px;
	}
	.first {
		font-size: 15.5px;
		font-style: italic;
	}
	.trap-line {
		font-size: 13.5px;
		color: var(--error);
	}
	.why {
		padding: 12px 14px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.eff {
		color: var(--accent-text);
		font-weight: 500;
	}
	.five {
		padding: 16px 18px;
	}
	.five ol {
		margin-top: 8px;
		padding-left: 1.3em;
		display: grid;
		gap: 6px;
		font-size: 16px;
	}
</style>
