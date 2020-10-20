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
        .then(resp => dispatch(saveIsDegustationOpenSuccess(resp.data.isOpen)))
        .catch(err => dispatch(saveIsDegustationOpenFail(err)))
    }
}