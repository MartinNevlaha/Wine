import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import ViewSystemInfo from '../../components/AdminMenu/SystemMenu/ViewSystemInfo/ViewSystemInfo';
import * as action from '../../store/actions/index';
import Back from '../../components/UI/Back/Back';
import DbInfo from '../../components/AdminMenu/SystemMenu/DbInfo/DbInfo';
import LogEvents from '../../components/AdminMenu/SystemMenu/LogEvents/LogEvents';
import DeleteDesision from '../../components/AdminMenu/DeleteDesision/DeleteDesision';
import Popup from '../../components/UI/Popup/Popup';

class SystemInfo extends Component {
    state = {
        isModalShow: false,
        error: null
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
    errorDownloadHandler = (err) => {
        this.setState({
            error: err
        })
        setTimeout(()=>{
            this.setState({error: null})
        }, 2500)
    }

    render() {
        let errorMessage;
        if (this.props.error) {
            errorMessage = this.props.error.message
        } else if (this.state.error) {
            errorMessage = this.state.error.message
        }
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
                <LogEvents 
                errorDownload={this.errorDownloadHandler}
                token={this.props.token}/>
                <Popup 
                show={this.props.error || this.state.error}
                message={errorMessage}/>
            </ElementWrapper>
        )
    }
}
const mapStateTopProps = state => {
    return {
        systemInfo: state.systemInfo,
        token: state.adminAuth.token,
        error: state.systemInfo.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchSystemInfo: (token) => dispatch(action.fetchSystemInfo(token)),
        onResetDb: (token) => dispatch(action.completeResetDb(token))
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(SystemInfo);