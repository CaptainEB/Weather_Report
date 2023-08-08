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
var todayEl = $("#today");
var forecastEl = $("#forecast");

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

			//empty main weeather section
			todayEl.empty();
			forecastEl.empty();

			// This section only shows the weather data for TODAY
			var headerEl = $("<h3>");
			headerEl.text(weatherData.city.name + " " + "(" + today + ")");
			todayEl.append(headerEl);

			var infoEl = $("<p>");
			infoEl.text("Temperature: " + weatherData.list[0].main.temp + "°F");

			todayEl.append(infoEl);

			infoEl = new $("<p>");
			infoEl.text("Wind: " + weatherData.list[0].wind.speed + "MPH");
			todayEl.append(infoEl);

			infoEl = new $("<p>");
			infoEl.text("Humidity: " + weatherData.list[0].main.humidity + "%");
			todayEl.append(infoEl);

			infoEl = new $("<p>");
			infoEl.text("5 Day Forecast: ");
			infoEl.addClass("forecastText");
			forecastEl.append(infoEl);

			// This section shows the next 5 days weeather forecast on the screen
			for (var i = 7; i < 40; i += 7) {
				var thisDay = weatherData.list[i];
				var thisDay_time = dayjs.unix(thisDay.dt).format("M/D/YYYY");

				var div = $("<div>");
				div.addClass("forecastDay");
				infoEl = new $("<p>");
				infoEl.text(thisDay_time);
				infoEl.addClass("forecastDayDate");
				div.append(infoEl);

				infoEl = new $("<p>");
				infoEl.text("Temperature: " + thisDay.main.temp + "°F");
				div.append(infoEl);

				infoEl = new $("<p>");
				infoEl.text("Wind: " + thisDay.wind.speed + "MPH");
				div.append(infoEl);

				infoEl = new $("<p>");
				infoEl.text("Humidity: " + thisDay.main.humidity + "%");
				div.append(infoEl);

				forecastEl.append(div);
			}
		} else {
			console.log("ERROR:WEATHER DATA RESPONSE NOT OK");
		}
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
