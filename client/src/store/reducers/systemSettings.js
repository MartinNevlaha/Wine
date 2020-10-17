import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null
}

const saveSettingsStart = (state, action) => {
    return updateObj(state, {loading: true, error: null})
}

const saveSettingsSuccess = (state, action) => {
    return updateObj(state, {loading: false, error: null})
}

const saveSettingsFailled = (state, action) => {
    return updateObj(state, {loading: false, error: action.error})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_SETTING_START:
            return saveSettingsStart(state, action);
        case actionTypes.SAVE_SETTING_SUCCESS:
            return saveSettingsSuccess(state, action);
        case actionTypes.SAVE_SETTING_FAIL:
            return saveSettingsFailled(state, action);
        default:
            return state;
    }
}

export default reducer;