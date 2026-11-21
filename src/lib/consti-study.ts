import type { PartNo } from './problems';

/**
 * Consti I study notes: the 1987 Constitution provisions behind the 28 cases, topic by topic.
 * Each topic gives the text to memorize, requisites, exceptions (and exceptions to them),
 * notable details, an optional "distinguish" table, the exam trap, and the related cases.
 * Jurisprudence outside the 28 assigned cases is marked "(outside the 28 cases)".
 */
export interface StudyList {
	/** Heading override, e.g. "Test the Court applies" instead of "Requisites". */
	label?: string;
	items: string[];
}

export interface StudyTopic {
	id: string;
	part: PartNo;
	title: string;
	/** Where it is in the Constitution. */
	prov: string;
	/** "The Constitution provides": short quotes, each ending with its section. */
	text: string[];
	req?: StudyList;
	exc?: StudyList;
	/** Exception to the exception. */
	exx?: StudyList;
	notes: string[];
	table?: { label: string; head: [string, string, string]; rows: [string, string, string][] };
	trap?: string;
	/** Case ids from consti.json. */
	cases: string[];
}

export const TOPICS: StudyTopic[] = [
	// ───────────────────────── Part I · The President (Art. VII) ─────────────────────────
	{
		id: 'executive-power',
		part: 1,
		title: 'Executive power, residual powers and control',
		prov: 'Art. VII, Secs. 1 and 17',
		text: [
			'“The executive power shall be vested in the President of the Philippines.” — Art. VII, Sec. 1',
			'“The President shall have control of all the executive departments, bureaus, and offices. He shall ensure that the laws be faithfully executed.” — Art. VII, Sec. 17'
		],
		req: {
			label: 'Test for a residual-power act (Marcos v. Manglapus)',
			items: [
				'There is a **factual basis** for the President’s judgment that the act is needed (e.g. a real threat to national security or public order).',
				'The act was **not done with grave abuse of discretion**: it is not arbitrary and is reasonably related to the threat.',
				'It does **not take over a power the Constitution gives another branch**, and no law forbids it.'
			]
		},
		exc: {
			label: 'Limits on the alter ego (qualified political agency) doctrine',
			items: [
				'Acts the Constitution or law requires the **President to do personally** (e.g. declaring martial law, suspending the writ of habeas corpus, granting pardon) cannot be done by a Secretary.',
				'An act of a Secretary is the President’s act **unless the President disapproves or reprobates it**.'
			]
		},
		notes: [
			'Executive power is **more than the sum** of the powers listed in Art. VII. The list is not exclusive; whatever is not legislative or judicial and is needed to protect the general welfare may be executive.',
			'The **right to return** to one’s country is distinct from the liberty of abode and the right to travel (Art. III, Sec. 6). It is recognized in international law but may yield to national security.',
			'**Control** lets the President alter, modify, nullify or set aside what a subordinate did and substitute the President’s judgment. Over local governments the President has only **general supervision** (Art. X, Sec. 4).',
			'**Qualified political agency** (alter ego doctrine): heads of executive departments are the President’s alter egos; their acts in the regular course of business are presumed to be the President’s acts. (Villena v. Secretary of the Interior; outside the 28 cases.)',
			'Courts do not ask whether the President’s choice was **wise**, only whether it had a factual basis and was not arbitrary.'
		],
		table: {
			label: 'Control vs. supervision',
			head: ['', 'Control', 'Supervision'],
			rows: [
				['What it allows', 'Alter, modify, set aside the subordinate’s act and substitute one’s own judgment', 'Only see that rules are followed; may order the rule obeyed'],
				['Over whom', 'Executive departments, bureaus and offices', 'Local governments (general supervision)'],
				['Source', 'Art. VII, Sec. 17', 'Art. X, Sec. 4']
			]
		},
		trap: 'Do not answer “invalid, because no provision allows it.” Residual power can cover the act, but only with a factual basis and only as far as the threat requires.',
		cases: ['marcos']
	},
	{
		id: 'immunity',
		part: 1,
		title: 'Presidential immunity from suit',
		prov: 'Not written in the 1987 text; settled by jurisprudence',
		text: [
			'The 1973 Constitution had an express immunity clause; the 1987 Constitution dropped it. The framers considered it unnecessary because immunity is **inherent in the office**.'
		],
		req: {
			label: 'When immunity applies',
			items: [
				'The person is the **incumbent** President (during the tenure only).',
				'The President is being **made a party** to a suit: civil, criminal or administrative, whatever the nature of the case.'
			]
		},
		exc: {
			label: 'Immunity does not apply when',
			items: [
				'The President **waives** it. The privilege belongs to the President alone; an accused in a libel case filed by the President cannot invoke it (Soliven v. Makasiar; outside the 28 cases).',
				'The President’s **tenure has ended**: a former President may be sued for unlawful acts done during the term (Estrada v. Desierto; outside the 28 cases).',
				'The proceeding is **impeachment**, which the Constitution itself provides for (Art. XI, Sec. 2).'
			]
		},
		notes: [
			'Immunity protects the **person** of the President, not the act. The act may still be challenged: **drop the President** as respondent and sue the official who carried it out (e.g. the Executive Secretary or the Secretary concerned).',
			'The reason: the President must be free from distraction to perform the duties of the office, which require full time and attention.',
			'Immunity does not mean the President’s acts are beyond judicial review; it only means the President cannot be **named a party**.'
		],
		trap: 'Do not dismiss the whole petition because the President is immune. Dismiss it only as to the President; the case continues against the other respondents.',
		cases: ['colmenares']
	},
	{
		id: 'pardon',
		part: 1,
		title: 'Pardon and other acts of executive clemency',
		prov: 'Art. VII, Sec. 19 (par. 1); Art. IX-C, Sec. 5',
		text: [
			'“Except in cases of impeachment, or as otherwise provided in this Constitution, the President may grant reprieves, commutations, and pardons, and remit fines and forfeitures, after conviction by final judgment.” — Art. VII, Sec. 19',
			'“No pardon, amnesty, parole, or suspension of sentence for violation of election laws, rules, and regulations shall be granted by the President without the favorable recommendation of the Commission.” — Art. IX-C, Sec. 5'
		],
		req: {
			label: 'Requisites / constitutional limits',
			items: [
				'There is **conviction by final judgment** (an accused with a pending appeal must withdraw it first).',
				'The case is **not impeachment**.',
				'For **election offenses**, there is a **favorable recommendation of the COMELEC**.',
				'A **conditional** pardon must be **accepted** by the grantee; an absolute pardon needs no acceptance.'
			]
		},
		exc: {
			label: 'What a pardon does not do',
			items: [
				'It does **not extinguish civil liability** (indemnity to the offended party remains).',
				'It does **not restore the right to hold public office or the right of suffrage** unless the pardon **expressly** restores them (Revised Penal Code, Arts. 36 and 41).',
				'It does **not automatically reinstate** the person to an office lost by the conviction; the person must be reappointed (Monsanto v. Factoran; outside the 28 cases).'
			]
		},
		exx: {
			label: 'Risos-Vidal on express restoration',
			items: [
				'A pardon that restores “**civil and political rights**” is express enough. The law does not require the exact words “right to vote and be voted for.”'
			]
		},
		notes: [
			'The pardoning power is **plenary**: subject only to the limits the Constitution itself sets. **Congress cannot add limits by law.**',
			'A condition binds only if it is in the **operative (dispositive) part** of the pardon. A statement in a **“whereas” clause** is not a condition.',
			'**Forms of clemency** in Sec. 19: reprieve (postpones execution of a sentence), commutation (reduces the penalty), pardon (relieves from punishment), remission of fines and forfeitures, and amnesty.',
			'Violation of a **conditional pardon**: the President may order the person re-arrested and recommitted; a prior judicial finding is not required (Torres v. Gonzales; outside the 28 cases).',
			'**Probation** is judicial, not executive; **parole** is given by the Board of Pardons and Parole under the law.'
		],
		table: {
			label: 'Pardon vs. amnesty',
			head: ['', 'Pardon', 'Amnesty'],
			rows: [
				['Who grants', 'President alone', 'President with concurrence of a majority of all Members of Congress'],
				['When', 'Only after conviction by final judgment', 'Before or after prosecution or conviction'],
				['Usual offenses', 'Ordinary offenses', 'Political offenses'],
				['To whom', 'Individuals', 'Classes of persons'],
				['Nature', 'Private act; must be pleaded and proved', 'Public act; courts take judicial notice'],
				['Effect', 'Relieves from punishment; looks forward', 'Obliterates the offense; looks backward']
			]
		},
		trap: 'Two checks: (1) Is the “limit” in the operative part, or only in a whereas clause? (2) Is Congress trying to limit the pardon by law? It cannot.',
		cases: ['risos']
	},
	{
		id: 'amnesty',
		part: 1,
		title: 'Amnesty',
		prov: 'Art. VII, Sec. 19 (par. 2)',
		text: ['“He shall also have the power to grant amnesty with the concurrence of a majority of all the Members of the Congress.” — Art. VII, Sec. 19'],
		req: {
			label: 'Requisites',
			items: [
				'Granted by the **President** (by proclamation).',
				'With the **concurrence of a majority of all the Members of Congress** (not merely of those present).',
				'The grantee **applies** and meets the conditions of the proclamation, which usually include an **admission of guilt** of the offense covered.'
			]
		},
		exc: {
			label: 'What the President cannot do alone',
			items: [
				'**Revoke** an amnesty already granted. Amnesty is a **joint act** of the President and Congress, so undoing it needs the same joint act.',
				'Void an individual grant **without notice and hearing**: that violates due process.'
			]
		},
		notes: [
			'Delegating the **processing** of applications to an agency (e.g. the DND) is valid; it is not undue delegation, because the grant itself stays with the President and Congress.',
			'Amnesty is commonly for **political offenses** (rebellion, coup d’état, sedition) and is given to **classes** of persons.',
			'Once granted, amnesty **extinguishes the penalty and all its effects** (Revised Penal Code, Art. 89).'
		],
		trap: 'Do not treat amnesty like pardon. A pardon is the President’s alone; amnesty needs Congress, so the President cannot take it back alone.',
		cases: ['trillanes']
	},
	{
		id: 'treaties',
		part: 1,
		title: 'Treaties, executive agreements and withdrawal',
		prov: 'Art. VII, Sec. 21; Art. XVIII, Sec. 25',
		text: [
			'“No treaty or international agreement shall be valid and effective unless concurred in by at least two-thirds of all the Members of the Senate.” — Art. VII, Sec. 21',
			'Foreign military bases, troops, or facilities are allowed only “under a treaty duly concurred in by the Senate and, when the Congress so requires, ratified by a majority of the votes cast by the people in a national referendum… and recognized as a treaty by the other contracting State.” — Art. XVIII, Sec. 25'
		],
		req: {
			label: 'Requisites of a valid treaty',
			items: [
				'**Negotiated and ratified by the President**, the chief architect of foreign policy.',
				'**Concurred in by at least two-thirds of all the Members of the Senate.**',
				'For **foreign bases, troops or facilities**: also a referendum if Congress requires one, and recognition as a treaty by the other State.'
			]
		},
		exc: {
			label: 'Exceptions to Senate concurrence',
			items: [
				'**Executive agreements** need no Senate concurrence: those that implement an existing law or treaty, or deal with adjustments of detail or temporary arrangements (Saguisag v. Ochoa; Bayan Muna v. Romulo; outside the 28 cases).',
				'**Withdrawal** from a treaty: the President may withdraw without Senate concurrence (Pangilinan v. Cayetano).'
			]
		},
		exx: {
			label: 'When the President cannot withdraw alone',
			items: [
				'The Senate made its concurrence **conditional on its consent to withdrawal**.',
				'A **law implements** the treaty or authorized entering into it: the President cannot undo a statute by withdrawing.'
			]
		},
		notes: [
			'The President **may** withdraw from a treaty that is obviously contrary to the Constitution or a statute.',
			'**Standing:** senators suing individually have no standing to question a withdrawal if the **Senate as a body** passed no resolution asserting its prerogative.',
			'An executive agreement **cannot create new obligations** not authorized by an existing law or treaty, and cannot amend a treaty or statute.',
			'A treaty has the force of a **statute** and may be declared unconstitutional by the Supreme Court (Art. VIII, Sec. 4(2) and 5(2)(a)).'
		],
		trap: 'Standing first: individual senators have none without a Senate resolution. Then the two exceptions: a Senate condition on withdrawal, and an implementing law.',
		cases: ['pangilinan']
	},
	{
		id: 'foreign-loans',
		part: 1,
		title: 'Foreign loans and the right to information',
		prov: 'Art. VII, Sec. 20; Art. XII, Sec. 21; Art. III, Sec. 7; Art. II, Sec. 28',
		text: [
			'“The President may contract or guarantee foreign loans on behalf of the Republic of the Philippines with the prior concurrence of the Monetary Board, and subject to such limitations as may be provided by law.” — Art. VII, Sec. 20',
			'“Information on foreign loans obtained or guaranteed by the Government shall be made available to the public.” — Art. XII, Sec. 21',
			'“The right of the people to information on matters of public concern shall be recognized.” — Art. III, Sec. 7'
		],
		req: {
			label: 'Requisites of a valid foreign loan',
			items: [
				'Contracted or guaranteed by the **President** on behalf of the Republic.',
				'With the **prior concurrence of the Monetary Board**.',
				'Within the **limitations provided by law**.'
			]
		},
		exc: {
			label: 'Recognized limits on the right to information (outside the 28 cases)',
			items: [
				'National security and military matters.',
				'Trade secrets and banking transactions.',
				'Criminal matters (e.g. information that would hamper law enforcement).',
				'Diplomatic correspondence and negotiations **while still being negotiated**.',
				'Presidential communications privilege, closed-door Cabinet meetings, and executive sessions of Congress.'
			]
		},
		exx: {
			label: 'Foreign loans specifically',
			items: ['A **confidentiality clause** in a loan agreement cannot defeat the constitutional command that information on foreign loans be made public.']
		},
		notes: [
			'The **Monetary Board** must report to Congress **within 30 days from the end of every quarter** its decisions on loan applications that would increase the foreign debt (Art. VII, Sec. 20).',
			'Foreign loan agreements are **executive agreements**: no Senate concurrence is needed.',
			'Art. II, Sec. 28 adopts a policy of **full public disclosure** of all transactions involving public interest, subject to reasonable conditions prescribed by law.'
		],
		trap: 'Three separate answers in one problem: immunity (drop the President), validity (Monetary Board concurrence), disclosure (a confidentiality clause cannot override the Constitution).',
		cases: ['colmenares']
	},
	{
		id: 'appointments',
		part: 1,
		title: 'Appointing power and the complete appointment',
		prov: 'Art. VII, Secs. 13, 14, 16; Art. VI, Sec. 18',
		text: [
			'“The President shall nominate and, with the consent of the Commission on Appointments, appoint the heads of the executive departments, ambassadors, other public ministers and consuls, or officers of the armed forces from the rank of colonel or naval captain, and other officers whose appointments are vested in him in this Constitution.” — Art. VII, Sec. 16',
			'Recess appointments “shall be effective only until disapproval by the Commission on Appointments or until the next adjournment of the Congress.” — Art. VII, Sec. 16'
		],
		req: {
			label: 'Elements of a valid, complete appointment (Velicaria-Garafil)',
			items: [
				'**Authority to appoint** and evidence of its exercise (the President **signs** the appointment).',
				'**Transmittal** of the appointment paper, and evidence of transmittal.',
				'A **vacant position** at the time of appointment.',
				'**Receipt** of the appointment paper and **acceptance** by an appointee who has all the qualifications and none of the disqualifications.'
			]
		},
		exc: {
			label: 'Appointments that need no Commission on Appointments consent',
			items: [
				'Officers whose appointment is **not otherwise provided for by law**, or whom the President is authorized by law to appoint.',
				'Lower-ranked officers whose appointment Congress vests in the **President alone**, the courts, or heads of departments, agencies, commissions or boards.',
				'**Justices and judges** and the **Ombudsman and deputies**: appointed from JBC lists, “need no confirmation.”',
				'**Acting** appointments (temporary).'
			]
		},
		notes: [
			'Only the **first group** in Sec. 16 needs CA consent: department heads, ambassadors and consuls, AFP officers from colonel or naval captain, and officers whose appointments the Constitution vests in the President (e.g. members of the Constitutional Commissions, regular JBC members) (Sarmiento v. Mison; outside the 28 cases).',
			'**Commission on Appointments:** Senate President as ex officio chairman (votes only to break a tie), 12 Senators and 12 House Members; acts within **30 session days**; rules by majority of all its Members (Art. VI, Sec. 18).',
			'**Nepotism ban:** the President’s spouse and relatives within the **fourth civil degree** cannot, during the President’s tenure, be appointed to the Constitutional Commissions, the Ombudsman, or as Secretaries, Undersecretaries, chairmen or heads of bureaus or offices, including GOCCs and subsidiaries (Art. VII, Sec. 13).',
			'Appointments by an **Acting President** stay effective unless revoked by the elected President **within 90 days** from assumption or reassumption of office (Art. VII, Sec. 14).',
			'Shorthand in the drills: **sign → transmit → receive → accept**, with a vacant post, all before the ban.'
		],
		table: {
			label: 'Ad interim vs. acting appointment',
			head: ['', 'Ad interim', 'Acting'],
			rows: [
				['When made', 'During the recess of Congress', 'Any time, even while Congress is in session'],
				['CA consent', 'Needed; effective until disapproved or next adjournment', 'Not needed'],
				['Nature', 'Permanent; effective at once', 'Temporary; may be ended at will'],
				['Constitutional Commissions', 'Allowed (Matibag v. Benipayo; outside the 28 cases)', 'Never: “in no case… temporary or acting capacity”']
			]
		},
		trap: 'The date on the appointment paper is not enough. Ask whether every element, especially receipt and acceptance, happened in time.',
		cases: ['garafil', 'brillantes']
	},
	{
		id: 'appointments-ban',
		part: 1,
		title: 'The election ban on appointments (“midnight appointments”)',
		prov: 'Art. VII, Sec. 15; Art. VIII, Secs. 4(1) and 9',
		text: [
			'“Two months immediately before the next presidential elections and up to the end of his term, a President or Acting President shall not make appointments, except temporary appointments to executive positions when continued vacancies therein will prejudice public service or endanger public safety.” — Art. VII, Sec. 15',
			'“Any vacancy shall be filled within ninety days from the occurrence thereof.” — Art. VIII, Sec. 4(1)'
		],
		req: {
			label: 'The ban applies when',
			items: [
				'The appointment is made **within two months before the next presidential election, up to the end of the term**.',
				'It is made by the **President or Acting President**.',
				'It is to a position in the **Executive Department**.'
			]
		},
		exc: {
			label: 'Exceptions',
			items: [
				'**Temporary appointments to executive positions** when continued vacancies will **prejudice public service or endanger public safety**.',
				'**Appointments to the Judiciary**, including the Chief Justice (De Castro v. JBC). The 90-day rule for the Supreme Court is mandatory (“shall”), and the JBC process already guards against the abuses the ban targets.'
			]
		},
		notes: [
			'The ban is in **Article VII** (Executive); the framers did not put it in Article VIII. *In re Valenzuela* (1998), which applied it to the Judiciary, was **reversed** by De Castro.',
			'The ban covers only the period before a **presidential** election, not a midterm election.',
			'An appointment is made only when it is **complete**. If any element (transmittal, receipt, acceptance) falls inside the ban, the appointment is void (Velicaria-Garafil).',
			'For **lower courts**, the President must appoint within **90 days from submission of the JBC list** (Art. VIII, Sec. 9).'
		],
		trap: 'Signing is only the first of four elements. Count every element against the ban date, and do not apply the ban to judicial vacancies.',
		cases: ['garafil', 'decastro']
	},

	// ───────────────────────── Part II · Congress and the Budget (Art. VI) ─────────────────────────
	{
		id: 'appropriations',
		part: 2,
		title: 'The power of the purse: appropriations',
		prov: 'Art. VI, Secs. 24, 25 and 29',
		text: [
			'“No money shall be paid out of the Treasury except in pursuance of an appropriation made by law.” — Art. VI, Sec. 29(1)',
			'“All appropriation, revenue or tariff bills, bills authorizing increase of the public debt, bills of local application, and private bills, shall originate exclusively in the House of Representatives, but the Senate may propose or concur with amendments.” — Art. VI, Sec. 24',
			'“No provision or enactment shall be embraced in the general appropriations bill unless it relates specifically to some particular appropriation therein.” — Art. VI, Sec. 25(2)'
		],
		req: {
			label: 'Requisites of a valid appropriation (Belgica)',
			items: [
				'**Legislative intent to appropriate** is clear.',
				'A **determinate or determinable amount** of money is set apart.',
				'It is **allocated for a given purpose** specified by law.'
			]
		},
		exc: {
			label: 'Exceptions to the ban on transfers of appropriations (Sec. 25(5))',
			items: [
				'The **President, Senate President, Speaker, Chief Justice and heads of the Constitutional Commissions** may, **by law**, be authorized to **augment** an item in the general appropriations law for their respective offices from **savings** in other items of their respective appropriations.'
			]
		},
		exx: {
			label: 'Limits on augmentation (Araullo v. Aquino; outside the 28 cases)',
			items: [
				'There must be a **law** authorizing the transfer.',
				'The funds must be **actual savings** of the official’s own office.',
				'The item augmented must **exist** in the appropriations of the **same office**: no cross-border transfers between branches.'
			]
		},
		notes: [
			'**PDAF (pork barrel) was struck down** because legislators identified projects and released funds **after** the budget became law. Post-enactment control violates: separation of powers, non-delegation of legislative power, checks and balances (the item veto), accountability, and local autonomy.',
			'Congress **may not increase** the appropriations recommended by the President for the operation of the Government (Sec. 25(1)).',
			'**Special appropriations** must specify the purpose and be supported by funds actually available as certified by the National Treasurer, or by a revenue proposal (Sec. 25(4)).',
			'**Discretionary funds** may be spent only for public purposes, supported by vouchers (Sec. 25(6)).',
			'If no general appropriations law is passed by year-end, the previous one is **deemed reenacted** (Sec. 25(7)).',
			'**No public money for religion** (Sec. 29(2)), except for a priest, minister or dignitary assigned to the armed forces, a penal institution, a government orphanage or leprosarium.',
			'Money from a tax levied for a **special purpose** is a special fund; any balance goes to the general funds once the purpose is fulfilled or abandoned (Sec. 29(3)).'
		],
		trap: 'Corruption facts show why PDAF was dangerous, but the legal grounds are post-enactment control and undue delegation. Answer with the constitutional grounds.',
		cases: ['belgica']
	},
	{
		id: 'delegation',
		part: 2,
		title: 'Non-delegation of legislative power',
		prov: 'Art. VI, Secs. 1, 23(2), 28(2) and 32',
		text: [
			'“The legislative power shall be vested in the Congress of the Philippines… except to the extent reserved to the people by the provision on initiative and referendum.” — Art. VI, Sec. 1'
		],
		req: {
			label: 'Requisites of a valid delegation',
			items: [
				'**Completeness test:** the law is complete in all its terms and conditions when it leaves Congress, so the delegate only has to enforce it.',
				'**Sufficient standard test:** the law fixes a standard, the limits of which are determinable, that the delegate must follow.'
			]
		},
		exc: {
			label: 'Permitted delegations',
			items: [
				'**Tariff powers** to the President: tariff rates, import and export quotas, tonnage and wharfage dues, within limits set by law (Sec. 28(2)).',
				'**Emergency powers** to the President (Sec. 23(2)).',
				'To the **people**, through initiative and referendum (Secs. 1 and 32).',
				'To **local governments** (local legislation).',
				'To **administrative agencies** (power of subordinate legislation), subject to the two tests.'
			]
		},
		exx: {
			label: 'Requisites of emergency powers (Sec. 23(2))',
			items: [
				'There is **war or other national emergency**.',
				'Granted **by law**.',
				'For a **limited period** and **subject to restrictions** Congress prescribes.',
				'Only powers **necessary and proper to carry out a declared national policy**.',
				'They **cease upon the next adjournment** of Congress unless sooner withdrawn by resolution.'
			]
		},
		notes: [
			'“**And for such other purposes as may be hereafter directed by the President**” (Malampaya fund) gives no standard; it is undue delegation. The rest of the law can stand.',
			'Only Congress, by **two-thirds of both Houses in joint session, voting separately**, may declare the existence of a state of war (Sec. 23(1)).'
		],
		trap: 'Do not strike down the whole fund law. Only the open-ended phrase fails the sufficient standard test.',
		cases: ['belgica']
	},
	{
		id: 'veto',
		part: 2,
		title: 'Approval of bills, the veto and the item veto',
		prov: 'Art. VI, Sec. 27',
		text: [
			'“The President shall have the power to veto any particular item or items in an appropriation, revenue, or tariff bill, but the veto shall not affect the item or items to which he does not object.” — Art. VI, Sec. 27(2)'
		],
		req: {
			label: 'Ways a bill becomes law',
			items: [
				'The President **signs** it.',
				'The President **does not act within 30 days** after receiving it: it becomes law as if signed (there is no pocket veto).',
				'Congress **overrides** a veto by **two-thirds of all the Members of each House**.'
			]
		},
		exc: {
			label: 'Exception to the rule that a bill is vetoed as a whole',
			items: ['**Item veto** in an **appropriation, revenue or tariff** bill.']
		},
		exx: {
			label: 'Limits on the item veto',
			items: [
				'The President must veto the **entire item**; a provision or condition attached to an item cannot be vetoed while the item is approved.',
				'A provision may be vetoed alone only if it is an **inappropriate provision** (a rider that does not relate to any particular appropriation) (Gonzales v. Macaraig; outside the 28 cases).'
			]
		},
		notes: [
			'An **item** is a specific amount for a specific purpose: “singular correspondence” between the amount and the purpose.',
			'A **lump sum** that legislators later divide (PDAF) **defeats the item veto**: the President cannot veto projects that do not yet exist when the bill is signed.',
			'The veto with objections is returned to the **House where the bill originated**.'
		],
		trap: 'Ask first whether it is an appropriation, revenue or tariff bill. Any other bill can only be vetoed as a whole.',
		cases: ['belgica']
	},

	// ───────────────────────── Part III · Judiciary and JBC (Art. VIII) ─────────────────────────
	{
		id: 'judicial-review',
		part: 3,
		title: 'Judicial power and judicial review',
		prov: 'Art. VIII, Secs. 1, 4(2) and 5(2)',
		text: [
			'“Judicial power includes the duty of the courts of justice to settle actual controversies involving rights which are legally demandable and enforceable, and to determine whether or not there has been a grave abuse of discretion amounting to lack or excess of jurisdiction on the part of any branch or instrumentality of the Government.” — Art. VIII, Sec. 1'
		],
		req: {
			label: 'Requisites of judicial review',
			items: [
				'An **actual case or controversy**, ripe for adjudication.',
				'The petitioner has **legal standing** (a personal and substantial interest; direct injury).',
				'The question of constitutionality is raised **at the earliest opportunity**.',
				'The constitutional question is the **very lis mota** of the case.'
			]
		},
		exc: {
			label: 'When the Court decides a moot case anyway',
			items: [
				'There is a **grave violation** of the Constitution.',
				'The situation is **exceptional** and of **paramount public interest**.',
				'The case calls for **controlling principles** to guide the bench, the bar and the public.',
				'The case is **capable of repetition yet evading review**.'
			]
		},
		exx: {
			label: 'When standing is relaxed',
			items: [
				'Issues of **transcendental importance** (weighed by: the public funds or assets involved, a clear disregard of a constitutional or statutory prohibition, and the lack of a party with a more direct interest).',
				'**Taxpayers**, when public funds are illegally spent.',
				'**Legislators**, when the powers of Congress are impaired.',
				'**Voters** and concerned citizens, on election laws and public rights.'
			]
		},
		notes: [
			'A **proposed bill** is not reviewable: there is no actual case until it becomes law and is applied. Courts do not give **advisory opinions**.',
			'Cases on the constitutionality of a treaty, executive agreement or law are heard **en banc** and decided by a **majority of the Members who actually took part and voted** (Sec. 4(2)).',
			'**Operative fact doctrine:** an unconstitutional act is void, but its effects before it was struck down may be given effect when fairness demands (e.g. past acts of an improperly constituted JBC).',
			'The expanded judicial power (grave abuse clause) **narrows** the political question doctrine.'
		],
		trap: 'Before reaching the merits, check ripeness. A bill, a draft, or a mere proposal is not yet a case.',
		cases: ['jdf', 'chavez', 'pangilinan']
	},
	{
		id: 'supreme-court',
		part: 3,
		title: 'The Supreme Court: composition, qualifications, tenure',
		prov: 'Art. VIII, Secs. 4, 7, 9, 10, 11 and 12',
		text: [
			'The Supreme Court is composed of a **Chief Justice and 14 Associate Justices**; it may sit en banc or in divisions of three, five or seven. “Any vacancy shall be filled within ninety days from the occurrence thereof.” — Art. VIII, Sec. 4(1)',
			'“A Member of the Judiciary must be a person of proven competence, integrity, probity, and independence.” — Art. VIII, Sec. 7(3)'
		],
		req: {
			label: 'Qualifications of a Supreme Court Member (Sec. 7(1))',
			items: [
				'**Natural-born** citizen of the Philippines.',
				'At least **40 years** of age.',
				'For **15 years or more**, a judge of a lower court or engaged in the practice of law in the Philippines.',
				'**Proven competence, integrity, probity and independence** (Sec. 7(3)).'
			]
		},
		exc: {
			label: 'How a Justice leaves office',
			items: [
				'Reaching **70 years** of age or becoming **incapacitated** (Sec. 11).',
				'**Impeachment** (Art. XI, Sec. 2).',
				'**Quo warranto** if the Justice was not eligible when appointed (Republic v. Sereno).'
			]
		},
		notes: [
			'Appointed by the President from a **JBC list of at least three nominees** per vacancy; **no CA confirmation** (Sec. 9).',
			'**Lower court judges:** citizens and members of the Bar; Congress prescribes other qualifications (Sec. 7(2)). The SC en banc disciplines or dismisses them by a majority of those who took part and voted (Sec. 11).',
			'Salaries **cannot be decreased** during their continuance in office (Sec. 10).',
			'Members of the Judiciary **cannot be designated** to any agency performing quasi-judicial or administrative functions (Sec. 12).',
			'A doctrine laid down by the Court **may be modified or reversed only by the Court en banc** (Sec. 4(3)).',
			'Congress may not pass a law **reorganizing the Judiciary** that undermines the security of tenure of its Members (Sec. 2).'
		],
		trap: 'Integrity is a constitutional qualification, not just a JBC preference. Failure to file SALNs shows lack of proven integrity, which goes to eligibility.',
		cases: ['decastro', 'sereno']
	},
	{
		id: 'jbc',
		part: 3,
		title: 'Judicial and Bar Council: composition and nominations',
		prov: 'Art. VIII, Secs. 8 and 9',
		text: [
			'The JBC is “composed of the Chief Justice as ex officio Chairman, the Secretary of Justice, and a representative of the Congress as ex officio Members, a representative of the Integrated Bar, a professor of law, a retired Member of the Supreme Court, and a representative of the private sector.” — Art. VIII, Sec. 8(1)',
			'Justices and judges are appointed “from a list of at least three nominees prepared by the Judicial and Bar Council for every vacancy. Such appointments need no confirmation.” — Art. VIII, Sec. 9'
		],
		req: {
			label: 'The seven members',
			items: [
				'Ex officio: **Chief Justice** (Chairman), **Secretary of Justice**, **one representative of Congress**.',
				'Regular: **IBP representative**, **professor of law**, **retired SC Member**, **private sector representative**.',
				'Regular members are appointed by the President **with CA consent** for **4-year** terms.'
			]
		},
		exc: {
			label: 'What the JBC cannot do',
			items: [
				'Seat **two** representatives of Congress (one from each House), even with half a vote each: “a representative” means one (Chavez v. JBC).',
				'**Cluster** nominees when vacancies in the same court exist at the same time. Clustering limits the President’s choice; the President may appoint from **all** the nominees (Aguinaldo v. Aquino).'
			]
		},
		exx: {
			label: 'Operative fact',
			items: ['Acts of the JBC done while it had two Congress representatives **remain valid** (operative fact doctrine).']
		},
		notes: [
			'**Plain meaning** (verba legis): “a representative” is singular. An odd number (seven) avoids deadlock.',
			'First regular members had staggered terms: IBP 4 years, law professor 3, retired Justice 2, private sector 1 (Sec. 8(2)).',
			'The **Clerk of the Supreme Court** is the JBC’s ex officio Secretary (Sec. 8(3)).',
			'The JBC is under the **supervision** of the Supreme Court, so the Court may correct its acts.',
			'“Three per vacancy” is satisfied when the combined list has at least **three times the number of vacancies**.',
			'**Seniority** among Justices appointed to simultaneous vacancies follows the **order of appointment** (Aguinaldo).'
		],
		trap: 'Read the text literally: one Congress representative, one list for simultaneous vacancies.',
		cases: ['chavez', 'aguinaldo']
	},
	{
		id: 'jbc-process',
		part: 3,
		title: 'JBC standards and due process for applicants',
		prov: 'Art. VIII, Sec. 8(1) and (5); Art. III, Sec. 1',
		text: [
			'“The Council shall have the principal function of recommending appointees to the Judiciary.” — Art. VIII, Sec. 8(5)',
			'“A Judicial and Bar Council is hereby created under the supervision of the Supreme Court…” — Art. VIII, Sec. 8(1)'
		],
		req: {
			label: 'Requisites of a valid JBC standard (Villanueva)',
			items: [
				'It measures the constitutional qualifications (e.g. **proven competence**).',
				'It is **reasonable** and rests on a valid classification (e.g. experience); it does not violate equal protection.',
				'It is **published**, so applicants know it before they are bound by it.'
			]
		},
		exc: {
			label: 'When due process applies (Jardeleza)',
			items: [
				'JBC proceedings are *sui generis* and applicants have **no vested right** to be nominated, **but** when an applicant’s **integrity** is challenged, the applicant must get **notice** of the charges and a **chance to be heard** before the unanimity rule is applied.'
			]
		},
		exx: {
			label: 'When the unanimity rule does not apply',
			items: ['A disagreement over **legal strategy** (how a case was handled) is **not an integrity question**, so the unanimity rule cannot be used to exclude the applicant.']
		},
		notes: [
			'The JBC may set standards **beyond the minimum qualifications** in the Constitution (e.g. 5 years as a first-level judge before applying to a second-level court).',
			'The Supreme Court corrects the JBC through its **supervision** and its power to review **grave abuse of discretion**.'
		],
		trap: 'Two separate answers: the JBC may add standards (valid), but it must publish them and must give a hearing on integrity challenges.',
		cases: ['villanueva', 'jardeleza']
	},
	{
		id: 'judicial-autonomy',
		part: 3,
		title: 'Fiscal autonomy and independence of the Judiciary',
		prov: 'Art. VIII, Secs. 2, 3, 5(5) and 6',
		text: [
			'“The Judiciary shall enjoy fiscal autonomy. Appropriations for the Judiciary may not be reduced by the legislature below the amount appropriated for the previous year and, after approval, shall be automatically and regularly released.” — Art. VIII, Sec. 3',
			'“The Supreme Court shall have administrative supervision over all courts and the personnel thereof.” — Art. VIII, Sec. 6'
		],
		req: {
			label: 'What fiscal autonomy includes',
			items: [
				'Appropriations **not reduced below the previous year’s**.',
				'**Automatic and regular release** after approval.',
				'**Full flexibility** to allocate and use its resources as its needs require, including disposing of its own property under its own guidelines.'
			]
		},
		exc: {
			label: 'What fiscal autonomy does not include',
			items: [
				'**Exemption from audit.** COA still audits the Judiciary, on a **post-audit** basis (Art. IX-D, Sec. 2(1)).',
				'Power to stop **Congress from legislating** on a proposed bill: there is no actual case yet (JDF case).'
			]
		},
		exx: {
			label: 'Limit on COA',
			items: ['COA may audit, but it **cannot impose its own valuation formula** on how the Court disposes of its own property (Re: COA Opinion).']
		},
		notes: [
			'Only three have fiscal autonomy: **J-C-O**: the **Judiciary**, the **Constitutional Commissions** (Art. IX-A, Sec. 5) and the **Ombudsman** (Art. XI, Sec. 14).',
			'The **Judiciary Development Fund** comes from **legal fees**, not from the national appropriations.',
			'**Rule-making power** (Sec. 5(5)): rules on pleading, practice and procedure, admission to the Bar, the IBP and legal assistance. Limits: simplified and inexpensive procedure, uniform for courts of the same grade, and they **cannot diminish, increase or modify substantive rights**.',
			'Congress may define and apportion the jurisdiction of courts but **cannot deprive the Supreme Court** of its jurisdiction under Sec. 5 (Sec. 2).'
		],
		trap: 'Audit yes, dictate no. Fiscal autonomy is not freedom from COA.',
		cases: ['recoa', 'jdf']
	},
	{
		id: 'discipline',
		part: 3,
		title: 'Discipline of judges and court personnel',
		prov: 'Art. VIII, Secs. 6 and 11',
		text: [
			'“The Supreme Court shall have administrative supervision over all courts and the personnel thereof.” — Art. VIII, Sec. 6',
			'“The Supreme Court en banc shall have the power to discipline judges of lower courts, or order their dismissal by a vote of a majority of the Members who actually took part in the deliberations on the issues in the case and voted thereon.” — Art. VIII, Sec. 11'
		],
		req: {
			label: 'When the Court keeps jurisdiction',
			items: [
				'The administrative complaint was **filed while the respondent was still in service**. Jurisdiction attaches **at filing**.',
				'Later **retirement or resignation** does not end the case; penalties such as **forfeiture of benefits** or a fine can still be imposed.'
			]
		},
		exc: {
			label: 'When the case ends',
			items: [
				'The complaint was **filed after** the respondent left office: there is no longer administrative jurisdiction (e.g. Office of the Ombudsman v. Andutan; outside the 28 cases).',
				'**Death** of the respondent while the case is pending generally ends it.'
			]
		},
		notes: [
			'Discipline of judges and court personnel belongs **only to the Supreme Court**. The Ombudsman must refer complaints about a judge’s official acts to the Court first (Maceda v. Vasquez; outside the 28 cases).',
			'**Congress cannot discipline or cite judges in contempt** for how they decide cases.',
			'**Substantial evidence** is the standard in administrative cases.'
		],
		trap: 'Jurisdiction attaches at filing. Retirement does not wipe out an administrative case that was already pending.',
		cases: ['castaneda']
	},
	{
		id: 'practice-of-law',
		part: 3,
		title: 'Admission to the practice of law',
		prov: 'Art. VIII, Sec. 5(5); Rules of Court, Rule 138',
		text: [
			'The Supreme Court shall “promulgate rules concerning the protection and enforcement of constitutional rights, pleading, practice, and procedure in all courts, the admission to the practice of law, the integrated bar, and legal assistance to the underprivileged.” — Art. VIII, Sec. 5(5)'
		],
		req: {
			label: 'Requisites for admission (Rule 138)',
			items: [
				'**Citizen** of the Philippines.',
				'At least **21 years** of age.',
				'**Resident** of the Philippines.',
				'**Good moral character**, with no pending charges involving moral turpitude.',
				'Completed the required **pre-law and law studies**.',
				'**Passed the bar examinations**, took the **lawyer’s oath** and signed the **Roll of Attorneys**.'
			]
		},
		exc: {
			label: 'Admission is void or lost when',
			items: [
				'It was **obtained by fraud** (e.g. using another person’s identity or records). Years of honest practice do not cure it.',
				'The lawyer **loses a requirement** later (e.g. good moral character or citizenship), since the requirements must **continue**.'
			]
		},
		notes: [
			'The practice of law is a **privilege**, not a right. The Supreme Court’s power over admission is **exclusive**.',
			'Educational and **moral fitness** must exist at admission and continue while practicing.'
		],
		trap: 'Privilege, not right. Fraud at the start cannot be cured by time or good performance.',
		cases: ['caronan']
	},
	{
		id: 'impeachment-qw',
		part: 3,
		title: 'Impeachment and quo warranto',
		prov: 'Art. XI, Secs. 2 and 3; Art. VIII, Sec. 5(1)',
		text: [
			'“The President, the Vice-President, the Members of the Supreme Court, the Members of the Constitutional Commissions, and the Ombudsman may be removed from office on impeachment for, and conviction of, culpable violation of the Constitution, treason, bribery, graft and corruption, other high crimes, or betrayal of public trust. All other public officers and employees may be removed from office as provided by law, but not by impeachment.” — Art. XI, Sec. 2',
			'“No impeachment proceedings shall be initiated against the same official more than once within a period of one year.” — Art. XI, Sec. 3(5)'
		],
		req: {
			label: 'Steps of impeachment (Art. XI, Sec. 3)',
			items: [
				'A **verified complaint** filed by any House Member, or by any citizen with a resolution of endorsement by a House Member.',
				'Included in the Order of Business within **10 session days**; referred to the committee within **3 session days**.',
				'Committee report within **60 session days**; calendared within **10 session days**.',
				'**One-third of all House Members** to impeach (or a complaint filed by one-third goes straight to the Senate as the Articles of Impeachment).',
				'**Trial by the Senate**; conviction by **two-thirds of all Senators**. When the President is on trial, the Chief Justice presides but does not vote.'
			]
		},
		exc: {
			label: 'Quo warranto as an alternative (Republic v. Sereno)',
			items: [
				'“**May** be removed… on impeachment” is permissive. An impeachable officer who was **ineligible when appointed** may be ousted by quo warranto in the Supreme Court.',
				'The **one-year** period to file quo warranto **does not run against the State** (nullum tempus).'
			]
		},
		notes: [
			'**Judgment** in impeachment extends only to removal and disqualification to hold office; the person may still be **prosecuted** under the law (Sec. 3(7)).',
			'Proceedings are **initiated** when the complaint is filed and referred to the House Committee on Justice; the one-year bar runs from then (Francisco v. House; Gutierrez v. House; outside the 28 cases).',
			'The Supreme Court has **original jurisdiction** over quo warranto (Art. VIII, Sec. 5(1)).'
		],
		table: {
			label: 'Impeachment vs. quo warranto',
			head: ['', 'Impeachment', 'Quo warranto'],
			rows: [
				['Question', 'Wrongs committed **in office**', 'Whether the officer was **eligible** (valid title) from the start'],
				['Nature', 'Political', 'Judicial'],
				['Forum', 'House initiates, Senate tries', 'Courts (SC has original jurisdiction)'],
				['Result', 'Removal and disqualification', 'Ouster; the appointment was void'],
				['Time limit', 'Once a year per official', 'One year, but not against the State']
			]
		},
		trap: 'Impeachment is for misconduct in office; quo warranto is for ineligibility at the start. And the one-year limit does not bind the State.',
		cases: ['sereno']
	},

	// ───────────────────────── Part IV · Commissions (Art. IX) and CHR ─────────────────────────
	{
		id: 'commissions-common',
		part: 4,
		title: 'Constitutional Commissions: common provisions',
		prov: 'Art. IX-A, Secs. 1–8',
		text: [
			'“The Constitutional Commissions, which shall be independent, are the Civil Service Commission, the Commission on Elections, and the Commission on Audit.” — Art. IX-A, Sec. 1',
			'“Each Commission shall decide by a majority vote of all its Members any case or matter brought before it within sixty days from the date of its submission for decision or resolution… Unless otherwise provided by this Constitution or by law, any decision, order, or ruling of each Commission may be brought to the Supreme Court on certiorari by the aggrieved party within thirty days from receipt of a copy thereof.” — Art. IX-A, Sec. 7'
		],
		req: {
			label: 'Guarantees of independence',
			items: [
				'Created by the **Constitution** and expressly called **independent**; cannot be abolished by law.',
				'Members removable **only by impeachment**.',
				'Long **7-year** terms, **staggered**, with **no reappointment** and **no temporary or acting** appointment.',
				'Salaries fixed by law and **not decreased** during tenure (Sec. 3).',
				'**Fiscal autonomy**; approved appropriations automatically and regularly released (Sec. 5).',
				'They **appoint their own** officials and employees (Sec. 4) and make their own **procedural rules** (Sec. 6).'
			]
		},
		exc: {
			label: 'When the remedy is not certiorari to the Supreme Court',
			items: [
				'“**Unless otherwise provided… by law**”: CSC decisions go to the **Court of Appeals** under Rule 43 (outside the 28 cases).',
				'When **COA disciplines its own personnel**, the remedy is **appeal to the CSC**, the central personnel agency, not certiorari to the SC (Galindo v. COA).',
				'COMELEC **division** rulings must first go to the COMELEC **en banc** on reconsideration; only en banc decisions reach the SC (outside the 28 cases).'
			]
		},
		notes: [
			'Members may not, during tenure, **hold any other office**, practice a profession or manage a business affected by their functions, or be financially interested in any government contract, franchise or privilege (Sec. 2).',
			'Decisions require a **majority of all the Members**, not just those present.',
			'A case is **deemed submitted** on filing of the last pleading, brief or memorandum required (Sec. 7).',
			'Certiorari is available only against acts in the exercise of **quasi-judicial (adjudicatory)** functions.'
		],
		trap: 'Do not file everything with the SC. Check first whether a law or the nature of the case sends it elsewhere (CSC, Court of Appeals, COMELEC en banc).',
		cases: ['brillantes', 'galindo']
	},
	{
		id: 'commission-terms',
		part: 4,
		title: 'Terms, vacancies and appointments in the Commissions',
		prov: 'Art. IX-B, C and D, Sec. 1',
		text: [
			'Members are appointed “for a term of seven years without reappointment. Of those first appointed, the Chairman shall hold office for seven years, a Commissioner for five years, and another Commissioner for three years, without reappointment. Appointment to any vacancy shall be only for the unexpired portion of the term of the predecessor. In no case shall any Member be appointed or designated in a temporary or acting capacity.” — Art. IX-D, Sec. 1(2) (same in IX-B and IX-C)'
		],
		req: {
			label: 'Qualifications (all three: natural-born, at least 35 at appointment, not a candidate in the election just before)',
			items: [
				'**CSC** (Chairman + 2): proven capacity for **public administration**.',
				'**COMELEC** (Chairman + 6): college degree holders; a **majority, including the Chairman**, members of the Bar who have practiced law for at least **10 years**.',
				'**COA** (Chairman + 2): **CPAs** with at least 10 years of auditing experience, or members of the Bar with at least 10 years of practice; **not all from the same profession**.'
			]
		},
		exc: {
			label: 'Rules on vacancies (Funa v. Villar)',
			items: [
				'Vacancy from **expiration of term** → the successor gets a **full 7-year** term; an appointment for less is void.',
				'Vacancy from **death, resignation, disability or impeachment** → the successor serves only the **unexpired portion**.',
				'A member who served a **full term**, or was appointed for an **unexpired portion**, **cannot be reappointed**.'
			]
		},
		exx: {
			label: 'Promotion of a Commissioner to Chairman (Funa)',
			items: [
				'Allowed only if the Chairman’s seat is **vacant**, the appointment is for the **unexpired portion** of the Chairman’s term, and the **total service** in the Commission does **not exceed 7 years**.'
			]
		},
		notes: [
			'**No acting chairman by the President:** a designation revocable at will makes the officer depend on the President and destroys independence. If a temporary head is needed, the **Commission itself** chooses (Brillantes v. Yorac).',
			'An **ad interim** appointment is permanent; renewing a bypassed (never confirmed) ad interim appointment is not a prohibited reappointment (Matibag v. Benipayo; outside the 28 cases).',
			'Members are appointed by the President **with CA consent**.'
		],
		trap: 'Ask why the seat became vacant. Expired term → full 7 years. Death, resignation, disability, impeachment → only what is left. Total service never over 7.',
		cases: ['funa', 'brillantes']
	},
	{
		id: 'civil-service',
		part: 4,
		title: 'The civil service',
		prov: 'Art. IX-B, Secs. 2, 6, 7 and 8',
		text: [
			'“The civil service embraces all branches, subdivisions, instrumentalities, and agencies of the Government, including government-owned or controlled corporations with original charters.” — Art. IX-B, Sec. 2(1)',
			'“Appointments in the civil service shall be made only according to merit and fitness to be determined, as far as practicable, and, except to positions which are policy-determining, primarily confidential, or highly technical, by competitive examination.” — Art. IX-B, Sec. 2(2)',
			'“No officer or employee of the civil service shall be removed or suspended except for cause provided by law.” — Art. IX-B, Sec. 2(3)'
		],
		req: {
			label: 'Test for a primarily confidential position (proximity rule)',
			items: [
				'Look at the **actual nature of the functions**, not the title or a label in a law or rule.',
				'There is **close intimacy** between the appointee and the appointing power, ensuring freedom of communication without fear of betrayal of personal trust or confidential matters.',
				'**Courts** have the final say; a classification by law or by the CSC is not conclusive.'
			]
		},
		exc: {
			label: 'Exceptions to appointment by competitive examination',
			items: ['**Policy-determining** positions.', '**Primarily confidential** positions.', '**Highly technical** positions.']
		},
		exx: {
			label: 'Security of tenure and confidential employees',
			items: [
				'A primarily confidential employee’s term ends upon **loss of confidence**. This is **expiration of the term**, not removal, so it does not violate security of tenure.'
			]
		},
		notes: [
			'**GOCCs with original charters** are under the civil service; those incorporated under the general corporation law are under the Labor Code.',
			'No civil service employee may engage in **electioneering or partisan political campaign** (Sec. 2(4)).',
			'Government employees have the **right to self-organization** (Sec. 2(5)), but not the right to strike (outside the 28 cases).',
			'A **losing candidate** cannot be appointed to any government office or GOCC **within one year** after the election (Sec. 6).',
			'**Elective officials** cannot be appointed to any public office during their tenure. **Appointive officials** cannot hold another office unless allowed by law or by the primary functions of their position (Sec. 7).',
			'**No double compensation** unless specifically authorized by law; pensions and gratuities are not double compensation (Sec. 8).',
			'Stricter rule for the **President, Vice-President, Cabinet members and their deputies**: no other office during tenure unless the Constitution allows it (Art. VII, Sec. 13), e.g. the VP as a Cabinet member, or the Justice Secretary in the JBC.'
		],
		trap: 'The title or a law’s label does not decide whether a position is primarily confidential. The nature of the job does, and courts decide.',
		cases: ['pililla', 'galindo']
	},
	{
		id: 'comelec-media',
		part: 4,
		title: 'COMELEC’s power over media and franchises',
		prov: 'Art. IX-C, Sec. 4; Art. III, Sec. 9; Art. XII, Sec. 11',
		text: [
			'“The Commission may, during the election period, supervise or regulate the enjoyment or utilization of all franchises or permits for the operation of transportation and other public utilities, media of communication or information… Such supervision or regulation shall aim to ensure equal opportunity, time, and space, and the right to reply, including reasonable, equal rates therefor, for public information campaigns and forums among candidates…” — Art. IX-C, Sec. 4',
			'“Private property shall not be taken for public use without just compensation.” — Art. III, Sec. 9'
		],
		req: {
			label: 'Requisites of eminent domain',
			items: [
				'**Private property** is involved.',
				'There is a **taking**.',
				'The taking is for **public use**.',
				'**Just compensation** is paid.',
				'**Due process** is observed.'
			]
		},
		exc: {
			label: 'Why free broadcast airtime may be required',
			items: [
				'Broadcasters use the airwaves under a **franchise**, a **privilege** subject to amendment and to the common good (Art. XII, Sec. 11). Requiring free “COMELEC Time” is a valid condition of the franchise (TELEBAP v. COMELEC; outside the 28 cases).'
			]
		},
		exx: {
			label: 'Why print media is different',
			items: [
				'Newspapers need no franchise. Forcing them to give **free print space** is a **taking of private property without just compensation**, and not valid police power because **no necessity** was shown (PPI v. COMELEC).'
			]
		},
		notes: [
			'The power to “**supervise or regulate**” does **not** include a power to take.',
			'**Police power** needs a lawful subject (public interest requires it) and lawful means (reasonably necessary and not unduly oppressive).',
			'The power applies only **during the election period**: 90 days before to 30 days after election day, unless the COMELEC fixes another period (Art. IX-C, Sec. 9).'
		],
		trap: 'Print = private property (pay for the space). Broadcast = franchise (free airtime may be required).',
		cases: ['ppi']
	},
	{
		id: 'candidacy',
		part: 4,
		title: 'Candidacy and premature campaigning',
		prov: 'Omnibus Election Code, Secs. 79–80; R.A. 8436, Sec. 15, as amended by R.A. 9369; Art. IX-C, Sec. 9',
		text: [
			'“Any person who files his certificate of candidacy… shall only be considered as a candidate at the start of the campaign period for which he filed his certificate of candidacy: Provided, That, unlawful acts or omissions applicable to a candidate shall take effect only upon the start of the aforesaid campaign period.” — R.A. 8436, Sec. 15, as amended by R.A. 9369',
			'“Unless otherwise fixed by the Commission in special cases, the election period shall commence ninety days before the day of election and shall end thirty days thereafter.” — Art. IX-C, Sec. 9'
		],
		req: {
			label: 'Elements of premature campaigning',
			items: [
				'The person is a **candidate**.',
				'The act is an **election campaign or partisan political activity**: designed to promote the election or defeat of a particular candidate.',
				'It is done **outside the campaign period**.'
			]
		},
		exc: {
			label: 'Not premature campaigning',
			items: [
				'Acts **after filing the COC but before the campaign period**: the person is not yet a candidate (Peñera, on reconsideration).',
				'**Public expressions of opinion** or discussion of probable issues in a coming election, or of the attributes of probable candidates in a party convention (OEC, Sec. 79(b)).'
			]
		},
		notes: [
			'**Campaign periods:** **90 days** for President, Vice-President and Senators; **45 days** for Members of the House and local officials.',
			'Peñera **reversed** the Court’s own September 11, 2009 decision on reconsideration (November 25, 2009).',
			'Once the campaign period starts, acts that would be unlawful for a candidate become punishable.'
		],
		trap: 'Filing a COC alone does not make one a candidate for purposes of campaign offenses. The start of the campaign period does.',
		cases: ['penera']
	},
	{
		id: 'tribunals',
		part: 4,
		title: 'COMELEC vs. the electoral tribunals',
		prov: 'Art. VI, Sec. 17; Art. IX-C, Sec. 2(2)',
		text: [
			'“The Senate and the House of Representatives shall each have an Electoral Tribunal which shall be the sole judge of all contests relating to the election, returns, and qualifications of their respective Members.” — Art. VI, Sec. 17',
			'COMELEC has “exclusive original jurisdiction over all contests relating to the elections, returns, and qualifications of all elective regional, provincial, and city officials, and appellate jurisdiction over all contests involving elective municipal officials… or… elective barangay officials.” — Art. IX-C, Sec. 2(2)'
		],
		req: {
			label: 'When the HRET’s jurisdiction begins',
			items: [
				'A **valid proclamation**.',
				'A **proper oath**.',
				'**Assumption of office**.'
			]
		},
		exc: {
			label: 'What stays with COMELEC',
			items: [
				'Challenges **before** the nominee or winner is proclaimed, sworn in and assumes office.',
				'Questions on the **party-list organization itself** (its registration and qualifications), as distinct from its nominees (Abayon v. HRET; outside the 28 cases).'
			]
		},
		notes: [
			'Each Electoral Tribunal has **nine members**: **three Supreme Court Justices** designated by the Chief Justice and **six Members** of the chamber chosen by proportional representation; the **senior Justice** chairs.',
			'**Hold-over:** a party officer whose term expired may continue until a successor is chosen, unless the party’s rules forbid it.',
			'**Estoppel:** one who benefited from an officer’s acts cannot later question that officer’s authority.',
			'COMELEC decisions in contests over **municipal and barangay** offices are final, executory and **not appealable** (Art. IX-C, Sec. 2(2)), though certiorari for grave abuse remains.'
		],
		trap: 'Proclaimed + oath + assumption = the tribunal’s turf. Before that, it is still the COMELEC’s.',
		cases: ['seneres']
	},
	{
		id: 'parties',
		part: 4,
		title: 'Registration of parties and coalitions',
		prov: 'Art. IX-C, Secs. 2(5), 6 and 7',
		text: [
			'COMELEC shall “register, after sufficient publication, political parties, organizations, or coalitions which, in addition to other requirements, must present their platform or program of government; and accredit citizens’ arms of the Commission on Elections.” — Art. IX-C, Sec. 2(5)'
		],
		req: {
			label: 'Requisites of registration',
			items: [
				'A **petition** with COMELEC, **within the deadline**.',
				'**Sufficient publication**.',
				'A **platform or program of government**.',
				'None of the grounds for refusal below.'
			]
		},
		exc: {
			label: 'Grounds to refuse registration',
			items: [
				'**Religious denominations and sects**.',
				'Those that seek their goals through **violence or unlawful means**.',
				'Those that **refuse to uphold and adhere to the Constitution**.',
				'Those **supported by any foreign government**.'
			]
		},
		exx: {
			label: 'Ground for cancellation',
			items: ['Accepting **financial contributions from foreign governments** related to elections is interference in national affairs and an added ground to **cancel** registration.']
		},
		notes: [
			'A coalition must be **registered before it can be accredited** as a dominant majority or minority party.',
			'Registration is **not** mere recognition of an “operative fact”; it requires discretion and quasi-judicial evaluation.',
			'Registration **deadlines are mandatory**, including for coalitions. Allowing late registration is grave abuse of discretion.',
			'A **free and open party system** is guaranteed; no votes for a party are valid except under the **party-list** system (Secs. 6 and 7).'
		],
		trap: 'Registration first, accreditation second. Deadlines cannot be waived.',
		cases: ['lp']
	},
	{
		id: 'coa',
		part: 4,
		title: 'Commission on Audit',
		prov: 'Art. IX-D, Secs. 2 and 3',
		text: [
			'COA has “the power, authority, and duty to examine, audit, and settle all accounts pertaining to the revenue and receipts of, and expenditures or uses of funds and property, owned or held in trust by, or pertaining to, the Government…” — Art. IX-D, Sec. 2(1)',
			'“No law shall be passed exempting any entity of the Government or its subsidiary in any guise whatever, or any investment of public funds, from the jurisdiction of the Commission on Audit.” — Art. IX-D, Sec. 3'
		],
		req: {
			label: 'Audited on a post-audit basis (Sec. 2(1))',
			items: [
				'Constitutional bodies with **fiscal autonomy** (Judiciary, Commissions, Ombudsman).',
				'**Autonomous state colleges and universities**.',
				'**Other GOCCs** and their subsidiaries.',
				'**Non-governmental entities** receiving government subsidy or equity, when required by law or the granting institution.'
			]
		},
		exc: {
			label: 'Exception to post-audit',
			items: ['Where an agency’s **internal control is inadequate**, COA may impose **temporary or special pre-audit**.']
		},
		notes: [
			'COA has **exclusive** authority to define the **scope** of its audit, its **techniques and methods**, and to make rules to prevent and disallow **irregular, unnecessary, excessive, extravagant or unconscionable** expenditures (Sec. 2(2)).',
			'**No law can exempt** any government entity from COA, including the BSP, which is an instrumentality and not a GOCC.',
			'COA may decide questions of law in an audit, but must apply the **correct law**.',
			'COA **cannot dictate** how a fiscally autonomous body manages its own resources (e.g. the Court’s valuation of its own property).',
			'**Auditors cannot receive benefits** or allowances from the agencies they audit.',
			'COA disciplining its own staff → **appeal to the CSC**, not certiorari to the SC.'
		],
		trap: 'Fiscal autonomy, instrumentality status or a special charter never exempts anyone from COA audit.',
		cases: ['recoa', 'galindo', 'bsp']
	},
	{
		id: 'gocc',
		part: 4,
		title: 'GOCCs and government instrumentalities',
		prov: 'Art. XII, Secs. 16 and 20; Art. X, Sec. 5',
		text: [
			'“Government-owned or controlled corporations may be created or established by special charters in the interest of the common good and subject to the test of economic viability.” — Art. XII, Sec. 16',
			'“The Congress shall establish an independent central monetary authority, the members of whose governing board must be natural-born Filipino citizens, of known probity, integrity, and patriotism, the majority of whom shall come from the private sector.” — Art. XII, Sec. 20'
		],
		req: {
			label: 'Requisites of a GOCC (Administrative Code)',
			items: [
				'Organized as a **stock** corporation (capital divided into shares, may pay dividends) or a **non-stock** corporation (has **members**).',
				'Vested with functions relating to **public needs**, governmental or proprietary.',
				'**Owned by the Government**, wholly or (for stock corporations) at least **51%** of the capital stock.'
			]
		},
		exc: {
			label: 'Government instrumentality with corporate powers (not a GOCC)',
			items: [
				'An agency **not integrated in a department**, vested with **special functions** by law, with some or all **corporate powers**, administering special funds, with **operational autonomy**, usually by charter.',
				'Examples: **MIAA** and the **BSP** (no capital stock divided into shares, no members).'
			]
		},
		exx: {
			label: 'Taxation of airport property (MIAA)',
			items: [
				'MIAA’s lands and buildings are **property of public dominion** of the Republic: exempt from real property tax and cannot be sold at auction.',
				'**Exception:** portions **leased to private persons** (beneficial use granted to a taxable person) are taxable.'
			]
		},
		notes: [
			'Local governments cannot tax the **National Government, its agencies and instrumentalities** (Local Government Code, Sec. 133(o)).',
			'Because the BSP is not a GOCC, **GOCC laws do not apply** to it, but **COA still audits** it.',
			'LGUs may create their own sources of revenue, subject to limits Congress provides (Art. X, Sec. 5).'
		],
		trap: 'No stock and no members means it is not a GOCC. Then ask: is the property public dominion, and was any part leased to a private person?',
		cases: ['bsp', 'miaa']
	},
	{
		id: 'chr',
		part: 4,
		title: 'Commission on Human Rights and fiscal autonomy',
		prov: 'Art. XIII, Secs. 17–19',
		text: [
			'“There is hereby created an independent office called the Commission on Human Rights.” — Art. XIII, Sec. 17(1)',
			'“The approved annual appropriations of the Commission shall be automatically and regularly released.” — Art. XIII, Sec. 17(4)'
		],
		req: {
			label: 'Composition',
			items: ['A **Chairman and four Members**, **natural-born** citizens, a **majority** of whom are members of the **Bar**.']
		},
		exc: {
			label: 'What the CHR does not have',
			items: [
				'**Fiscal autonomy.** Only the Judiciary, the Constitutional Commissions and the Ombudsman (J-C-O) have it. Automatic release of appropriations is not fiscal autonomy, so the CHR needs **DBM approval** to upgrade or reclassify positions.',
				'**Adjudicatory power.** It investigates but is not a court and cannot decide cases or issue injunctions (Cariño v. CHR; EPZA v. CHR; outside the 28 cases).'
			]
		},
		notes: [
			'**Independent ≠ fiscally autonomous.**',
			'**Main powers (Sec. 18):** investigate human rights violations involving civil and political rights; adopt rules and cite for contempt for violating them; provide legal measures and legal aid; visit jails and detention facilities; research and education; recommend measures and compensation to Congress; monitor treaty compliance; grant immunity from prosecution to witnesses; request help from any agency; appoint its own officers and employees.',
			'Congress may add other cases of human rights violations to its jurisdiction (Sec. 19).'
		],
		trap: 'J-C-O only. An “independent office” with automatic release of funds is still not fiscally autonomous.',
		cases: ['chrea']
	}
];

/** Topic ids per case id, for "Study notes" links from a problem or digest. */
export const TOPICS_BY_CASE: Record<string, StudyTopic[]> = (() => {
	const m: Record<string, StudyTopic[]> = {};
	for (const t of TOPICS) for (const c of t.cases) (m[c] ??= []).push(t);
	return m;
})();
