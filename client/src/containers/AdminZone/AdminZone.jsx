import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import DegustationSettings from '../../components/AdminMenu/DegustationSettings/DegustationSettings';
import WineList from '../../components/AdminMenu/WineList/WineList';
import DegustatorList from '../../components/AdminMenu/DegustatorList/DegustatorList';
import DegustatorGroup from '../../components/AdminMenu/DegGropsList/DegGroupsList';
import WineResults from '../../components/AdminMenu/WineResults/WineResults';
import SystemMenu from '../../components/AdminMenu/SystemMenu/SystemMenu';
import WineGroups from '../../components/AdminMenu/WineGroups/WineGroups';
import * as action from '../../store/actions/index';

class AdminZone extends Component {
    componentDidMount() {
        this.props.onFetchSystemSettings(this.props.token)
    }
    
    clickHandler = (index, adminChoose, btnType) => {
        if (adminChoose === 'Uprav vína') {
            this.props.history.push("/editwine")
        } else if (adminChoose === 'Zobraz vína') {
            this.props.history.push("/winelist")
        } else if (adminChoose === 'Uprav degustátorov') {
            this.props.history.push('/edit-degustator')
        } else if (adminChoose === 'Zobraz degustátorov') {
            this.props.history.push('/deglist')
        } else if (adminChoose === 'Uprav skupiny') {
            this.props.history.push('/edit-deg-group')
        } else if (adminChoose === 'Zobraz skupiny') {
            this.props.history.push('/deg-groups')
        } else if (adminChoose ==="Zobraz Systémové info") {
            this.props.history.push('/system-info')
        } else if (adminChoose ==="Uprav nastavenia") {
            this.props.history.push('/degustation-setting')
        } else if (adminChoose ==="Pridaj vína do skupín") {
            this.props.history.push('/wine-groups')
        }
    }

    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <DegustationSettings clicked={this.clickHandler}/>
                <WineList 
                isDegustationOpen={this.props.isDegustationOpen}
                clicked={this.clickHandler} />
                <DegustatorList 
                isDegustationOpen={this.props.isDegustationOpen}
                clicked={this.clickHandler}/>
                <DegustatorGroup 
                isDegustationOpen={this.props.isDegustationOpen}
                clicked={this.clickHandler}/>
                <WineGroups 
                clicked={this.clickHandler}/>
                <WineResults />
                <SystemMenu clicked={this.clickHandler}/>
            </ElementWrapper>
            );
    }
}

const mapStateToProps = state => {
    return {
        isDegustationOpen: state.systemSettins.isDegustationOpen,
        token: state.adminAuth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSystemSettings: (token) => dispatch(action.fetchSetting(token))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps) (withRouter(AdminZone));