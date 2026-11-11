<script lang="ts">
	// One routine for every subject. Subject-specific tools (topic spotters, the penalty ladder) stay in each subject.
	const blank: [string, string][] = [
		['Stop typing. Breathe slowly, twice.', 'In for four counts, out for four. Going blank is stress, not forgetting. It passes in under a minute.'],
		['Read only the last sentence of the question.', 'That is the call of the question. It tells you what to answer: Is it valid? Who is liable? What penalty?'],
		['Name the format.', 'Enumeration, definition, scenario, multiple choice, or case digest. Each one has a fixed first line below.'],
		['Type the first line of that format.', 'You do not need the whole answer yet. The first line gives you slots, and slots pull the memory back.'],
		['Fill the slots with short, plain sentences.', 'One clear line per item scores. Perfect wording does not matter.'],
		['Still stuck after one minute? Flag it and move on.', 'Later questions often remind you. Come back with the time you saved.']
	];
	const formats: { name: string; first: string; steps: string[] }[] = [
		{
			name: 'Enumeration',
			first: '“There are [number] … They are:”',
			steps: ['Type the number first, then (1), (2), (3) on separate lines.', 'Write the memory-aid letters beside the numbers.', 'Turn each letter into a short phrase.', 'Add one line each: “This means …” or “For example, …”.']
		},
		{
			name: 'Definition',
			first: '“[Term] is a [kind of thing] that …”',
			steps: ['Say what kind of thing it is: a penalty, a rule, a remedy, a person.', 'Say what sets it apart.', 'Add one line that separates it from its look-alike: “Unlike [other term], it …”.']
		},
		{
			name: 'Scenario (ALAC)',
			first: '“Yes.” or “No.” then a blank line',
			steps: ['A: one short sentence. You can change it later.', 'L: “The law provides that …” or “Jurisprudence provides that …”. State the rule, then its exception.', 'A: “Here, …” and copy the facts. Match each requisite to a fact.', 'C: “Therefore, …” and repeat your answer.']
		},
		{
			name: 'Multiple choice',
			first: 'Cover the choices. Answer in your head first.',
			steps: ['Mark the stage: before or after plea, before or after judgment is final.', 'Mark who acted or consented.', 'Mark the number: the penalty or the days.', 'In a follow-up question, name the one fact that changed.', 'Cross out choices that break a rule you are sure of. Change an answer only for a rule-based reason.']
		},
		{
			name: 'Case digest',
			first: '“Facts:” “Issue:” “Ruling:” “Doctrine:” as four labels',
			steps: ['Start with the doctrine. It is the part you remember best.', 'Turn the doctrine into a yes-or-no question. That is the issue.', 'Ruling: answer the issue, then give the reason in one or two sentences.', 'Facts: who did what that raised the issue. Two or three sentences are enough.']
		}
	];
	const groups: { title: string; note?: string; tips: [string, string][] }[] = [
		{
			title: 'Before exam day',
			tips: [
				['Take the school’s mock exam in Examplify.', 'It shows which tools your school turned on: spell check, highlighter, notes, copy and paste, the timer, and whether you can go back to earlier questions.'],
				['Download the exam file as soon as it is released.', 'The download needs internet. The exam itself runs offline. Do not leave it for the morning of the exam.'],
				['Update Examplify and restart your laptop the night before.', 'Close every other app. Turn off automatic updates. Check that you have free disk space.'],
				['Bring your charger and plug in.', 'Examplify locks the laptop for the whole exam. A dead battery costs you time.'],
				['Practice typing, not only reciting.', 'Use Full answer mode in this app with the timer running. Your exam answers will be typed in a plain box like that one.']
			]
		},
		{
			title: 'Budget your time first',
			tips: [
				['Divide the minutes by the points before you start.', 'Example: 120 minutes for 100 points is about 1 minute per point. A 10-point scenario gets 10 to 12 minutes, not 25.'],
				['Keep the last 10 minutes for review.', 'Use them for blanks and grammar. The top score needs a clean, complete answer.'],
				['Do the sure points first.', 'Enumerations and definitions you know are fast points. Bank them before the long scenarios, if Examplify lets you move between questions.'],
				['Check whether you can go back.', 'Some exams lock a question once you leave it. If yours does, do not skip. Write your best answer, then move on.']
			]
		},
		{
			title: 'Writing answers that score',
			tips: [
				['Never leave an essay blank.', 'A blank gets zero. A real attempt with sound reasoning gets points even if the conclusion is wrong.'],
				['Type the Answer and the Conclusion first.', 'Two sentences already frame the answer. Then fill in the Law and the Application. If time runs out, the frame is still there.'],
				['Put a blank line between A, L, A and C.', 'Plain text has no formatting. Short paragraphs make your answer easy to grade.'],
				['Copy the facts in your Application.', 'Use the names and words in the problem: “Here, Ana paid Ben in advance.” Matching facts to requisites is where most points are.'],
				['State the rule, then its exception.', 'Many problems turn on the exception. Writing both shows you saw the twist.'],
				['For enumerations, type the number first.', '“There are four.” Then (1) to (4), one per line, each with a short explanation.'],
				['Do not rely on spell check.', 'It is often turned off. Type legal terms slowly: reclusion perpetua, prision correccional, quo warranto.'],
				['Proofread last, not first.', 'Grammar matters only at the top of the rubric. Get the conclusion and the legal basis right first.']
			]
		},
		{
			title: 'Multiple choice in Examplify',
			tips: [
				['Use the cross-out tool on wrong choices, if it is on.', 'Two choices usually go fast. Decide between the last two using the stage, who acted, and the number.'],
				['Flag instead of staring.', 'Pick your best choice, flag the question, and return if there is time.'],
				['In linked questions, find the one changed fact.', 'The answer can flip only because of that change.'],
				['Answer every item.', 'Unless wrong answers are deducted, never leave a multiple-choice item blank.']
			]
		},
		{
			title: 'If something goes wrong',
			tips: [
				['Examplify saves your work about every minute.', 'If the laptop freezes, tell the proctor, restart, and reopen the exam. Your answers and timer resume.'],
				['After the exam, wait for the upload.', 'Connect to the internet and stay until the green confirmation screen appears. Do not delete the app or the exam file until grades are out.']
			]
		}
	];
