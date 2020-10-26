import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'

import ElemetWrapper from '../../hoc/ElementWrapper/ElementWrapper';
import AddGroups from '../../components/AdminMenu/AddDbElement/AddDbElement';
import {isIdValid} from '../../shared/validations';
import * as action from '../../store/actions/index';
import DegGroups from '../../components/AdminMenu/DegGropsList/DegGroups/DegGroups';
import DegList from '../../components/AdminMenu/DegGropsList/DegList/DegList';
import Button from '../../components/UI/Button/Button';
import Back from '../../components/UI/Back/Back';
import DeleteDesision from '../../components/AdminMenu/DeleteDesision/DeleteDesision';
import Popup from '../../components/UI/Popup/Popup';

class EditDegGruops extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }
    get initialState() {
        return {
            componentName: 'AddGroups',
            inputs: {
                groups: {
                    labelName: 'Vytvor skupiny',
                    inputType: 'number',
                    placeholder: 'Počet skupín',
                    value: '',
                    valid: false
                }
            },
            dragTarget: null
        }
    }

    componentDidMount() {
        this.props.onFetchDegGroups(this.props.token);
    }
    componentDidUpdate(prevProps) {
        if (this.props.degGroups.isDeleteSucces !== prevProps.degGroups.isDeleteSucces) {
            this.props.onFetchDegGroups(this.props.token);
        }
    }

    getValueHandler = (e) => {
        this.setState({
            ...this.state,
            inputs: {
                ...this.state.inputs,
                groups: {
                    ...this.state.groups,
                    value: e.target.value,
                    valid: isIdValid(e.target.value)
                }
            }
        })
    }

    createGroupsHandler = () => {
        const numberOfGroups = this.state.inputs.groups.value;
        const groups = [];
        for ( let i = 0; i < numberOfGroups; i++ ) {
            const group = {
                groupName: String.fromCharCode(65 + i),
                index: i,
                items: [],
                isMinimalised: false
            }
            groups.push(group);
        }
        this.props.onCreateGroups(groups);
    }

    minimalisedHandler = (groupIndex) => {
        const groups = this.props.degGroups.degGroups;
        const minimalisedGroup = groups.filter(group => {
            return group.index === groupIndex;
        })
        const updatedGroup = minimalisedGroup[0];
        this.props.onMinimalisedGroup(updatedGroup)
    }

    dragDegHandler = (dragTarget) => {
        this.setState({dragTarget: dragTarget})
    }

    dropHandler = (id, dropTarget) => {
        if (this.state.dragTarget === 'degList') {
            this.props.onDragDegFromList(id);
            const droppedData = this.props.degGroups.degListGroups.filter(group => group._id === id);
            const updatedGroup = {
                ...this.props.degGroups.degGroups[dropTarget],
                items: this.props.degGroups.degGroups[dropTarget].items.concat(droppedData)
            };
            this.props.onDropDegToGroup(dropTarget, updatedGroup);
        } else {
            const droppedData = (this.props.degGroups.degGroups[this.state.dragTarget].items.filter(group => group._id !== id));
            const draggedData = (this.props.degGroups.degGroups[this.state.dragTarget].items.filter(group => group._id === id));
            const updatedGroup = {
                ...this.props.degGroups.degGroups[dropTarget],
                items: this.props.degGroups.degGroups[dropTarget].items.concat(draggedData)
            };
            this.props.onDropDegToGroup(dropTarget, updatedGroup);
            this.props.onDragDegFromGroup(this.state.dragTarget, droppedData);
        }
    }

    saveDegGroupsHandler = () => {
        const postData = this.props.degGroups.degGroups.map(g => {
            return {
                groupName: g.groupName,
                index: g.index,
                items: g.items.map(item => {
                    return {
                        _id: item._id
                    }
                })
            }
        })
        this.props.onSaveDegGroups(postData, this.props.token);
        this.props.history.goBack();
    }

    deleteGropsHandler = () => {
        this.props.onDeleteGroups(this.props.token)
    }

    render() {
        return (
            <ElemetWrapper wrapperType="ElementWrapper">
                <Back />
                <Popup 
                show={this.props.error}
                message={this.props.error && this.props.error.message}/>
                {!this.props.degGroups.degListGroups.length && 
                !this.props.degGroups.degGroups.length ?
                <div>
                    <h2>Nebol pridaný žiadny degustátor</h2>
                    <p>Najprv pridaj degustátora potom vytvor skupiny</p>
                </div>: 
                <React.Fragment>
                <DeleteDesision 
                show={this.props.degGroups.isDeleting}
                closeModal={this.props.onDeleteGroupsCanceled}
                canceled={this.props.onDeleteGroupsCanceled}
                submit={this.deleteGropsHandler}
                />
                {this.props.degGroups.degListGroups.length ? 
                <React.Fragment>
                    <AddGroups 
                    componentType={this.state.componentName}
                    inputs={this.state.inputs}
                    getValueHandler={this.getValueHandler}
                    disabled={!this.state.inputs.groups.valid}
                    add={this.createGroupsHandler}
                    />
                    <DegList
                    degList={this.props.degGroups.degListGroups}
                    dragDegHandler={this.dragDegHandler}/>
                </React.Fragment>
                : <React.Fragment> 
                    <Button
                    clicked={this.props.onDeleteGroupsInit}>Vymaž skupiny</Button>
                    <Button 
                    clicked={this.saveDegGroupsHandler}
                    >Ulož skupiny</Button>
                </React.Fragment>}
                {this.props.degGroups.degGroups.length ? 
                <ElemetWrapper wrapperType="GroupWrapper">
                    <DegGroups 
                    groupsList={this.props.degGroups.degGroups}
                    minimalisedHandler={this.minimalisedHandler}
                    dropHandler={this.dropHandler}
                    dragDegHandler={this.dragDegHandler}/>
                </ElemetWrapper>
                : null}
                </React.Fragment>
                }
            </ElemetWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        degGroups: state.degGroups,
        error: state.degGroups.error,
        token: state.adminAuth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateGroups: (degGroups) => dispatch(action.createDegGroups(degGroups)),
        onMinimalisedGroup: (updatedGroup) => dispatch(action.minimalisedGroup(updatedGroup)),
        onDragDegFromList: (id) => dispatch(action.dragDegFromList(id)),
        onDropDegToGroup: (index, updatedGroupList) => dispatch(action.dropDegToGroup(index, updatedGroupList)),
        onDragDegFromGroup: (index ,updatedGroupList) => dispatch(action.dragDegFromGroup(index, updatedGroupList)),
        onSaveDegGroups: (data, token) => dispatch(action.saveDegGroups(data, token)),
        onFetchDegGroups: (token) => dispatch(action.fetchDegGroups(token)),
        onDeleteGroupsInit: () => dispatch(action.deleteGroupsInit()),
        onDeleteGroupsCanceled: () => dispatch(action.deleteGroupsCanceled()),
        onDeleteGroups: (token) => dispatch(action.deleteGroups(token))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps) (withRouter(EditDegGruops));