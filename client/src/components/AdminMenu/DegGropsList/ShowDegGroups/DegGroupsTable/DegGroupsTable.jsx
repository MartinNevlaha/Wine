import React from 'react';

import classes from './DegGroupsTable.module.css';

const DegGroupsTable = props => {
    const degustator = props.group.items.map(deg => {
        return (
        <tr key={deg.id}>
            <td>{deg.id}</td>
            <td>{deg.name}</td>
            <td>{deg.surname}</td>
        </tr>
        )
    })
    return (
    <div className={classes.GroupsContainer}>
        <h4>Skupina {props.group.groupName}</h4>
        <table>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Meno</td>
                    <td>Priezvysko</td>
                </tr>
            </thead>
            <tbody>
                {degustator}
            </tbody>
        </table>
    </div>
    )
};


export default DegGroupsTable;