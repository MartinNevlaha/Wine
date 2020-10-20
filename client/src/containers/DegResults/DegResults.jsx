import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import DegInfo from '../../components/DegResults/DegInfo/DegInfo';
import Results from '../../components/DegResults/Results';
import * as action from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';
import ResumeTable from '../../components/Rating/ResumeResults/ResumeTable/ResumeTable';
import WineGlass from '../../components/UI/WineGlass/WineGlass';
import Button from '../../components/UI/Button/Button';

class DegResults extends Component {
    componentDidMount() {
        this.props.onFetchDegResults(this.props.degInfo.token)
    }
    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <Modal 
                closeModal={this.props.onCloseDetailResult}
                show={this.props.degResults.showModal}
                loading={this.props.degResults.loading}>
                    <h4>Detailné zobrazenie hodnotenia vína</h4>
                    <WineGlass />
                    {this.props.degResults.detailedResult && <ResumeTable data={this.props.degResults.detailedResult}/>}
                    <Button clicked={this.props.onCloseDetailResult}>Ok</Button>
                </Modal>
                <DegInfo 
                degName={this.props.degResults.degName}
                degustatorNumber={this.props.degInfo.degustatorNumber}
                degGroup={this.props.degInfo.group}
                />
                <Results 
                results={this.props.degResults.results}
                fetchDetailResult={this.props.onFetchDegResultById}
                token={this.props.degInfo.token}
                />
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
        onFetchDegResults: (token) => dispatch(action.fetchDegResults(token)),
        onFetchDegResultById: (_id, token) => dispatch(action.fetchDegResultById(_id, token)),
        onCloseDetailResult: () => dispatch(action.closeDetailResult())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DegResults);