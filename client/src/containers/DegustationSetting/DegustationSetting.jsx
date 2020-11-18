import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import RatingSetting from '../../components/AdminMenu/DegustationSettings/RatingSetting/RatingSetting';
import LockDegustation from '../../components/AdminMenu/DegustationSettings/LockDegustation/LockDegustation';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Back from '../../components/UI/Back/Back';
import Popup from '../../components/UI/Popup/Popup';
import Button from '../../components/UI/Button/Button';
import DegustationBasic from '../../components/AdminMenu/DegustationSettings/DegustationBasic/DegustationBasic';
import QRsettings from '../../components/AdminMenu/DegustationSettings/QRsettings/QRsettings';

class DegustationSetting extends Component {
    state = {
        eliminatedValues: {
            id: 'eliminatedValues',
            options: ['Eliminácia krajných hodnôt', 'Bez elminácie krajných hodnôt'],
            value: '',
            isTrue: true,
            isTouch: false
        },
        lock: {
            id: 'lock',
            options: ['Odomknúť degustáciu', 'Zamknúť degustáciu'],
            value: '',
            isTrue: true,
            isTouch: false
        },
        degustationName: {
            id: 'degustationName',
            value: '',
            isTouch: false
        },
        competitionChairman: {
            id: 'competitionChairman',
            value: '',
            isTouch: false
        }
    }
    componentDidMount() {
        this.props.onFetchSettings(this.props.token);
    }

    getValueHandler = (e, id) => {
        let isTrue;
        if (id === "eliminatedValues") {
            isTrue = e.target.value === "Eliminácia krajných hodnôt" ? true : false;
        } else if (id === 'lock') {
            isTrue = e.target.value === "Odomknúť degustáciu" ? true : false
        }
        this.setState({
            ...this.state, 
            [id]: {
                ...this.state[id],
                value: e.target.value,
                isTrue: isTrue,
                isTouch: true
            }
        })
    }
    saveSettingValueHandler = () => {
        const setting = {
            isValuesEliminated: this.state.eliminatedValues.isTrue,
            isDegustationOpen: this.state.lock.isTrue,
            degustationName: this.state.degustationName.isTouch ? this.state.degustationName.value : this.props.actualDegName,
            competitionChairman: this.state.competitionChairman.isTouch ? this.state.competitionChairman.value : this.props.actualChairman
        }
        this.props.onSaveSettings(setting, this.props.token);
    }
    
    render() {
        let message;
        if (this.props.error) {
            message = this.props.error.message
        } else if (this.props.isSucces) {
            message = this.props.succesMessage
        }
        return (
            <ElementWrapper wrapperType="ElementWrapper"> 
                <Back pos='bottom'/>
                {this.props.loading ? <Spinner /> : 
                    <React.Fragment>
                    <DegustationBasic 
                    actualChairman={this.props.actualChairman}
                    actualDegName={this.props.actualDegName}
                    getValueHandler={this.getValueHandler}/>
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
                    <QRsettings server={this.props.host}/>
                    </React.Fragment>
                }
                <div style={{width: '100%', height: 'auto'}}>
                    <Button clicked={this.saveSettingValueHandler}>Ulož nastavenia</Button>
                </div>
                <Popup 
                isSucces={this.props.isSucces}
                succesMessage={this.props.succesMessage}
                show={this.props.error || this.props.isSucces}
                message={message}/>
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
        actualDegName: state.systemSettins.degustationName,
        actualChairman: state.systemSettins.competitionChairman,
        error: state.systemSettins.error,
        isSucces: state.systemSettins.isSucces,
        succesMessage: state.systemSettins.message,
        host: state.systemSettins.host
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchSettings: (token) => dispatch(action.fetchSetting(token)),
        onSaveSettings: (setting, token) => dispatch(action.saveSettings(setting, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (DegustationSetting);