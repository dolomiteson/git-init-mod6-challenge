# Application: Weather Dashboard

## Description

An application that uses open weather API call to give the user the ability to see:
1. Current weather for city chose
2. 5-day forecast for city chosen

## Acceptance Criteria Coverage

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
1. getCityInfo():
    1. Will create a button for the city
    2. Will Update local storage when city button is clicked
    3. Will store values for the city
        1. selected:
            1. true upon first search
            2. true upon button click
        2. name: City
        3. state: city's state
        4. lat: latitude
        5. lon: longitude
        
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
1. getWeatherInfo():
    1. Will present current weather for selected city
    2. Will present 5-day forcast for selected city
    3. All acceptance criteria met
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
1. Given getCityInfo():
    1. The application will not let a user duplicate cities
    2. Local storage data is updated whether a new city is added or a historical city is selected
2. Given getWeatherInfo():
    1. It just uses local storage to present the selected city
        2. It is called by getCityInfo()
        3. It is called in 15 minute intervals

### Objective Evidence
![Example Picture](/assets/images/example.png?raw=true "Here is an example!")
[Try it yourself!](https://dolomiteson.github.io/git-init-mod6-challenge/)
