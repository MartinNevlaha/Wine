import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import ViewSystemInfo from '../../components/AdminMenu/SystemMenu/ViewSystemInfo/ViewSystemInfo';
import * as action from '../../store/actions/index';
import Back from '../../components/UI/Back/Back';
import DbInfo from '../../components/AdminMenu/SystemMenu/DbInfo/DbInfo';
import LogEvents from '../../components/AdminMenu/SystemMenu/LogEvents/LogEvents';
import DeleteDesision from '../../components/AdminMenu/DeleteDesision/DeleteDesision';

class SystemInfo extends Component {
    state = {
        isModalShow: false,
    }
    componentDidMount() {
        this.props.onFetchSystemInfo(this.props.token)
    }
    modalOpen = () => {
        this.setState({
            isModalShow: true,
        })
    }
    modalClose = () => {
        this.setState({
            isModalShow: false,
        })
    }
    submitHandler = () => {
        this.setState({
            isModalShow: false,
        })
        this.props.onResetDb(this.props.token)
    }

    render() {
        console.log(this.props.systemInfo.infoData)
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <DeleteDesision 
                show={this.state.isModalShow}
                closeModal={this.modalClose}
                canceled={this.modalClose}
                submit={this.submitHandler}/>
                <Back />
                <ViewSystemInfo systemData={this.props.systemInfo.infoData}/>
                <DbInfo dbData={this.props.systemInfo.dbData} modalOpen={this.modalOpen}/>
                <LogEvents />
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
        onFetchSystemInfo: (token) => dispatch(action.fetchSystemInfo(token)),
        onResetDb: (token) => dispatch(action.completeResetDb(token))
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(SystemInfo);