export function clear() {
	for (let i = 1; i < 5; i++) {
		const col = document.getElementById(`col${i}`);
		while (col.firstChild) {
			col.removeChild(col.firstChild);
		}
	}
	let catName = document.getElementById("catName");
	catName.innerHTML = "";
	catName.style.padding = "0";
	let randomCatPic = document.getElementById("randomCatPic");
	randomCatPic.innerHTML = "";
	randomCatPic.style.padding = "0";
	let randomCatInfo = document.getElementById("randomCatInfo");
	randomCatInfo.innerHTML = "";
	randomCatInfo.style.padding = "0";
}
