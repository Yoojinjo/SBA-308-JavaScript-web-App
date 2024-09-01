import * as Gallery from "./gallery.js";

//https://cat-fact.herokuapp.com

//API Key for https://api.thecatapi.com/
const API_KEY =
	"live_YFnrorgiYYm2zDAXebd9fRmy5IBUjsjBsCUkdB1uFfPAxI2slUx346TGwLyziik8";

// header parameter
axios.defaults.headers.common["x-api-key"] = API_KEY;
let cats20 = [];
var header = document.getElementById("myHeader");
var btns = header.getElementsByClassName("btn");
initialLoad();
const newGallery = document.getElementById("gallery");
newGallery.addEventListener("click", Gallery.clear);
newGallery.addEventListener("click", initialLoad);

async function initialLoad() {
	axios.interceptors.request.use((request) => {
		console.log("Request Started.");
		progressBar.style.width = "0%";
		document.body.style.cursor = "progress";
		request.metadata = request.metadata || {};
		request.metadata.startTime = new Date().getTime();
		return request;
	});

	axios.interceptors.response.use(
		(response) => {
			response.config.metadata.endTime = new Date().getTime();
			response.config.metadata.durationInMS =
				response.config.metadata.endTime -
				response.config.metadata.startTime;
			document.body.style.cursor = "default";
			console.log(
				`Request took ${response.config.metadata.durationInMS} milliseconds.`
			);
			return response;
		},
		(error) => {
			error.config.metadata.endTime = new Date().getTime();
			error.config.metadata.durationInMS =
				error.config.metadata.endTime - error.config.metadata.startTime;

			console.log(
				`Request took ${error.config.metadata.durationInMS} milliseconds.`
			);
			throw error;
		}
	);
	// get 20 random images
	axios
		.get("https://api.thecatapi.com/v1/images/search?limit=20", {
			onDownloadProgress: updateProgress,
		})
		.then((result) => {
			cats20 = result.data;
			console.log(cats20);
			const columns = document.querySelectorAll(".column");
			const numColumns = columns.length;

			cats20.forEach((element, index) => {
				const imgElement = document.createElement("img");
				imgElement.src = element.url;

				// Calculate which column the image should go into
				const columnIndex = index % numColumns;
				columns[columnIndex].appendChild(imgElement);
				header.style.display = "block";
				two();
			});
		})
		.catch((error) => console.error(error));
}
function updateProgress(progressEvent) {
	console.log(progressEvent);
	var total = progressEvent.total;
	var current = progressEvent.loaded;
	var percentage = (current / total) * 100;
	progressBar.style.width = percentage + "%";
}

// get cat facts
const catFacts = document.getElementById("catFacts");
catFacts.addEventListener("click", newCat);

function newCat() {
	header.style.display = "none";
	Gallery.clear();
	catInfo();
}

async function catInfo() {
	axios
		.get("https://api.thecatapi.com/v1/images/search?has_breeds=1", {
			onDownloadProgress: updateProgress,
		})
		.then((result) => {
			let catData = result.data[0];
			console.log(catData);
			let catName = document.getElementById("catName");
			catName.innerHTML = "";
			catName.style.marginTop = "3%";
			catName.append(`${catData.breeds[0].name}`);
			let randomCatFacts = document.getElementById("randomCatFacts");
			let randomCatPic = document.getElementById("randomCatPic");
			randomCatPic.innerHTML = "";
			randomCatPic.style.padding = "3%";
			let catPic = document.createElement("img");
			catPic.src = catData.url;
			randomCatPic.appendChild(catPic);
			let randomCatInfo = document.getElementById("randomCatInfo");
			randomCatInfo.innerHTML = "";
			randomCatInfo.style.padding = "3%";
			randomCatInfo.innerHTML = `<b>Description:</b> ${catData.breeds[0].description} <br><br>
            <b>Temperament:</b> ${catData.breeds[0].temperament} <br><br>
            <b>Also known as:</b> ${catData.breeds[0].alt_names} <br>`;
		})
		.catch((error) => console.error(error));
}

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button4 = document.getElementById("button4");
button1.addEventListener("click", one);
button2.addEventListener("click", two);
button4.addEventListener("click", four);
var columns = document.getElementsByClassName("column");

// Full-width images
function one() {
	for (let i = 0; i < columns.length; i++) {
		columns[i].style.flex = "100%";
	}
}

// Two images side by side
function two() {
	for (let i = 0; i < columns.length; i++) {
		columns[i].style.flex = "49%";
	}
}

// Four images side by side
function four() {
	for (let i = 0; i < columns.length; i++) {
		columns[i].style.flex = "24%";
	}
}

// Add active class to the current button (highlight it)

for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		var current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
	});
}
