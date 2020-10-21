import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import Back from '../../components/UI/Back/Back';
import EditWineGroups from '../../components/AdminMenu/WineGroups/EditWineGroups/EditWineGroups';
import * as action from '../../store/actions/index';
import { isGroupEdited } from '../../shared/utility';

class WineGroups extends Component {

    componentDidMount() {
        this.props.onFetchWineEditGroups(this.props.token)
    }

    getGroupHandler = (e, wineDbId) => {
        let index = e.target.selectedIndex;
        let el = e.target.childNodes[index];
        let groupDbId = el.getAttribute('id');
        const groupName = e.target.value;
        const wineList = [...this.props.wineGroups.wineList];
        const choosenWineData = wineList.filter(wine => wine._id === wineDbId)[0]
        this.props.onWineGroupChange(choosenWineData, groupDbId, groupName);
    }
    savedWineGroupsHandler = () => {
        const wineGroupsData = this.props.wineGroups.wineList.map(wine => {
            return {
                _id: wine._id,
                group: wine.group._id
            }
        })
        this.props.onSaveWineGroups(wineGroupsData, this.props.token);
        this.props.history.goBack();
    }

    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <Back />
                <EditWineGroups
                isDegustationOpen={this.props.isDegustationOpen}
                save={this.savedWineGroupsHandler}
                isGroupEdited={isGroupEdited(this.props.wineGroups.wineList)}
                defaultGroup={this.state}
                wines={this.props.wineGroups.wineList}
                groups={this.props.wineGroups.degGroups}
                getGroup={this.getGroupHandler}
                sortWineGroups={this.props.onSortWineGroups}
                />
            </ElementWrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        wineGroups: state.wineGroups,
        isDegustationOpen: state.systemSettins.isDegustationOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchWineEditGroups: (token) => dispatch(action.fetchEditWineGroups(token)),
        onWineGroupChange: (choosenWineData, groupDbId, groupName) => dispatch(action.wineGroupChanged(choosenWineData, groupDbId, groupName)),
        onSortWineGroups: (sortByProp) => dispatch(action.sortWineGroupsBy(sortByProp)),
        onSaveWineGroups: (wineGroupsData, token) => dispatch(action.saveWineGroups(wineGroupsData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WineGroups));