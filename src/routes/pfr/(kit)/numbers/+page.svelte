<script lang="ts">
	import NumberTable from '$lib/components/NumberTable.svelte';

	// Every period, amount and age to memorize in Art. 74 to Other Provisions.
	const rows: [string, string, string][] = [
		['1/5', 'Limit on donations between future spouses in the settlement, when the regime is not ACP', 'Family Code, Art. 84'],
		['5 years', 'Wife’s recourse to court when the husband’s decision on administration prevails', 'Art. 96, 124'],
		['3 months', 'Absence without news that is prima facie proof of abandonment', 'Art. 101'],
		['1 year', 'Liquidate the community or partnership after a spouse’s death, if there is no judicial settlement', 'Art. 103, 130'],
		['Below 7', 'Children deemed to choose the mother for the conjugal dwelling', 'Art. 102(6), 129(9)'],
		['At least 1 year', 'Separation in fact as a ground for judicial separation of property', 'Art. 135(6)'],
		['5 years', 'Innocent spouse’s period to revoke a donation propter nuptias after legal separation', 'Art. 64'],
		['P300,000 / P200,000', 'Value limit of the family home: urban / rural (codal values)', 'Art. 157'],
		['10 years', 'Family home continues after the death of the spouses or the head (or while a minor beneficiary lives there)', 'Art. 159'],
		['Majority of beneficiaries of legal age', 'Written consent needed (with the constitutor and the spouse) to sell or encumber the family home', 'Art. 158'],
		['1', 'Family homes a person may constitute or be a beneficiary of', 'Art. 161'],
		['August 3, 1988', 'Family Code effectivity; debts before it are not covered by the family-home exemption', 'Art. 162; Modequillo'],
		['120 of 300 days', 'Period before birth in which physical impossibility of intercourse must exist to impugn legitimacy', 'Art. 166'],
		['1 / 2 / 3 years', 'Period to impugn legitimacy: same place / elsewhere in the Philippines / abroad', 'Art. 170'],
		['180 and 300 days', 'Presumptions on a child born after the mother remarries', 'Art. 168'],
		['5 years', 'Heirs’ action to claim legitimacy when the child dies a minor or insane', 'Art. 173'],
		['5 years', 'Period to impugn legitimation, from when the cause of action accrues', 'Art. 182'],
		['Below 18', 'Parents’ minority at conception that does not bar legitimation', 'Art. 177 (RA 9858)'],
		['25 (27 inter-country)', 'Minimum age of an adopter', 'RA 11642'],
		['16 years', 'Required age gap between adopter and adoptee (waived for a biological parent or the parent’s spouse)', 'RA 11642'],
		['5 years', 'Residence in the Philippines required of a foreign adopter', 'RA 11642'],
		['3 years', 'An adult treated as the adopter’s own child, who may be adopted', 'RA 11642'],
		['10 years or older', 'Children whose written consent to the adoption is needed', 'RA 11642'],
		['6 months', 'Wait after the parents’ death before adoption proceedings', 'RA 11642'],
		['Under 7', 'Tender-age rule: child stays with the mother absent compelling reasons', 'Art. 213'],
		['Over 7', 'Age from which the child’s choice of parent is considered', 'Art. 213'],
		['Over 21', 'Age of the oldest sibling or actual custodian who exercises substitute parental authority', 'Art. 216'],
		['P50,000 / 10%', 'Child’s property or income above which parents must post a bond of at least 10%', 'Art. 225'],
		['18 / 21', 'Age of emancipation / age until which parental consent to marry is needed', 'Arts. 234, 236'],
		['2 years (5 with administrator)', 'Absence without news before a person may be declared absent', 'Civil Code, Art. 384'],
		['6 months', 'After publication, when a declaration of absence takes effect', 'Civil Code, Art. 386'],
		['7 years (10 for succession; 5 if over 75)', 'Absence before a person is presumed dead', 'Civil Code, Art. 390'],
		['4 years', 'Absence in danger of death before a person is presumed dead', 'Civil Code, Art. 391'],
		['4 years (2 in danger cases)', 'Absence before the present spouse may remarry, with a court declaration', 'Family Code, Art. 41'],
		['Day and month', 'Parts of the birth date the civil registrar may correct (not the year)', 'RA 10172']
	];
</script>

<svelte:head><title>Numbers · PFR · 1Law-C</title></svelte:head>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:66ch">Every period, amount and age to memorize in this coverage. Hide the numbers, say each one, then tap to check.</p>
	<NumberTable {rows} />
</div>
