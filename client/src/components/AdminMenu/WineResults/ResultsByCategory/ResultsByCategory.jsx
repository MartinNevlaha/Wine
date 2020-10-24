import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as action from '../../../../store/actions/index';
import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import Back from '../../../UI/Back/Back';
import Button from '../../../UI/Button/Button';
import classes from './ResultsCategory.module.css';
import CategoryTable from './CategoryTable/CategoryTable';

class ResultsByCategory extends Component {
    state = {
        tableHeadNames: ['Číslo vína', 'Názov vína', 'Klasifikácia vína', 'Výrobca vína', 'Ročník vína', 'Bodové hodnotenie', 'Kategória vína', 'Kompletnosť hodnotenia' ],
        tableHeadIds: ['id', 'name', 'clasification', 'producer', 'vintage', 'result', 'wineCategory'],
        searchValue: '',
        headerValue: 'Číslo vína',
        chossenHeaderId: 'id',
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
                        <Button >Zobraz</Button>
                    </div>
                    <CategoryTable 
                    results={this.props.results}
                    tableHead={this.state.tableHeadNames}
                    />
                </ElementWrapper>
            </ElementWrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.adminAuth.token,
        competitiveCategory: state.finalResults.competitiveCategory,
        results: state.finalResults.results
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchCompetitiveCategory: (token) => dispatch(action.fetchCompetitiveCategory(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResultsByCategory);