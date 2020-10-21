import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

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
            .catch(err => dispatch(saveSettingsFailled(err)))
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
        .catch(err => dispatch(saveIsDegustationOpenFail(err)))
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
            console.log(resp.data.settings)
            const {isValuesEliminated, isDegustationOpen} = resp.data.settings;

            dispatch(fetchSettingSuccess(isValuesEliminated, isDegustationOpen))
        })
        .catch(err => dispatch(fetchSettingFailled(err)))
    }
}