export function clear() {
	for (let i = 1; i < 5; i++) {
		const col = document.getElementById(`col${i}`);
		while (col.firstChild) {
			col.removeChild(col.firstChild);
		}
	}
}
