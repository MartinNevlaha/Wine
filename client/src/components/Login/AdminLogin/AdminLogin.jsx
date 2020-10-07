import React, {Component} from 'react';
import { connect } from 'react-redux';

import LoginUserInput from '../../UserInput/UserInput';
import WineGlass from '../../UI/WineGlass/WineGlass';
import classes from './AdminLogin.module.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import {isInputNameValid, isInputPassValid} from '../../../shared/validations';
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
        password: {
            labelName: 'Admin heslo',
            inputType: 'password',
            placeholder: 'Heslo',
            value: '',
            valid: false,
            isShow: false
        }
    }
    validationInput = (key, value) => {
        if (key === 'adminName') {
            return isInputNameValid(value)
        } else {
            return isInputPassValid(value)
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
            password: this.state.password.value
        }
        this.props.onAdminLogin(adminData);
    }
    onEnterPressHandler = (e) => {
        if (e.key === "Enter") {
            this.adminLoginHandler();
        }
    };

    toogleShowPwHandler = () => {
        const typeInput = !this.state.password.isShow ? 'text' : 'password';
        this.setState({
            ...this.state,
            password: {
                ...this.state.password,
                isShow: !this.state.password.isShow,
                inputType: typeInput
            }
        })
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
                isPwShowed={this.state.password.isShow}
                tooglePwShow={this.toogleShowPwHandler}
                change={this.getAdminInputHandler}
                onKeyPress={this.onEnterPressHandler}
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
            <div className={classes.AdminLogin}>
                <WineGlass />
                {this.props.loading ? <Spinner /> :
                <div className={classes.LoginContainer}>
                {adminLoginForm}
                {errorMessage}
                <Button
                clicked={this.adminLoginHandler}
                disabled={!(this.state.adminName.valid && 
                    this.state.password.valid)}
                >Prihlásiť</Button>
                </div>}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdminLogin: (adminData) => dispatch(action.adminLogin(adminData))
    }
}
const mapStateToProps = state => {
    return {
        loading: state.adminAuth.loading,
        error: state.adminAuth.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminLogin);