<script lang="ts">
	const finder: [string, string, string][] = [
		['Two sections of one law conflict; two laws on the same subject; special vs. general law; a law that copies or refers to another', 'Ch. VI', 'whole statute, in pari materia, generalia specialibus'],
		['Penal law, tax, tax exemption, privilege, grant to a city, social legislation, LGU power, election law, amnesty', 'Ch. VII', 'strict or liberal, and in whose favor'],
		['“Shall” or “may,” a missed deadline, a skipped notice, an irregular ballot, “deemed approved”', 'Ch. VIII', 'mandatory or directory'],
		['A new law applied to an old act or a pending case; a reduced penalty; an overruled doctrine; a curative law', 'Ch. IX', 'prospective or retroactive'],
		['An amendment, a code that omits a provision, “all laws inconsistent herewith are repealed,” a repealed penal law', 'Ch. X', 'amendment and repeal'],
		['A constitutional provision with no implementing law; framers’ debates; “as may be provided by law”', 'Ch. XI', 'constitutional construction']
	];
</script>

<svelte:head><title>Answer guide · StatCon · 1Law-C</title></svelte:head>

<div class="stack" style="gap:14px">
	<p class="note card muted" style="font-size:13.5px">
		Went blank? The routine is the same for every subject: see <a href="/exam-day#blank">Exam day → If I go blank</a>. This
		page keeps what is specific to StatCon: the answer templates and the chapter finder.
	</p>

	<section class="grid">
		<div class="blk plain">
			<h4>Enumeration answer</h4>
			<p class="legal">“There are <b>[number]</b> [name of the list]. They are:</p>
			<p class="legal">(1) <b>[item]</b> — this means [one line].<br />(2) <b>[item]</b> — this means [one line].<br />(3) <b>[item]</b> — for example, [one line].”</p>
		</div>
		<div class="blk plain">
			<h4>Definition of terms</h4>
			<p class="legal">“<b>[Term]</b> is [the class it belongs to] that [what sets it apart].”</p>
			<p class="legal">Add one line that keeps it from being confused with its neighbor: “Unlike [other term], it…”</p>
		</div>
		<div class="blk plain">
			<h4>ALAC skeleton</h4>
			<p class="legal"><b>A.</b> Yes / No / Valid / Invalid.</p>
			<p class="legal"><b>L.</b> Jurisprudence provides that [rule]. The exception is when [exception].</p>
			<p class="legal"><b>A.</b> Here, [fact]. This means [rule is met / not met] because [reason].</p>
			<p class="legal"><b>C.</b> Therefore, [repeat answer].</p>
		</div>
	</section>

	<section class="stack" style="gap:8px">
		<h2 class="h">Which chapter is this problem from?</h2>
		<p class="muted">Spot the clue in the facts.</p>
		<div class="card" style="overflow-x:auto">
			<table>
				<thead><tr><th>If the facts say…</th><th>Think</th></tr></thead>
				<tbody>
					{#each finder as [clue, ch, what] (ch)}
						<tr><td>{clue}</td><td><b>{ch}</b> — {what}</td></tr>
					{/each}
				</tbody>
			</table>
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
		grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
		gap: 12px;
	}
	.grid p + p {
		margin-top: 6px;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		font-size: 14px;
	}
	th,
	td {
		border-bottom: 1px solid var(--border);
		padding: 8px 10px;
		text-align: left;
		vertical-align: top;
	}
	tbody tr:last-child td {
		border-bottom: 0;
	}
	td:first-child {
		width: 58%;
	}
	th {
		font-size: 13px;
		color: var(--text-2);
	}
</style>
