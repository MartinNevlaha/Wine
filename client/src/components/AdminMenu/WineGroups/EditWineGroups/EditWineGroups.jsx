import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import classes from './EditWineGroups.module.css';
import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';

const EditWineGroup = props => {
    
    return (
        <ElementWrapper wrapperType='FullWidthWrapper'>
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
                    
                </tbody>
        </table>
        </ElementWrapper>
    )
}

export default EditWineGroup;