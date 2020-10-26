import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    isValuesEliminated: false,
    isDegustationOpen: false
}

const settingsClearError = (state, action) => {
    return updateObj(state, {
        error: null
    })
}

const saveSettingsStart = (state, action) => {
    return updateObj(state, {
        loading: true, 
        error: null,
    })
}

const saveSettingsSuccess = (state, action) => {
    return updateObj(state, {
        loading: false, 
        error: null,
        isValuesEliminated: action.isValuesEliminated
    })
}

const saveSettingsFailled = (state, action) => {
    return updateObj(state, {
        loading: false, 
        error: action.error,
    })
}

const saveIsDegustationOpenStart = (state, action) => {
    return updateObj(state, {loading: true})
}
const saveIsDegustationOpenSuccess = (state, action) => {
    return updateObj(state, {
        loading: false,
        isDegustationOpen: action.isOpen
    })
}
const saveIsDegustationOpenFail = (state, action) => {
    return updateObj(state, {
        loading: false,
    })
}

const fetchSystemSettingsStart = (state, action) => {
    return updateObj(state, {
        loading: true
    })
}
const fetchSystemSettingsSucces = (state, action) => {
    return updateObj(state, {
        loading: false,
        isDegustationOpen: action.isDegustationOpen,
        isValuesEliminated: action.isValuesEliminated
    })
}

const fetchSystemSettingsFail = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SETTINGS_START:
            return fetchSystemSettingsStart(state, action);
        case actionTypes.FETCH_SETTINGS_SUCCESS:
            return fetchSystemSettingsSucces(state, action);
        case actionTypes.FETCH_SETTINGS_FAIL:
            return fetchSystemSettingsFail(state, action);
        case actionTypes.SAVE_SETTING_START:
            return saveSettingsStart(state, action);
        case actionTypes.SAVE_SETTING_SUCCESS:
            return saveSettingsSuccess(state, action);
        case actionTypes.SAVE_SETTING_FAIL:
            return saveSettingsFailled(state, action);
        case actionTypes.SAVE_IS_DEGUSTATION_OPEN_START:
            return saveIsDegustationOpenStart(state, action);
        case actionTypes.SAVE_IS_DEGUSTATION_OPEN_SUCCESS:
            return saveIsDegustationOpenSuccess(state, action);
        case actionTypes.SAVE_IS_DEGUSTATION_OPEN_FAIL:
            return saveIsDegustationOpenFail(state, action);
        case actionTypes.SETTINGS_CLEAR_ERROR:
            return settingsClearError(state, action)
        default:
            return state;
    }
}

export default reducer;