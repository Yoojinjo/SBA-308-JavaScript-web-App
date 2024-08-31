import axios from "axios";

// base url for cats facts
//https://cat-fact.herokuapp.com

//API Key for https://api.thecatapi.com/
const API_KEY =
	"live_YFnrorgiYYm2zDAXebd9fRmy5IBUjsjBsCUkdB1uFfPAxI2slUx346TGwLyziik8";

// header parameter
// { 'x-api-key' : 'API_KEY' }

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

	axios
		.get(
			"https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=API_KEY",
			{ onDownloadProgress: updateProgress }
		)
		.then((result) => {
			console.log(result);
		})
		.catch((error) => console.error(error));
}
