/** Renders **bold** markers from the notes as <strong>, escaping everything else. */
export function md(s: string): string {
	return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
export function esc(s: string): string {
	return String(s ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);
}
