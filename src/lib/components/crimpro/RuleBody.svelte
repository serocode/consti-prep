<script lang="ts">
	import { setsForRule, type Rule, type Table } from '$lib/crimpro';
	import { md } from '$lib/text';

	let { rule }: { rule: Rule } = $props();
	const sets = $derived(setsForRule(rule.id));
</script>

{#snippet list(items: string[], ordered = false)}
	{#if ordered}
		<ol>{#each items as it, k (k)}<li>{@html md(it)}</li>{/each}</ol>
	{:else}
		<ul>{#each items as it, k (k)}<li>{@html md(it)}</li>{/each}</ul>
	{/if}
{/snippet}

{#snippet table(c: Table)}
	<div class="tbl">
		<table>
			<thead><tr>{#each c.head as h, k (k)}<th>{h}</th>{/each}</tr></thead>
			<tbody>
				{#each c.rows as row, k (k)}
					<tr>
						{#each row as cell, j (j)}
							{#if j === 0}<th scope="row">{cell}</th>{:else}<td>{cell}</td>{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#if rule.mem}
	<div class="blk k-mem"><h4>Memorize</h4>{@render list(rule.mem)}</div>
{/if}
{#if rule.req}
	<div class="blk k-req"><h4>Requisites · {rule.req.t}</h4>{@render list(rule.req.items, true)}</div>
{/if}
{#if rule.doc}
	<div class="blk k-doc"><h4>Rules and doctrine</h4>{@render list(rule.doc)}</div>
{/if}
{#if rule.doc2}
	<div class="blk k-doc"><h4>Also</h4>{@render list(rule.doc2)}</div>
{/if}
{#if rule.exc}
	<div class="blk k-exc"><h4>Exception · {rule.exc.t}</h4>{@render list(rule.exc.items)}</div>
{/if}
{#if rule.exx}
	<div class="blk k-exx"><h4>Exception to exception · {rule.exx.t}</h4>{@render list(rule.exx.items)}</div>
{/if}
{#if rule.cls}
	<div class="blk k-cls"><h4>Classification · {rule.cls.t}</h4>{@render table(rule.cls)}</div>
{/if}
{#if rule.cls2}
	<div class="blk k-cls"><h4>Classification · {rule.cls2.t}</h4>{@render table(rule.cls2)}</div>
{/if}
<div class="blk trap"><h4>Exam trap</h4><p>{@html md(rule.trap)}</p></div>

{#if sets.length}
	<div class="row wrap" style="margin-top:4px">
		{#each sets as s (s.id)}
			<a class="btn btn-secondary btn-sm" href="/crimpro/drill/{s.id}">Drill: {s.title}</a>
		{/each}
	</div>
{/if}

<style>
	.blk {
		border-radius: 6px;
		padding: 11px 14px;
		background: var(--bg-k);
	}
	.blk h4 {
		margin: 0 0 4px;
		font-size: 11.5px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--fg-k);
	}
	.blk :global(ul),
	.blk :global(ol) {
		padding-left: 1.3em;
	}
	.blk :global(li) {
		margin: 3px 0;
	}
	.k-mem {
		--bg-k: var(--error-soft);
		--fg-k: var(--error);
	}
	.k-req {
		--bg-k: var(--english-soft);
		--fg-k: var(--english);
	}
	.k-exc {
		--bg-k: var(--success-soft);
		--fg-k: var(--success);
	}
	.k-exx {
		--bg-k: var(--warning-soft);
		--fg-k: var(--warning);
	}
	.k-doc {
		--bg-k: var(--purple-soft);
		--fg-k: var(--purple);
	}
	.k-cls {
		--bg-k: var(--teal-soft);
		--fg-k: var(--teal);
	}
	.trap {
		--bg-k: var(--accent-soft);
		--fg-k: var(--accent-text);
		border: 1px solid var(--accent-line);
	}
	.tbl {
		overflow-x: auto;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		font-size: 13.5px;
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
	th {
		font-weight: 600;
	}
</style>
