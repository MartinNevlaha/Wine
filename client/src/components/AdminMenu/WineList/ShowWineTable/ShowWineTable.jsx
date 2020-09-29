import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import SearchBar from '../../../SearchBar/SearchBar';
import * as action from '../../../../store/actions/index';
import classes from './ShowWineTable.module.css';
import { searchIdetificator, searchFilter } from '../../../../shared/utility';
import Back from '../../../UI/Back/Back';

class ShowAddedWine extends Component {
    state = {
        tableHeadNames: ['Číslo vína', 'Názov vina', 'Farba vína', 'Charakter vína', 'Výrobca vína', 'Ročník vína' ],
        tableHeadIds: ['id', 'name', 'color', 'character', 'producer', 'vintage'],
        searchValue: '',
        headerValue: 'Číslo vína',
        chossenHeaderId: 'id'
    }
    componentDidMount() {
        this.props.onFetchWineList();
    }
    componentDidUpdate() {
        console.log('update')
    }
    getSearchValueHandler = (e) => {
        this.setState({searchValue: e.target.value})
    }
    getHeaderValueHandler = (e) => {
        const [chossenHeader, chossenHeadId] = searchIdetificator(e, this.state.tableHeadNames, this.state.tableHeadIds)
        this.setState({
            headerValue: chossenHeader,
            chossenHeaderId: chossenHeadId
        })
    } 

    render() {
        let tableHead = this.state.tableHeadNames.map((th, index) => 
            <td key={th}>
                <span>{th}</span>
                <FontAwesomeIcon 
                icon={faSort}
                cursor="pointer"
                onClick={() => this.props.onSortWineBy(this.state.tableHeadIds[index])}/>
            </td>
        );
        let filteredWineList = this.props.wineList;
        if (this.state.searchValue !=='' && filteredWineList) {
            filteredWineList = searchFilter(this.props.wineList, this.state.chossenHeaderId, this.state.searchValue);
        }
        let wineList = filteredWineList.map(wine =>
            <tr key={wine._id}>
                <td>{wine.id}</td>
                <td>{wine.name}</td>
                <td>{wine.color}</td>
                <td>{wine.character}</td>
                <td>{wine.producer}</td>
                <td>{wine.vintage}</td>
            </tr>
            )
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                {wineList.length ? 
                    <ElementWrapper wrapperType="FullWidthWrapper">   
                    <h4>Zoznam súťažných vin</h4>
                    <SearchBar 
                    searchValue={this.state.searchValue}
                    getSearchValue={this.getSearchValueHandler}
                    headerValue={this.state.headerValue}
                    getHeadValue={this.getHeaderValueHandler}
                    options={this.state.tableHeadNames}/>
                    <table className={classes.ShowWineTable}>
                        <thead>
                            <tr>
                                {tableHead}
                            </tr>
                        </thead>
                        <tbody>
                            {wineList}
                        </tbody>
                    </table>
                </ElementWrapper> 
                : <h4>Nebolo pridané žiadne víno</h4>}
                <Back />
            </ ElementWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        wineList: state.wineList.wine,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSortWineBy: (sortByProp) => dispatch(action.sortWineBy(sortByProp)),
        onFetchWineList: () => dispatch(action.fetchWineList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowAddedWine);