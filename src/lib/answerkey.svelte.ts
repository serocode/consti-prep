import { browser } from '$app/environment';

/**
 * Easter egg: "answer key" mode shows the model answer on every Consti problem and Crim Pro question.
 * Unlocked by tapping Atty. Hoot five times (in the side egg card) or typing "hoot" outside a text box.
 * Kept in sessionStorage so it lasts for this tab only and can't be left on by accident across visits.
 */
const KEY = 'alac-consti:answerkey';

function read(): boolean {
	if (!browser) return false;
	try {
		return sessionStorage.getItem(KEY) === '1';
	} catch {
		return false;
	}
}

let on = $state(read());

export const answerKey = {
	get on() {
		return on;
	},
	set(v: boolean) {
		on = v;
		try {
			if (v) sessionStorage.setItem(KEY, '1');
			else sessionStorage.removeItem(KEY);
		} catch {
			/* private mode: it still works until the tab reloads */
		}
	},
	toggle() {
		this.set(!on);
	}
};
