import React, { memo } from 'react';
import {
  Card, CardBody, CardTitle, CardText, CardGroup,CardSubtitle,
} from 'reactstrap'

function WeatherForecastRecords({ forecast, apiIconPath, days, months }) {

  let today = new Date()
  let todayDDMMYYYY = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();

  let resultantRecords = forecast && forecast.map((item,k) => {
    let date = new Date(item.dt * 1000);
    let dateDDMMYYYY = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();

    return {
      temperature: item.main.temp,
      highestTemp: item.main.temp_max,
      lowestTemp: item.main.temp_min,
      pressure: item.main.pressure,
      humidity: item.main.humidity,
      main: item.weather[0].main,
      icon: apiIconPath + item.weather[0].icon + '.png',
      clouds: item.clouds.all,
      wind: item.wind.speed,
      year: parseInt(item.dt_txt.slice(0, 4)),
      month: parseInt(item.dt_txt.slice(5, 7)),
      date: parseInt(item.dt_txt.slice(8, 10)),
      day: days[date.getDay()],
      hour: item.dt_txt.slice(11, 13) * 1,
      isToday: todayDDMMYYYY === dateDDMMYYYY,
      dateTimstamp: item.dt,
    }
  })

  let finalForeCastRecords = [];
  resultantRecords.map((item,i) => {
    if (i==0 || (i>0 && ((item.date != resultantRecords[i-1].date) || (item.month != resultantRecords[i-1].month)))) {
      finalForeCastRecords.push(item);
    }
  })


  return (
    <>
      <CardGroup className="mt-4 WeatherForecastRecords">
        {
          finalForeCastRecords.map((item) => (
            <Card key={item.dateTimstamp}>
              <CardBody>
                <CardTitle tag="h6" className={item.isToday ? "text-primary" : "text-dark"}><small>{item.day}</small></CardTitle>
                <CardTitle tag="h5" className={item.isToday ? "text-primary" : "text-dark"}>{months[(item.month-1)]} {item.date}</CardTitle>
                <CardSubtitle><small><img top width="50px" src={item.icon} alt="Card image cap" /> {item.main} <span className="text-muted">({item.temperature}&#176;)</span></small></CardSubtitle>
                <hr/>
                <CardText className="mb-2">High: <span className="text-muted">{item.highestTemp}&#176;</span></CardText>
                <CardText className="mb-2">Low: <span className="text-muted">{item.lowestTemp}&#176;</span></CardText>
                <CardText className="mb-2">Pressure: <span className="text-muted">{item.pressure}</span></CardText>
                <CardText className="mb-2">Precipitation: <span className="text-muted">{item.humidity}%</span></CardText>
                <CardText className="mb-2">Wind Speed: <span className="text-muted">{item.temperature}mph</span></CardText>
                <CardText className="mb-2">Cloud Cover: <span className="text-muted">{item.clouds}</span></CardText>
              </CardBody>
            </Card>
          ))
        }
      </CardGroup>
    </>
  );
}

export default memo(WeatherForecastRecords);
