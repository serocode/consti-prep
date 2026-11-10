<script lang="ts">
	import { tick } from 'svelte';
	import QuestionCard from './QuestionCard.svelte';
	import { Q_BY_ID } from '$lib/crimpro';
	import { answer, endSession, fmtTime, submit } from '$lib/crimpro-exam';
	import type { Session } from '$lib/store.svelte';

	let { s }: { s: Session } = $props();

	const exam = $derived(s.kind === 'exam');
	const n = $derived(s.qids.length);
	const ref = $derived(Q_BY_ID[s.qids[s.i]]);
	const picked = $derived(s.picks[s.i]);
	const answered = $derived(s.picks.filter((p) => p !== null).length);
	const last = $derived(s.i === n - 1);

	let now = $state(Date.now());
	const left = $derived(s.deadline ? (s.deadline - now) / 1000 : null);
	$effect(() => {
		if (!s.deadline) return;
		const t = setInterval(() => (now = Date.now()), 500);
		return () => clearInterval(t);
	});
	$effect(() => {
		if (left !== null && left <= 0) submit();
	});

	let confirmSubmit = $state(false);
	let confirmQuit = $state(false);
	let top: HTMLElement | undefined = $state();

	async function go(i: number) {
		if (i < 0 || i >= n) return;
		s.i = i;
		confirmSubmit = false;
		window.scrollTo(0, 0);
		await tick();
		top?.focus({ preventScroll: true });
	}

	function trySubmit() {
		if (answered < n && !confirmSubmit) confirmSubmit = true;
		else submit();
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.metaKey || e.ctrlKey || e.altKey) return;
		const t = e.target as HTMLElement;
		if (t.closest('input, textarea, select')) return;
		if (e.key === 'ArrowLeft' && exam) {
			e.preventDefault();
			go(s.i - 1);
		} else if (e.key === 'ArrowRight' || (e.key === 'Enter' && !t.closest('a, button:not(:disabled), summary'))) {
			// Practice: move on only after answering. Exam: free movement, but not past the end.
			if (!exam && picked === null) return;
			if (last) return;
			e.preventDefault();
			go(s.i + 1);
		}
	}
</script>

<svelte:window {onkeydown} />

<div class="col">
	<div class="bar-top" tabindex="-1" bind:this={top}>
		<div class="stack" style="gap:2px;min-width:0">
			<span class="eyebrow">{s.label}</span>
			<span class="num" style="font-weight:600">Question {s.i + 1} of {n}{exam ? ` · ${answered} answered` : ''}</span>
		</div>
		{#if left !== null}
			<span class="timer num" class:low={left < 60} role="timer" aria-label="Time left">{fmtTime(left)}</span>
		{/if}
	</div>

	<div class="dots" role="group" aria-label="Jump to a question">
		{#each s.qids as id, k (id)}
			{@const p = s.picks[k]}
			{@const right = p !== null && p === Q_BY_ID[id].q.a}
			<button
				class:cur={k === s.i}
				class:done={exam && p !== null}
				class:ok={!exam && p !== null && right}
				class:no={!exam && p !== null && !right}
				disabled={!exam && k > s.i}
				aria-label="Question {k + 1}{p !== null ? ', answered' : ''}"
				aria-current={k === s.i ? 'step' : undefined}
				onclick={() => go(k)}>{k + 1}</button
			>
		{/each}
	</div>

	{#key s.i}
		<QuestionCard
			{ref}
			order={s.orders[s.i]}
			{picked}
			context
			reveal={!exam && picked !== null}
			locked={!exam && picked !== null}
			onpick={(oi) => answer(s.i, oi)}
		/>
	{/key}

	<div class="between wrap nav">
		<div class="row wrap">
			{#if exam}
				<button class="btn btn-secondary" disabled={s.i === 0} onclick={() => go(s.i - 1)}>← Previous</button>
			{/if}
			{#if !last}
				<button class="btn {exam ? 'btn-secondary' : 'btn-primary'}" disabled={!exam && picked === null} onclick={() => go(s.i + 1)}>Next →</button>
			{/if}
			{#if exam || (last && picked !== null)}
				<button class="btn {exam && !last ? 'btn-ghost' : 'btn-primary'}" onclick={trySubmit}>
					{exam ? 'Submit exam' : 'See results'}
				</button>
			{/if}
		</div>
		{#if confirmQuit}
			<div class="row">
				<span class="muted" style="font-size:13px">Discard this {exam ? 'exam' : 'run'}?</span>
				<button class="btn btn-sm" style="background:var(--error);color:#fff" onclick={endSession}>Discard</button>
				<button class="btn btn-ghost btn-sm" onclick={() => (confirmQuit = false)}>Keep going</button>
			</div>
		{:else}
			<button class="btn btn-ghost btn-sm" onclick={() => (confirmQuit = true)}>Quit</button>
		{/if}
	</div>

	{#if confirmSubmit}
		<div class="note note-warn row wrap" role="alert">
			<span style="flex:1;min-width:200px">{n - answered} question{n - answered === 1 ? ' is' : 's are'} unanswered and will count as wrong.</span>
			<button class="btn btn-primary btn-sm" onclick={submit}>Submit anyway</button>
			<button class="btn btn-ghost btn-sm" onclick={() => (confirmSubmit = false)}>Keep answering</button>
		</div>
	{/if}

	<p class="faint hide-sm" style="font-size:12.5px">
		Keys: A–D or 1–4 to answer · {exam ? '← → to move between questions' : 'Enter for the next question'}
	</p>
</div>

<style>
	.bar-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		outline: none;
	}
	/* Pinned so the clock stays visible on long questions. */
	.timer {
		position: fixed;
		left: calc(16px + env(safe-area-inset-left, 0px));
		bottom: calc(16px + env(safe-area-inset-bottom, 0px));
		z-index: 10;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
		font-size: 18px;
		font-weight: 600;
		padding: 8px 16px;
		border-radius: 999px;
		background: var(--surface);
		border: 1px solid var(--border);
	}
	.timer.low {
		color: var(--error);
		background: var(--error-soft);
		border-color: var(--error);
	}
	.dots {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}
	.dots button {
		min-width: 30px;
		height: 28px;
		padding: 0 4px;
		border-radius: 5px;
		border: 1px solid var(--border-strong);
		background: var(--surface);
		color: var(--text-2);
		font-size: 12px;
		font-variant-numeric: tabular-nums;
		cursor: pointer;
	}
	.dots button:disabled {
		opacity: 0.45;
		cursor: default;
	}
	.dots button.done {
		background: var(--surface-3);
		color: var(--text);
	}
	.dots button.ok {
		background: var(--success-soft);
		border-color: var(--success);
		color: var(--success);
	}
	.dots button.no {
		background: var(--error-soft);
		border-color: var(--error);
		color: var(--error);
	}
	.dots button.cur {
		outline: 2px solid var(--accent);
		outline-offset: 1px;
		color: var(--text);
		font-weight: 700;
	}
</style>
