import React, { Component } from 'react';

import classes from './DegustatorLogin.module.css';
import Button from '../../UI/Button/Button';
import WineGlass from '../../UI/WineGlass/WineGlass';
import UserInput from '../../UserInput/UserInput';

class DegustatorLogin extends Component {
    // state only for rendering components
    state = {
        commisionNumber: {
            labelName: 'Komisia číslo',
            inputType: 'text',
            placeholder: 'Číslo komisie',
            validationConfig: {
                required: true,
                maxLenght: 2,
                isNumeric: true
            }
        },
        degustatorNumber: {
            labelName: 'Degustátor číslo',
            inputType: 'text',
            placeholder: 'Číslo degustátora',
            validationConfig: {
                required: true,
                maxLenght: 2,
                isNumeric: true
            }
        }
    }


    render() {
        const userInputs = [];
        for (let key in this.state) {
            userInputs.push({
                id: key,
                config: this.state[key]
            })
        }
        let loginDegustatorForm = (userInputs.map(userInput => {
            let value = null;
            let getValue = null;
            if (userInput.id === 'commisionNumber') {
                value = this.props.commisonValue;
                getValue = this.props.getCommisionNumber;
            } else {
                value = this.props.degustatorValue;
                getValue = this.props.getDegustatorNumber;
            }
            return (
                <UserInput
                key={userInput.id}
                labelName={userInput.config.labelName}
                inputType={userInput.config.inputType}
                placeholder={userInput.config.placeholder}
                value={value}
                change={getValue}
                >{userInput.config.labelName}</UserInput>);
        }));
        return (
            <div className={classes.DegLogin}>
                <WineGlass />
                <div className={classes.LoginContainer}>
                    {loginDegustatorForm}
                    <Button 
                    clicked={this.props.degustatorLogin}
                    disabled={!this.props.isValid}>Prihlásiť</Button>
                </div>
            </div>
        );
    }
}

export default DegustatorLogin;