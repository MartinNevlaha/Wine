import React, { Component } from 'react';
import { connect } from 'react-redux'
 
import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import DegustationTable from '../../components/Rating/DegustatorTable/DegustatorTable';
import Button from '../../components/UI/Button/Button';
import ResultsTable from '../../components/Rating/ResultsTable/ResultsTable';
import * as action from '../../store/actions/index';
import {isIdValid} from '../../shared/validations';
import Modal from '../../components/UI/Modal/Modal';
import ResumeResults from '../../components/Rating/ResumeResults/ResumeResults';

class Degustator extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    get initialState() {
        return {
            lookClarity: [false, false, false, false, false],
            lookOutOfClarity: [false, false, false, false, false],
            smellPurity: [false, false, false, false, false],
            smellPossitiveIntesity: [false, false, false, false, false],
            smellQuality: [false, false, false, false, false],
            tastePurity: [false, false, false, false, false],
            tastePossitiveIntesity: [false, false, false, false, false],
            tasteHarmonicPersistence: [false, false, false, false, false],
            tasteQuality: [false, false, false, false, false],
            generalImpresion: [false, false, false, false, false],
            btnsValue: {
                lookClarity: [5,4,3,2,1],
                lookOutOfClarity: [10,8,6,4,2],
                smellPurity: [6,5,3,2,1],
                smellPossitiveIntesity: [8,7,6,4,2],
                smellQuality: [16,14,12,10,8],
                tastePurity: [6,5,4,3,2],
                tastePossitiveIntesity: [8,7,6,4,2],
                tasteHarmonicPersistence: [8,7,6,5,4],
                tasteQuality: [22,19,16,13,10],
                generalImpresion: [11,10,9,8,7]
            },
            isWineIdValid: false
        }
    }
    componentDidMount() {
        this.props.onFetchWineInGroup(this.props.token)
    }
    resetHandler = () => {
        this.setState(this.initialState)
    }
    onClickHandler = (indexClicked, value, btnType) => {
        this.props.onDegustatorPressBtn(btnType, value);
        this.setState({[btnType]: this.state[btnType].map((state, index)=>{
            return indexClicked === index; 
        })})
    };
    getWineIdHandler = e => {
        this.props.onWineIdHandler(e.target.value)
        this.setState({isWineIdValid: isIdValid(e.target.value)})
        if (e.target.value) {
            this.props.onFetchWineInfo(e.target.value, this.props.token)
        }
    }
    generateBtn (btnValues, btnType) {
        return btnValues.map((btn, index) => {
            return (
                <td key={btn}>
                <Button
                disabled={this.props.results.eliminated}
                index={index}
                active={this.state[btnType][index]}
                clicked={this.onClickHandler}
                btnType = {btnType}
                >{btn}</Button>
            </td>
            );
        })
    };

    render() {
        const btnsLookClarity = this.generateBtn(this.state.btnsValue.lookClarity, 'lookClarity');
        const btnslookOutOfClarity = this.generateBtn(this.state.btnsValue.lookOutOfClarity, 'lookOutOfClarity');
        const btnsSmellPurity = this.generateBtn(this.state.btnsValue.smellPurity, 'smellPurity');
        const btnsSmellPossitiveIntesity = this.generateBtn(this.state.btnsValue.smellPossitiveIntesity, 'smellPossitiveIntesity');
        const btnsSmellQuality = this.generateBtn(this.state.btnsValue.smellQuality, 'smellQuality');
        const btnsTastePurity = this.generateBtn(this.state.btnsValue.tastePurity, 'tastePurity');
        const btnsTastePossitiveIntesity = this.generateBtn(this.state.btnsValue.tastePossitiveIntesity, 'tastePossitiveIntesity');
        const btnsTasteHarmonicPersistence = this.generateBtn(this.state.btnsValue.tasteHarmonicPersistence, 'tasteHarmonicPersistence');
        const btnsTasteQuality = this.generateBtn(this.state.btnsValue.tasteQuality, 'tasteQuality');
        const btnsGeneralImpresion = this.generateBtn(this.state.btnsValue.generalImpresion, 'generalImpresion'); 
        
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <Modal  
                toogleModal={this.props.onResultSendInit}
                closeModal={this.props.onResultSendCanceled}
                show={this.props.sending}
                loading={this.props.loading}>
                    <ResumeResults 
                    reset={this.resetHandler}
                    closeModal={this.props.onResultSendCanceled}
                    loading={this.props.loading}
                    sendData={this.props.results}
                    degInfo={this.props.degInfo}/>
                </Modal>
                <DegustationTable 
                wineInGroups={this.props.wineInGroups}
                wineIdValue={this.props.results.wineId}
                getWineId={this.getWineIdHandler}
                wineInfo={this.props.wineInfo}
                isFetching={this.props.fetching}
                btnsLookClarity={btnsLookClarity}
                btnslookOutOfClarity={btnslookOutOfClarity}
                btnsSmellPurity={btnsSmellPurity}
                btnsSmellPossitiveIntesity={btnsSmellPossitiveIntesity}
                btnsSmellQuality={btnsSmellQuality}
                btnsTastePurity={btnsTastePurity}
                btnsTastePossitiveIntesity={btnsTastePossitiveIntesity}
                btnsTasteHarmonicPersistence={btnsTasteHarmonicPersistence}
                btnsTasteQuality={btnsTasteQuality}
                btnsGeneralImpresion={btnsGeneralImpresion}
                />
                <ResultsTable 
                degInfo={this.props.degInfo}
                modalToogle={this.props.onResultSendInit}
                eliminated={this.props.results.eliminated}
                totalSum={this.props.results.totalSum}
                wineCategory = {this.props.results.wineCategory}
                isWineIdValid={this.state.isWineIdValid}
                idError={this.props.wineInfo.error}
                />
            </ElementWrapper>
        );
    }
}
const mapStateToProps = state => {
    return {
        degInfo: state.degAuth,
        results: state.degRating,
        loading: state.wineResults.loading,
        sending: state.wineResults.sending,
        fetching: state.wineResults.fetching,
        wineInfo: state.wineResults.wineInfo,
        wineInGroups: state.wineResults.wineInGroups,
        token: state.degAuth.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onDegustatorPressBtn: (btnType, value) => dispatch(action.getDegustatorBtnPress(btnType, value)),
        onWineIdHandler: (id) => dispatch(action.getWineId(id)),
        onResultSendInit: () => dispatch(action.resultsSendInit()),
        onResultSendCanceled: () => dispatch(action.resultsSendCanceled()),
        onFetchWineInfo: (wineId, token) => dispatch(action.fetchWineInfo(wineId, token)),
        onFetchWineInGroup: (token) => dispatch(action.fetchWineInGroup(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Degustator);