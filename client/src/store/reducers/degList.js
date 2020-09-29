import * as actionTypes from '../actions/actionTypes';

import { updateObj } from '../../shared/utility';
import updateArray from 'react-addons-update';

const initialState = {
    degustators: [],
    loadingAddDeg: false,
    isAddDegSucces: false,
    loading: false,
    isDeletingDb: false,
    isImportingDb: false,
    sortAmountUp: true,
    isDeletingDeg: false,
};

const addDegStart = (state, action) => {
    return updateObj(state, {
        loadingAddDeg: true,
        isAddDegSucces: false
    })
};

const addDegSucces = (state, action) => {
    const newDeg = updateObj(action.degData, {
        _id: action._id,
    });
    return updateObj(state, {
        degustators: state.degustators.concat( newDeg ),
        loadingAddDeg: false,
        isAddDegSucces: true
    });
};

const addDegFailled = (state, action) => {
    return updateObj(state, {
        loadingAddDeg: false,
        isAddDegSucces: false
    })
};

const databaseDegDeleteInit = (state, action) => {
    return updateObj(state, {isDeletingDb: true});
};

const databaseDegDeleteCanceled = (state, action) => {
    return updateObj(state, {isDeletingDb: false});
};

const databaseDegDeleteStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        isDeletingDb: false
    });
};

const databaseDegDeleteSucces = (state, action) => {
    return updateObj(state, {
        degustators: [],
        loading: false,
    });
};

const databaseDegDeleteFail = (state, action) => {
    return updateObj(state, {loading: false});
};

const databaseDegImportInit = (state, action) => {
    return updateObj(state, {isImportingDb: true})
};

const databaseDegImportCanceled = (state, action) => {
    return updateObj(state, {isImportingDb: false})
};

const databaseDegImportStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        isImportingDb: false
    })
};

const databaseDegImportSucces = (state, action) => {
    return updateObj(state, {
        degustators: action.degData,
        loading: false,
    });
};

const databaseDegImportFailled = (state, action) => {
    return updateObj(state, {loading: false});
};

const fetchDegListStart = (state, action) => {
    return updateObj(state, {loading: true});
};

const fetchDegListSucces = (state, action) => {
    return updateObj(state, {
        degustators: action.degData,
        loading: false
    });
};

const fetchDeglistFailled = (state, action) => {
    return updateObj(state, {loading: false})
};

const sortDegBy = (state, action) => {
    const sortBy = action.sortByProp;
    let sortedDeglist = [];
    state.sortAmountUp ? sortedDeglist = [...state.degustators].sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1 )
    : sortedDeglist = [...state.degustators].sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : -1 )
    return updateObj(state, {
        sortAmountUp: !state.sortAmountUp,
        degustators: sortedDeglist
    });
};

const editDeg = (state, action) => {
    const index = state.degustators.indexOf(action.chossenDegData);
    return updateArray(state, {
        degustators: {
            [index]: {
                isEditable: {$set: !action.chossenDegData.isEditable}
            }
        }
    });
};

const saveEditDegStart = (state, action) => {
    return updateObj(state, {loading: true});
};

const saveEditDegSucces = (state, action) => {
    return updateArray(state, {
        loading: {$set: false},
        degustators: {
            [action.index]: {$set: action.editedDegData}
        }
    });
};

const saveEditDegFailled = (state, action) => {
    return updateObj(state, {loading: false});
};

const deleteDegInit = (state, action) => {
    return updateObj(state, {isDeletingDeg: true});
};

const deleteDegCanceled = (state, action) => {
    return updateObj(state, {isDeletingDeg: false})
};

const deleteDegStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        isDeletingDeg: false
    });
};

const deleteDegSucces = (state, action) => {
    return updateObj(state, {
        loading: false,
        isDeletingDeg: false,
        degustators: action.degListData
    });
};

const deleteDegFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        isDeletingDeg: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_DEGUSTATOR_START:
            return addDegStart(state, action);
        case actionTypes.ADD_DEGUSTATOR_SUCCES:
            return addDegSucces(state, action);
        case actionTypes.ADD_DEGUSTATOR_FAIL:
            return addDegFailled(state, action);
        case actionTypes.DATABASE_DEG_DELETE_INIT:
            return databaseDegDeleteInit(state, action);
        case actionTypes.DATABASE_DEG_DELETE_CANCELED:
            return databaseDegDeleteCanceled(state, action);
        case actionTypes.DATABASE_DEG_DELETE_START:
            return databaseDegDeleteStart(state, action);
        case actionTypes.DATABASE_DEG_DELETE_SUCCES:
            return databaseDegDeleteSucces(state, action);
        case actionTypes.DATABASE_DEG_DELETE_FAIL:
            return databaseDegDeleteFail(state, action);
        case actionTypes.DATABASE_DEG_IMPORT_INIT:
            return databaseDegImportInit(state, action);
        case actionTypes.DATABASE_DEG_IMPORT_CANCELED:
            return databaseDegImportCanceled(state, action);
        case actionTypes.DATABASE_DEG_IMPORT_START:
            return databaseDegImportStart(state, action);
        case actionTypes.DATABASE_DEG_IMPORT_SUCCES:
            return databaseDegImportSucces(state, action);
        case actionTypes.DATABASE_DEG_IMPORT_FAIL:
            return databaseDegImportFailled(state, action);
        case actionTypes.FETCH_DEGLIST_START:
            return fetchDegListStart(state, action);
        case actionTypes.FETCH_DEGLIST_SUCCES:
            return fetchDegListSucces(state, action);
        case actionTypes.FETCH_DEGLIST_FAIL:
            return fetchDeglistFailled(state, action);
        case actionTypes.SORT_DEG_BY:
            return sortDegBy(state, action);
        case actionTypes.EDIT_DEG:
            return editDeg(state, action);
        case actionTypes.SAVE_EDIT_DEG_START:
            return saveEditDegStart(state, action);
        case actionTypes.SAVE_EDIT_DEG_SUCCES:
            return saveEditDegSucces(state, action);
        case actionTypes.SAVE_EDIT_DEG_FAIL:
            return saveEditDegFailled(state, action);
        case actionTypes.DELETE_DEG_INIT:
            return deleteDegInit(state, action);
        case actionTypes.DELETE_DEG_CANCELED:
            return deleteDegCanceled(state, action);
        case actionTypes.DELETE_DEG_START:
            return deleteDegStart(state, action);
        case actionTypes.DELETE_DEG_SUCCES:
            return deleteDegSucces(state, action);
        case actionTypes.DELETE_DEG_FAIL:
            return deleteDegFailled(state, action);
        default:
            return state;
    };
};

export default reducer;