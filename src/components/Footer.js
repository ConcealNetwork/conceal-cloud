import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from './ContextProvider';


const Footer = () => {
  const { appSettings } = useContext(AppContext);

  return (
    <div className="slim-footer">
      <div className="container">
        <p>
          Copyright 2019 &copy; All Rights Reserved. Conceal Network | <Link to="/terms">Terms and Conditions</Link>
        </p>
        <p>Version: {appSettings.appVersion} | Last Update: {appSettings.lastUpdate.toUTCString()}</p>
      </div>
    </div>
  )
};

export default Footer;
