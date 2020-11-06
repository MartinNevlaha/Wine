import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as action from '../../../../store/actions/index';
import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import Back from '../../../UI/Back/Back';
import classes from './ResultsByDegustator.module.css';
import Button from '../../../UI/Button/Button';
import ResultsTable from '../ResultsTable/ResultsTable';
import Modal from '../../../UI/Modal/Modal';
import WineGlass from '../../../UI/WineGlass/WineGlass';
import ResumeTable from '../../../Rating/ResumeResults/ResumeTable/ResumeTable';
import Popup from '../../../UI/Popup/Popup';

class ResultsByDegustator extends Component {
    state = {
        tableHeads: ['Číslo vína', 'Názov vína', 'Klasifikácia vína', 'Výrobca vína','Ročník vína', "Víno eliminované", 'Kategoria vína', 'Bodové hodnotenie' ],
        isModalOpen: false,
        wineId: null,
        selectedDeg: null
    }
    componentDidMount() {
        this.props.onFetchListOfDegustator(this.props.token)
    }
    getGroupHandler = (e) => {
        let index = e.target.selectedIndex;
        let el = e.target.childNodes[index];
        let _id = el.getAttribute('id');
        this.setState({selectedDeg: _id})
    }
    onClickHandler = (_id) => {
        this.setState({
            isModalOpen: true,
            wineId: _id
        })
    }
    fetchResultByDegustator = () => {
        this.props.onfetchResultsByDeg(this.state.selectedDeg, this.props.token)
    }
    closeModalHandler = () => {
        this.setState({isModalOpen: false})
    }
    render() {
        let detailedData = {}
        if (this.state.wineId) {
            detailedData = this.props.results.filter(result => 
                result._id === this.state.wineId
            )
        }
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <Modal show={this.state.isModalOpen}
                closeModal={this.closeModalHandler}>
                    <h4>Detailné zobrazenie hodnotenia vína</h4>
                    <WineGlass />
                    {this.state.wineId && <ResumeTable data={detailedData[0]} />}
                    <Button clicked={this.closeModalHandler}>Ok</Button>
                </Modal>
                <Back />
                <ElementWrapper wrapperType="FullWidthWrapper">
                    <h4>Hodnotenia vybraného degustátora</h4>
                    <div className={classes.HeaderDegustatorChoose}>
                            <label>Degustačná skupina</label>
                            <select
                            onChange={this.getGroupHandler}>
                            {this.props.degustators.map(deg => (
                            <option 
                                key={deg._id}
                                id={deg._id}>
                                {`${deg.id} ${deg.name} ${deg.surname}`}
                            </option>
                        ))}
                            </select>
                        <Button clicked={this.fetchResultByDegustator}>Zobraz</Button>
                    </div>  
                    <ResultsTable
                        tableHeads={this.state.tableHeads}>
                        {this.props.results.map((result, index) => {
                        return (
                        <tr key ={result._id}
                        onClick={() => this.onClickHandler(result._id)}>
                            <td>{result.wineDbId.id}</td>
                            <td>{result.wineDbId.name}</td>
                            <td>
                                {`${result.wineDbId.color} 
                                ${result.wineDbId.character} 
                                ${result.wineDbId.clasification}`}
                            </td>
                            <td>{result.wineDbId.producer}</td>
                            <td>{result.wineDbId.vintage}</td>
                            <td>{result.eliminated ? "Áno" : 'Nie'}</td>
                            <td>{result.wineCategory}</td>
                            <td>{result.totalSum}</td>
                        </tr>
                        )
                    })}
                    </ResultsTable>
                </ElementWrapper>
                <Popup 
                show={this.props.error}
                message={this.props.error && this.props.error.message}/>
            </ElementWrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        degustators: state.finalResults.degustators,
        results: state.finalResults.resultsByDeg,
        error: state.finalResults.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchResultsByDeg: (degId, token) => dispatch(action.fetchResultsByDeg(degId, token)),
        onFetchListOfDegustator: (token) => dispatch(action.fetchListOfDegustators(token)) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (ResultsByDegustator);