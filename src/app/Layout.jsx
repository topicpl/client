import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import appConfig from '../../appConfig';

const Layout = (props) => {
  useEffect(() => {
    ReactGA.initialize(appConfig.gaTrackingId);
    ReactGA.pageview(window.location.pathname);
  }, []);
  return props.children;
};

export default Layout;
