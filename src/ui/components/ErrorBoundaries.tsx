import * as React from 'react';
import {Alert} from 'react-bootstrap';

interface State {
    hasError: boolean
}

/**
 * Handle Error Page.
 */
export default class ErrorBoundary extends React.Component<any, State> {
  /**
   * Constructor
   * @param {any} props
   */
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }
  /**
   * getDerivedStateFromError
   * @param {any} error
   * @return {Object}
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  /**
   * getDerivedStateFromError
   * @param {string} error
   * @param {string} errorInfo
   */
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  /**
   * getDerivedStateFromError
   * @return {React.ReactNode}
   */
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Alert className="mx-2 my-5" variant="danger">
          Something Went wrong!
        </Alert>
      );
    }

    return this.props.children;
  }
}
