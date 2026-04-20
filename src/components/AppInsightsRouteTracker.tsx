import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { appInsights } from '../telemetry';

/**
 * Tracks a page-view event in Application Insights whenever the React Router
 * location changes. Mount this component once, anywhere inside <BrowserRouter>.
 * It renders nothing to the DOM.
 */
export default function AppInsightsRouteTracker() {
  const location = useLocation();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!appInsights) return;
    if (location.pathname === prevPathRef.current) return;

    prevPathRef.current = location.pathname;
    appInsights.trackPageView({ uri: location.pathname });
  }, [location]);

  return null;
}
