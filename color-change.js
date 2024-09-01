// Array of colors to cycle through
const colors = ["red", "orange", "green", "blue", "indigo", "violet"];

let colorIndex = 0;
let colorInterval;

// Function to start cycling colors
export function startColorCycle() {
	colorInterval = setInterval(() => {
		colorIndex = (colorIndex + 1) % colors.length; // Loop through colors
		catFacts.style.backgroundColor = colors[colorIndex];
	}, 200); // Change color every 500ms
}

// Function to stop cycling colors
export function stopColorCycle() {
	clearInterval(colorInterval); // Stop the interval
	catFacts.style.backgroundColor = "#03774d"; // Reset to original color
}
