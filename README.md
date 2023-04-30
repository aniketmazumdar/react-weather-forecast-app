# Weather Forecast App
A single page Weather Forecast application on React JS

![Screenshot](/src/assets/img/screenshot.png?raw=true)

## Description
This app can generate the weather forecast report of today with the next five days for any location. Visior's current location is tracked based on the geolocation. By searching any city visitor can see the weather report of the location. In weather report information such points are included like: **Average Temperature, Highest Temperature, Lowest Temperature, Pressure, Precipitation, Wind Speed, Cloud Cover, the time of Sunset and Sunrise** etc.


## Technologies
Project is created with:
* React JS (17.0.2)
* CSS 3


## API Services
* [OpenWeatherMap](https://openweathermap.org/api) is used for generation Weather Report.
* [Geolocation DB](https://geolocation-db.com/) is used for tracking visitor's Geolocation.


## Setup Steps
1. Sign up over at [OpenWeatherMap](https://openweathermap.org/api) to generate an API key.
2. Fork the project and clone it locally.
3. Open the `.ENV` file and put the API Key as `REACT_APP_API_KEY`:

```
REACT_APP_API_KEY = '<YOUR_OPEN_WEATHER_MAP_API_TOKEN_HERE>'
```
4. To run this project, open the terminal into the project directory and install it locally using npm:

```
$ npm install
$ npm start
```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
