let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
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
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();

let minNow = 0;
if (now.getMinutes() <= 9) {
  minNow = `0${now.getMinutes()}`;
} else {
  minNow = now.getMinutes();
}
let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${hours}:${minNow}`;

let current = document.querySelector("#current");
current.innerHTML = `${day}, ${month} ${date}`;

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  let userCity = document.querySelector("#current-city");
  userCity.innerHTML = `${inputCity.value}`;
}

let currentCity = document.querySelector("#city-form");
currentCity.addEventListener("submit", showCity);

function showCelcius(event) {
  let celcius = document.querySelector("#temperature");
  celcius.innerHTML = ` 20`;
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);

function showFarenheit(event) {
  let farenheit = document.querySelector("#temperature");
  farenheit.innerHTML = ` 70`;
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", showFarenheit);

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function getCityTemp(event) {
  event.preventDefault();
  let cityName = capitalize(document.querySelector("#city-input").value);
  console.log(cityName);

  let apiKey = `e292871b38c53fa54871d43a5cdd6d5c`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(currentPos);
}
document.querySelector("#city-form").addEventListener("submit", getCityTemp);

function currentPos(event) {
  event.preventDefault();
  function weather(response) {
    let tempNow = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let wind = response.data.wind.speed;
    let city = response.data.name;
    document.querySelector("#current-city").innerHTML = `${city}`;

    document.querySelector("#temperature").innerHTML = `${tempNow}°C`;
    document.querySelector("#description").innerHTML = `${description}`;
    document.querySelector("#humidity").innerHTML = `${humidity}%`;
    document.querySelector("#wind").innerHTML = `${wind}`;
  }
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "e292871b38c53fa54871d43a5cdd6d5c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(weather);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}
document.querySelector("#location").addEventListener("click", currentPos);
