import React, { Component } from 'react';

import UserInput from '../../UserInput/UserInput';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import classes from './AddDbElement.module.css';


class AddDbElement extends Component {

    render() {
        let userInput = [];
        for (let key in this.props.inputs) {
            userInput.push({
                id: key,
                config: this.props.inputs[key]
            })
        }
        let inputs = userInput.map(input => {
            return (
                <UserInput
                    componentType={this.props.componentType}
                    key={input.id}
                    id={input.id}
                    labelName={input.config.labelName}
                    inputType={input.config.inputType}
                    placeholder={input.config.placeholder}
                    options={input.config.options}
                    value={input.config.value}
                    change={this.props.getValueHandler}
                >{input.config.labelName}</UserInput>
            );
        })

        return (
            <div className={this.props.componentType === 'AddWine' ? classes.AddDbElementWine : classes.AddDbElement}>
                {this.props.componentType === 'AddDegustator'?
                <h4>Pridaj degustátora</h4> 
                : this.props.componentType ==='AddGroups' ? <h4> Vytvor skupiny</h4> 
                : <h4>Pridaj súťažné víno</h4>}
                <div className={this.props.componentType === 'AddWine' ? classes.InputContainerWine: classes.InputContainer}>
                    {this.props.loadingSend ? <Spinner /> : inputs}
                </div>
                <Button 
                    disabled={this.props.disabled}
                    clicked={this.props.add}>{this.props.componentType === 'AddDegustator'?
                    "Pridaj Degustátora" 
                    : this.props.componentType ==='AddGroups' ? "Vytvor skupiny"
                    : 'Pridaj víno'}
                </Button>
            </div>
        );
    }
}

export default AddDbElement;