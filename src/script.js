let now = new Date();
let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}

let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];

let time = document.querySelector("#current-time");
time.innerHTML = `${currentHours}:${currentMinutes}`;
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${day}`;
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${now.getDate()} ${month}`;

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
  typedCity.innerHTML = `${city}, ${country}`;
  description.innerHTML = response.data.weather[0].description;
  hiCurrentTemp.innerHTML = Math.round(response.data.main.temp_max);
  loCurrentTemp.innerHTML = Math.round(response.data.main.temp_min);
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  humidity.innerHTML = response.data.main.humidity;
}

//
let locationButton = document.querySelector("#basic-addon3");
locationButton.addEventListener("click", getCurrentLocation);

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", showCity);

search("New York");
