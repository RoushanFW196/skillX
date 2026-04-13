import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.title}>⚠️ Something went wrong</h1>
          <p style={styles.text}>
            We ran into an unexpected issue. Try refreshing the page.
          </p>

          <button style={styles.button} onClick={this.handleReload}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f9fa",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  text: {
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ErrorBoundary;