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
    this.errorName = error.message;
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI
      return (
        <div style={{ padding: "2rem", textAlign: "center", color: "#fff", backgroundColor: "#111" }}>
          <h1>Something went wrong.</h1>
          <p>{this.errorName}</p>
        </div>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default ErrorBoundary;
