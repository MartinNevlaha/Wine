import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import * as action from '../../../../store/actions/index';
import WineInfo from '../WineInfo/WineInfo';
import ResultsTable from '../ResultsTable/ResultsTable';
import Modal from '../../../UI/Modal/Modal';
import ResumeTable from '../../../Rating/ResumeResults/ResumeTable/ResumeTable';
import WineGlass from '../../../UI/WineGlass/WineGlass';
import Button from '../../../UI/Button/Button';
import Back from '../../../UI/Back/Back';

class ResultsByWineId extends Component {
    state = {
        tableHeads: ['Číslo degustátora','Meno degustátora', "Víno eliminované", 'Kategoria vína', 'Bodové hodnotenie' ],
        isModalOpen: false,
        wineId: null
    }
    componentDidMount() {
        const wineId = this.props.match.params.wineId;
        this.props.onfetchResultsByWineId(wineId, this.props.token)
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
                <Modal show={this.state.isModalOpen}
                closeModal={this.closeModalHandler}>
                    <h4>Detailné zobrazenie hodnotenia vína</h4>
                    <WineGlass />
                    {this.state.wineId && <ResumeTable data={detailedData[0]}/>}
                    <Button clicked={this.closeModalHandler}>Ok</Button>
                </Modal>
                <Back />
                <ElementWrapper wrapperType="FullWidthWrapper">
                <h4>Súhrn výsledkov</h4>
                <WineInfo wineInfo={this.props.wineInfo}/>
                <ResultsTable
                tableHeads={this.state.tableHeads}>
                    {this.props.results.map(result => {
                    return (
                    <tr key ={result._id}
                    onClick={() => this.onClickHandler(result._id)}>
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
        results: state.finalResults.resultByWineId,
        wineInfo: state.finalResults.wineInfo
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onfetchResultsByWineId: (wineId, token) => dispatch(action.fetchResultsByWineId(wineId, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ResultsByWineId));