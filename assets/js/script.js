var searchEl = document.querySelector('#searchCity');
var previousBtn = document.querySelector('#previous-search');
var fiveDaysEl = document.querySelector('#five-day-forecast');
var currentEl = document.querySelector('#current-weather');
var appid = '692efab00ae66e9f48137e6ea4766fcd';

var toJSON = function(response) {
  return response.json();
};

// Search Bar
var findWeather = function(data, city) {
  console.log(data)
  var currentEl = document.querySelector('#current-weather')
  var h2El = document.createElement('h2')
  var currentDay = ('#current-day').html("" + moment().format("ddd, MMMM Do"));
  // date = (moment().subtract(10, 'days').calendar());
  // Add Image + Date
  // var imageEl2 = document.createElement('img')
  //   imageEl2.alt = icon
  //   imageEl2.src = 'https://openweathermap.org/img/wn/'+ icon +'@2x.png'
  var pEl = document.createElement('p')
  var humEl = document.createElement('p')
  var windEl = document.createElement('p')
  // var uviEl = document.createElement('p')
  h2El.textContent = city.name
  pEl.textContent = 'Temperature: ' + data.current.temp + '°F'
  humEl.textContent = 'Humidity: ' + data.daily[0].humidity + '%'
  windEl.textContent = 'Wind Speed: ' + data.daily[0].wind_speed + ' MPH'
  // uviEl.textContent = 'UV Index: ' + data.daily[0].uvi
  currentEl.appendChild(h2El)
  // currentEl.appendChild(imageEl2)
  currentEl.appendChild(pEl)
  currentEl.appendChild(humEl)
  currentEl.appendChild(windEl)
  // currentEl.appendChild(uviEl)

  // 5-Day Forecast
  var fiveDayForecast = data.daily.slice(1,6);
  fiveDaysEl.innerHTML= null
  for (var day of fiveDayForecast) {
    console.log('Day', day)
    var dates = new Date(day.dt * 1000).toLocaleDateString();
    var temps = day.temp.day
    var winds = day.wind_speed
    var hums = day.humidity
    var icon = day.weather[0].icon
    var column = document.createElement('div')
    var card = document.createElement('div')
    var date = document.createElement('p')
    date.textContent = dates
    var imageEl = document.createElement('img')
    imageEl.alt = icon
    imageEl.src = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'
    var temp = document.createElement('p')
    temp.textContent = 'Temp: ' + temps + '°F'
    var wind = document.createElement('p')
    wind.textContent = 'Wind: ' + winds + ' MPH'
    var hum = document.createElement('p')
    hum.textContent = 'Humidity: ' + hums + '%'
    column.className = 'col-12 col-lg'
    card.className = 'card w-100 p-3 m-2'
    fiveDaysEl.appendChild(column)
    column.appendChild(card)
    card.appendChild(date)
    card.appendChild(imageEl)
    card.appendChild(temp)
    card.appendChild(wind)
    card.appendChild(hum)
  }
};  