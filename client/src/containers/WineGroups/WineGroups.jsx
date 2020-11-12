import React, {Component} from 'react';
import {connect} from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import Back from '../../components/UI/Back/Back';
import EditWineGroups from '../../components/AdminMenu/WineGroups/EditWineGroups/EditWineGroups';
import * as action from '../../store/actions/index';
import { isTrueCheck } from '../../shared/utility';
import Popup from '../../components/UI/Popup/Popup';
import Spinner from '../../components/UI/Spinner/Spinner';

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
    }

    render() {
        let message;
        if (this.props.error) {
            message = this.props.error.message
        } else if (this.props.isSucces) {
            message = this.props.succesMessage
        }
        let content = <React.Fragment>
                <Back />
                <EditWineGroups
                isDegustationOpen={this.props.isDegustationOpen}
                save={this.savedWineGroupsHandler}
                isGroupEdited={isTrueCheck(this.props.wineGroups.wineList, 'group')}
                defaultGroup={this.state}
                wines={this.props.wineGroups.wineList}
                groups={this.props.wineGroups.degGroups}
                getGroup={this.getGroupHandler}
                sortWineGroups={this.props.onSortWineGroups}
                />
                <Popup 
                isSucces={this.props.isSucces}
                succesMessage={this.props.succesMessage}
                show={this.props.error || this.props.isSucces}
                message={message}/>
            </React.Fragment>
        if (this.props.loading) {
            content = <Spinner />
        }
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                {content}
            </ElementWrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        wineGroups: state.wineGroups,
        isDegustationOpen: state.systemSettins.isDegustationOpen,
        error: state.wineGroups.error,
        loading: state.wineGroups.loading,
        isSucces: state.wineGroups.isSuccess,
        succesMessage: state.wineGroups.message
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

export default connect(mapStateToProps, mapDispatchToProps)(WineGroups);