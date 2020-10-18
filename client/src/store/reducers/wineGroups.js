import * as actionTypes from '../actions/actionTypes';
import {updateObj} from '../../shared/utility';
import updateArray from 'react-addons-update';

const initialState = {
    wineList: [],
    degGroups: [],
    loading: false,
    error: null
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
        default:
            return state;
    }
}


export default reducer;