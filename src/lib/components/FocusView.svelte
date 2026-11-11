<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { TopQuestion } from '$lib/kit';

	/** A subject's ranked list of likely exam questions. Shared by every subject. */
	let { top, subject, flagged, children }: { top: TopQuestion[]; subject: string; flagged?: string; children?: Snippet } = $props();
</script>

<div class="stack" style="gap:14px">
	<div class="stack" style="gap:6px">
		<h2 class="h">The {top.length} most likely {subject} questions</h2>
		<p class="muted" style="max-width:68ch">
			Ranked by how often the topic comes out in bar exams and law school finals. Master these first, then widen.
			{#if flagged}{flagged}{/if}
		</p>
	</div>

	<ol class="top">
		{#each top as t, i (t.q)}
			<li class="card">
				<span class="n num" aria-hidden="true">{i + 1}</span>
				<div class="stack" style="gap:4px;min-width:0">
					<span class="q">{t.q}</span>
					<span class="row wrap" style="gap:6px">
						<span class="tag tag-accent">{t.type}</span>
						<span class="muted" style="font-size:13px">{t.topic}</span>
					</span>
				</div>
				{#if t.href}<a class="btn btn-secondary btn-sm" href={t.href}>Practice</a>{/if}
			</li>
		{/each}
	</ol>

	{@render children?.()}

	<p class="note card muted" style="font-size:13px">
		★ Likely is a study-priority estimate, not a leak. If a topic was stressed in class, treat it as ★ even if it is not
		flagged here.
	</p>
</div>

<style>
	.h {
		font-size: 18px;
		font-weight: 600;
	}
	.top {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.top li {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 12px;
		align-items: center;
		padding: 12px 14px;
	}
	.n {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-weight: 700;
		background: var(--accent-soft);
		color: var(--accent-text);
		border: 1px solid var(--accent-line);
	}
	.q {
		font-family: var(--legal);
		font-size: 16px;
		line-height: 1.4;
	}
	@media (max-width: 520px) {
		.top li {
			grid-template-columns: auto 1fr;
		}
		.top li :global(.btn) {
			grid-column: 2;
			justify-self: start;
		}
	}
</style>
