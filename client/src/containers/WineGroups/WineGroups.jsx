import React, {Component} from 'react';
import {connect} from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import Back from '../../components/UI/Back/Back';
import EditWineGroups from '../../components/AdminMenu/WineGroups/EditWineGroups/EditWineGroups';
import * as action from '../../store/actions/index';

class WineGroups extends Component {
    componentDidMount() {
        this.props.onFetchWineEditGroups(this.props.token)
    }
    getGroupHandler = (e, wineDbId) => {
        let index = e.target.selectedIndex;
        let el = e.target.childNodes[index];
        let groupDbId = el.getAttribute('id');
        const wineList = [...this.props.wineGroups.wineList];
        const choosenWineData = wineList.filter(wine => wine._id === wineDbId)[0]
        this.props.onWineGroupChange(choosenWineData, groupDbId)
    }
    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <Back />
                <EditWineGroups
                wines={this.props.wineGroups.wineList}
                groups={this.props.wineGroups.degGroups}
                getGroup={this.getGroupHandler}/>
            </ElementWrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        wineGroups: state.wineGroups
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchWineEditGroups: (token) => dispatch(action.fetchEditWineGroups(token)),
        onWineGroupChange: (choosenWineData, groupDbId) => dispatch(action.wineGroupChanged(choosenWineData, groupDbId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WineGroups);