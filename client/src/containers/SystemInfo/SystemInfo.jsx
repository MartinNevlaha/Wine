import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import ViewSystemInfo from '../../components/AdminMenu/SystemMenu/ViewSystemInfo/ViewSystemInfo';
import * as action from '../../store/actions/index';
import Back from '../../components/UI/Back/Back';

class SystemInfo extends Component {
    componentDidMount() {
        this.props.onFetchSystemInfo(this.props.token)
    }

    render() {
        console.log(this.props.systemInfo.infoData)
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <Back />
                <ViewSystemInfo systemData={this.props.systemInfo.infoData}/>
            </ElementWrapper>
        )
    }
}
const mapStateTopProps = state => {
    return {
        systemInfo: state.systemInfo,
        token: state.adminAuth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchSystemInfo: (token) => dispatch(action.fetchSystemInfo(token))
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(SystemInfo);