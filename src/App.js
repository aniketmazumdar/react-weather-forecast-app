import React, { useState, useEffect } from 'react';
import './App.css';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import ContentLoader from 'react-content-loader'

import axios from './axios';

import Header from './Components/Header';
import Footer from './Components/Footer';
import SearchLocation from './Components/SearchLocation';
import WeatherReport from './Components/WeatherReport'
import WeatherForecastRecords from './Components/WeatherForecastRecords'
import NotFound from './Components/NotFound'


const loadingContent = () => (
  <ContentLoader viewBox="0 0 380 70">
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
)

function App() {
  const [searchLoc, setSearchLoc] = useState('');
  const [searchLocLatLong, setSearchLocLatLong] = useState('');
  const [weatherInfo, setWeatherInfo] = useState('');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  const apiIconPath = process.env.REACT_APP_API_ICON_PATH;
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Nocvember',
    'December',
  ];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    setIsLoadingContent(true);
    // Fetch Current GEO Location
    getCurrentGeoLocation();
  },[isPageLoaded]);


  function getCurrentGeoLocation(){
    const currGeoLoationAPI = process.env.REACT_APP_GEO_LOCATION_API;
    let geoLoationResponse = callToApi(currGeoLoationAPI);

    Promise.all([geoLoationResponse])
    .then(([resp]) => {
      let data = resp.data;
      let sLocLatLong = {
        latitude: data.latitude,
        longitude: data.longitude,
      }
      setSearchLocLatLong(sLocLatLong);
      setSearchLoc(data.city);
      setIsPageLoaded(true);
    })
    .catch(error => {
      console.log(error);
      setIsLoadingContent(false);
    });

    fetchWeatherReportFromAPI();
  }

  function handleInputChange(event) {
    setSearchLoc(event.target.value);
    setSearchLocLatLong({
      latitude: '',
      longitude: '',
    });
  }


  function handleInputSubmit(event) {
    event.preventDefault();
    setIsLoadingContent(true);
    fetchWeatherReportFromAPI();
  }


  function callToApi(url){
    let config = {
      mode:"cors",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      }
    }

    return axios.get(url,config)
    .then(response => {
      return response;
    });
  }

  function fetchWeatherReportFromAPI(){
    if (!searchLoc && !searchLocLatLong.latitude && !searchLocLatLong.longitude) {
      return;
    }

    const APIkey = process.env.REACT_APP_API_KEY;
    let weatherUrl = '';
    let forecastUrl = '';

    // Call Openweather API 
    if (searchLocLatLong.latitude && searchLocLatLong.longitude) {
      weatherUrl = `weather?lat=${searchLocLatLong.latitude}&lon=${searchLocLatLong.longitude}&APPID=${APIkey}&units=metric`;
      forecastUrl = `forecast?lat=${searchLocLatLong.latitude}&lon=${searchLocLatLong.longitude}&APPID=${APIkey}&units=metric`;
    } else {
      weatherUrl = `weather?q=${searchLoc}&APPID=${APIkey}&units=metric`;
      forecastUrl = `forecast?q=${searchLoc}&APPID=${APIkey}&units=metric`;
    }

    let weatherRespons = callToApi(weatherUrl);
    let forecastResponse = callToApi(forecastUrl);

    Promise.all([weatherRespons, forecastResponse])
    .then(([res1, res2]) => {
      let data1 = res1.data;
      let data2 = res2.data;

      const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);
      const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);

      const wInfo = {
        city: data1.name,
        country: data1.sys.country,
        description: data1.weather[0].description,
        main: data1.weather[0].main,
        icon: apiIconPath + data1.weather[0].icon + '.png',
        temp: data1.main.temp,
        highestTemp: data1.main.temp_max,
        lowestTemp: data1.main.temp_min,
        sunrise,
        sunset,
        clouds: data1.clouds.all,
        humidity: data1.main.humidity,
        wind: data1.wind.speed,
        forecast: data2.list,
      };
      setWeatherInfo(wInfo);
      setIsLoadingContent(false);
    })
    .catch(error => {
      console.log(error);
      setWeatherInfo('')
      setIsLoadingContent(false);
    });
  }


  return (
    <div className="App">

      <Header days={days} months={months} />

      <div className="container-fluid">

        <SearchLocation value={searchLoc} change={handleInputChange} submit={handleInputSubmit} isLoadingContent={isLoadingContent} />

        <Container className={"themed-container mt-4 " + ((isLoadingContent || !weatherInfo) ? 'd-flex align-items-center justify-content-center' : '')}>

          {
            isLoadingContent ? 
              loadingContent()
            :
              weatherInfo ? 
                <>
                  <WeatherReport weatherInfo={weatherInfo} />
                  <WeatherForecastRecords forecast={weatherInfo.forecast} apiIconPath={apiIconPath} days={days} months={months} />
                </>
              :
                <NotFound/>
          }

        </Container>

      </div>

      <Footer />

    </div>
  );
}

export default App;
