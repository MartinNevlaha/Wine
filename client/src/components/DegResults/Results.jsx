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
            <td>
                <span>{head}</span>
                <FontAwesomeIcon 
                icon={faSort}
                cursor="pointer"/>
            </td>);
        })
        return (
        <ElementWrapper wrapperType='FullWidthWrapper'>
            <h4>Vaše hodnotenia vín</h4>
            <table className={classes.ResultsTable}>
                <thead>
                    {tableHead}
                </thead>
                <tbody>

                </tbody>
            </table>
        </ElementWrapper>
        );
    }      
};

export default Results;