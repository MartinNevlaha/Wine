import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const fetchSystemInfoStart = () => {
    return {
        type: actionTypes.FETCH_SYSTEM_INFO_START 
    }
}

export const fetchSystemInfoSuccess = (sysInfoData, dbData) => {
    return {
        type: actionTypes.FETCH_SYSTEM_INFO_SUCCESS,
        sysInfoData,
        dbData
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
            .then(resp => dispatch(fetchSystemInfoSuccess(resp.data.infoData, resp.data.dbData)))
            .catch(err => dispatch(fetchSystemInfoFailled(err)))
    }
}   

export const completeResetDbStart = () => {
    return {
        type: actionTypes.COM_RESET_DB_START
    }
}
export const completeDbResetSuccess = () => {
    return {
        type: actionTypes.COM_RESET_DB_SUCCESS
    }
}
export const completeResetDbFailled = (error) => {
    return {
        type: actionTypes.COM_RESET_DB_FAIL,
        error: error
    }
}

export const completeResetDb = (token) => {
    return dispatch => {
        dispatch(completeResetDbStart());
        axiosInstance.delete('/admin/reset-db', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => dispatch(completeDbResetSuccess()))
        .catch(err => dispatch(completeResetDbFailled(err)))
    }
}