import * as actionTypes from '../actions/actionTypes';
import {updateObj} from '../../shared/utility';

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_EDIT_WINE_GROUP_START:
            return fetchEditWineGroupsStart(state, action);
        case actionTypes.FETCH_EDIT_WINE_GROUP_SUCCESS:
            return fetchEditWineGroupsSuccess(state, action);
        case actionTypes.FETCH_EDIT_WINE_GROUP_FAIL:
            return fetchEditWineGroupsFailled(state, action);
        default:
            return state;
    }
}


export default reducer;