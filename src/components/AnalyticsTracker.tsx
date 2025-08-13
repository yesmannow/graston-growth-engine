import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// NOTE: The environment variable MUST be prefixed with VITE_ to be accessible in the browser.
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

if (GA4_MEASUREMENT_ID) {
  ReactGA.initialize(GA4_MEASUREMENT_ID);
}

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (GA4_MEASUREMENT_ID) {
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }
  }, [location]);

  return null;
};

export default AnalyticsTracker;