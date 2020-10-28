import * as actionTypes from '../actions/actionTypes';
import updateArray from 'react-addons-update';
import { updateObj } from '../../shared/utility';

const initialState = {
    wine: [],
    loadingSend: false,
    loadingFetch: false,
    loadingSaveWine: false,
    loading: false,
    isDeleteDbInProces: false, 
    isAddWineSucces: false,
    sortAmountUp: true,
    importingDb: false,
    error: null
};
const wineListErrorClear = (state, action) => {
    return updateObj(state, {
        error: null
    })
}

const addWineStart = (state, action) => {
    return updateObj(state, { 
        loadingSend: true,
        isAddWineSucces: false,
        error: null
    });
};
const addWineFailed = (state, action) => {
    return updateObj(state, { 
        loadingSend: false,
        isAddWineSucces: false,
        error: action.error
    });
};
const addWineSucces = (state, action) => {
    const newWine = updateObj(action.wineData, {
        _id: action._id,
    });
    return updateObj(state, {
        wine: state.wine.concat( newWine ),
        loadingSend: false,
        isAddWineSucces: true
    });
};
const fetchWineListStart = (state, action) => {
    return updateObj(state, { 
        loadingFetch: true,
        error: null
     });
};
const fetchWineListSucces = (state, action) => {
    return updateObj(state, {
        wine: action.wineListData,
        loadingFetch: false
    });
};
const fetchWineListFailed = (state, action) => {
    return updateObj(state, { 
        loadingFetch: false,
        error: action.error
     })
};
const deleteWineStart = (state, action) => {
    return updateObj(state, { 
        loadingFetch: true,
        error: null
    });
};
const deleteWineSucces = (state, action) => {
    return updateObj(state, { 
        loadingFetch: false,
        wine: action.wineListData,
        error: null
    });
};
const deleteWineFailed = (state, action) => {
    return updateObj(state, { loadingFetch: false, error: null });
};
const editWine = (state, action) => {
    const index = state.wine.indexOf(action.choosenWineData);
    return updateArray(state, {
        wine: {
            [index]: {
                isEditable: {$set: !action.choosenWineData.isEditable }
            }
        }
    });
};
const saveEditWineStart = (state, action) => {
    return updateObj(state, { loadingSaveWine: true, error: null })
}
const saveEditWineSucces = (state, action) => {
    return updateArray(state, {
        loadingSaveWine: {$set: false},
        wine: {
            [action.index]: {$set: action.editedWineData}
        }
    });
};
const saveEditWineFailed = (state, action) => {
    return updateObj(state, { loadingSaveWine: false, error: action.error });
}

const sortWineBy = (state, action) => {
    const sortBy = action.sortByProp;
    let sortedWinelist = [];
    state.sortAmountUp ? sortedWinelist = [...state.wine].sort((a, b) => (a[sortBy] > b[sortBy] ) ? 1 : -1) 
    : sortedWinelist = [...state.wine].sort((a, b) => (a[sortBy] < b[sortBy] ) ? 1 : -1)
    
    return updateObj( state, { 
        sortAmountUp: !state.sortAmountUp,
        wine: sortedWinelist 
    });
};

const databaseDeleteStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        isDeleteDbInProces: true,
        error: null
    });
};
const databaseDeleteSucces = (state, action) => {
    return updateObj(state, {
        loading: false,
        isDeleteDbInProces: false,
        wine: [],
    });
};
const databaseDeleteFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        isDeleteDbInProces: false,
        error: action.error
    });
};

const databaseImportInit = (state, action) => {
    return updateObj(state, {importingDb: true});
};

const databaseImportStart = (state, action) => {
    return updateObj(state, {loading: true, error: null});
};

const databaseImportSucces = (state, action) => {
    return updateObj(state, {
        wine: action.wineData,
        importingDb: false,
        loading: false
    });
};
const databaseImportFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        importingDb: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_WINE_START:
            return addWineStart(state, action);
        case actionTypes.ADD_WINE_FAIL:
            return addWineFailed(state, action);
        case actionTypes.ADD_WINE_SUCCES:
            return addWineSucces(state, action);
        case actionTypes.FETCH_WINE_LIST_START:
            return fetchWineListStart(state, action);
        case actionTypes.FETCH_WINE_LIST_SUCCES:
            return fetchWineListSucces(state, action);
        case actionTypes.FETCH_WINE_LIST_FAIL:
            return fetchWineListFailed(state, action);
        case actionTypes.DELETE_WINE_START:
            return deleteWineStart(state, action);
        case actionTypes.DELETE_WINE_SUCCES:
            return deleteWineSucces(state, action);
        case actionTypes.DELETE_WINE_FAIL:
            return deleteWineFailed(state, action);
        case actionTypes.EDIT_WINE:
            return editWine(state, action);
        case actionTypes.SAVE_EDIT_WINE_START:
            return saveEditWineStart(state, action);
        case actionTypes.SAVE_EDIT_WINE_SUCCES:
            return saveEditWineSucces(state, action);
        case actionTypes.SAVE_EDIT_WINE_FAIL:
            return saveEditWineFailed(state, action);
        case actionTypes.SORT_WINE_BY:
            return sortWineBy(state, action);
        case actionTypes.DATABASE_DELETE_START:
            return databaseDeleteStart(state, action);
        case actionTypes.DATABASE_DELETE_SUCCES:
            return databaseDeleteSucces(state, action);
        case actionTypes.DATABASE_DELETE_FAIL:
            return databaseDeleteFailled(state, action);
        case actionTypes.DATABASE_IMPORT_INIT:
            return databaseImportInit(state, action);
        case actionTypes.DATABASE_IMPORT_START:
            return databaseImportStart(state, action);
        case actionTypes.DATABASE_IMPORT_SUCCES:
            return databaseImportSucces(state, action);
        case actionTypes.DATABASE_IMOPORT_FAIL:
            return databaseImportFailled(state, action);
        case actionTypes.WINE_LIST_CLEAR_ERROR:
            return wineListErrorClear(state, action);
        default:
            return state;
    }
}

export default reducer;


