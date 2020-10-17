import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const saveSettingsStart = () => {
    return {
        type: actionTypes.SAVE_SETTING_START
    };
};

export const saveSettingsSuccess = () => {
    return {
        type: actionTypes.SAVE_SETTING_SUCCESS
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
            .then(resp => dispatch(saveSettingsSuccess()))
            .catch(err => dispatch(saveSettingsFailled(err)))
    }
}