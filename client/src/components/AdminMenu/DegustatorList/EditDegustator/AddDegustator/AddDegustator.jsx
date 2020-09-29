import React from 'react';

import UserInput from '../../../../UserInput/UserInput';
import ElementWrapper from '../../../../../hoc/ElementWrapper/ElementWrapper'

const addDegustator = (props) => {
    let userInput = [];
    for (let key in props.inputs) {
        userInput.push({
            id: key,
            config: props.inputs[key]
        })
    }
    let inputs = userInput.map(input => {
        return(
            <UserInput 
            key={input.id}
            id={input.id}
            labelName={input.config.labelName}
            inputType={input.config.inputType}
            placeholder={input.config.placeholder}
            options={input.config.options}
            value={input.config.value}
            change={props.getValueHandler}
            >{input.config.labelName}</UserInput>
        );
    })
    return (
        <ElementWrapper wrapperType="SmallWrapper">
            <h4>Pridaj degustátora</h4>
            <div className={classes.InputContainer}>
                {props.loadingSend ? <Spinner /> : inputs}
                <Button clicked={props.addWine}>Pridaj Degustátora</Button>
            </div>
        </ElementWrapper>
    );
}

export default addDegustator;