import { ApplicationInsights } from '@microsoft/applicationinsights-web';

// Connection string is injected at build time via the VITE_APPINSIGHTS_CONNECTION_STRING
// environment variable (Azure App Service Application Setting or local .env file).
// When the variable is absent the SDK is not loaded, so local development stays unaffected.
const connectionString = import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING as string | undefined;

let appInsights: ApplicationInsights | null = null;

if (connectionString) {
  appInsights = new ApplicationInsights({
    config: {
      connectionString,
      enableAutoRouteTracking: true,
      autoTrackPageVisitTime: true,
      enableCorsCorrelation: true,
      enableRequestHeaderTracking: true,
      enableResponseHeaderTracking: true,
    },
  });
  appInsights.loadAppInsights();
}

export { appInsights };
