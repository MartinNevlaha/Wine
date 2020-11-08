import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import Button from '../../UI/Button/Button';

import classes from './Popup.module.css';

class Popup extends Component {

    render() {
        return (
            <div className={classes.Popup}
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(+500vh)',
                opacity: this.props.show ? '1' : '0'
            }}>
                <FontAwesomeIcon icon={faExclamation}/>
                <h5>OOPSS !!!</h5>
                <p>{this.props.message}</p>
                {this.props.type === 'errorBoundary' && 
                <Button clicked={this.props.resetErrorBoundary}>
                Skús znovu
                </Button>}
            </div>
        );
    } 

}

export default Popup; 