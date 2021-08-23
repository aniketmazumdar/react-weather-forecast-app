import React, { memo } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'

function WeatherReport({ weatherInfo }) {

  const {
    city,
    country,
    main,
    icon,
    temp,
    sunrise,
    sunset,
    clouds
  } = weatherInfo;

  return (
    <>
      <Card className="WeatherReport">
        <CardBody>
          <h1>{city}, {country}</h1>
          <CardTitle tag="h5"><img top width="50px" src={icon} alt="Card image cap" /> {main} ({temp}&#176;)</CardTitle>
          <CardText>
            Sunrise: <span className="text-muted">{sunrise}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Sunset: <span className="text-muted">{sunset}</span>
          </CardText>
        </CardBody>
      </Card>
    </>
  );
}

export default memo(WeatherReport);
