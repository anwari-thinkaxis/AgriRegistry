import React, { Component } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<React.PropsWithChildren, ErrorBoundaryState> {
    constructor(props: React.PropsWithChildren) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state to indicate that an error has occurred
        return { hasError: true, error: error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // Log the error to an error reporting service, if needed
        this.setState({ errorInfo });
        console.error("Error caught in ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can customize this fallback UI based on the error information
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details>
                        <summary>Click for details</summary>
                        <pre>{this.state.error?.message}</pre>
                        <pre>{this.state.errorInfo?.componentStack}</pre>
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
