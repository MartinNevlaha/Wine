import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './DegustatorLogin.module.css';
import Button from '../../UI/Button/Button';
import WineGlass from '../../UI/WineGlass/WineGlass';
import LoginUserInput from '../../UserInput/UserInput';
import Spinner from '../../UI/Spinner/Spinner';
import { isInputNameValid, isInputPassValid } from '../../../shared/validations';
import * as action from '../../../store/actions/index';


class DegustatorLogin extends Component {
    // state only for rendering components
    state = {
        degName: {
            labelName: 'Prihlasovacie meno degustátora',
            inputType: 'text',
            placeholder: 'Prihlasovacie meno',
            value: '',
            valid: false
        },
        password: {
            labelName: 'Heslo',
            inputType: 'password',
            placeholder: 'Heslo degustátora',
            value: '',
            valid: false
        }
    }
    validationInput = (key, value) => {
        if (key === 'degName') {
            return isInputNameValid(value);
        } else {
            return isInputPassValid(value)
        }
    }
    getDegInputHandler = (e, key) => {
        this.setState({
            ...this.state,
            [key]: {
                ...this.state[key],
                value: e.target.value,
                valid: this.validationInput(key, e.target.value)
            }
        })
    }
    degLoginHandler = () => {
        const degData = {
            name: this.state.degName.value,
            password: this.state.password.value
        }
        this.props.onDeglogin(degData);
    };
    render() {
        let userInput = [];
        for (let key in this.state) {
            userInput.push({
                id: key,
                ...this.state[key]
            })
        }
        let loginDegustatorForm = userInput.map(input => {
            return (
                <LoginUserInput 
                key={input.id}
                id={input.id}
                labelName={input.labelName}
                inputType={input.inputType}
                name={input.labelName}
                placeholder={input.placeholder}
                value={input.value}
                change={this.getDegInputHandler}
            >{input.labelName}</LoginUserInput>
            );
        })
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{color: "red"}}>
                    {`Kód chyby: ${this.props.error.code}: ${this.props.error.message}`}
                </p>
            );
        }
        return (
            <div className={classes.DegLogin}>
                <WineGlass />
                {this.props.loading ? <Spinner/> :
                <div className={classes.LoginContainer}>
                    {loginDegustatorForm}
                    {errorMessage}
                    <Button 
                    clicked={this.degLoginHandler}
                    disabled={!(this.state.password.valid && this.state.degName.valid)}>Prihlásiť</Button>
                </div>}
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onDeglogin: (degData) => dispatch(action.degLogin(degData))
    }
};
const mapStateToProps = state => {
    return {
        loading: state.degAuth.loading,
        error: state.degAuth.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DegustatorLogin);