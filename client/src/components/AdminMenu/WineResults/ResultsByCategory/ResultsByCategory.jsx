import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as action from '../../../../store/actions/index';
import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import Back from '../../../UI/Back/Back';
import Button from '../../../UI/Button/Button';
import classes from './ResultsCategory.module.css';
import CategoryTable from './CategoryTable/CategoryTable';
import Popup from '../../../UI/Popup/Popup';
import DownloadFile from '../../DownloadFile/DownloadFile';
import { isTrueCheck } from '../../../../shared/utility';
import Modal from '../../../UI/Modal/Modal';
import Spinner from '../../../UI/Spinner/Spinner';

class ResultsByCategory extends Component {
    state = {
        tableHeadNames: ['Poradie', 'Číslo vína', 'Názov vína', 'Klasifikácia vína', 'Výrobca vína', 'Ročník vína', 'Degustačná skupina','Bodové hodnotenie', 'Kategória vína', 'Kompletnosť hodnotenia' ],
        selectedCategory: null,
        isModalShow: false,
        error: null
    }
    componentDidMount() {
        this.props.onFetchCompetitiveCategory(this.props.token)
    }

    getCategoryHandler =(e) => {
        let index = e.target.selectedIndex;
        let el = e.target.childNodes[index];
        let _id = el.getAttribute('id');
        this.setState({selectedCategory: _id})
    }
    clickHandler= (_id) => {
        this.props.history.push(`/admin/final-results-by-wineId/${_id}`)
    }
    fetchResultsByComCategory = () => {
        this.props.onFetchResultsByComCategory(this.state.selectedCategory, this.props.token)
    }
    writeFinalResultsHandler = () => {
        const catId = this.state.selectedCategory || this.props.competitiveCategory[0]._id;
        const index = this.props.competitiveCategory.findIndex(i => i._id === catId);
        this.props.onWriteFinalResults(catId, index, this.props.token)
        this.setState({isModalShow: false})
    }
    toggleModalHandler = () => {
        this.setState({
            isModalShow: !this.state.isModalShow,
        })
    }
    errorDownloadHandler = (err) => {
        this.setState({
            error: err
        })
        setTimeout(()=>{
            this.setState({error: null})
        }, 2500)
    }

    render() {
        let errorMessage;
        if (this.props.error) {
            errorMessage = this.props.error.message
        } else if (this.state.error) {
            errorMessage = this.state.error.message
        }
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <Back />
                <Modal
                show={this.state.isModalShow} 
                closeModal={this.toggleModalHandler}>
                    <p>Naozaj chcete zapísať výsledky do databázy ?</p>
                    <Button clicked={this.toggleModalHandler}>Nie</Button>
                    <Button clicked={this.writeFinalResultsHandler}>Ano</Button>
                </Modal>
                <ElementWrapper wrapperType="FullWidthWrapper">
                    <h4>Výsledky podľa súťažnej categórie vín</h4>
                    <p>Stav výsledkov: {this.props.isFinalResultWrite? 'Finálne výsledky - zapísané': 'Priebežné výsledky - nezapísané'}</p>
                    <div className={classes.HeaderCategoryChoose}>
                        <label >Súťažná kategória vína</label>
                        <select
                        onChange={this.getCategoryHandler}>
                        {this.props.competitiveCategory.map(cat => (
                        <option 
                            key={cat._id}
                            id={cat._id}>
                            {cat.categoryName}
                        </option>
                    ))}
                        </select>
                        <Button clicked={this.fetchResultsByComCategory}>Zobraz</Button>
                        <DownloadFile
                        errorDownload={this.errorDownloadHandler}
                        endPoint="final-results-export-by-cat"
                        token={this.props.token}
                        fileName="result_by_cat.xlsx"
                        isComplete={isTrueCheck(this.props.competitiveCategory, 'isFinalResultWrite')}
                        >Stiahnuť kompletné výsledky</DownloadFile>
                        <Button
                        clicked={this.toggleModalHandler}
                        disabled={isTrueCheck(this.props.results, 'isComplete')}
                        >Zapísať výsledky skupiny</Button>
                    </div>
                    {this.props.loading ? <Spinner /> : 
                    <CategoryTable 
                    results={this.props.results}
                    clickHandler={this.clickHandler}
                    tableHead={this.state.tableHeadNames}
                    />
                    }
                </ElementWrapper>
                <Popup 
                show={this.props.error || this.state.error}
                message={errorMessage}/>
            </ElementWrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        competitiveCategory: state.finalResults.competitiveCategory,
        results: state.finalResults.results,
        error: state.finalResults.error,
        isFinalResultWrite: state.finalResults.isFinalResultWrite,
        loading: state.finalResults.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchCompetitiveCategory: (token) => dispatch(action.fetchCompetitiveCategory(token)),
        onFetchResultsByComCategory: (categoryId, token) => dispatch(action.fetchWineResultsByComCategory(categoryId, token)),
        onWriteFinalResults: (catId, index, token) => dispatch(action.writeFinalResults(catId, index, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ResultsByCategory));