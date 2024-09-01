const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button4 = document.getElementById("button4");
button1.addEventListener("click", one);
button2.addEventListener("click", two);
button4.addEventListener("click", four);
var columns = document.getElementsByClassName("column");

// Full-width images
export function one() {
	for (let i = 0; i < columns.length; i++) {
		columns[i].style.flex = "100%";
	}
}

// Two images side by side
export function two() {
	for (let i = 0; i < columns.length; i++) {
		columns[i].style.flex = "49%";
	}
}

// Four images side by side
export function four() {
	for (let i = 0; i < columns.length; i++) {
		columns[i].style.flex = "24%";
	}
}
