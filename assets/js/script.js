// API
var searchForm = document.querySelector('#searchForm');
var appid = '485bbc753e29e9770f09ca55c32c6d79';
var searchBtn = document.getElementById('searchBtn');
var searchedCities = document.querySelector('#searchedCities');
// var q = 'Raleigh';
// var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;

var toJSON = function (response) {
  return response.json();
};

var showWeather = function (data, city) {
  console.log(data);
  var fiveDayEl = document.querySelector('#fiveDays');
  var currentEl = document.querySelector('#current-weather');
  var h2El = document.createElement('h2');
  var tempEl = document.createElement('p');
  var humEl = document.createElement('p');
  var windEl = document.createElement('p');
  var uviEl = document.createElement('p');
  h2El.textContent = city.name;
  tempEl.textContent = 'Temperature: ' + data.current.temp + '°F';
  humEl.textContent = 'Humidity: ' + data.current.humidity + '%';
  windEl.textContent = 'Wind Speed: ' + data.current.wind_speed + 'mph';
  uviEl.textContent = 'UV Index: ' + data.current.uvi;
  currentEl.appendChild(h2El);
  currentEl.appendChild(tempEl);
  currentEl.appendChild(humEl);
  currentEl.appendChild(windEl);
  currentEl.appendChild(uviEl);

  // 5-Day Forecast
  console.log('DAILY', data.daily.slice(1,6));
  var fiveDays = data.daily.slice(1,6);

  fiveDays.innerHTML= null;
  for (var day of fiveDays) {
    console.log('DAY', day);
    var date = new Date(day.dt * 1000).toLocaleDateString(); // This function gives the date.
    var temp = day.temp.day;
    var icon = day.weather[0].icon;
    var colEl = document.createElement('div');
    var cardEl = document.createElement('div');
    var dateEl = document.createElement('p');
    var fiveTempEl = document.createElement('p'); 
    var imgEl = document.createElement('img');

    imgEl.alt = icon;
    // imgEl.src = '' + icon + '@2xpng';

    colEl.className = "col-12 col-md";
    cardEl.className = "card p-3 m-3";

    dateEl.textContent = date;
    tempEl.textContent = temp;

    fiveDayEl.append(colEl);
    colEl.append(cardEl);
    cardEl.append(dateEl);
    cardEl.append(imgEl);
    cardEl.append(fiveTempEl);
  }
};
var searchedCities = document.querySelector('#searchedCities');
// Function => Search Button, this will display all of the buttons that we need.
var displayButtons = function() {
  var cities = JSON.parse(localStorage.getItem('cities')) || [];
  // searchedCities.innerHTML = null;
  for (var city of cities) {
    var buttonEl = document.createElement('button');
    buttonEl.textContent = city;
    buttonEl.className = "btn btn-success mb-3";
    searchedCities.appendChild(buttonEl);
  }
}


var getOneCall = function(city) {
  var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

  fetch(oneCall)
    .then(toJSON)
    .then(function(data) {
      showWeather(data, city);
    })
};

// Only need JSON.parse if there is an array or object.
var saveToLocalStorage = function(city) {
  var cities = JSON.parse(localStorage.getItem('cities')) || [];
  cities.push(city);

  // To save to local storage, we have to stringify.
  var data = JSON.stringify(cities);
  localStorage.setItem('cities', data);
  displayButtons();
};

var getGEO = function (locations) {
  var city = locations[0];
  console.log('LAT', city.lat);
  console.log('LON', city.lon);
  saveToLocalStorage(city.name); // Saving in Geo function will save city to Local Storage.
  displayButtons();
  getOneCall(city);
};

// Input
var handleSearch = function(event) {
  event.preventDefault();
  var q = document.querySelector('#q');
  var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${q.value}&appid=${appid}`;
  fetch(geoURL)
    .then(toJSON)
    .then(getGEO);
};
// Button
var handleCity = function(event) {
  event.preventDefault();
  if (event.target.matches('button')) {
    var q = event.target.textContent;
    var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
    fetch(geoURL)
      .then(toJSON)
      .then(getGEO);
  }
};

searchBtn.addEventListener('click', handleSearch);




displayButtons();
