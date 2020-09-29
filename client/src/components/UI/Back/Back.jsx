import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import classes from './Back.module.css';


class Back extends Component {
    // add push to history back
    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div 
            className={classes.Back}
            onClick={this.goBack}
            >
                <FontAwesomeIcon 
                    icon={faAngleLeft}
                    size='3x'
                />
                <p>Späť</p>
            </div>
        );
    }
} 

export default withRouter(Back);