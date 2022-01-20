//Last update date & time //

function formatDate() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  let day = days[currentTime.getDay()];
  let months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  let month = months[currentTime.getMonth()];
  let date = currentTime.getDate();
  let updatedTime = document.querySelector("#current-time");
  let updatedDate = document.querySelector("#current-date");
  updatedTime.innerHTML = `${hours}:${minutes}`;
  updatedDate.innerHTML = `${day}, ${date} ${month}.`;
}

// Current Temperature on location //

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionData);
}

function showPositionData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "38d0737aa378d1f2ac80fe5aa5611e88";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityTemperature);
}

// Default city + input city + weather & forecast response//

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function search(city) {
  let apiKey = "38d0737aa378d1f2ac80fe5aa5611e88";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
   
              <div class="col sunday">
                ${formatDay(forecastDay.dt)}
                <br />
                <br />
                <img
                  id="icon"
                  class="forecastIcon"
                  src="weather-icons/${forecastDay.weather[0].icon}.svg"
                  alt="sunny"
                  role="img"
                />
                <br />
                <br />
                <div>${Math.round(forecastDay.temp.max)}º</div>
                <div class="temp-min">${Math.round(forecastDay.temp.min)}º</div>
              </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "38d0737aa378d1f2ac80fe5aa5611e88";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showCityTemperature(response) {
  let currentTemp = document.querySelector("#temperature-number");
  let city = response.data.name;
  let country = response.data.sys.country;
  let typedCity = document.querySelector("#typed-city");
  let description = document.querySelector("#description");
  let hiCurrentTemp = document.querySelector("#current-highest-temp");
  let loCurrentTemp = document.querySelector("#current-lowest-temp");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let mainIcon = document.querySelector("#main-icon");
  let illustration = document.querySelector("#illustration");
  celsiusTemperature = response.data.main.temp;

  currentTemp.innerHTML = Math.round(celsiusTemperature);
  typedCity.innerHTML = `${city}, ${country}`;
  description.innerHTML = response.data.weather[0].description;
  hiCurrentTemp.innerHTML = Math.round(response.data.main.temp_max);
  loCurrentTemp.innerHTML = Math.round(response.data.main.temp_min);
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  humidity.innerHTML = response.data.main.humidity;
  mainIcon.setAttribute(
    "src",
    `weather-icons/${response.data.weather[0].icon}.svg`
  );
  mainIcon.setAttribute("alt", response.data.weather[0].description);
  illustration.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  illustration.setAttribute("alt", response.data.weather[0].description);
  if (celsiusTemperature < 0) {
    illustration.setAttribute("src", `images/13d.png`);
  }

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  getForecast(response.data.coord);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let currentFahrenheitTemp = document.querySelector("#temperature-number");
  currentFahrenheitTemp.innerHTML = fahrenheitTemperature;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let currentCelsiusTemp = document.querySelector("#temperature-number");
  currentCelsiusTemp.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

//
let locationButton = document.querySelector("#basic-addon3");
locationButton.addEventListener("click", getCurrentLocation);

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", showCity);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("New York");
formatDate();
