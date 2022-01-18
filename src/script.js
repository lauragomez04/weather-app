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

function showForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
   
              <div class="col sunday">
                ${day}
                <br />
                <br />
                <img
                  id="icon"
                  class="forecastIcon"
                  src="weather-icons/01d.svg"
                  alt="sunny"
                  role="img"
                />
                <br />
                <br />
                <div><span>18</span>º</div>
                <div class="temp-min"><span>18</span>º</div>
              </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
showForecast();
