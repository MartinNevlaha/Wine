import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as action from '../../../../store/actions/index';
import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import Back from '../../../UI/Back/Back';
import classes from './ResultsByDegGroup.module.css';
import Button from '../../../UI/Button/Button';
import ResultsTable from '../ResultsTable/ResultsTable';
import Modal from '../../../UI/Modal/Modal';
import WineGlass from '../../../UI/WineGlass/WineGlass';
import ResumeTable from '../../../Rating/ResumeResults/ResumeTable/ResumeTable';

class ResultsByDeGroup extends Component {
    state = {
        tableHeads: ['Číslo vína', 'Názov vína', 'Klasifikácia vína', 'Výrobca vína','Ročník vína' ,'Číslo degustátora','Meno degustátora', "Víno eliminované", 'Kategoria vína', 'Bodové hodnotenie' ],
        isModalOpen: false,
        wineId: null,
        selectedGroup: null
    }
    componentDidMount() {
        this.props.onFetchDegGroupsRes(this.props.token)
    }
    getGroupHandler = (e) => {
        let index = e.target.selectedIndex;
        let el = e.target.childNodes[index];
        let _id = el.getAttribute('id');
        this.setState({selectedGroup: _id})
    }
    onClickHandler = (_id) => {
        this.setState({
            isModalOpen: true,
            wineId: _id
        })
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
            <Back />
                <ElementWrapper wrapperType="FullWidthWrapper">
                    <h4>Výsledky vo vybranej degustačnej skupine</h4>
                    <div className={classes.HeaderGroupChoose}>
                            <label>Degustačná skupina</label>
                            <select
                            onChange={this.getGroupHandler}>
                            {this.props.degGroups.map(cat => (
                            <option 
                                key={cat._id}
                                id={cat._id}>
                                {cat.groupName}
                            </option>
                        ))}
                            </select>
                        <Button >Zobraz</Button>
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
                            <td>{result.degId.id}</td>
                            <td>{`${result.degId.name} ${result.degId.surname}`}</td>
                            <td>{result.eliminated ? "Áno" : 'Nie'}</td>
                            <td>{result.wineCategory}</td>
                            <td>{result.totalSum}</td>
                        </tr>
                        )
                    })}
                    </ResultsTable>
                </ElementWrapper>
            </ElementWrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        degGroups: state.finalResults.degGroups,
        results: state.finalResults.resultsByGroup
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchDegGroupsRes: (token) => dispatch(action.fetchDegGroupsRes(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ResultsByDeGroup));;