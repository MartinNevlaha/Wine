import React, { Component } from 'react';

import classes from './Results.module.css';
import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';

class Results extends Component {
    state = {
        tableHeadNames: ['Číslo vína', 'Farba vína', 'Charakter vína', 'Eliminované', 'Kategória vína', 'Celkový súčet'],

    }

    render() {
        const tableHead = this.state.tableHeadNames.map((head, index)=>{
            return (
            <td key={index}>
                <span>{head}</span>
            </td>);
        })
        let results = this.props.results.map(result => (
            <tr 
            onClick={() => this.props.fetchDetailResult(result._id, this.props.token)}
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
        <ElementWrapper wrapperType='ResulWrapper'>
            <h4>Vaše hodnotenia vín</h4>
            <table className={classes.ResultsTable}>
                <thead>
                    <tr>
                        {tableHead}
                    </tr>
                </thead>
                <tbody className={classes.ResultsTableBody}>
                    {results}
                </tbody>
            </table>
        </ElementWrapper>
        );
    }      
};

export default Results;