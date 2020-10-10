import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import ViewSystemInfo from '../../components/AdminMenu/SystemMenu/ViewSystemInfo/ViewSystemInfo';

class SystemInfo extends Component {

    render() {
        return (
            <ElementWrapper>
                <ViewSystemInfo />
            </ElementWrapper>
        )
    }
}
const mapStateTopProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchSystemInfo: (token) => dispatch()
    }
}

export default SystemInfo;