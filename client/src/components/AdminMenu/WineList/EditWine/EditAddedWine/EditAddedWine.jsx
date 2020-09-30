import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEdit, 
    faTrash, 
    faCheck,
    faSort
} from '@fortawesome/free-solid-svg-icons';

import classes from './EditAddedWine.module.css';
import Spinner from '../../../../UI/Spinner/Spinner';
import SearchBar from '../../../../SearchBar/SearchBar';
import ElementWrapper from '../../../../../hoc/ElementWrapper/ElementWrapper';
import { searchFilter } from '../../../../../shared/utility';

class EditAddedWine extends Component {
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
            color: '',
            colorTouch: false,
            character: '',
            characterTouch: false,
            producer: '',
            producerTouch: false,
            vintage: '',
            vintageTouch: false,
        }
    }

    saveEditHandler = (_id) => {
        this.props.edit(_id)
        const choosenWine = this.props.wineList.filter(wine => wine._id === _id)[0];
        const index = this.props.wineList.indexOf(choosenWine);
        const editedWineData = {...this.state};
        for (let key in editedWineData) {
            if (editedWineData[key] === false) {
                const notEditedKey = key.toString().replace("Touch", "");
                editedWineData[notEditedKey] = choosenWine[notEditedKey];                
            }
        };
        const sendData = {
            id: editedWineData.id,
            name: editedWineData.name,
            color: editedWineData.color,
            character: editedWineData.character,
            producer: editedWineData.producer,
            vintage: editedWineData.vintage
        }
        this.props.save(_id, index, sendData, this.props.token);
        this.setState(this.initialState);
    }
    getValueHandler = (e, inputName) => {
        let valueStatus = inputName + 'Touch';
        this.setState({
            [inputName]: e.target.value,
            [valueStatus]: true
        })
    }

    render () {
        let filteredWineList = this.props.wineList;

        if (this.props.searchValue !== '' && filteredWineList) {
            filteredWineList = searchFilter(this.props.wineList, this.props.headerStateName, this.props.searchValue);
        }
        const wineList = filteredWineList.map(wine => {
            if (!wine.isEditable) {
                return (
                    <tr key={wine._id}>
                        <td>{wine.id}</td>
                        <td>{wine.name}</td>
                        <td>{wine.color}</td>
                        <td>{wine.character}</td>
                        <td>{wine.producer}</td>
                        <td>{wine.vintage}</td>
                        <td>
                            <FontAwesomeIcon 
                            icon={faEdit} 
                            cursor='pointer'
                            onClick={()=> this.props.edit(wine._id)}/>
                        </td>
                        <td>
                            <FontAwesomeIcon 
                            icon={faTrash} 
                            cursor='pointer'
                            onClick={()=> this.props.deleteStart(wine._id)}/>
                        </td>
                    </tr>
                )
            } else {
                return (           
                <tr key={wine._id}>
                    <td>
                        <input 
                        type="number"
                        defaultValue={wine.id}
                        onChange={(e) => this.getValueHandler(e, 'id')}
                        />
                    </td>
                    <td>
                    <input 
                        type="text"
                        defaultValue={wine.name}
                        onChange={(e) => this.getValueHandler(e, 'name')}
                        />
                    </td>
                    <td>
                    <select 
                    type="select"
                    onChange={(e) => this.getValueHandler(e, 'color')}
                    defaultValue={wine.color}>
                        {this.props.colorOptions.map(opt=>
                            <option key={opt}>
                                {opt}
                            </option>
                        )}
                    </select>
                    </td>
                    <td>
                    <select 
                    type="select"
                    onChange={(e) => this.getValueHandler(e, 'character')}
                    defaultValue={wine.character}>
                        {this.props.characterOptions.map(opt=>
                            <option key={opt}>
                                {opt}
                            </option>
                        )}
                    </select>
                    </td>
                    <td>
                    <input 
                        type="text"
                        onChange={(e) => this.getValueHandler(e, 'producer')}
                        defaultValue={wine.producer}
                        />
                    </td>
                    <td>
                    <input 
                        type="number"
                        onChange={(e) => this.getValueHandler(e, 'vintage')}
                        defaultValue={wine.vintage}
                        />
                    </td>
                    <td>
                        <FontAwesomeIcon 
                        icon={faCheck} 
                        cursor='pointer'
                        onClick={()=>this.saveEditHandler(wine._id)}/>
                    </td>
                    <td>EDIT MODE</td>
                </tr>);
     
            }
        })
        let componentContent = (
            <React.Fragment>
            <h4>Pridané vína</h4>
            <SearchBar 
            getSearchValue={this.props.getSearchValue}
            searchValue={this.props.searchValue}
            getHeadValue={this.props.getHeadValue}
            headerValue={this.props.headerValue}
            options={this.props.searchBarOpt}/>
            <table className={classes.EditAddedWine}>
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
                            <span>Názov vína</span>
                            <FontAwesomeIcon 
                            icon={faSort}
                            cursor="pointer" 
                            onClick={() => this.props.sortWine("name")}/>
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
                        <td>Editovať</td>
                        <td>Vymazať</td>
                    </tr>
                </thead>
                <tbody>
                    {wineList}
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
    
};

export default EditAddedWine;