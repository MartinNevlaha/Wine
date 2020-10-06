import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import DegInfo from '../../components/DegResults/DegInfo/DegInfo';
import Results from '../../components/DegResults/Results';
import * as action from '../../store/actions/index';

class DegResults extends Component {
    componentDidMount() {
        this.props.onFetchDegResults(this.props.degInfo.token)
    }

    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <DegInfo 
                degName={this.props.degResults.degName}
                degustatorNumber={this.props.degInfo.degustatorNumber}
                degGroup={this.props.degInfo.group}
                />
                <Results 
                results={this.props.degResults.results}/>
            </ElementWrapper>
        );
    }
}
const mapStateToProps = state => {
    return {
        degInfo: state.degAuth,
        degResults: state.degResults
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchDegResults: (token) => dispatch(action.fetchDegResults(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DegResults);