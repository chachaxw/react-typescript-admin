import React, { Component, ReactNode } from 'react';

interface InternalProps {
    children: ReactNode;
}

interface InternalState {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<InternalProps, InternalState> {
    constructor(props: InternalProps) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    public componentDidCatch(error: Error, info: any) {
        this.setState({ hasError: true });
        // TODO: Log the error to an error reporting service
        // ErrorReportService(error, info);
    }

    public render() {
        if (!this.state.hasError) {
            return (
                <div>Something went wrong.</div>
            );
        }

        return this.props.children;
    }
}
