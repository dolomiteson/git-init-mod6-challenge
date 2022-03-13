/* City Data Funtionality */
// TODO: Function that will generate City button upon search result
// Example of format will be: <button type="button" class="w-100 bg-secondary my-2">Search</button>
// Fetch API response to get results
var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly&appid=9bb87156295234b5818a2a3fbabeb8d1';
fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        console.log(data);
    });