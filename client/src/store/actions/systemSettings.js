import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const settingsClearError = () => {
    return {
        type: actionTypes.SETTINGS_CLEAR_ERROR
    }
} 

export const clearSystemSettingMessage = () => {
    return {
        type: actionTypes.CLEAR_SYSTEM_SETTINGS_MESSAGE
    }
}

export const saveSettingsStart = () => {
    return {
        type: actionTypes.SAVE_SETTING_START
    };
};

export const saveSettingsSuccess = (settings, message) => {
    const {isValuesEliminated, isDegustationOpen, degustationName, competitionChairman} = settings;
    return {
        type: actionTypes.SAVE_SETTING_SUCCESS,
        isValuesEliminated,
        isDegustationOpen,
        degustationName,
        competitionChairman,
        message
    };
};

export const saveSettingsFailled = (error) => {
    return {
        type: actionTypes.SAVE_SETTING_FAIL,
        error
    }
}

export const saveSettings = (settings, token) => {
    return dispatch => {
        dispatch(saveSettingsStart());
        axiosInstance.put('admin/degustation-settings', settings, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                dispatch(saveSettingsSuccess(resp.data.setting, resp.data.message))
                setTimeout(()=>{
                    dispatch(clearSystemSettingMessage());
                }, 2500)
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(saveSettingsFailled(error))
                }
                dispatch(saveSettingsFailled(err))
                setTimeout(()=>{
                    dispatch(settingsClearError())
                }, 2500)
            })
    }
}

export const fetchSettingStart = () => {
    return {
        type: actionTypes.FETCH_SETTINGS_START
    }
}

export const fetchSettingSuccess = (isValuesEliminated, isDegustationOpen, degustationName, competitionChairman, host) => {
    return {
        type: actionTypes.FETCH_SETTINGS_SUCCESS,
        isValuesEliminated,
        isDegustationOpen,
        degustationName,
        competitionChairman,
        host
    }
} 

export const fetchSettingFailled = (error) => {
    return {
        type: actionTypes.FETCH_SETTINGS_FAIL,
        error
    }
}

export const fetchSetting = (token) => {
    return dispatch => {
        dispatch(fetchSettingStart());
        axiosInstance.get('admin/degustation-settings', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => {
            const {isValuesEliminated, isDegustationOpen, degustationName, competitionChairman} = resp.data.settings;
            const host = resp.data.host;
            dispatch(fetchSettingSuccess(isValuesEliminated, isDegustationOpen, degustationName, competitionChairman, host))
        })
        .catch(err => {
            if (err.response) {
                const error = {
                    message: err.response.data.message,
                    code: err.response.status
                }
                dispatch(fetchSettingFailled(error))
            }
            dispatch(fetchSettingFailled(err))
            setTimeout(()=>{
                dispatch(settingsClearError())
            }, 2500)
        })
    }
}
