import React, { Component } from 'react';

import Button from '../UI/Button/Button';
import classes from './ErrorBoundary.module.css';

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
            <div className={classes.ErrorBoundary}>
                <h1>Niečo sa pokazilo !!!</h1>
                <h2>{error.toString()}</h2>
                <pre>{info.componentStack}</pre>
                <Button clicked={this.resetHandler}>Skús znova</Button>               
            </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;  