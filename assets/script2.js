var appid = '485bbc753e29e9770f09ca55c32c6d79';

var weatherUrl = `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${appid}`

// fetch(weatherUrl)
//   .then((response) => response.json())
//   .then(function(data){
//     console.log(data);
//     var searchedCities = document.querySelector('#searched-cities');
//     var textEl = document.createElement('p');
//     textEl.textContent = `You Searched: ${data[0].name} in the state of ${data[0].state}`;

//     searchedCities.append(textEl);
//   });

