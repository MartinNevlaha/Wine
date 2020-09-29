import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddDbElement from '../../components/AdminMenu/AddDbElement/AddDbElement';
import Button from '../../components/UI/Button/Button';
import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import EditAddedWine from '../../components/AdminMenu/WineList/EditWine/EditAddedWine/EditAddedWine';
import * as action from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';
import DatabaseEdit from '../../components/AdminMenu/DatabaseEdit/DatabaseEdit';
import { searchIdetificator } from '../../shared/utility';
import Back from '../../components/UI/Back/Back';
import {
    isIdValid,
    isString,
    isVintageValid
} from '../../shared/validations';

class EditWine extends Component {
    constructor (props) {
        super(props);
        this.state = this.initialState;
    }
    get initialState() {
        return {
            componentName: "AddWine",
            inputs: {
                id: {
                    labelName: "Číslo vína",
                    inputType: "number",
                    placeholder: "Číslo vína",
                    value: '',
                    valid: false,
                },
                name: {
                    labelName: "Názov vína",
                    inputType: "text",
                    placeholder: "Názov vína",
                    value: '',
                    valid: false,
                },
                producer: {
                    labelName: "Výrobca vína",
                    inputType: "text",
                    placeholder: "Výrobca vína",
                    value: '',
                    valid: false,
                },
                vintage: {
                    labelName: "Ročník vína",
                    inputType: "number",
                    placeholder: "Ročník vína",
                    value: '',
                    valid: false,
                },
                color: {
                    labelName: "Farba vína",
                    inputType: "select",
                    placeholder: "",
                    options: ["Červené", "Biele"],
                    value: 'Červené',
                },
                character: {
                    labelName: "Charakter vína",
                    inputType: "select",
                    placeholder: "",
                    options: ["Suché", "Polosuché", "Polosladké", "Sladké"],
                    value: 'Suché',
                }
            },
            isModalShow: false,
            isDtbDeletePress: false,
            deleteDbID: '',
            searchBar: {
                header: 'Číslo vína',
                headerStateName: 'id',
                searchValue: '',
                searchBarOpt: ["Číslo vína", "Názov vína", "Farba vína", "Charakter vína", "Výrobca vína", "Ročník vína", ],
                searchBarStateNames: ["id", 'name', 'color', 'character', 'producer', 'vintage', ]
            },
            importWineList: {
                length: null,
                wineListData: []
            }
        }    
    }
    componentDidMount() {
        this.props.onFetchWineList();
    }
    componentDidUpdate(prevProps) {
        if (this.props.wineList.isAddWineSucces !== prevProps.wineList.isAddWineSucces) {
            this.setState(this.initialState);
            console.log('add')
        } else if (this.props.wineList.isDeleteDbInProces !== prevProps.wineList.isDeleteDbInProces) {
            this.setState(this.initialState)
        }
    }
    //id, name, producer, vintage

    validationInput = (key, value) => {
        if (key === 'id') {
            return isIdValid(value)
        } else if (key === 'vintage') {
            return isVintageValid(value)
        } else {
            return isString(value); 
        }
    }

