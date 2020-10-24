import React from 'react';

import classes from './ResultsTable.module.css';

const ResultsTable = props => {
    return (
        <table className={classes.TableResult}>
            <thead>
                <tr>
                {props.tableHeads.map(th => 
                    <td key={th}>
                        {th}
                    </td>
                )}
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )
}

export default ResultsTable;