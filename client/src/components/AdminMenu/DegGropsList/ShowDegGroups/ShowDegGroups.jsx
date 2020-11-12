import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import DegGroupsTable from './DegGroupsTable/DegGroupsTable';
import Back from '../../../UI/Back/Back';
import * as action from '../../../../store/actions/index';
import Popup from '../../../UI/Popup/Popup';
import Spinner from '../../../UI/Spinner/Spinner';

class ShowDegGroups extends Component {
    componentDidMount() {
        this.props.onFetchDegGroups(this.props.token)
    }

    render () {
        const groups = this.props.groups.map((gr, index) => 
        <DegGroupsTable key={index} group={gr}/>)
        let content = <React.Fragment>
                <Back />
                <ElementWrapper wrapperType="FullWidthWrapper">
                    <h4>Skupiny degustátorov</h4>
                    {groups}
                </ElementWrapper>
                <Popup 
                show={this.props.error}
                message={this.props.error && this.props.error.message}/>
            </React.Fragment>
        if (this.props.loading) {
            content = <Spinner />
        }
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                {content}
            </ElementWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        groups: state.degGroups.degGroups,
        error: state.degGroups.error,
        loading: state.degGroups.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDegGroups: (token) => dispatch(action.fetchDegGroups(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowDegGroups);