import React, {Component} from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Spinner from '../Spinner/Spinner';


class Modal extends Component {
    
    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.loading !== this.props.loading;
    }

    render () {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.closeModal}/>
                    <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-500vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >{this.props.loading ? <Spinner /> : this.props.children}</div>
            </React.Fragment>
        )
    }
}

export default Modal;