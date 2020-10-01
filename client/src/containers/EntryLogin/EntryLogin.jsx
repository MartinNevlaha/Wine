import React, { Component } from 'react';

import EntryContent from '../../components/EntryContent/EntryContent';
import DegustatorLogin from '../../components/Login/DegustatroLogin/DegustatorLogin';



class EntryLogin extends Component {
    state = {
        showLogin: false,
    }
    toggleLoginHandler = () => {
        this.setState({showLogin: true})
    };

    render() {
        return (
            <div>
                {!this.state.showLogin 
                ? <EntryContent toggleLoginHandler={this.toggleLoginHandler} /> 
                : <DegustatorLogin />}
            </div>
        );
    }
}

export default EntryLogin;