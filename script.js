import * as Gallery from "./gallery.js";
import { clear } from "./clear.js";
import * as Colors from "./color-change.js";

//https://cat-fact.herokuapp.com

//API Key for https://api.thecatapi.com/
const API_KEY =
	"live_YFnrorgiYYm2zDAXebd9fRmy5IBUjsjBsCUkdB1uFfPAxI2slUx346TGwLyziik8";

// header parameter
axios.defaults.headers.common["x-api-key"] = API_KEY;
let cats20 = [];
var header = document.getElementById("myHeader");
var btns = header.getElementsByClassName("btn");

// random cat fact
async function randomCatFact() {
	axios.get("https://catfact.ninja/fact?max_length=140");
}
// getFavList();
initialLoad();

const newGallery = document.getElementById("gallery");
newGallery.addEventListener("click", initialLoad);
const favCats = document.getElementById("favCats");
favCats.addEventListener("click", getFavoriteCatPhotos);

const myheader = document.querySelector("h2");

// load favorites
async function getFavoriteCatPhotos() {
	clear();
	myheader.textContent = "Favorite Feline Photos";
	myheader.style.backgroundColor = "pink";
	try {
		const result = await axios.get(
			"https://api.thecatapi.com/v1/favourites?limit=50"
		);
		const favInfo = result.data;
		console.log(favInfo);

		const columns = document.querySelectorAll(".column");
		const numColumns = columns.length;

		favInfo.forEach((element, index) => {
			const imgElement = document.createElement("img");
			imgElement.src = element.image.url;
			imgElement.id = element.id;
			let imgId = element.image_id;
			imgElement.onclick = () => addtoFav(imgId);

			// Calculate which column the image should go into
			const columnIndex = index % numColumns;
			columns[columnIndex].appendChild(imgElement);
			header.style.display = "block";
			Gallery.two();
		});
	} catch (error) {
		console.error(error);
	}
}

//Refresh favorites
async function getFavList() {
	try {
		const result = await axios.get(
			"https://api.thecatapi.com/v1/favourites"
		);
		console.log(result.data);
		return result.data;
	} catch (error) {
		console.error("Error fetching favorite list:", error);
	}
}

async function initialLoad() {
	clear();
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

	loadImages();
}
// get 20 random images
async function loadImages() {
	try {
		const response = await axios.get(
			"https://api.thecatapi.com/v1/images/search?limit=20",
			{
				onDownloadProgress: updateProgress,
			}
		);
		cats20 = response.data;
		console.log(cats20);
		const columns = document.querySelectorAll(".column");
		const numColumns = columns.length;

		cats20.forEach((element, index) => {
			const imgElement = document.createElement("img");
			imgElement.src = element.url;
			let imgId = element.id;
			imgElement.onclick = () => addtoFav(imgId);
			// Calculate which column the image should go into
			const columnIndex = index % numColumns;
			columns[columnIndex].appendChild(imgElement);
		});
		header.style.display = "block";
		Gallery.two();
	} catch (error) {
		console.error(error);
	}
}

async function addtoFav(imgId) {
	try {
		const favResponse = await axios.get(
			"https://api.thecatapi.com/v1/favourites"
		);
		const favoriteList = favResponse.data;
		console.log(favoriteList);
		// Check if the image is a favorite
		const fav = favoriteList.find((fav) => fav.image_id === imgId);

		if (fav) {
			console.log("Image is already in favorites. Favorite ID:", fav.id);

			let favId = fav.id;
			removeFromFav(favId);
			return;
		}

		console.log(imgId);

		await axios.post("https://api.thecatapi.com/v1/favourites", {
			image_id: imgId,
			sub_id: API_KEY,
		});
		console.log("image was added to favorites");
	} catch (error) {
		console.error(error);
	}
}
//Remove from Fav
async function removeFromFav(favId) {
	try {
		await axios.delete(`https://api.thecatapi.com/v1/favourites/${favId}`);
		console.log("image was removed from favorites");

		await getFavList();
	} catch (error) {
		console.error(error);
	}
}
function updateProgress(progressEvent) {
	// console.log(progressEvent);
	var total = progressEvent.total;
	var current = progressEvent.loaded;
	var percentage = (current / total) * 100;
	progressBar.style.width = percentage + "%";
}

// get cat facts
const catFacts = document.getElementById("catFacts");
catFacts.addEventListener("click", newCat);
catFacts.addEventListener("mouseover", Colors.startColorCycle);
catFacts.addEventListener("mouseout", Colors.stopColorCycle);

function newCat() {
	header.style.display = "none";
	clear();
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
button1.addEventListener("click", Gallery.one);
button2.addEventListener("click", Gallery.two);
button4.addEventListener("click", Gallery.four);
// var columns = document.getElementsByClassName("column");

// Add active class to the current button (highlight it)

for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		var current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
	});
}
