<script lang="ts">
	import type { Answer } from '$lib/store.svelte';
	import { SECTIONS } from './sections';

	let { answer }: { answer: Answer } = $props();
</script>

{#if answer.mode === 'full'}
	<p class="legal txt" style="white-space:pre-wrap">{answer.full || '(blank)'}</p>
{:else}
	<div class="stack" style="gap:10px">
		{#each SECTIONS as s (s.k)}
			<div class="row" style="align-items:flex-start;gap:12px">
				<span class="letter sm" aria-label={s.title}>{s.L}</span>
				{#if answer[s.k]}
					<p class="legal txt">{answer[s.k]}</p>
				{:else}
					<p class="faint txt">(blank)</p>
				{/if}
			</div>
		{/each}
	</div>
{/if}

<style>
	.txt {
		font-size: 15.5px;
		line-height: 1.6;
		min-width: 0;
		overflow-wrap: anywhere;
	}
</style>
