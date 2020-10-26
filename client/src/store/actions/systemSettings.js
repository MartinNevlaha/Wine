import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const settingsClearError = () => {
    return {
        type: actionTypes.SETTINGS_CLEAR_ERROR
    }
} 

export const saveSettingsStart = () => {
    return {
        type: actionTypes.SAVE_SETTING_START
    };
};

export const saveSettingsSuccess = (isValuesEliminated) => {
    return {
        type: actionTypes.SAVE_SETTING_SUCCESS,
        isValuesEliminated
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
        axiosInstance.put('/admin/degustation-settings', settings, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => dispatch(saveSettingsSuccess(resp.data.setting.isValuesEliminated)))
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

export const saveIsDegustationOpenStart = () => {
    return {
        type: actionTypes.SAVE_IS_DEGUSTATION_OPEN_START
    }
}
export const saveIsDegustationOpenSuccess = (isOpen) => {
    return {
        type: actionTypes.SAVE_IS_DEGUSTATION_OPEN_SUCCESS,
        isOpen
    }
}
export const saveIsDegustationOpenFail = (error) => {
    return {
        type: actionTypes.SAVE_IS_DEGUSTATION_OPEN_FAIL,
        error
    }
}

export const saveIsDegustationOpen = (isOpen, token) => {
    return dispatch => {
        dispatch(saveIsDegustationOpenStart());
        axiosInstance.put('/admin/degustation-setting-is-open', isOpen,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => {
            dispatch(saveIsDegustationOpenSuccess(resp.data.setting.isDegustationOpen))
        })
        .catch(err => {
            if (err.response) {
                const error = {
                    message: err.response.data.message,
                    code: err.response.status
                }
                dispatch(saveIsDegustationOpenFail(error))
            }
            dispatch(saveIsDegustationOpenFail(err))
            setTimeout(() => {
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

export const fetchSettingSuccess = (isValuesEliminated, isDegustationOpen) => {
    return {
        type: actionTypes.FETCH_SETTINGS_SUCCESS,
        isValuesEliminated,
        isDegustationOpen
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
            const {isValuesEliminated, isDegustationOpen} = resp.data.settings;

            dispatch(fetchSettingSuccess(isValuesEliminated, isDegustationOpen))
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
