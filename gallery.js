// Resize the image gallery

// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// Declare a "loop" variable
let i;

// Full-width images
export function one() {
	for (i = 0; i < elements.length; i++) {
		elements[i].style.flex = "100%";
	}
}

// Two images side by side
export function two() {
	for (i = 0; i < elements.length; i++) {
		elements[i].style.flex = "50%";
	}
}

// Four images side by side
export function four() {
	for (i = 0; i < elements.length; i++) {
		elements[i].style.flex = "25%";
	}
}