    getValueHandler = (e, key) => {
        this.setState({
            ...this.state,
            inputs: {
                ...this.state.inputs,
            [key]: {
                ...this.state.inputs[key],
                value: e.target.value,
                valid: this.validationInput(key, e.target.value)
            }
            }
        })
    }
    addWineHandler = () => {
        const data = {
            id: +this.state.inputs.id.value,
            name: this.state.inputs.name.value,
            producer: this.state.inputs.producer.value,
            vintage: +this.state.inputs.vintage.value,
            color: this.state.inputs.color.value,
            character: this.state.inputs.character.value,
            //isEditable: false
        }
        this.props.onAddWine(data)
    }
    deleteWineHandler = (_id) => {
        const oldWineList = this.props.wineList.wine;
        const newWineList = oldWineList.filter(wine => !(wine._id === _id))
        this.props.onDeleteWine(_id, newWineList)
        this.toggleModalHandler();
    }
    deleteWineStartHandler = (_id) => {
        this.setState({ 
            deleteDbID: _id
        })
        this.toggleModalHandler();
    }
    toggleModalHandler = () => {
        this.setState({ 
            isModalShow: !this.state.isModalShow,
        })
        
    }
    editWineHandler = (_id) => {
        const wineList = [...this.props.wineList.wine]
        const choosenWineData = wineList.filter(wine => wine._id === _id)[0];
        this.props.onEditWine(choosenWineData)
    }
    getSearchHeaderValue = (e) => {
        const [chossedHeader, chossenHeadId] = searchIdetificator(e, this.state.searchBar.searchBarOpt, this.state.searchBar.searchBarStateNames)
        this.setState({
            ...this.state,
            searchBar: {
                ...this.state.searchBar,
                header: chossedHeader,
                headerStateName: chossenHeadId
            }
        })
    };
    getSearchValue = (e) => {
        this.setState({
            ...this.state,
            searchBar: {
                ...this.state.searchBar,
                searchValue: e.target.value
            }
        })
    }
    resetDbHandler = () => {
        this.toggleModalHandler();
        this.setState({isDtbDeletePress: true})
    }
    importDbHandler = (importedWinelist) => {
        const wineListLength = importedWinelist.length;
        const wineList = [];
        for (let key in importedWinelist) {
            let wine = {
                id: +importedWinelist[key][0],
                name: importedWinelist[key][1],
                color: importedWinelist[key][2],
                character: importedWinelist[key][3],
                producer: importedWinelist[key][4],
                vintage: +importedWinelist[key][5]
            }
            wineList.push(wine);
        }
        this.setState({
            ...this.state,
            isModalShow: true,
            importWineList: {
                ...this.state.importWineList,
                wineListData: wineList,
                length: wineListLength
            }
        })
        this.props.onDatabaseImportInit();
    }
    sendImportedWineList = () => {
        this.toggleModalHandler();
        this.props.onDatabaseImport(this.state.importWineList.wineListData)
    }
    render () {
        let modalContent =
        <React.Fragment>
            <p>Ste si istý ?</p>
            <div>
                <Button clicked={this.toggleModalHandler}>Nie</Button>
                <Button clicked={
                    !this.state.isDtbDeletePress ? 
                    () => this.deleteWineHandler(this.state.deleteDbID)
                    : this.props.onDatabaseDelete}>Ano</Button>
            </div>
        </React.Fragment>;
        if (this.props.wineList.importingDb) {
            modalContent = (
                <React.Fragment>
                    <p>Do databázy importujete {this.state.importWineList.length} vín.</p>
                    <p>Predchádzajúca databáza bude vymazaná !</p>
                    <p>Chcete pokračovať ?</p>
                    <Button clicked={this.toggleModalHandler}>Nie</Button>
                    <Button clicked={this.sendImportedWineList}>Áno</Button>
                </React.Fragment>
            );
        }
        
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                <Modal
                closeModal={this.toggleModalHandler} 
                show={this.state.isModalShow}>
                    {modalContent}
                </Modal>
                <AddDbElement 
                componentType={this.state.componentName}
                inputs={this.state.inputs}
                loadingSend={this.props.wineList.loadingSend}
                add={this.addWineHandler}
                getValueHandler={this.getValueHandler}
                disabled={!(this.state.inputs.id.valid && this.state.inputs.name.valid 
                    && this.state.inputs.producer.valid && this.state.inputs.vintage.valid)}
                />
                <DatabaseEdit 
                importDbHandler={this.importDbHandler}
                resetDb={this.resetDbHandler}
                isImportingDb={this.props.wineList.importingDb}
                />
                <EditAddedWine 
                headerStateName={this.state.searchBar.headerStateName}
                searchBarOpt={this.state.searchBar.searchBarOpt}
                getSearchValue={this.getSearchValue}
                searchValue={this.state.searchBar.searchValue}
                getHeadValue={this.getSearchHeaderValue}
                headerValue={this.state.searchBar.header}
                wineList={this.props.wineList.wine}
                loading={this.props.wineList.loading}
                isEditSaveSucces={this.props.wineList.isEditSaveSucces}
                deleteStart={this.deleteWineStartHandler}
                edit={this.editWineHandler}
                save={this.props.onSaveEditWine}
                colorOptions={this.state.inputs.color.options}
                characterOptions={this.state.inputs.character.options}
                sortWine={this.props.onSortWineBy}
                />
                <Back />
            </ElementWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        wineList: state.wineList
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddWine: (data) => dispatch(action.addWine(data)),
        onFetchWineList: () => dispatch(action.fetchWineList()),
        onDeleteWine: (idDb, updatedWineList) => dispatch(action.deleteWine(idDb, updatedWineList)),
        onEditWine: (choosenWineData) => dispatch(action.editWine(choosenWineData)),
        onSaveEditWine: (idDb, index, editedWineData) => dispatch(action.saveEditWine(idDb, index, editedWineData)),
        onSortWineBy: (sortByProp) => dispatch(action.sortWineBy(sortByProp)),
        onDatabaseDelete: () => dispatch(action.databaseDelete()),
        onDatabaseImportInit: () => dispatch(action.databaseImportInit()),
        onDatabaseImport: (wineList) => dispatch(action.databaseImport(wineList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWine); 