<script lang="ts">
	import NumberTable from '$lib/components/NumberTable.svelte';
	import { STATCON } from '$lib/statcon';

	const fixed: [string, string, string][] = [
		['24 months', 'Supreme Court: period to decide a case from submission', 'Art. VIII, Sec. 15(1)'],
		['12 months', 'Lower collegiate courts: period to decide, unless reduced by the Supreme Court', 'Art. VIII, Sec. 15(1)'],
		['3 months', 'All other lower courts: period to decide', 'Art. VIII, Sec. 15(1)'],
		['60 days', 'Constitutional Commissions: period to decide', 'Art. IX-A, Sec. 7'],
		['1899 · 1935 · 1943 · 1973 · 1986 · 1987', 'The Philippine constitutions, in order (1986 is the provisional Freedom Constitution)', 'Ch. XI']
	];
	// "How many?" is half of an enumeration answer: the count of every ★ Likely list.
	const counts: [string, string, string][] = STATCON.enums
		.filter((e) => STATCON.focus.enums?.[e.id])
		.map((e) => [String(e.it.length), e.t, `List ${e.id}`]);
</script>

<svelte:head><title>Numbers · StatCon · 1Law-C</title></svelte:head>

<div class="stack" style="gap:18px">
	<p class="muted" style="max-width:66ch">
		StatCon has few numbers. Learn the periods, then the count of each ★ Likely list: writing “There are four…” first gives
		you the slots to fill.
	</p>
	<NumberTable rows={fixed} title="Periods and dates" />
	<NumberTable rows={counts} title="How many items? (★ Likely lists)" />
</div>
