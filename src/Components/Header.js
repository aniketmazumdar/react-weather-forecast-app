import React, { memo } from 'react';
import logoImg from '../assets/img/logo.png';

function Header({ days, months }) {

  const currDate = new Date();
  const finalDate = months[currDate.getMonth()] + ' ' + currDate.getDate() + ' ' + currDate.getFullYear() + ' (' + days[currDate.getDay()] + ')'

  return (
    <>
      <header>
        <div className="d-flex justify-content-between p-3">
            <h6><img top width="50px" src={logoImg} alt="Card image cap" className="logoImg" /> WEATHER FORECAST APP</h6>
            <h6>{finalDate}</h6>
        </div>
      </header>
    </>
  );
}

export default memo(Header);
