<script lang="ts">
	import Mascot from './Mascot.svelte';
	import { browser } from '$app/environment';

	/** Bump the version to show the notice again to everyone (e.g. when the wording changes). */
	const KEY = 'alac-consti:disclaimer:v1';

	let { open = $bindable(false) }: { open?: boolean } = $props();
	let dialog: HTMLDialogElement | undefined = $state();
	let shownThisLoad = false;

	function seen(): boolean {
		if (!browser) return true;
		// In `pnpm dev` always show it on page load so the notice can be reviewed while editing.
		if (import.meta.env.DEV && !shownThisLoad) return false;
		try {
			return localStorage.getItem(KEY) === '1';
		} catch {
			return false;
		}
	}

	function accept() {
		try {
			localStorage.setItem(KEY, '1');
		} catch {
			/* private mode: it will simply show again next visit */
		}
		shownThisLoad = true;
		open = false;
	}

	$effect(() => {
		if (!seen()) open = true;
	});

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		else if (!open && dialog.open) dialog.close();
	});
</script>

<dialog
	bind:this={dialog}
	aria-labelledby="disc-title"
	aria-describedby="disc-body"
	oncancel={(e) => {
		// Require an explicit acknowledgement the first time; Esc is fine afterwards.
		if (!seen()) e.preventDefault();
		else open = false;
	}}
	onclose={() => (open = false)}
>
	<div class="box">
		<div class="head">
			<Mascot size={52} />
			<h2 id="disc-title">Hoot hoot! Before you start</h2>
		</div>
		<div id="disc-body">
			<p>
				<b>The review material and the model answers in this app are AI-generated.</b> They may contain mistakes, outdated
				doctrine, misquoted provisions, or wrong case citations.
			</p>
			<ul>
				<li>Treat them as a study aid, not as legal authority or legal advice.</li>
				<li>Verify every rule, article, and case against the Constitution, the Rules of Court, the decisions themselves, and your professor's materials.</li>
				<li>If your professor's view differs from the model answer, follow your professor.</li>
				<li>Your own answers, self-scores, and drill scores are saved only in this browser. The app counts visits anonymously (no cookies, no personal data), and never sends your answers.</li>
			</ul>
		</div>
		<p class="tip">
			<b>Best way to use this app:</b> start with each subject's <b>★ Exam focus</b>, then keep pressing
			<b>Random problem</b>. On the exam, you won't know which question is coming, so don't study the problems in order.
			See <b>Exam day</b> for the go-blank routine.
		</p>
		<div class="actions">
			<button class="btn btn-primary" onclick={accept}>I understand</button>
		</div>
	</div>
</dialog>

<style>
	dialog {
		border: 1px solid var(--border-strong);
		border-radius: 14px;
		padding: 0;
		background: var(--surface);
		color: var(--text);
		width: min(480px, calc(100vw - 32px));
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
	.box {
		padding: 22px;
		border-top: 4px solid var(--accent);
		border-radius: 14px;
	}
	.head {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 10px;
	}
	h2 {
		margin: 0;
		font-size: 18px;
	}
	p {
		margin: 0 0 10px;
		line-height: 1.5;
	}
	ul {
		margin: 0;
		padding-left: 20px;
		color: var(--text-2);
		font-size: 14px;
		line-height: 1.5;
		display: grid;
		gap: 6px;
	}
	.tip {
		margin: 14px 0 0;
		padding: 10px 12px;
		border-radius: 8px;
		background: var(--accent-soft);
		border: 1px solid var(--accent-line);
		font-size: 14px;
	}
	.actions {
		margin-top: 18px;
		display: flex;
		justify-content: flex-end;
	}
</style>
