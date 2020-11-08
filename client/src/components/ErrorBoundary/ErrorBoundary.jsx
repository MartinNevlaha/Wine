import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        error: null,
        info: null
    }

    componentDidCatch(error, info) {
        this.setState({
            error: error,
            info: info
        })
    }
    resetHandler = () => {
        this.setState({
            error: null,
            info: null
        })
    }

    render() {
        let {error, info} = this.state;
        if (error) {
            return (
            <div>
                <h1>Niečo sa pokazilo</h1>
                <h2>{error.toString()}</h2>
                <pre>{info.componentStack}</pre>
                <button onClick={this.resetHandler}>Skús znova</button>               
            </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;  