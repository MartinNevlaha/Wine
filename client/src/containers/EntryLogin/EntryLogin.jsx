import React, { Component } from 'react';
import { connect } from 'react-redux';

import EntryContent from '../../components/EntryContent/EntryContent';
import DegustatorLogin from '../../components/Login/DegustatroLogin/DegustatorLogin';
import * as actions from '../../store/actions/index';
import {isDegLoginValid} from '../../shared/validations';

class EntryLogin extends Component {
    state = {
        showLogin: false,
        degustatorLogin: {
            commisionNumber: '',
            degustatorNumber: '',
            validComNumber: false,
            validDegNumber: false,
        }
    }
    toggleLoginHandler = () => {
        this.setState({showLogin: true})
    };
    getInputComNumberHandler = (e) => {
        this.setState({ 
            degustatorLogin: {
                ...this.state.degustatorLogin,
                commisionNumber: e.target.value,
                validComNumber: isDegLoginValid(e.target.value)
            }
        }) 
    };
    getInputDegNumberHandler = (e) => {
        this.setState({
            degustatorLogin: {
                ...this.state.degustatorLogin,
                degustatorNumber: e.target.value,
                validDegNumber: isDegLoginValid(e.target.value)
            }
        })
    };
    submitDegustatorLogin = () => {
        this.props.onSubmiDegLogin(this.state.degustatorLogin.commisionNumber, this.state.degustatorLogin.degustatorNumber)
        this.props.history.push('/rating'); //redirect to degustator page
    }

    render() {
        return (
            <div>
                {!this.state.showLogin 
                ? <EntryContent toggleLoginHandler={this.toggleLoginHandler} /> 
                : <DegustatorLogin 
                    commisonValue={this.state.degustatorLogin.commisionNumber}
                    degustatorValue={this.state.degustatorLogin.degustatorNumber}
                    getCommisionNumber={this.getInputComNumberHandler}
                    getDegustatorNumber={this.getInputDegNumberHandler}
                    isValid={this.state.degustatorLogin.validComNumber && this.state.degustatorLogin.validDegNumber}
                    degustatorLogin={this.submitDegustatorLogin}
                />}
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSubmiDegLogin: (commisionNumber, degustatorNumber) => dispatch(actions.degustatorLogged(commisionNumber,degustatorNumber))
    }
};
export default connect(null, mapDispatchToProps)(EntryLogin);