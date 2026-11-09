<script lang="ts">
	import { md, type Problem } from '$lib/problems';

	let { problem, open = false }: { problem: Problem; open?: boolean } = $props();
</script>

<details class="disc" {open}>
	<summary>Reference answer</summary>
	<div class="disc-b">
		{#each problem.alac as line, i (i)}
			<div class="row" style="align-items:flex-start;gap:12px">
				<span class="letter sm">{'ALAC'[i]}</span>
				<p class="legal" style="font-size:15.5px;line-height:1.6;min-width:0">{line}</p>
			</div>
		{/each}
		<div class="note note-warn"><strong>Key point.</strong> {problem.key}</div>
	</div>
</details>
<details class="disc">
	<summary>Rule and provisions · {problem.c.name}</summary>
	<div class="disc-b">
		<p style="max-width:72ch">{problem.c.rule}</p>
		{#each problem.c.mem as m, i (i)}<div class="prov">{m}</div>{/each}
		{#if problem.c.doc.length}
			<ul style="padding-left:20px;display:flex;flex-direction:column;gap:6px">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- md() escapes all input first -->
				{#each problem.c.doc as d, i (i)}<li>{@html md(d)}</li>{/each}
			</ul>
		{/if}
		<p class="muted" style="font-size:13px">{problem.c.cite}</p>
	</div>
</details>
