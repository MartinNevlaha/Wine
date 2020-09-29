import React, { Component } from 'react';

import classes from './UserInput.module.css';

class UserInput extends Component {
    
    render () {
        let inputType = (
            <input 
            className={classes.UserInput}
            type={this.props.inputType} 
            placeholder={this.props.placeholder} 
            onChange={(e) => this.props.change(e, this.props.id)}
            value={this.props.value}
            />
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