import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import classes from './EditWineGroups.module.css';
import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../../UI/Button/Button';

const EditWineGroup = props => {
    const wineList = props.wines.map(wine => (
        <tr key={wine._id}>
            <td>{wine.id}</td>
            <td>{wine.competitiveCategory}</td>
            <td>{wine.name}</td>
            <td>{wine.clasification}</td>
            <td>{wine.color}</td>
            <td>{wine.character}</td>
            <td>{wine.producer}</td>
            <td>{wine.vintage}</td>
            <td>
                <select 
                type="select"
                onChange={e => props.getGroup(e, wine._id)}
                defaultValue={props.defaultGroup}
                >
                    {props.groups.map(opt => 
                        <option key={opt._id}
                        id={opt._id}>
                            {opt.groupName}
                        </option>    
                    )}
                </select>
            </td>
        </tr>
    ))
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
                            onClick={() => this.props.sortWine("id")}/>
                        </td>
                        <td>
                            <span>Súťažná kategória</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => this.props.sortWine("competitiveCategory")}/>
                        </td>
                        <td>
                            <span>Názov vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => this.props.sortWine("name")}/>
                        </td>
                        <td>
                            <span>Klasifikácia vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => this.props.sortWine("clasification")}/>
                        </td>
                        <td>
                            <span>Farba vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => this.props.sortWine("color")}/>
                        </td>
                        <td>
                            <span>Charakter vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => this.props.sortWine("character")}/>
                        </td>
                        <td>
                            <span>Výrobca vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => this.props.sortWine("producer")}/>
                        </td>
                        <td>
                            <span>Ročník vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => this.props.sortWine("vintage")}/>
                        </td>
                        <td>Pridaj do skupiny</td>
                    </tr>
                </thead>
                <tbody>
                    {wineList}
                </tbody>
            </table>
            <Button>Ulož</Button>
        </ElementWrapper>
    )
}

export default EditWineGroup;