import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faTimes } from '@fortawesome/free-solid-svg-icons';

import classes from './CategoryTable.module.css';

const CategoryTable = props => {
    const tableHead = props.tableHead.map((th, index) => 
    <td key={index}>
        <span>{th}</span>
    </td>
);
let resultsByCat = props.results.map(result =>
    <tr 
    key={result._id} 
    onClick={() => props.clickHandler(result._id, props.token)}
    >
        <td>{result.place}</td>
        <td>{result.id}</td>
        <td>{result.name}</td>
        <td>{result.color} {result.character} {result.clasification}</td>
        <td>{result.producer}</td>
        <td>{result.vintage}</td>
        <td>{result.group.groupName}</td>
        <td>{result.finalResult}</td>
        <td>{result.wineCategory}</td>
        <td><FontAwesomeIcon icon={faTimes} /></td>
    </tr>)
    
    return (
        <table className={classes.CategoryResultsTable}>
        <thead>
            <tr>
                {tableHead}
            </tr>
        </thead>
        <tbody>
            {resultsByCat}
        </tbody>
    </table>
    );
}

export default CategoryTable;