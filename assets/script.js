// API Call https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// API
var apiKey = "139a03101b47f7ef6ab0275fb6f50464";
var URL = " https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

// Refrences
var mainEl = $("#mainSection");
var oldLinks = $("#oldLinks");
var searchEl = $("#SearchBtn");
var inputEl = $("#input");

// Global Variables
var today = dayjs().format("D/M/YYYY");

function Search(searchWord) {
	fetch(URL + searchWord + "&appid=" + apiKey)
		.then((response) => {
			if (response.ok) return response.json();
			else console.log("Error: RESPONSE NOT OK");
		})
		.then((response) => {
			// adds the result to the screen
			var headerEl = $("<p>");
			headerEl.text(response.name + " " + today + " " + response.weather[0].icon);

			mainEl.append(headerEl);
			console.log(response);
			return response;
		});
}

// Adds old searches to the screen
function CreateElement(element) {
	var button = $("<button>").text(element);
	button.addClass("oldLink");
	oldLinks.append(button);
}

searchEl.on("click", function () {
	var searchWord = inputEl.val();

	CreateElement(searchWord);
	Search(searchWord);
});
