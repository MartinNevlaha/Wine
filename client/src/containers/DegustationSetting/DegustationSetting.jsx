import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import RatingSetting from '../../components/AdminMenu/DegustationSettings/RatingSetting/RatingSetting';
import LockDegustation from '../../components/AdminMenu/DegustationSettings/LockDegustation/LockDegustation';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Back from '../../components/UI/Back/Back';

class DegustationSetting extends Component {
    state = {
        input: {
            id: 'input',
            labelName: 'Systém vyhodnotenia',
            inputType: 'select',
            placeholder: '',
            options: ['Eliminácia krajných hodnôt', 'Bez elminácie krajných hodnôt'],
            value: 'Eliminácia krajných hodnôt',
            isTrue: true
        },
        lock: {
            id: 'lock',
            labelName: 'Zamknutie degustácie',
            inputType: 'select',
            placeholder: '',
            options: ['Odomknúť degustáciu', 'Zamknúť degustáciu'],
            value: 'Odomknúť',
            isTrue: true
        }
    }
    getValueHandler = (e, id) => {
        console.log(id)
        let isTrue;
        if (id === "input") {
            isTrue = e.target.value === "Eliminácia krajných hodnôt" ? true : false;
        } else if (id === 'lock') {
            isTrue = e.target.value === "Odomknúť degustáciu" ? true : false
        }
        this.setState({
            ...this.state, 
            [id]: {
                ...this.state[id],
                value: e.target.value,
                isTrue: isTrue
            }
        })
    }
    saveSettingValueHandler = () => {
        const setting = {isValuesEliminated: this.state.input.isTrue}
        this.props.onSaveSettings(setting, this.props.token);
    }
    saveSettingLockHandler = () => {
        const setting = { isOpen: this.state.lock.isTrue}
        this.props.onSaveIsDegustationOpen(setting, this.props.token)
    }
    
    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper"> 
                <Back />
                {this.props.loading ? <Spinner /> : 
                    <React.Fragment>
                    <RatingSetting 
                    getValueHandler={this.getValueHandler}
                    input={this.state.input}
                    save={this.saveSettingValueHandler}/>
                    <LockDegustation 
                    getLockHandler={this.getValueHandler}
                    lock={this.state.lock}
                    save={this.saveSettingLockHandler}
                    />
                    </React.Fragment>
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
        onSaveSettings: (setting, token) => dispatch(action.saveSettings(setting, token)),
        onSaveIsDegustationOpen: (isOpen, token) => dispatch(action.saveIsDegustationOpen(isOpen, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (DegustationSetting);