import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const fetchSystemInfoStart = () => {
    return {
        type: actionTypes.FETCH_SYSTEM_INFO_START 
    }
}

export const fetchSystemInfoSuccess = (sysInfoData) => {
    return {
        type: actionTypes.FETCH_SYSTEM_INFO_SUCCESS,
        sysInfoData
    }
}

export const fetchSystemInfoFailled = (error) => {
    return {
        type: actionTypes.FETCH_SYSTEM_INFO_FAIL,
        error: error
    }
}

export const fetchSystemInfo = (token) => {
    return dispatch => {
        dispatch(fetchSystemInfoStart());
        axiosInstance.get('/admin/system-info', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => dispatch(fetchSystemInfoSuccess(resp.data.infoData)))
            .catch(err => dispatch(fetchSystemInfoFailled(err)))
    }
}   