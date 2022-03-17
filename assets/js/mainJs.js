/* Variables */
const API_KEY = '9bb87156295234b5818a2a3fbabeb8d1'; 
const CITY_STORE = 'cityStore'

// City Infor variables
var getCityUrl = '';
var cityInfo = '';

var weatherInfo = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.7990175&lon=-89.6439575&exclude=minutely,hourly&appid=' + API_KEY;


/* City Data Funtionality */

// Function to build getCityInfo request
async function getCityInfo(){
  // Get City and State values
  var cityVal = $("#input-city").val();
  var stateVal = $("#select-state option:selected").text();
  
  // Create URL
  getCityUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityVal + ',' + stateVal + ',US&appid=' + API_KEY;

  // Fetch API data
  const response = await fetch(getCityUrl);
  const data = await response.json();
  const {name, state, lat, lon} = data[0];

  // Local Storage
  var cities = JSON.parse(localStorage.getItem(CITY_STORE)) ?? [];

  // Remove any old records to be replaced
  for(var index = 0; index < cities.length; index++){
    if(cities[index].name === name && cities[index].state === state){
        cities.splice(index, 1);
    }
  }

  cities.push({name, state, lat, lon});

  cities.sort(function(a, b){
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return(textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  // Set local storage
  localStorage.setItem(CITY_STORE, JSON.stringify(cities));
  createCityButtons();
}

// Function that displays cities stored in local storage
function createCityButtons(){

  var cities = JSON.parse(localStorage.getItem(CITY_STORE)) ?? [];
  if(cities.length === 0){
    return;
  }
  else{
    for(var index = 0; index < cities.length; index++){
      var button = $("<button>")
      .text(cities[index].name)
      .attr("type", "button")
      .attr("class", "w-100 bg-secondary my-2 text-white")
      .attr("onclick", "getWeather()");
      $("#city-results").append(button);
    }
  }
  


  // Example of format will be: <button type="button" class="w-100 bg-secondary my-2">Search</button>
}

/* Weather Funtionality */
function getWeather(){}

