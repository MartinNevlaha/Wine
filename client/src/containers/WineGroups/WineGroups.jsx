import React, {Component} from 'react';
import {connect} from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import Back from '../../components/UI/Back/Back';
import EditWineGroups from '../../components/AdminMenu/WineGroups/EditWineGroups/EditWineGroups';
import * as action from '../../store/actions/index';

class WineGroups extends Component {

    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <Back />
                <EditWineGroups />
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
        onFetchWineEditGroups: (token) => dispatch(action.fetchEditWineGroups(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WineGroups);