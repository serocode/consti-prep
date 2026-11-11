<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';

	/** [label, value, value?, …] rows; the first cell is the row header. Values blur in self-test mode. */
	type Table = { title: string; head?: string[]; rows: string[][]; note?: string };

	const tables: Table[] = [
		{
			title: 'Duration of penalties · Art. 27',
			rows: [
				['Reclusion perpetua', '20 years 1 day – 40 years'],
				['Reclusion temporal', '12 years 1 day – 20 years'],
				['Prision mayor; temporary disqualification', '6 years 1 day – 12 years'],
				['Prision correccional; suspension; destierro', '6 months 1 day – 6 years'],
				['Arresto mayor', '1 month 1 day – 6 months'],
				['Arresto menor', '1 day – 30 days'],
				['Bond to keep the peace', 'As the court fixes']
			]
		},
		{
			title: 'Fines · Art. 26 (RA 10951)',
			rows: [
				['Afflictive', 'More than P1,200,000'],
				['Correctional', 'P40,000 to P1,200,000'],
				['Light', 'Less than P40,000'],
				['Light felony (Art. 9)', 'Arresto menor or fine not over P40,000']
			],
			note: 'Older amounts in some notes: over P6,000 / P200–P6,000 / under P200.'
		},
		{
			title: 'Periods of divisible penalties · Art. 76',
			head: ['Penalty', 'Minimum', 'Medium', 'Maximum'],
			rows: [
				['Reclusion temporal', '12y 1d – 14y 8m', '14y 8m 1d – 17y 4m', '17y 4m 1d – 20y'],
				['Prision mayor', '6y 1d – 8y', '8y 1d – 10y', '10y 1d – 12y'],
				['Prision correccional, destierro', '6m 1d – 2y 4m', '2y 4m 1d – 4y 2m', '4y 2m 1d – 6y'],
				['Arresto mayor', '1m 1d – 2m', '2m 1d – 4m', '4m 1d – 6m'],
				['Arresto menor', '1 – 10 days', '11 – 20 days', '21 – 30 days']
			]
		},
		{
			title: 'Degrees lower · Arts. 50–57',
			head: ['', 'Consummated', 'Frustrated', 'Attempted'],
			rows: [
				['Principal', '0', '1', '2'],
				['Accomplice', '1', '2', '3'],
				['Accessory', '2', '3', '4']
			],
			note: 'Scale No. 1: RP → RT → PM → PC → arresto mayor → destierro → arresto menor → public censure → fine.'
		},
		{
			title: 'Prescription · Arts. 90 and 92',
			head: ['Penalty', 'Of the crime', 'Of the penalty'],
			rows: [
				['Death, reclusion perpetua', '20 years', '20 years'],
				['Reclusion temporal', '20 years', '15 years'],
				['Other afflictive', '15 years', '15 years'],
				['Correctional', '10 years', '10 years'],
				['Arresto mayor', '5 years', '5 years'],
				['Libel and similar', '1 year', '—'],
				['Oral defamation, slander by deed', '6 months', '—'],
				['Light', '2 months', '1 year']
			]
		},
		{
			title: 'Good conduct time allowance · Art. 97',
			rows: [
				['Years 1–2', '20 days per month'],
				['Years 3–5', '23 days per month'],
				['Years 6–10', '25 days per month'],
				['Year 11 on', '30 days per month'],
				['Study, teaching, mentoring', '+15 days per month'],
				['STAL (Art. 98)', '1/5 if back within 48 hours; 2/5 if he stayed']
			]
		}
	];

	const other: [string, string][] = [
		['Preventive imprisonment credit', 'full if he agrees in writing; 4/5 if not; for RP, deducted from 30 years'],
		['Subsidiary imprisonment', 'max 1/3 of the term, never over 1 year; fine only: 6 months (grave/less grave), 15 days (light)'],
		['Three-fold rule', '3× the most severe penalty, max 40 years'],
		['Habitual delinquency', 'within 10 years; 3rd conviction; total cap 30 years'],
		['Prision correccional over…', '18 months: perpetual special disqualification from suffrage'],
		['Bond to keep the peace not given', 'detention up to 6 months (grave/less grave) or 30 days (light)'],
		['Destierro radius', '25 to 250 km'],
		['Probation', 'max term not more than 6 years; period up to 2 years (term ≤ 1 year) or 6 years'],
		['ISLaw', 'not for a maximum term of 1 year or less'],
		['Children (RA 9344)', '15 or below exempt; over 15 under 18 exempt unless with discernment; suspended sentence until 21']
	];

	let hide = $state(false);
	const shown = new SvelteSet<string>();
	function setHide(v: boolean) {
		hide = v;
		shown.clear();
	}
	function toggle(id: string) {
		if (shown.has(id)) shown.delete(id);
		else shown.add(id);
	}
</script>

<svelte:head><title>Numbers · Crim Law I · 1Law-C</title></svelte:head>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">
		Every number to memorize in Arts. 16–113. Fines follow <b>RA 10951 (2017)</b>. Switch to self-test, say the
		number, then tap it to check.
	</p>
	<div class="seg" role="group" aria-label="Number visibility" style="align-self:flex-start">
		<button aria-pressed={!hide} onclick={() => setHide(false)}>Show numbers</button>
		<button aria-pressed={hide} onclick={() => setHide(true)}>Hide numbers (self-test)</button>
	</div>

	{#snippet val(id: string, v: string)}
		{#if hide}
			<button class="v" class:blur={!shown.has(id)} onclick={() => toggle(id)} aria-label={shown.has(id) ? v : 'Reveal this number'}>{v}</button>
		{:else}{v}{/if}
	{/snippet}

	<div class="grid">
		{#each tables as t (t.title)}
			<section class="blk k-mem">
				<h4>{t.title}</h4>
				<div style="overflow-x:auto">
					<table>
						{#if t.head}<thead><tr>{#each t.head as h, i (i)}<th>{h}</th>{/each}</tr></thead>{/if}
						<tbody>
							{#each t.rows as [label, ...vals] (label)}
								<tr>
									<th scope="row">{label}</th>
									{#each vals as v, i (i)}<td>{@render val(`${t.title}|${label}|${i}`, v)}</td>{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				{#if t.note}<p class="muted note-s">{t.note}</p>{/if}
			</section>
		{/each}
		<section class="blk k-mem wide">
			<h4>Other numbers</h4>
			<ul>
				{#each other as [k, v] (k)}<li><b>{k}:</b> {@render val(k, v)}</li>{/each}
			</ul>
		</section>
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(380px, 100%), 1fr));
		gap: 12px;
	}
	.wide {
		grid-column: 1 / -1;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		font-size: 14px;
	}
	th,
	td {
		border-bottom: 1px solid color-mix(in srgb, var(--fg-k) 22%, transparent);
		padding: 6px 8px;
		text-align: left;
		vertical-align: top;
	}
	tbody tr:last-child > * {
		border-bottom: 0;
	}
	thead th {
		font-size: 12.5px;
		color: var(--text-2);
	}
	tbody th {
		font-weight: 600;
	}
	td {
		font-variant-numeric: tabular-nums;
	}
	.note-s {
		font-size: 12.5px;
		margin-top: 6px;
	}
	.v {
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition: filter 0.15s;
	}
	.v.blur {
		filter: blur(6px);
		user-select: none;
	}
</style>
