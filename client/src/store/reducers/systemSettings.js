import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    isSucces: false,
    message: null,
    isValuesEliminated: false,
    isDegustationOpen: false,
    degustationName: '',
    competitionChairman: '',
    host: null
}

const settingsClearError = (state, action) => {
    return updateObj(state, {
        error: null
    })
}
const clearSystemSettingMessage = (state, action) => {
    return updateObj(state, {
        isSucces: false,
        message: null
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
        isValuesEliminated: action.isValuesEliminated,
        isDegustationOpen: action.isDegustationOpen,
        degustationName: action.degustationName,
        competitionChairman: action.competitionChairman,
        isSucces: true,
        message: action.message
    })
}

const saveSettingsFailled = (state, action) => {
    return updateObj(state, {
        loading: false, 
        error: action.error,
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
        isValuesEliminated: action.isValuesEliminated,
        degustationName: action.degustationName,
        competitionChairman: action.competitionChairman,
        host: action.host
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
        case actionTypes.SETTINGS_CLEAR_ERROR:
            return settingsClearError(state, action);
        case actionTypes.CLEAR_SYSTEM_SETTINGS_MESSAGE:
            return clearSystemSettingMessage(state, action)
        default:
            return state;
    }
}

export default reducer;