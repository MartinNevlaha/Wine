import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import RatingSetting from '../../components/AdminMenu/DegustationSettings/RatingSetting/RatingSetting';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Back from '../../components/UI/Back/Back';

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
        const setting = {
            isValuesEliminated: this.state.input.isEliminateCutValues
        }
        this.props.onSaveSettings(setting, this.props.token);
    }

    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper"> 
                <Back />
                {this.props.loading ? <Spinner /> : 
                    <RatingSetting 
                    getValueHandler={this.getValueHandler}
                    input={this.state.input}
                    save={this.saveSettingHandler}/>
                }
            </ElementWrapper>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        loading: state.systemSettins.loading,
        isSaveSuccess: state.systemSettins.isSaveSucces
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSaveSettings: (setting, token) => dispatch(action.saveSettings(setting, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (DegustationSetting);