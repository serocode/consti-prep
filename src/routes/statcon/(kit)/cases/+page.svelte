<script lang="ts">
	import RateBar from '$lib/components/kit/RateBar.svelte';
	import { cardKey } from '$lib/kit';
	import { CASES } from '$lib/statcon';
	import { store } from '$lib/store.svelte';

	let open: string | null = $state(null);
</script>

<svelte:head><title>Five cases · StatCon · 1Law-C</title></svelte:head>

<div class="stack" style="gap:10px">
	<p class="muted" style="max-width:66ch">
		Each case in digest form: facts, issue, ruling, and the doctrine, plus the chapter rule it illustrates. On the exam, cite
		the case for its doctrine in your Legal Basis.
	</p>
	{#each CASES as c (c.id)}
		{@const o = open === c.id}
		<article class="card">
			<button class="head" aria-expanded={o} onclick={() => (open = o ? null : c.id)}>
				<span class="muted num yr">{c.cite}</span>
				<span class="t"><span class="name"><i>{c.name}</i></span><span class="hook">{c.ch}</span></span>
				<span class="chev" aria-hidden="true">{o ? '−' : '+'}</span>
			</button>
			{#if o}
				<div class="body">
					<div class="blk plain"><h4>Facts</h4><p>{c.facts}</p></div>
					<div class="blk plain"><h4>Issue</h4><p>{c.issue}</p></div>
					<div class="blk plain"><h4>Ruling</h4><p>{c.ruling}</p></div>
					<div class="blk k-doc"><h4>Doctrine of the case</h4><p style="font-weight:600">{c.doc}</p></div>
					<div class="blk k-cls"><h4>Chapter link</h4><p>{c.ch}</p></div>
					<div class="blk trap"><h4>Misconception to avoid</h4><p>{c.trap}</p></div>
					<RateBar ratings={store.statcon.ratings} k={cardKey.case(c.id)} prompt="Could you state the doctrine?" />
				</div>
			{/if}
		</article>
	{/each}
</div>

<style>
	.head {
		width: 100%;
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 12px;
		align-items: start;
		padding: 14px 16px;
		background: none;
		border: 0;
		border-radius: 8px;
		text-align: left;
		cursor: pointer;
	}
	.head:hover {
		background: var(--surface-2);
	}
	.yr {
		font-size: 12.5px;
		padding-top: 3px;
	}
	.t {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}
	.name {
		font-family: var(--legal);
		font-size: 17px;
		font-weight: 600;
	}
	.hook {
		color: var(--text-2);
		font-size: 13.5px;
	}
	.chev {
		color: var(--text-2);
		font-size: 18px;
		line-height: 1.2;
	}
	.body {
		padding: 12px 16px 16px;
		border-top: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
