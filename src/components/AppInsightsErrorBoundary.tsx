import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { appInsights } from '../telemetry';

interface Props {
  children: ReactNode;
  /** Optional fallback UI rendered when an uncaught error is caught. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Global React error boundary that reports uncaught render errors to Azure
 * Application Insights via `trackException`. Mount this once near the root of
 * the component tree so every unhandled render error is captured.
 */
export default class AppInsightsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (appInsights) {
      appInsights.trackException({
        exception: error,
        properties: {
          componentStack: info.componentStack ?? '',
        },
      });
    }
    // Always surface to the browser console so local debugging is unaffected.
    console.error('Uncaught render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen items-center justify-center p-8 text-center">
            <div>
              <h1 className="mb-2 text-2xl font-bold text-gray-800">Something went wrong</h1>
              <p className="text-gray-500">Please refresh the page or try again later.</p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
