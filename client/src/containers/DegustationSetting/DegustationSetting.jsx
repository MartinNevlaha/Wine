import React, { Component } from 'react';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import RatingSetting from '../../components/AdminMenu/DegustationSettings/RatingSetting/RatingSetting';

class DegustationSetting extends Component {
    state = {
        input: {
            labelName: 'Systém vyhodnotenia',
            inputType: 'select',
            placeholder: '',
            options: ['Eliminácia krajných hodnôt', 'Bez elminácie krajných hodnôt'],
            value: 'Eliminácia krajných hodnôt',
            isEliminateCutValues: true
        }
    }
    getValueHandler = (e) => {
        const isEliminatedValues = e.target.value === "Eliminácia krajných hodnôt" ? true : false;
        this.setState({
            ...this.state, 
            input: {
                ...this.state.input,
                value: e.target.value,
                isEliminateCutValues: isEliminatedValues
            }
        })
    }
    saveSettingHandler = () => {
        console.log(this.state.input.isEliminateCutValues)
    }

    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper"> 
                <RatingSetting 
                getValueHandler={this.getValueHandler}
                input={this.state.input}
                save={this.saveSettingHandler}/>
            </ElementWrapper>
        );
    }
}

export default DegustationSetting;