</script>

<svelte:head><title>Exam day · 1Law-C</title></svelte:head>

<main class="page">
	<div class="col" style="max-width:860px;gap:28px">
		<div class="stack" style="gap:4px">
			<span class="eyebrow">All subjects</span>
			<h1>Exam day</h1>
			<p class="muted" style="max-width:66ch">One routine for when you go blank, and how to score better on a typed exam in ExamSoft (Examplify).</p>
			<div class="row wrap" style="margin-top:6px"><a class="btn btn-secondary btn-sm" href="#blank">If I go blank</a><a class="btn btn-secondary btn-sm" href="#examsoft">ExamSoft tips</a></div>
		</div>

		<section class="stack" style="gap:10px" id="blank">
			<h2>If I go blank</h2>
			<ol class="steps">
				{#each blank as [t, d], k (k)}
					<li class="card"><span class="n" aria-hidden="true">{k + 1}</span><div><strong>{t}</strong> {d}</div></li>
				{/each}
			</ol>
			<h3 class="eyebrow" style="margin-top:6px">The first line for each format</h3>
			<div class="formats">
				{#each formats as f (f.name)}
					<div class="blk plain">
						<h4>{f.name}</h4>
						<p class="legal first">{f.first}</p>
						<ol>{#each f.steps as s (s)}<li>{s}</li>{/each}</ol>
					</div>
				{/each}
			</div>
		</section>

		<section class="stack" style="gap:12px" id="examsoft">
			<div class="stack" style="gap:4px">
				<h2>Scoring better on ExamSoft</h2>
				<p class="muted" style="max-width:66ch">
					Your school decides which Examplify tools are on, so confirm each one in the mock exam. The advice on answers
					applies whatever the settings are.
				</p>
			</div>
			{#each groups as g (g.title)}
				<div class="card grp">
					<h3>{g.title}</h3>
					<ul>
						{#each g.tips as [t, d] (t)}<li><strong>{t}</strong> {d}</li>{/each}
					</ul>
				</div>
			{/each}
		</section>
	</div>
</main>

<style>
	h1 {
		font-size: 24px;
		font-weight: 600;
	}
	h2 {
		font-size: 19px;
		font-weight: 600;
	}
	section {
		scroll-margin-top: 80px;
	}
	.steps {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.steps li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 12px;
		align-items: start;
		padding: 12px 14px;
	}
	.steps strong {
		display: block;
	}
	.n {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-family: var(--legal);
		font-weight: 600;
		background: var(--accent-soft);
		color: var(--accent-text);
		border: 1px solid var(--accent-line);
	}
	.formats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
		gap: 10px;
	}
	.first {
		font-weight: 600;
		margin-bottom: 6px;
	}
	.formats ol {
		font-size: 14px;
	}
	.grp {
		padding: 14px 16px;
	}
	.grp h3 {
		font-size: 15px;
		font-weight: 600;
		margin-bottom: 8px;
	}
	.grp ul {
		padding-left: 1.2em;
		display: grid;
		gap: 8px;
	}
	.grp strong {
		display: block;
	}
</style>
