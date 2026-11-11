<script lang="ts">
	import { SPOT } from '$lib/crimlaw';

	const ladder: [string, string][] = [
		['Find the penalty prescribed', 'for the consummated crime (e.g., homicide = reclusion temporal).'],
		['Adjust for stage and participation', 'using Arts. 50–57 and Scale No. 1 (frustrated −1, attempted −2; accomplice −1, accessory −2).'],
		['Apply privileged mitigating', 'to lower the degree: minority (Art. 68), incomplete justifying or exempting (Art. 69), or 2+ mitigating with no aggravating (Art. 64(5)).'],
		['Apply ordinary circumstances', 'to pick the period (Art. 64): none = medium, mitigating = minimum, aggravating = maximum. This gives the ISLaw maximum.'],
		['Fix the ISLaw minimum', 'anywhere within the penalty one degree lower than the one in step 3.']
	];
</script>

<svelte:head><title>Answer guide · Crim Law I · 1Law-C</title></svelte:head>

<div class="stack" style="gap:16px">
	<p class="note card muted" style="font-size:13.5px">
		Went blank? The routine is the same for every subject: see <a href="/exam-day#blank">Exam day → If I go blank</a>. This
		page keeps what is specific to Crim Law: the answer templates, the penalty ladder, and the topic spotter.
	</p>

	<section class="grid">
		<div class="blk plain">
			<h4>Enumeration answer</h4>
			<p class="legal">“There are <b>[number]</b> [name of the list]. They are:</p>
			<p class="legal">(1) <b>[item]</b> — this means [one line].<br />(2) <b>[item]</b> — this means [one line].”</p>
		</div>
		<div class="blk plain">
			<h4>Definition of terms</h4>
			<p class="legal">“<b>[Term]</b> is [what it is] that [what sets it apart].” Cite the article when you know it.</p>
		</div>
		<div class="blk plain">
			<h4>ALAC skeleton</h4>
			<p class="legal"><b>A.</b> Yes / No / the liability or penalty.</p>
			<p class="legal"><b>L.</b> The law provides that [rule]. Jurisprudence provides that [court-made rule].</p>
			<p class="legal"><b>A.</b> Here, [fact]. This means [requisite present / absent] because [reason].</p>
			<p class="legal"><b>C.</b> Therefore, [repeat your answer].</p>
		</div>
	</section>

	<section class="stack" style="gap:8px">
		<h2 class="h">Penalty computation ladder</h2>
		<p class="muted">For any “what penalty?” question, climb in this order.</p>
		<ol class="steps">
			{#each ladder as [t, d], k (k)}
				<li class="card"><span class="n" aria-hidden="true">{k + 1}</span><div><strong>{t}</strong> {d}</div></li>
			{/each}
		</ol>
	</section>

	<section class="stack" style="gap:8px">
		<h2 class="h">Topic spotter</h2>
		<p class="muted">Find the clue in the facts. Tap it to practice that topic’s problems.</p>
		<div class="spot">
			{#each SPOT as s (s.topic.id)}
				<a class="card" href="/crimlaw/problems#t-{s.topic.id}">
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
	.grid p + p {
		margin-top: 6px;
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
