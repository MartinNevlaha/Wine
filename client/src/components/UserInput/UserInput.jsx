import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import classes from './UserInput.module.css';

class UserInput extends Component {
    
    render () {
        let inputType = (
            <div className={classes.InputContainer}>
                <input 
                className={classes.UserInput}
                type={this.props.inputType} 
                placeholder={this.props.placeholder} 
                onChange={(e) => this.props.change(e, this.props.id)}
                value={this.props.value || ''}
                onKeyPress={this.props.id ==='password' ? (e) => this.props.onKeyPress(e): null}
                />
                {this.props.id === 'password' &&
                <FontAwesomeIcon 
                className={classes.Icon}
                cursor="pointer"
                onClick={this.props.tooglePwShow}
                icon={this.props.isPwShowed ? faEye : faEyeSlash}/>}
            </div>
        ); 
        if (this.props.inputType === "select") {
            let options = this.props.options;
            inputType = (
                <select 
                id={this.props.id} 
                onChange={(e) => this.props.change(e, this.props.id)}
                value={this.props.value}>
                    {options.map(opt=> {
                        return <option 
                        key={opt}
                        >{opt}</option>
                    })}
                </select>
            );
        }
        return (
            <React.Fragment>
                <label 
                className={classes.UserLabel}
                htmlFor={this.props.id}>{this.props.children}</label>
                {inputType}
            </React.Fragment>
        );
    }
}

export default UserInput;