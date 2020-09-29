import React, {Component} from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';
=======
import {connect} from 'react-redux'
>>>>>>> 272dc2b75321a01b36985dc9559f786937f7dfbe

import LoginUserInput from '../../UserInput/UserInput';
import WineGlass from '../../UI/WineGlass/WineGlass';
import classes from './AdminLogin.module.css';
import Button from '../../UI/Button/Button';
import {isAdminNameValid, isAdminPassValid} from '../../../shared/validations';
import * as action from '../../../store/actions/index';

class AdminLogin extends Component {
    state = {
        adminName: {
            labelName: 'Admin meno',
            inputType: 'text',
            placeholder: 'Meno',
            value: '',
            valid: false
        },
        adminPassword: {
            labelName: 'Admin heslo',
            inputType: 'text',
            placeholder: 'Heslo',
            value: '',
            valid: false
        }
    }
    validationInput = (key, value) => {
        if (key === 'adminName') {
            return isAdminNameValid(value)
        } else {
            return isAdminPassValid(value)
        }
    }
    getAdminInputHandler = (e, key) => {
        this.setState({
            ...this.state,
            [key]: {
                ...this.state[key],
                value: e.target.value,
                valid: this.validationInput(key, e.target.value)
            }
        })
    }
    adminLoginHandler = () => {
        const adminData = {
            name: this.state.adminName.value,
            password: this.state.adminPassword.value
        };
        this.props.onAdminLogin(adminData);
    }

    adminLoginHandler = () => {
        const adminData = {
            name: this.state.adminName.value,
            password: this.state.adminPassword.value
        }
        this.props.onAdminLogin(adminData);
    }

    render() {
        let userInput = [];
        for (let key in this.state) {
            userInput.push({
                id: key,
                ...this.state[key]
            })
        }
        let adminLoginForm = userInput.map(input => {
            return (
                <LoginUserInput 
                key={input.id}
                id={input.id}
                labelName={input.labelName}
                inputType={input.inputType}
                name={input.labelName}
                placeholder={input.placeholder}
                value={input.value}
                change={this.getAdminInputHandler}
            >{input.labelName}</LoginUserInput>
            );
        })
        return (
            <div className={classes.AdminLogin}>
                <WineGlass />
                <div className={classes.LoginContainer}>
                    {adminLoginForm}
                    <Button
                    clicked={this.adminLoginHandler}
                    disabled={!(this.state.adminName.valid && 
                        this.state.adminPassword.valid)}
                    >Prihlásiť</Button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdminLogin: (adminData) => dispatch(action.adminLogin(adminData))
    }
}

export default connect(null, mapDispatchToProps) (AdminLogin);