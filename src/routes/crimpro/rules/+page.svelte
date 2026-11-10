<script lang="ts">
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import RuleBody from '$lib/components/crimpro/RuleBody.svelte';
	import { RULES } from '$lib/crimpro';

	let query = $state('');
	let open: string | null = $state(null);

	// Search over the whole card text, so "inquest" finds Rule 112 even though it is not in the title.
	const haystack = RULES.map((r) => ({ r, text: ('rule ' + r.id + ' ' + JSON.stringify(r)).toLowerCase() }));
	const list = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return q ? haystack.filter((h) => h.text.includes(q)).map((h) => h.r) : RULES;
	});

	// /crimpro/rules#r114 opens Rule 114 (linked from the drill summary).
	$effect(() => {
		const m = /^#r(\d+)$/.exec(page.url.hash);
		if (!m) return;
		open = m[1];
		tick().then(() => document.getElementById('r' + m[1])?.scrollIntoView({ block: 'start' }));
	});

	async function toggle(id: string) {
		open = open === id ? null : id;
		if (open) {
			await tick();
			document.getElementById('r' + id)?.scrollIntoView({ block: 'nearest' });
		}
	}

	const legend: [string, string][] = [
		['tag-bad', 'Memorize'],
		['tag-en', 'Requisites'],
		['tag-ok', 'Exceptions'],
		['tag-warn', 'Exception to exception'],
		['tag-purple', 'Doctrine / rule'],
		['tag-teal', 'Classification'],
		['tag-accent', 'Exam trap']
	];
</script>

<svelte:head><title>Rules 110–127 · Crim Pro · 1Law-C</title></svelte:head>

<div class="stack" style="gap:12px">
	<p class="muted" style="max-width:64ch">
		Each rule opens to color-coded notes. Read the hook first and try to recall what it covers before you open the card.
	</p>
	<div class="row wrap" aria-label="Color code" style="gap:6px">
		{#each legend as [cls, label] (label)}<span class="tag {cls}">{label}</span>{/each}
	</div>
	<input type="search" bind:value={query} placeholder="Search a rule or word (e.g. bail, demurrer, inquest)" aria-label="Search rules" />

	{#if !list.length}
		<div class="card empty">Nothing matches “{query}”. Try a shorter word.</div>
	{:else}
		<div class="stack" style="gap:10px">
			{#each list as r (r.id)}
				{@const o = open === r.id}
				<article class="card rule" id="r{r.id}">
					<button class="head" aria-expanded={o} onclick={() => toggle(r.id)}>
						<span class="muted num rn">R {r.id}</span>
						<span class="t">
							<span class="name">{r.name}</span>
							<span class="hook">{r.hook}</span>
						</span>
						<span class="chev" aria-hidden="true">{o ? '−' : '+'}</span>
					</button>
					{#if o}
						<div class="body"><RuleBody rule={r} /></div>
					{/if}
				</article>
			{/each}
		</div>
	{/if}

	<p class="note muted card" style="font-size:13px">
		Based on the 2000 Revised Rules of Criminal Procedure as amended, and the 2017 Revised Guidelines for Continuous Trial.
		The Supreme Court has been revising these rules; ask your professor which version your exam covers.
	</p>
</div>

<style>
	input[type='search'] {
		width: 100%;
		min-height: 42px;
		padding: 0 12px;
		background: var(--surface);
		border: 1px solid var(--border-strong);
		border-radius: 6px;
	}
	input[type='search']:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: var(--focus);
	}
	.rule {
		scroll-margin-top: 80px;
	}
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
	.rn {
		font-size: 12.5px;
		padding-top: 3px;
		min-width: 3.6ch;
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
		line-height: 1.3;
	}
	.hook {
		font-family: var(--legal);
		font-style: italic;
		color: var(--text-2);
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
	.empty {
		padding: 24px;
		text-align: center;
		color: var(--text-2);
	}
</style>
