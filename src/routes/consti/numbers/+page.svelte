<script lang="ts">
	import NumberTable from '$lib/components/NumberTable.svelte';

	// Every period, vote, age and count within the 28 cases' coverage.
	const rows: [string, string, string][] = [
		['2 months', 'Ban on appointments: from two months before the next presidential election until the end of the President’s term', 'Art. VII, Sec. 15'],
		['4 steps', 'A valid appointment: signing, transmittal, receipt, acceptance. All must be done before the ban.', 'Velicaria-Garafil'],
		['90 days', 'Fill a vacancy in the Supreme Court, counted from when the vacancy occurs', 'Art. VIII, Sec. 4(1)'],
		['90 days', 'Fill a vacancy in a lower court, counted from submission of the JBC list', 'Art. VIII, Sec. 9'],
		['7 members', 'Membership of the JBC', 'Art. VIII, Sec. 8(1)'],
		['1', 'Representative of Congress in the JBC, with one vote', 'Chavez v. JBC'],
		['At least 3', 'Nominees the JBC must submit for every vacancy', 'Art. VIII, Sec. 9'],
		['4 years', 'Term of the regular (non-ex officio) members of the JBC', 'Art. VIII, Sec. 8(2)'],
		['5 years', 'Service as a first-level court judge before promotion to a second-level court (JBC policy)', 'Villanueva v. JBC'],
		['70 years', 'Retirement age of justices and judges', 'Art. VIII, Sec. 11'],
		['Majority of all Members of Congress', 'Concurrence needed for an amnesty', 'Art. VII, Sec. 19'],
		['2/3 of all Members of the Senate', 'Concurrence needed for a treaty or international agreement', 'Art. VII, Sec. 21'],
		['30 days', 'Monetary Board reports to Congress on foreign loans, from the end of every quarter', 'Art. VII, Sec. 20'],
		['1/3 of all Members of the House', 'Vote needed to impeach', 'Art. XI, Sec. 3(3)'],
		['2/3 of all Members of the Senate', 'Vote needed to convict in an impeachment', 'Art. XI, Sec. 3(6)'],
		['1 year', 'Period to file quo warranto; it does not run against the State', 'Republic v. Sereno'],
		['7 years', 'Term of the Chairman and Commissioners of the CSC, COMELEC and COA, without reappointment', 'Art. IX-B, C, D, Sec. 1(2)'],
		['Never over 7 years', 'Total service of a member of a Commission, counting a promotion to Chairman', 'Funa v. Villar'],
		['7, 5, 3 years', 'Staggered terms of the first appointees to the Commissions', 'Art. IX-B, C, D, Sec. 1(2)'],
		['35 years old', 'Minimum age of a member of the CSC, COMELEC or COA', 'Art. IX-B, C, D, Sec. 1(1)'],
		['60 days', 'Period for a Commission to decide a case, from its submission', 'Art. IX-A, Sec. 7'],
		['30 days', 'Period to bring a Commission’s decision to the Supreme Court on certiorari, from receipt', 'Art. IX-A, Sec. 7'],
		['65 years', 'Compulsory retirement age in the career civil service', 'CSC v. Pililla Water District'],
		['90 days / 45 days', 'Campaign period: national positions / House and local positions', 'Omnibus Election Code, Sec. 3; Peñera'],
		['3 (J-C-O)', 'Bodies with fiscal autonomy: Judiciary, Constitutional Commissions, Ombudsman', 'CHREA v. CHR']
	];
</script>

<svelte:head><title>Numbers · Consti I · 1Law-C</title></svelte:head>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">Every period, vote, age and count you may be asked for in this coverage. Hide the numbers, say each one, then tap to check.</p>
	<NumberTable {rows} />
</div>
