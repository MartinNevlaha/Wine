import React, { Component } from 'react';
import { connect } from 'react-redux';

import ResumeTable from './ResumeTable/ResumeTable';
import WineGlass from '../../UI/WineGlass/WineGlass';
import Button from '../../UI/Button/Button';
import * as action from '../../../store/actions/index';


class ResumeResults extends Component {

    sendResult = () => {
        let data = {};
        if (this.props.sendData.eliminated) {
            data = {
                comNumber: this.props.degInfo.commisionNumber,
                degNumber: this.props.degInfo.degustatorNumber,
                wineId: this.props.sendData.wineId,
                eliminated: this.props.sendData.eliminated,
                comment: this.props.sendData.comment,
            }
        } else {
            data={
                comNumber: this.props.degInfo.commisionNumber,
                degNumber: this.props.degInfo.degustatorNumber,
                wineId: this.props.sendData.wineId,
                eliminated: this.props.sendData.eliminated,
                wineCategory: this.props.sendData.wineCategory,
                totalSum: this.props.sendData.totalSum,
                comment: this.props.sendData.comment,
                results: this.props.sendData.results
            }
        }
        console.log(data)
        this.props.onSendWineResult(data);
        this.props.reset();
    };

    render() {
        return (
            <React.Fragment>
                <h4>Vaše hodnotenie:</h4>
                <p>Víno číslo: {this.props.sendData.wineId}</p>
                <WineGlass />
                <ResumeTable sendData={this.props.sendData} />
                <Button clicked={this.props.closeModal}>Upraviť</Button>
                <Button clicked={this.sendResult}>Odoslať</Button>
            </React.Fragment>
        );
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSendWineResult: (data) => dispatch(action.resultsSend(data))
    }
};
export default connect(null, mapDispatchToProps)(ResumeResults);