/* eslint-disable react/prop-types */
import { ErrorBoundary } from "react-error-boundary";

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div className="bg-background text-white p-4">
      <h1>Something went wrong.</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary} className="mt-2 px-3 py-1 bg-gray-700 rounded">
        Try Again
      </button>
    </div>
  );
}

export default function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
}
