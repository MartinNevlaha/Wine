import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCheck } from '@fortawesome/free-solid-svg-icons';

import classes from './EditWineGroups.module.css';
import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../../UI/Button/Button';

const EditWineGroup = props => {
    let tableHead = null;
    if (props.isDegustationOpen) {
        tableHead = 
            <React.Fragment>
                <td>Pridaj do skupiny</td>
                {!props.isGroupEdited && <td>Kontrola</td>}
            </React.Fragment>;
    }
    const wineList = props.wines.map(wine => {
        let addGroup = null;
        if (props.isDegustationOpen) {
            addGroup = 
                <React.Fragment>
                    {props.isGroupEdited ?
                    <td>
                        <select 
                        type="select"
                        onChange={e => props.getGroup(e, wine._id)}>
                            {props.groups.map(opt => 
                                <option key={opt._id}
                                id={opt._id}>
                                    {opt.groupName}
                                </option>    
                            )}
                        </select>
                    </td>
                    :<td>
                    <select 
                    type="select"
                    onChange={e => props.getGroup(e, wine._id)}
                    defaultValue={wine.group.groupName}>
                        {props.groups.map(opt => 
                            <option key={opt._id}
                            id={opt._id}>
                                {opt.groupName}
                            </option>    
                        )}
                    </select>
                    </td>}
                    {!props.isGroupEdited && 
                    <td>
                        <FontAwesomeIcon 
                        icon={faCheck}/>
                    </td>}
        
                </React.Fragment>
        }
        return (
        <tr key={wine._id}>
            <td>{wine.id}</td>
            <td>{wine.competitiveCategory}</td>
            <td>{wine.name}</td>
            <td>{wine.clasification}</td>
            <td>{wine.color}</td>
            <td>{wine.character}</td>
            <td>{wine.producer}</td>
            <td>{wine.vintage}</td>
            {addGroup}
        </tr>
            
    )})
    return (
        <ElementWrapper wrapperType='FullWidthWrapper'>
            <h4>Priradenie vín do degustačných skupín</h4>
            <table className={classes.ShowWines}>
                <thead>
                    <tr>
                        <td>
                            <span>Číslo vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => props.sortWineGroups("id")}/>
                        </td>
                        <td>
                            <span>Súťažná kategória</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => props.sortWineGroups("competitiveCategory")}/>
                        </td>
                        <td>
                            <span>Názov vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => props.sortWineGroups("name")}/>
                        </td>
                        <td>
                            <span>Klasifikácia vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => props.sortWineGroups("clasification")}/>
                        </td>
                        <td>
                            <span>Farba vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => props.sortWineGroups("color")}/>
                        </td>
                        <td>
                            <span>Charakter vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => props.sortWineGroups("character")}/>
                        </td>
                        <td>
                            <span>Výrobca vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => props.sortWineGroups("producer")}/>
                        </td>
                        <td>
                            <span>Ročník vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => props.sortWineGroups("vintage")}/>
                        </td>
                        {tableHead}
                    </tr>
                </thead>
                <tbody>
                    {wineList}
                </tbody>
            </table>
            {props.isDegustationOpen &&
            <Button 
            clicked={props.save}
            disabled={props.isGroupEdited}>Ulož</Button>
            }
        </ElementWrapper>
    )
}

export default EditWineGroup;