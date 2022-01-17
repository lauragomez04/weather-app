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

// Default city + input city //

function search(city) {
  let apiKey = "38d0737aa378d1f2ac80fe5aa5611e88";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function showCityTemperature(response) {
  document.querySelector("#temperature-number").innerHTML = Math.round(
    response.data.main.temp
  );
  let city = response.data.name;
  let country = response.data.sys.country;
  let typedCity = document.querySelector("#typed-city");
  let description = document.querySelector("#description");
  let hiCurrentTemp = document.querySelector("#current-highest-temp");
  let loCurrentTemp = document.querySelector("#current-lowest-temp");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let mainIcon = document.querySelector("#main-icon");
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
}

//
let locationButton = document.querySelector("#basic-addon3");
locationButton.addEventListener("click", getCurrentLocation);

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", showCity);

formatDate();

search("New York");
