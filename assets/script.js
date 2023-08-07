// API Call https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// API
var apiKey = "139a03101b47f7ef6ab0275fb6f50464";
var URL = " https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=";
var GEO_URL = "http://api.openweathermap.org/geo/1.0/direct?q=";

// Refrences
var mainEl = $("#mainSection");
var oldLinks = $("#oldLinks");
var searchEl = $("#SearchBtn");
var inputEl = $("#input");

// global variables
var today = dayjs().format("M/D/YYYY");

async function Search(searchWord) {
	const response = await fetch(GEO_URL + searchWord + "&appid=" + apiKey);
	if (response.ok) {
		// Get Coordinates of the typed location
		var cords = await response.json();
		var lat = cords[0].lat;
		var lon = cords[0].lon;

		const weatherDataResponse = await fetch(URL + lat + "&lon=" + lon + "&appid=" + apiKey);

		if (weatherDataResponse.ok) {
			const weatherData = await weatherDataResponse.json();
			console.log(weatherData);

			//empty main weeather section]
			mainEl.empty();

			// This section only shows the weather data for TODAY
			var headerEl = $("<h3>");
			headerEl.text(weatherData.city.name + " " + "(" + today + ")");
			mainEl.append(headerEl);

			var infoEl = $("<p>");
			infoEl.text("Temperature: " + weatherData.list[0].main.temp + "°F");

			mainEl.append(infoEl);

			infoEl = new $("<p>");
			infoEl.text("Wind: " + weatherData.list[0].wind.speed + "MPH");
			mainEl.append(infoEl);

			infoEl = new $("<p>");
			infoEl.text("Humidity: " + weatherData.list[0].main.humidity + "%");
			mainEl.append(infoEl);

			// This section shows the next 5 days weeather forecast on the screen
			for (var i = 7; i < 40; i += 7) {
				var thisDay = weatherData.list[i];
				var thisDay_time = dayjs.unix(thisDay.dt).format("M/D/YYYY");

				infoEl = new $("<p>");
				infoEl.text("(" + thisDay_time + ")");
				mainEl.append(infoEl);

				infoEl = new $("<p>");
				infoEl.text("Temperature: " + thisDay.main.temp + "°F");
				mainEl.append(infoEl);

				infoEl = new $("<p>");
				infoEl.text("Wind: " + thisDay.wind.speed + "MPH");
				mainEl.append(infoEl);

				infoEl = new $("<p>");
				infoEl.text("Humidity: " + thisDay.main.humidity + "%");
				mainEl.append(infoEl);
			}
		} else {
			console.log("ERROR:WEATHER DATA RESPONSE NOT OK");
		}

		// fetch(URL + lat + "&lon=" + lon + "&appid=" + apiKey)
		// 	.then((response) => {
		// 		if (response.ok) return response.json();
		// 		else console.log("Error: RESPONSE NOT OK");
		// 	})
		// 	.then((response) => {
		// 		console.log(response);
		// 		for (var i = 0; i < 5; i++) {
		// 			var time = dayjs.unix(response.list[i].dt).format("M/D/YYYY");
		// 			console.log(time);
		// 		}
		//

		// 		// // adds a border to the main section
		// 		// mainEl.css("border", "2px solid black");
		// 		// // adds the result to the screen
		// 		// var headerEl = $("<h3>");
		// 		// var infoEl = $("<p>");
		// 		// headerEl.text(response.name + " " + "(" + today + ")");
		// 		// infoEl.text("Temperature: " + response.main.temp + "°F");
		// 		// mainEl.append(headerEl);
		// 		// mainEl.append(infoEl);

		// 		// infoEl = new $("<p>");
		// 		// infoEl.text("Wind: " + response.wind.speed + "MPH");
		// 		// mainEl.append(infoEl);

		// 		// infoEl = new $("<p>");
		// 		// infoEl.text("Humidity: " + response.main.humidity + "%");
		// 		// mainEl.append(infoEl);

		// 		// console.log(response);
		// 	});
	} else {
		console.log("ERROR: RESPONSE NOT OK");
	}
}

// Adds old searches to the screen
function CreateElement(element) {
	var button = $("<button>").text(element);
	button.addClass("oldLink");
	button.attr("id", "oldLink");
	oldLinks.append(button);
}

searchEl.on("click", function () {
	var searchWord = inputEl.val();

	CreateElement(searchWord);
	Search(searchWord);
});

$(".oldLinks").on("click", "#oldLink", function () {
	Search($(this).text());
});
