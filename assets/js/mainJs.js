/* Variables */
const API_KEY = '9bb87156295234b5818a2a3fbabeb8d1'; 
const CITY_STORE = 'cityStore'

// City Info variables
var getCityUrl = '';
var cityInfo = '';

// City Weather variables
var weatherInfoUrl = '';


/* City Data Funtionality */

// Function to build getCityInfo request
async function getCityInfo(element){
  var cityVal = "";
  var stateVal = "";

  // Get info from either input and dropdown OR city button based on element
  if($(element).text() === "Search"){
    // Get City and State values
    cityVal = $("#input-city").val();
    stateVal = $("#select-state option:selected").text();

    if(cityVal === "" || stateVal == "Select State"){
      alert("You must input a city and select a state to continue");
      return;
    }
  }
  else{
    cityVal = $(element).text();
    stateVal = $(element).val();
  }
  // Create URL
  getCityUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityVal + ',' + stateVal + ',US&appid=' + API_KEY;

  // Fetch API data
  const response = await fetch(getCityUrl);
  const data = await response.json();
  const {name, state, lat, lon} = data[0];
  var isExisting = false;

  // Local Storage
  var cities = JSON.parse(localStorage.getItem(CITY_STORE)) ?? [];

  // Remove any old records to be replaced
  for(var index = 0; index < cities.length; index++){
    if(cities[index].name === name && cities[index].state === state){
      cities[index].selected = true;
      isExisting = true
    }
    else{cities[index].selected = false;}
  }

  if(isExisting === false){
    cities.push({selected: true, name, state, lat, lon});
  }

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
  $("#city-results").empty();
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
      .attr("onclick", "getCityInfo(this)")
      .attr("value", cities[index].state);
      $("#city-results").append(button);
    }
  }
}

/* Weather Funtionality */

// Function to retrieve weather from API and present in htnl
async function getWeatherInfo(element){
  thisCity = "";

  var cities = JSON.parse(localStorage.getItem(CITY_STORE)) ?? [];

  // Get lat and lon values
  for(var index = 0; index < cities.length; index++){
    if(cities[index].selected === true){
        thisCity = cities[index];
    }
  }
  
  // Create URL
  weatherInfoUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + thisCity.lat + '&lon=' + thisCity.lon + '&units=imperial&exclude=minutely,hourly&appid=' + API_KEY;

  // Fetch API data
  const response = await fetch(weatherInfoUrl);
  const data = await response.json();
  //const {name, state, lat, lon} = data[0];
  console.log(data);
}

/* MAIN */

//createCityButtons();
// $(document).ready(function(){
//localStorage.clear();
createCityButtons();
getWeatherInfo();
//   setInterval( , 1000);
// });
