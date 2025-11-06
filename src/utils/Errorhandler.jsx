// ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.errorName = "";
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.errormessage = error.message;
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI
      return (
        <div className="bg-background text-white">
          <h1>Found an Error on this page </h1>
          <p>{this.errormessage}</p>
        </div>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
