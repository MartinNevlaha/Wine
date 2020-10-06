import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons'

import classes from './Results.module.css';
import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';


class Results extends Component {
    state = {
        tableHeadNames: ['Číslo vína', 'Farba vína', 'Charakter vína', 'Eliminované', 'Kategória vína', 'Celkový súčet']
    }
    render() {
        const tableHead = this.state.tableHeadNames.map((head, index)=>{
            return (
            <td key={index}>
                <span>{head}</span>
                <FontAwesomeIcon 
                icon={faSort}
                cursor="pointer"/>
            </td>);
        })
        let results = this.props.results.map(result => (
            <tr 
            key={result._id} 
            id={result._id}>
                <td>{result.wineInfo.wineId}</td>
                <td>{result.wineInfo.color}</td>
                <td>{result.wineInfo.character}</td>
                <td>{result.eliminated}</td>
                <td>{result.wineCategory}</td>
                <td>{result.totalSum}</td>
            </tr>
            )
        )
        return (
        <ElementWrapper wrapperType='FullWidthWrapper'>
            <h4>Vaše hodnotenia vín</h4>
            <table className={classes.ResultsTable}>
                <thead>
                    <tr>
                        {tableHead}
                    </tr>
                </thead>
                <tbody>
                    {results}
                </tbody>
            </table>
        </ElementWrapper>
        );
    }      
};

export default Results;