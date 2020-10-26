import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import RatingSetting from '../../components/AdminMenu/DegustationSettings/RatingSetting/RatingSetting';
import LockDegustation from '../../components/AdminMenu/DegustationSettings/LockDegustation/LockDegustation';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Back from '../../components/UI/Back/Back';
import Popup from '../../components/UI/Popup/Popup';

class DegustationSetting extends Component {
    state = {
        eliminatedValues: {
            id: 'input',
            options: ['Eliminácia krajných hodnôt', 'Bez elminácie krajných hodnôt'],
            value: '',
            isTrue: true
        },
        lock: {
            id: 'lock',
            options: ['Odomknúť degustáciu', 'Zamknúť degustáciu'],
            value: '',
            isTrue: true
        }
    }
    componentDidMount() {
        this.props.onFetchSettings(this.props.token);
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
                    eliminatedValues={this.state.eliminatedValues}
                    save={this.saveSettingValueHandler}
                    isValuesEliminated={this.props.isValuesEliminated}/>
                    <LockDegustation 
                    getLockHandler={this.getValueHandler}
                    lock={this.state.lock}
                    saveIsLock={this.saveSettingLockHandler}
                    isDegustationOpen={this.props.isDegustationOpen}
                    />
                    </React.Fragment>
                }
                 <Popup 
                show={this.props.error}
                message={this.props.error && this.props.error.message}/>
            </ElementWrapper>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        loading: state.systemSettins.loading,
        isValuesEliminated: state.systemSettins.isValuesEliminated,
        isDegustationOpen: state.systemSettins.isDegustationOpen,
        error: state.systemSettins.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchSettings: (token) => dispatch(action.fetchSetting(token)),
        onSaveSettings: (setting, token) => dispatch(action.saveSettings(setting, token)),
        onSaveIsDegustationOpen: (isOpen, token) => dispatch(action.saveIsDegustationOpen(isOpen, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (DegustationSetting);