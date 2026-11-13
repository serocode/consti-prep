<script lang="ts">
	import FocusView from '$lib/components/FocusView.svelte';
	import { answerKey } from '$lib/answerkey.svelte';
	import { PHILO, ESSAYS, fmt } from '$lib/philo';
	import { RECURRING } from '$lib/philo-content';

	// The single most likely essay: one question that asks all four types at once.
	const question =
		'Define the balancing-of-interests approach of the Sociological School. Differentiate it from the approach of the Supreme Court in *Philippine Blooming Mills*. Critique the approach. What is your own opinion, and how does it shape the way you read cases?';
	const model: [string, string][] = [
		[
			'Define.',
			'The Sociological School holds that law is not a closed system of rules but the handmaiden of society. For **Jhering**, society is a mass of competing interests that cannot all be satisfied, and law stands as the impartial mediator among them. **Pound** built this into a method: the judge is a social engineer who scrutinizes, compares, and accepts or rejects conflicting individual and social interests. Our Supreme Court has adopted the method. *Lantion* calls balancing a “fundamental postulate of constitutional law.” *Soriano* weighed a broadcaster’s free speech against the State’s duty to protect the youth and held that constitutional freedoms are not absolute. *Akbayan* weighed the right to information against executive privilege.'
		],
		[
			'Differentiate.',
			'*Philippine Blooming Mills* faced the same kind of clash but resolved it differently. Workers left their shift to join a demonstration at Malacañang against alleged police abuses; the company invoked the no-strike clause, and the union officers were dismissed. The Court did not put the workers’ freedoms and the employer’s property rights on a level scale. It declared the **primacy of human rights over property rights**: property may be restricted on a rational basis, but the freedoms of expression, assembly and petition only on a showing of clear and present danger, which is Holmes’s test. Both approaches look past legal forms to the real interests at stake. They differ in structure: balancing weighs interests case by case; *Philippine Blooming Mills* ranks them in advance, and its language of imprescriptible rights has a natural-law ring.'
		],
		[
			'Critique.',
			'Balancing is honest and flexible: it admits what judges do when rights collide. Its weakness is that there is **no common scale**. How much welfare of the youth outweighs how much free speech? Pound concedes that courts mostly decide by instinct, so whoever frames the interests decides the case, and any right can yield to an interest labeled “important.” A hierarchy corrects this, but has its own difficulty: a worker’s wage or a farmer’s land is both property and the means to a dignified life, and a fixed ranking risks the rigidity Holmes warned against: “General propositions do not decide concrete cases.”'
		],
		[
			'Opinion.',
			'My position is that balancing is the right method, but it should begin from the presumption in *Philippine Blooming Mills* that human rights weigh more, so the burden lies on whoever would restrict them. This shows me that behind every decision lies a theory of law. When I read a case, I now ask whether the Court is applying a text, weighing interests, or ranking rights, because that tells me which argument will persuade it.'
		]
	];
	const adapt = [
		'Asked only to differentiate the tests: use the Differentiate paragraph and add *Gonzales* and *ABS-CBN* for clear and present danger.',
		'Asked about judicial lawmaking: swap *Lantion* and *Soriano* for *Floresca* (interstitial legislation) and *Rodriguez v. Tan* as the counterweight.',
		'Asked about law and morals: use *Philippine Blooming Mills* as a case where a valid contract and a valid procedural rule yielded to a higher norm.'
	];
	let show = $state(false);
	const n = {
		enums: Object.keys(PHILO.focus.enums ?? {}).length,
		terms: Object.keys(PHILO.focus.terms ?? {}).length,
		essays: ESSAYS.filter((e) => e.star).length
	};
</script>

<svelte:head><title>Exam focus · Legal Philo · 1Law-C</title></svelte:head>

<FocusView
	top={PHILO.focus.top}
	subject="Legal Philo"
	flagged="The professor tests thinking: expect define, differentiate, critique and opinion, often in one question."
>
	<section class="card box" id="model">
		<div class="stack" style="gap:4px">
			<h2 class="eyebrow">#1 · The most likely essay, with a model answer</h2>
			<p class="muted s">
				Lesson 13 is the longest and last lesson, and two of the four case handouts (Holmes, Balancing) feed it. This is a
				prediction, not a certainty.
			</p>
		</div>
		<p class="q legal">{@html fmt(question)}</p>
		{#if show || answerKey.on}
			{#each model as [h, p] (h)}
				<p class="legal para"><b>{h}</b> {@html fmt(p)}</p>
			{/each}
			<div class="blk plain">
				<h4>Adapting this answer</h4>
				<ul>{#each adapt as a (a)}<li>{@html fmt(a)}</li>{/each}</ul>
			</div>
		{:else}
			<p class="muted s">Outline your own answer first: one paragraph per verb.</p>
			<button class="btn btn-primary btn-sm" style="align-self:flex-start" onclick={() => (show = true)}>Show model answer</button>
		{/if}
	</section>

	<section class="card box">
		<h2 class="eyebrow">★ Likely items in this subject</h2>
		<p style="font-size:14.5px">
			<b class="num">{n.essays}</b> of {ESSAYS.length} essay questions, <b class="num">{n.enums}</b> of {PHILO.enums.length} enumerations
			and <b class="num">{n.terms}</b> of {PHILO.terms.length} definitions are flagged. Each flag shows its reason.
		</p>
		<div class="row wrap">
			<a class="btn btn-secondary btn-sm" href="/philo/essays">Essay practice: “★ Likely only”</a>
			<a class="btn btn-secondary btn-sm" href="/philo/terms">Definitions: “★ Likely only”</a>
			<a class="btn btn-secondary btn-sm" href="/philo/drill">Flashcards: ★ deck</a>
		</div>
	</section>

	<section class="stack" style="gap:8px">
		<h2 class="h">Nine ideas that keep coming back</h2>
		<p class="muted" style="max-width:68ch">They surface in more than one reading, so they let the professor ask you to connect lessons.</p>
		<ol class="rec">
			{#each RECURRING as [idea, where, use], i (idea)}
				<li class="card">
					<span class="n num" aria-hidden="true">{i + 1}</span>
					<div class="stack" style="gap:4px;min-width:0">
						<b>{idea}</b>
						<span class="muted s">{@html fmt(where)}</span>
						<span class="s use">{@html fmt(use)}</span>
					</div>
				</li>
			{/each}
		</ol>
	</section>
</FocusView>

<style>
	.box {
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		scroll-margin-top: 80px;
	}
	.s {
		font-size: 13.5px;
	}
	.h {
		font-size: 18px;
		font-weight: 600;
	}
	.q {
		font-size: 16.5px;
		font-style: italic;
		padding: 10px 14px;
		border-left: 3px solid var(--accent);
		background: var(--accent-soft);
		border-radius: 0 6px 6px 0;
	}
	.para {
		font-size: 16px;
		line-height: 1.65;
	}
	.rec {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.rec li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 12px;
		padding: 12px 14px;
	}
	.n {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background: var(--accent-soft);
		color: var(--accent-text);
		font-size: 13px;
		font-weight: 700;
	}
	.use {
		color: var(--accent-text);
		font-weight: 500;
	}
</style>
