import * as actionTypes from '../actions/actionTypes';
import {updateObj} from '../../shared/utility';
import updateArray from 'react-addons-update';

const initialState = {
    wineList: [],
    degGroups: [],
    loading: false,
    error: null,
    sortAmountUp: true,
}

const fetchEditWineGroupsStart = (state, action) => {
    return updateObj(state, {loading: true, error: null})
}

const fetchEditWineGroupsSuccess = (state, action) => {
    return updateObj(state, {
        loading: false,
        wineList: action.wines,
        degGroups: action.groups
    })
}

const fetchEditWineGroupsFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
}

const wineGroupChanged = (state, action) => {
    const index = state.wineList.indexOf(action.choosenWineData);
    return updateArray(state, {
        wineList: {
            [index]: {
                isTouch: {$set: true},
                group: {$set: action.groupDbId}
            }
        }
    })
}

const sortWineGroupsBy = (state, action) => {
    const sortBy = action.sortByProp;
    let sortedWineGroupsList = [];
    state.sortAmountUp ? sortedWineGroupsList = [...state.wineList].sort((a ,b) => (a[sortBy] > b[sortBy] ) ? 1 : -1)
    : sortedWineGroupsList = [...state.wineList].sort((a, b) => (a[sortBy] < b[sortBy] ) ? 1 : -1)
    return updateObj(state, {
        sortAmountUp: !state.sortAmountUp,
        wineList: sortedWineGroupsList
    })
}

const saveWineGroupsStart = (state, action) => {
    return updateObj(state, {loading: true, error: null})
}

const saveWineGroupsSuccess = (state, action) => {
    return updateObj(state, {loading: false, error: null })
}

const saveWineGroupsFailled = (state, action) => {
    return updateObj(state, {loading: false, error: action.error})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_EDIT_WINE_GROUP_START:
            return fetchEditWineGroupsStart(state, action);
        case actionTypes.FETCH_EDIT_WINE_GROUP_SUCCESS:
            return fetchEditWineGroupsSuccess(state, action);
        case actionTypes.FETCH_EDIT_WINE_GROUP_FAIL:
            return fetchEditWineGroupsFailled(state, action);
        case actionTypes.WINE_GROUP_CHANGED:
            return wineGroupChanged(state, action);
        case actionTypes.SORT_WINE_GROUPS_BY:
            return sortWineGroupsBy(state, action);
        case actionTypes.SAVE_WINE_GROUPS_START:
            return saveWineGroupsStart(state, action);
        case actionTypes.SAVE_WINE_GROPS_SUCCESS:
            return saveWineGroupsSuccess(state, action);
        case actionTypes.SAVE_WINE_GROUPS_FAIL:
            return saveWineGroupsFailled(state, action);
        default:
            return state;
    }
}


export default reducer;