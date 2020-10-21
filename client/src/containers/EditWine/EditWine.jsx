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
                competitiveCategory: {
                    labelName: 'Súťažná kategória',
                    inputType: 'text',
                    placeholder: 'Súťažná kategória',
                    value: '',
                    valid: false
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
                clasification: {
                    labelName: 'Klasifikácia',
                    inputType: "select",
                    placeholder: "",
                    options: ["tiché", "šumivé"],
                    value: 'tiché'
                },
                color: {
                    labelName: "Farba vína",
                    inputType: "select",
                    placeholder: "",
                    options: ["Červené", "Biele", "Ružové"],
                    value: 'Červené'
                },
                character: {
                    labelName: "Charakter vína",
                    inputType: "select",
                    placeholder: "",
                    options: ["Suché", "Polosuché", "Polosladké", "Sladké", "Ostatné"],
                    value: 'Suché'
                }
            },
            isModalShow: false,
            isDtbDeletePress: false,
            deleteDbID: '',
            searchBar: {
                header: 'Číslo vína',
                headerStateName: 'id',
                searchValue: '',
                searchBarOpt: ["Číslo vína", "Súťažná kategória","Názov vína", "Klasifikácia", "Farba vína", "Charakter vína", "Výrobca vína", "Ročník vína", ],
                searchBarStateNames: ["id", 'competitiveCategory','name', 'clasification','color', 'character', 'producer', 'vintage', ]
            },
            importWineList: {
                length: null,
                wineListData: []
            }
        }    
    }
    componentDidMount() {
        this.props.onFetchWineList(this.props.token);
        this.props.onFetchSystemSettings(this.props.token);
    }

    componentDidUpdate(prevProps) {
        if (this.props.wineList.isAddWineSucces !== prevProps.wineList.isAddWineSucces) {
            this.setState(this.initialState);
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
            competitiveCategory: this.state.inputs.competitiveCategory.value,
            name: this.state.inputs.name.value,
            producer: this.state.inputs.producer.value,
            vintage: +this.state.inputs.vintage.value,
            clasification: this.state.inputs.clasification.value,
            color: this.state.inputs.color.value,
            character: this.state.inputs.character.value,
        }
        this.props.onAddWine(data, this.props.token)
    }
    deleteWineHandler = (_id) => {
        const oldWineList = this.props.wineList.wine;
        const newWineList = oldWineList.filter(wine => !(wine._id === _id))
        this.props.onDeleteWine(_id, newWineList, this.props.token)
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
                competitiveCategory: importedWinelist[key][1],
                name: importedWinelist[key][2],
                clasification: importedWinelist[key][3],
                color: importedWinelist[key][4],
                character: importedWinelist[key][5],
                producer: importedWinelist[key][6],
                vintage: +importedWinelist[key][7]
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
        this.props.onDatabaseImport(this.state.importWineList.wineListData, this.props.token)
    }
    databaseDeleteHandler = () => {
        this.props.onDatabaseDelete(this.props.token)
    }
    render () {
        console.log(this.props.isDegustationOpen)
        let modalContent =
        <React.Fragment>
            <p>Ste si istý ?</p>
            <div>
                <Button clicked={this.toggleModalHandler}>Nie</Button>
                <Button clicked={
                    !this.state.isDtbDeletePress ? 
                    () => this.deleteWineHandler(this.state.deleteDbID)
                    : this.databaseDeleteHandler}>Ano</Button>
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
                {this.props.isDegustationOpen && <p>Otvorena</p>}
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
                token={this.props.token}
                colorOptions={this.state.inputs.color.options}
                characterOptions={this.state.inputs.character.options}
                clasificationOptions={this.state.inputs.clasification.options}
                sortWine={this.props.onSortWineBy}
                />
                <Back />
            </ElementWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        wineList: state.wineList,
        token: state.adminAuth.token,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddWine: (data, token) => dispatch(action.addWine(data, token)),
        onFetchWineList: (token) => dispatch(action.fetchWineList(token)),
        onDeleteWine: (idDb, updatedWineList, token) => dispatch(action.deleteWine(idDb, updatedWineList, token)),
        onEditWine: (choosenWineData) => dispatch(action.editWine(choosenWineData)),
        onSaveEditWine: (idDb, index, editedWineData, token) => dispatch(action.saveEditWine(idDb, index, editedWineData, token)),
        onSortWineBy: (sortByProp) => dispatch(action.sortWineBy(sortByProp)),
        onDatabaseDelete: (token) => dispatch(action.databaseDelete(token)),
        onDatabaseImportInit: () => dispatch(action.databaseImportInit()),
        onDatabaseImport: (wineList, token) => dispatch(action.databaseImport(wineList, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWine); 