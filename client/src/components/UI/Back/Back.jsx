import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import classes from './Back.module.css';

class Back extends Component {
    state = {
        windowWidth: window.innerWidth,
    }
    componentDidMount() {
        window.addEventListener('resize', this.resizeHandler);
    }
    componentWillUnmount() {
        window.addEventListener('resize', this.resizeHandler);
        this.setState = (state,callback)=>{ //fix warn react issue
            return;
        };
    }
    resizeHandler = (e) => {
        this.setState({windowWidth: window.innerWidth});
    }
    // add push to history back
    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        let cls = classes.Back_top;
        if (this.props.pos === 'bottom') {
            cls = classes.Back_Bottom
        } else if (this.props.pos === 'middle') {
            cls = this.props.pos=classes.Back_mid
        }
        return (
            <div 
            className={cls}
            onClick={this.goBack}
            >
                <FontAwesomeIcon 
                    icon={faAngleLeft}
                    size={this.state.windowWidth > 1300 ? '3x' : '2x'}
                />
            </div>
        );
    }
} 

export default withRouter(Back);