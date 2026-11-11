<script lang="ts">
	import FocusView from '../FocusView.svelte';
	import type { Kit } from '$lib/kit';

	let { kit }: { kit: Kit } = $props();
	const n = $derived({
		enums: Object.keys(kit.focus.enums ?? {}).length,
		terms: Object.keys(kit.focus.terms ?? {}).length,
		topics: Object.keys(kit.focus.topics ?? {}).length
	});
</script>

<FocusView top={kit.focus.top} subject={kit.name}>
	<section class="card" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px">
		<h2 class="eyebrow">★ Likely items in this subject</h2>
		<p style="font-size:14.5px">
			<b class="num">{n.enums}</b> of {kit.enums.length} enumerations, <b class="num">{n.terms}</b> of {kit.terms.length} definitions,
			and <b class="num">{n.topics}</b> problem topics are flagged. Each flag shows its reason.
		</p>
		<div class="row wrap">
			<a class="btn btn-secondary btn-sm" href="{kit.base}/enumerations">Enumerations: use “★ Likely only”</a>
			<a class="btn btn-secondary btn-sm" href="{kit.base}/terms">Definitions: use “★ Likely only”</a>
			<a class="btn btn-secondary btn-sm" href="{kit.base}/drill">Flashcards: ★ deck</a>
		</div>
	</section>
</FocusView>
