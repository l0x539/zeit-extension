import * as React from "react"
import { Alert } from "react-bootstrap";

interface State {
    hasError: boolean
}

export default class ErrorBoundary extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Alert className="mx-2 my-5" variant="danger">
          Something Went wrong!
        </Alert>
      )
    }

    return this.props.children; 
  }
}