import React, { Component } from 'react';
import { connect } from 'react-redux';

import ElementWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import AddDbElement from '../../components/AdminMenu/AddDbElement/AddDbElement';
import DatabaseEdit from '../../components/AdminMenu/DatabaseEdit/DatabaseEdit';
import * as action from '../../store/actions/index';
import Back from '../../components/UI/Back/Back';
import DeleteDesision from '../../components/AdminMenu/DeleteDesision/DeleteDesision';
import ImportDesision from '../../components/AdminMenu/ImportDesision/ImportDesision';
import EditAddedDeg from '../../components/AdminMenu/DegustatorList/EditDegustator/EditAddedDegustator/EditAddedDegustator';
import { searchIdetificator } from '../../shared/utility';
import {
    isIdValid, 
    isString
} from '../../shared/validations';

class EditDegustator extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }
    get initialState() {
        return {
            componentName: 'AddDegustator',
            inputs: {
                degustatorId: {
                    labelName: 'Číslo degustátora',
                    inputType: 'number',
                    placeholder: "Číslo degustátora",
                    value: '',
                    valid: false,
                },
                name: {
                    labelName: 'Meno',
                    inputType: 'text',
                    placeholder: "Meno degustátora",
                    value: '',
                    valid: false,
                },
                surname: {
                    labelName: 'Priezvysko',
                    inputType: 'text',
                    placeholder: 'Priezvysko degustátora',
                    value: '',
                    valid: false,
                }
            },
            importDegList: {
                length: null,
                degListData: []
            },
            searchBar: {
                header: 'Číslo degustátora',
                headerStateName: 'id',
                searchValue: '',
                searchBarOpt: ["Číslo degustátora", "Meno", 'Priezvysko'],
                searchBarStateNames: ["id", "name", "surname"],
            },
            deleteDbId: ''
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.degList.isAddDegSucces !== prevProps.degList.isAddDegSucces) {
            this.setState(this.initialState);
        } else if (this.props.degList.isDeletingDb !== prevProps.degList.isDeletingDb) {
            this.setState(this.initialState);
        }
    }

    componentDidMount() {
        this.props.onFetchDegList(this.props.token);
    }

    validationHandler(key, value) {
        if (key === "degustatorId") {
           return isIdValid(value);
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
                    valid: this.validationHandler(key, e.target.value)
                }
            }
        })
    }

    addDegustatorHandler = () => {
        const degData = {
            id: +this.state.inputs.degustatorId.value,
            name: this.state.inputs.name.value,
            surname: this.state.inputs.surname.value,
            isEditable: false
        }
        this.props.onAddDegustator(degData, this.props.token)
    }

    importDbHandler = (importedDegList) => {
        const degListLength = importedDegList.length;
        const degList = [];
        for (let key in importedDegList) {
            let deg = {
                id: +importedDegList[key][0],
                name: importedDegList[key][1],
                surname: importedDegList[key][2],
            }
            degList.push(deg);
        }
        this.setState({
            ...this.state,
            importDegList: {
                ...this.state.importDegList,
                length: degListLength,
                degListData: degList
            }
        })
        this.props.onDatabaseDegImportInit();
    }
    sendImportedDataHandler = () => {
        const data = this.state.importDegList.degListData;
        this.props.onDatabaseDegImport(data, this.props.token);
    }
    getSearchValueHandler = (e) => {
        this.setState({
            ...this.state,
            searchBar: {
                ...this.state.searchBar,
                searchValue: e.target.value
            }
        })
    }
    getHeaderValueHandler = (e) => {
        const [chosenHeader, chossenHeadId] = searchIdetificator(e, this.state.searchBar.searchBarOpt, this.state.searchBar.searchBarStateNames);
        this.setState({
            ...this.state,
            searchBar: {
                ...this.state.searchBar,
                header: chosenHeader,
                headerStateName: chossenHeadId
            }
        })
    }
    editDegHandler = (_id) => {
        const degList = [...this.props.degList.degustators];
        const chossenDegData = degList.filter(deg => deg._id === _id)[0];
        this.props.onEditDeg(chossenDegData);
    }
    deleteDegHandler = (_id) => {
        this.setState({
            deleteDbId: _id
        })
        this.props.onDeleteDegInit();
    }
    deleteDegConfirmHandler = () => {
        const oldDegList = this.props.degList.degustators;
        const newDegList = oldDegList.filter(deg => !(deg._id === this.state.deleteDbId))
        this.props.onDeleteDeg(this.state.deleteDbId, newDegList, this.props.token);
        this.setState(this.initialState);
    }
    render() {
        let modal = <DeleteDesision 
            show={this.props.degList.isDeletingDb}
            closeModal={this.props.onDatabaseDegDeleteCanceled}
            canceled={this.props.onDatabaseDegDeleteCanceled}
            submit={this.props.onDatabaseDegDelete}
            token={this.props.token}
            />;
        if (this.props.degList.isImportingDb) {
            modal = <ImportDesision 
            show={true}
            closeModal={this.props.onDatabaseDegImportCanceled}
            canceled={this.props.onDatabaseDegImportCanceled}
            numberOfItems={this.state.importDegList.length}
            submit={this.sendImportedDataHandler}
            />
        } else if (this.props.degList.isDeletingDeg) {
            modal = <DeleteDesision 
            show={this.props.degList.isDeletingDeg}
            closeModal={this.props.onDeleteDegCanceled}
            canceled={this.props.onDeleteDegCanceled}
            submit={this.deleteDegConfirmHandler}
            />;
        }
        return (
            <ElementWrapper wrapperType="ElementWrapper">
                {modal}
                <AddDbElement 
                componentType={this.state.componentName}
                inputs={this.state.inputs}
                getValueHandler={this.getValueHandler}
                loadingSend={this.props.degList.loadingAddDeg}
                add={this.addDegustatorHandler}
                disabled={!(this.state.inputs.degustatorId.valid && this.state.inputs.name.valid && this.state.inputs.surname.valid)}
                />
                <DatabaseEdit 
                importDbHandler={this.importDbHandler}
                resetDb={this.props.onDatabaseDegDeleteInit}/>
                <EditAddedDeg 
                searchBarOpt={this.state.searchBar.searchBarOpt}
                headerStateName={this.state.searchBar.headerStateName}
                getSearchValue={this.getSearchValueHandler}
                searchValue={this.state.searchBar.searchValue}
                getHeadValue={this.getHeaderValueHandler}
                headerValue={this.state.searchBar.header}
                degustators={this.props.degList.degustators}
                sortDeg={this.props.onSortDegBy}
                edit={this.editDegHandler}
                save={this.props.onSaveEditDeg}
                token={this.props.token}
                delete={this.deleteDegHandler}
                loading={this.props.degList.loading}
                />
                <Back />
            </ElementWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        degList: state.degList,
        token: state.adminAuth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddDegustator: (degData, token) => dispatch(action.addDegustator(degData, token)),
        onDatabaseDegDelete: (token) => dispatch(action.databaseDegDelete(token)),
        onDatabaseDegDeleteInit: () => dispatch(action.databaseDegDeleteInit()),
        onDatabaseDegDeleteCanceled: () => dispatch(action.databaseDegDeleteCanceled()),
        onDatabaseDegImportInit: () => dispatch(action.databaseDegImportInit()),
        onDatabaseDegImportCanceled: () => dispatch(action.databaseDegImportCanceled()),
        onDatabaseDegImport: (degData, token) => dispatch(action.databaseDegImport(degData, token)),
        onFetchDegList: (token) => dispatch(action.fetchDegList(token)),
        onSortDegBy: (prop) => dispatch(action.sortDegBy(prop)),
        onEditDeg: (chossenDegData) => dispatch(action.editDeg(chossenDegData)),
        onSaveEditDeg: (_id, index, editedDegData, token) => dispatch(action.saveEditDeg(_id, index, editedDegData, token)),
        onDeleteDegInit: () => dispatch(action.deleteDegInit()),
        onDeleteDegCanceled: () => dispatch(action.deleteDegCanceled()),
        onDeleteDeg: (_id, updatedDegList, token) => dispatch(action.deleteDeg(_id, updatedDegList, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDegustator);