import React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import * as action from '../../store/actions/index';

class Logout extends Component {
    componentDidMount() {
        if (this.props.isAdminLogged) {
            this.props.onAdminLogout();
        }
    }
    render() {
        return <Redirect to="/"/>;
    }
};
const mapStateToProps = state => {
    return {
        isAdminLogged: state.adminAuth.token !== null && state.adminAuth.isValid
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAdminLogout: () => dispatch(action.adminLogout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);