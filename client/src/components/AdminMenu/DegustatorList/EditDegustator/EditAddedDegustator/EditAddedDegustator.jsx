import React from 'react'
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSort, 
    faEdit, 
    faTrash, 
    faCheck
} from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../../../hoc/ElementWrapper/ElementWrapper';
import SearchBar from '../../../../SearchBar/SearchBar';
import classes from './EditAddedDegustator.module.css';
import { searchFilter } from '../../../../../shared/utility';
import Spinner from '../../../../UI/Spinner/Spinner';


class EditAddedDegustator extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState
    }
    get initialState() {
        return {
            id: '',
            idTouch: false,
            name: '',
            nameTouch: false,
            surname: '',
            surnameTouch: false
        }
    }
    getValueHandler = (e, inputName) => {
        let valueStatus = inputName + "Touch";
        this.setState({
            [inputName]: e.target.value,
            [valueStatus]: true
        })
    }
    saveEditHandler = (_id) => {
        this.props.edit(_id)
        const chosenDeg = this.props.degustators.filter(deg => deg._id === _id)[0];
        const index = this.props.degustators.indexOf(chosenDeg);
        const editedDedData = {...this.state};
        for (let key in editedDedData) {
            if (editedDedData[key] === false) {
                const notEdited = key.toString().replace('Touch', '');
                editedDedData[notEdited] = chosenDeg[notEdited];
            }
        };
        const sendData = {
            id: +editedDedData.id,
            name: editedDedData.name,
            surname: editedDedData.surname
        }
        this.props.save(_id, index, sendData)
        this.setState(this.initialState);
    }
    render() {
        let filteredDegList = this.props.degustators;
        if (this.props.searchValue !== '' && filteredDegList) {
            filteredDegList = searchFilter(this.props.degustators, this.props.headerStateName, this.props.searchValue);
        }
        const degList = filteredDegList.map(deg => {
            if (!deg.isEditable) {
                return (
                    <tr key={deg._id}>
                        <td>{deg.id}</td>
                        <td>{deg.name}</td>
                        <td>{deg.surname}</td>
                        <td>
                            <FontAwesomeIcon
                            icon={faEdit}
                            cursor='pointer'
                            onClick={()=>this.props.edit(deg._id)}
                            />
                        </td>
                        <td>
                            <FontAwesomeIcon
                            icon={faTrash}
                            cursor='pointer'
                            onClick={()=>this.props.delete(deg._id)}
                            />
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={deg._id}>
                        <td>
                            <input 
                            type="number"
                            defaultValue={deg.id}
                            onChange={(e)=> this.getValueHandler(e, 'id')}
                            />
                        </td>
                        <td>
                            <input 
                            type="text"
                            defaultValue={deg.name}
                            onChange={(e)=>this.getValueHandler(e, 'name')}
                            />
                        </td>
                        <td>
                            <input 
                            type="text"
                            defaultValue={deg.surname}
                            onChange={(e)=>this.getValueHandler(e, 'surname')}
                            />
                        </td>
                        <td>
                            <FontAwesomeIcon
                            icon={faCheck}
                            cursor='pointer'
                            onClick={()=>this.saveEditHandler(deg._id)}
                            />
                        </td>
                        <td>
                            <p>EDIT MODE</p>
                        </td>
                    </tr>
                )
            }
        })
        let componentContent = (
        <React.Fragment>
            <h4>Zoznam degustátorov</h4>
            <SearchBar 
            options={this.props.searchBarOpt}
            headerValue={this.props.headerValue}
            getSearchValue={this.props.getSearchValue}
            searchValue={this.props.searchValue}
            getHeadValue={this.props.getHeadValue}
            />
            <table className={classes.EditAddedDegustator}>
            <thead>
                    <tr>
                        <td>
                            <span>Číslo degustátora</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => this.props.sortDeg("id")}/>
                        </td>
                        <td>
                            <span>Meno</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => this.props.sortDeg("name")}/>
                        </td>
                        <td>
                            <span>Priezvysko</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => this.props.sortDeg("surname")}/>
                        </td>
                        <td>Editovať</td>
                        <td>Vymazať</td>
                    </tr>
                </thead>
                <tbody>
                    {degList}
                </tbody>
            </table>
        </React.Fragment>
        );
        if (this.props.loading) {
            componentContent = <Spinner />;
        }
        return (
            <ElementWrapper wrapperType="ScrollWrapper">
                {componentContent}
            </ElementWrapper>

        );
    }
}

export default EditAddedDegustator;