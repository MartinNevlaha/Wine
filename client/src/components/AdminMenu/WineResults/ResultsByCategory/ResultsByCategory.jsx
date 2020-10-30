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

class ResultsByCategory extends Component {
    state = {
        tableHeadNames: ['Poradie', 'Číslo vína', 'Názov vína', 'Klasifikácia vína', 'Výrobca vína', 'Ročník vína', 'Degustačná skupina','Bodové hodnotenie', 'Kategória vína', 'Kompletnosť hodnotenia' ],
        selectedCategory: null
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
        this.props.history.push(`/results-by-wineId/${_id}`)
    }
    fetchResultsByComCategory = () => {
        this.props.onFetchResultsByComCategory(this.state.selectedCategory, this.props.token)
    }
    render() {
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <Back />
                <ElementWrapper wrapperType="FullWidthWrapper">
                    <h4>Výsledky podľa súťažnej categórie vín</h4>
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
                        endPoint="final-results-export-by-cat"
                        token={this.props.token}
                        fileName="result_by_cat.xlsx"
                        >Stiahnuť výsledky</DownloadFile>
                    </div>
                    <CategoryTable 
                    results={this.props.results}
                    clickHandler={this.clickHandler}
                    tableHead={this.state.tableHeadNames}
                    />
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
        competitiveCategory: state.finalResults.competitiveCategory,
        results: state.finalResults.results,
        error: state.finalResults.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchCompetitiveCategory: (token) => dispatch(action.fetchCompetitiveCategory(token)),
        onFetchResultsByComCategory: (categoryId, token) => dispatch(action.fetchWineResultsByComCategory(categoryId, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ResultsByCategory));