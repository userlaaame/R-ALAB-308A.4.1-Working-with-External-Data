import * as Carousel from './Carousel.js';
import { API_KEY } from './keys.js';

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const progressBar = document.getElementById("progressBar");
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
function updateProgress(event) {
	console.log(event);  // inspect the ProgressEvent structure
	const percentage = Math.round((event.loaded / event.total) * 100);
	progressBar.style.width = `${percentage}%`;
}
function buildCarousel(images) {
	Carousel.clear();
	images.forEach((image) => {
		const item = Carousel.createCarouselItem(image.url, image.id, image.id);
		Carousel.appendCarousel(item);
	});
	Carousel.start();
}
async function initialLoad() {
	const response = await axios.get('https://api.thecatapi.com/v1/breeds');
	const breeds = response.data;

	breeds.forEach((breed) => {
		const option = document.createElement('option');
		option.value = breed.id;
		option.textContent = breed.name;
		breedSelect.appendChild(option);
	});
	breedSelect.dispatchEvent(new Event('change'));
}
initialLoad();

breedSelect.addEventListener('change', async (e) => {
	const breedId = e.target.value;
	const response = await axios.get(
		`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=10`,
		{
			headers: {
				'X-API-Key': API_KEY,
				Accept: 'application/json',
			},
			onDownloadProgress: updateProgress  // calls the function each time a chunk of the response downloads
		},
	);

	const images = response.data;
	buildCarousel(images);

	const breed = images[0]?.breeds[0];
	if (breed) {
		infoDump.innerHTML = `
      <h2>${breed.name}</h2>
      <p><strong>Origin:</strong> ${breed.origin}</p>
      <p><strong>Temperament:</strong> ${breed.temperament}</p>
      <p><strong>Life span:</strong> ${breed.life_span} years</p>
    `;
	}
});

/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

axios.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		config.startTime = Date.now();
		console.log(config);
		console.log(config.startTime + " Timelog");
		document.body.style.cursor = "progress";  // ← * - In your request interceptor, set the body element's cursor style to "progress."
		progressBar.style.width = "0%"
		// 	You need only to modify its "width" style property to align with the request progress.
		//  In your request interceptor, set the width of the progressBar element to 0%.
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	},
);
//  In your response interceptor, remove the progress cursor style from the body element.
axios.interceptors.response.use(
	function (response) {
		console.log(Date.now() - response.config.startTime + "ms elapsed");
		document.body.style.cursor = "default";  // ← remove the progress cursor
		return response;
	},
	function (error) {
		return Promise.reject(error);
	},
);
/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */

// 8. To practice posting data, we will create a system to "favourite" certain images.
// The skeleton of this favourite() function has already been created for you.
// This function is used within Carousel.js to add the event listener as items are created.
// This is why we use the export keyword for this function.
// Post to the cat API's favourites endpoint with the given id.
// The API documentation gives examples of this functionality using fetch(); use Axios!
// Add additional logic to this function such that if the image is already favourited, you 
// delete that favourite using the API, giving this function "toggle" behavior.
// You can call this function by clicking on the heart at the top right of any image.
export async function favourite(imgId) {
	const favResponse = await axios.get("https://api.thecatapi.com/v1/favourites", {
		headers: { "x-api-key": API_KEY }
	});

	const existing = favResponse.data.find(fav => fav.image_id === imgId);

	if (existing) {
		await axios.delete(`https://api.thecatapi.com/v1/favourites/${existing.id}`, {
			headers: { "x-api-key": API_KEY }
		});
	} else {
		await axios.post(
			"https://api.thecatapi.com/v1/favourites",
			{ image_id: imgId },
			{ headers: { "x-api-key": API_KEY } }
		);
	}
}
// Test your favourite() function by creating a getFavourites() function.
// Use Axios to get all of your favourites from the cat API.
// Clear the carousel and display your favourites when the button is clicked.
// You will have to bind this event listener to getFavouritesBtn yourself.
// Hint: you already have all of the logic built for building a carousel.
// If that is not in its own function, maybe it should be so that you do not
// have to repeat yourself in this section.

async function getFavourites() {
	const response = await axios.get("https://api.thecatapi.com/v1/favourites", {
		headers: { "x-api-key": API_KEY }
	});

	const images = response.data.map(fav => fav.image);
	buildCarousel(images);
}

getFavouritesBtn.addEventListener("click", getFavourites);
