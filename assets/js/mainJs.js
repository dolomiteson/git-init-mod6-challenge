/* Variables */
var apiKey = '9bb87156295234b5818a2a3fbabeb8d1'; 
var getCityInfo = 'http://api.openweathermap.org/geo/1.0/direct?q=St. Louis,Missouri,US&limit=5&appid=' + apiKey;
var getWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.7990175&lon=-89.6439575&exclude=minutely,hourly&appid=' + apiKey;
getResponse(getWeather);
getResponse(getCityInfo);

/* City Data 
Funtionality */
// TODO: Function that will generate City button upon search result
// Example of format will be: <button type="button" class="w-100 bg-secondary my-2">Search</button>
// Fetch API response to get results

// Function to get responses from API
function getResponse(requestUrl){
  fetch(requestUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
          console.log(data);
      });
}