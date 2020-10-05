import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import DegInfo from '../../components/DegResults/DegInfo/DegInfo';
import Results from '../../components/DegResults/Results';


class DegResults extends Component {
    componentDidMount() {
        //dopln nacitanie vín
    }

    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <DegInfo 
                degName={' '}
                degustatorNumber={this.props.degInfo.degustatorNumber}
                degGroup={this.props.degInfo.group}
                />
                <Results />
            </ElementWrapper>
        );
    }
}
const mapStateToProps = state => {
    return {
        degInfo: state.degAuth
    }
}

export default connect(mapStateToProps)(DegResults);