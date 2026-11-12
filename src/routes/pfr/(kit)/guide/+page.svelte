<script lang="ts">
	import { SPOT } from '$lib/pfr';

	const first: [string, string][] = [
		['Find the regime first.', 'Married before or after August 3, 1988? Any marriage settlement? Valid marriage, void marriage, or no marriage at all (Art. 147 or 148)?'],
		['Then name the topic.', 'Use the topic spotter below.'],
		['Then write ALAC.', 'A: one short answer (“Community property.” “Revocable.”). L: “The law provides that…”. A: “Here,…” and match each requisite to a fact. C: “Therefore,…”.']
	];
	const mcq: [string, string][] = [
		['Read the call first.', 'NOT, FALSE, TRUE, or “does not belong.” Circle it.'],
		['Test every option against the codal list.', 'Mark each one true or false.'],
		['Before choosing “None of the choices,”', 'make sure every option belongs or is true.']
	];
	const tricks = [
		'“Which does NOT belong” often has “None of the choices” as the answer. Check every option against the codal list before picking one.',
		'One word changes the answer: “all conjugal property” vs. conjugal and exclusive; “both spouses” vs. one spouse; “legitimate” vs. illegitimate descendants; “used by the family.”',
		'Sequence questions ask for the exact next step, not a later one.',
		'Donation status has four possible answers: void, revocable, revoked by operation of law, irrevocable. Look for bad faith, and for who is innocent.'
	];
</script>

<svelte:head><title>Answer guide · PFR · 1Law-C</title></svelte:head>

<div class="stack" style="gap:16px">
	<p class="note card muted" style="font-size:13.5px">
		Went blank? The routine is the same for every subject: see <a href="/exam-day#blank">Exam day → If I go blank</a>. This
		page keeps what is specific to PFR.
	</p>

	<section class="grid">
		<div class="blk plain">
			<h4>Scenario: in this order</h4>
			<ol>{#each first as [t, d] (t)}<li><b>{t}</b> {d}</li>{/each}</ol>
		</div>
		<div class="blk plain">
			<h4>Multiple choice routine</h4>
			<ol>{#each mcq as [t, d] (t)}<li><b>{t}</b> {d}</li>{/each}</ol>
		</div>
	</section>

	<section class="blk trap">
		<h4>How these MCQs trick you</h4>
		<ul>{#each tricks as t (t)}<li>{t}</li>{/each}</ul>
	</section>

	<section class="stack" style="gap:8px">
		<h2 class="h">Topic spotter</h2>
		<p class="muted">Find the clue in the facts. Tap it to practice that topic’s problems.</p>
		<div class="spot">
			{#each SPOT as s (s.topic.id + s.clue)}
				<a class="card" href="/pfr/problems#t-{s.topic.id}">
					<span>{s.clue}</span>
					<span class="go legal">{s.topic.title} →</span>
				</a>
			{/each}
		</div>
	</section>
</div>

<style>
	.h {
		font-size: 18px;
		font-weight: 600;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		gap: 12px;
	}
	.grid ol {
		display: grid;
		gap: 6px;
	}
	.spot {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.spot a {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 12px;
		align-items: center;
		padding: 10px 14px;
		color: var(--text);
		text-decoration: none;
		font-size: 14.5px;
	}
	.spot a:hover {
		border-color: var(--border-strong);
		background: var(--surface-2);
	}
	.go {
		font-weight: 600;
		color: var(--accent-text);
		text-align: right;
	}
	@media (max-width: 560px) {
		.spot a {
			grid-template-columns: 1fr;
		}
		.go {
			text-align: left;
		}
	}
</style>
