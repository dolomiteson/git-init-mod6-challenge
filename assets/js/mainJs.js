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
  getCityUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityVal + ',' + stateVal + ',US&appid=' + API_KEY;

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
  getWeatherInfo();
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
async function getWeatherInfo(){
  thisCity = "";

  var cities = JSON.parse(localStorage.getItem(CITY_STORE)) ?? [];
  if(cities.length === 0){
    return;
  }
  else{
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
    // Icon for current day
    var currentIcon = data.current.weather[0].icon;
    var currentSrc = "https://openweathermap.org/img/w/" + currentIcon + ".png";
    var currentAlt = data.current.weather[0].description;
    var icon = $("<img>")
    .attr("src", currentSrc)
    .attr("alt", currentAlt + " icon");
    
    // Current Weather
    $("#current-city").text(thisCity.name + ", " + thisCity.state);
    $("#current-city").append(icon);
    var currDate = new Date(data.current.dt * 1000);
    $("#current-date").text(currDate.toLocaleString('en-US').split(',')[0]);
    $("#current-temp").text("Temp: " + Math.floor(data.current.temp) + "°F");
    $("#current-wind").text("Wind: " + Math.floor(data.current.wind_speed) + " MPH");
    $("#current-humidity").text("Humidity: " + data.current.humidity + " %");

    var uvi = data.current.uvi;
    var uviColor = "";
    if(uvi < 3){
      uviColor = "#00FF00";
    }
    else if(uvi > 2 && uvi < 6){
      uviColor = "#FF7F00";
    }
    else if(uci > 5 && uvi < 8){
      uviColor = "#FF0000";
    }
    else{uviColor = "#7F00FF";}

    var uviInd = $("<span>")
    .css("background-color", uviColor)
    .text(uvi);

    $("#current-uvi").text("UV Index: ");
    $("#current-uvi").append(uviInd);

    // 5-Day Weather
    $("#fiveDay-results").empty();
    for(var index = 1; index <= 5; index++){
      // Div containers for each day
      var day = $("<div>")
      .attr("class", "col h-75 m-1");
      $("#fiveDay-results").append(day);

      // Data for each day
      var thisDate = new Date(data.daily[index].dt * 1000)
      var date = $("<h4>")
      .attr("class", "row-12 text-white")
      .text(thisDate.toLocaleString('en-US').split(',')[0]);
      $(day).append(date);

      // Icon for each day
      var thisIcon = data.daily[index].weather[0].icon;
      var thisSrc = "https://openweathermap.org/img/w/" + thisIcon + ".png";
      var thisAlt = data.daily[index].weather[0].description;
      var icon = $("<img>")
      .attr("src", thisSrc)
      .attr("alt", thisAlt + " icon");
      
      $(day).append(icon);

      // Temp for each day
      var temp = $("<p>")
      .attr("class", "row-12 text-white")
      .text("Temp: " + Math.floor(data.daily[index].temp.day) + "°F");
      $(day).append(temp);

      // Wind for each day
      var wind = $("<p>")
      .attr("class", "row-12 text-white")
      .text("Wind: " + Math.floor(data.daily[index].wind_speed) + " MPH");
      $(day).append(wind);

      // Humidity for each day
      var humidity = $("<p>")
      .attr("class", "row-12 text-white")
      .text("Humidity: " + data.daily[index].humidity + " %");
      $(day).append(humidity);
    }
  }
}

/* MAIN */

$(document).ready(function(){
  createCityButtons();
  getWeatherInfo();
  setInterval(getWeatherInfo, 900000);
});
