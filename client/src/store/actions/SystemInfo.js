import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const systemInfoClearError = () => {
    return {
        type: actionTypes.SYSTEM_INFO_CLEAR_ERROR
    }
}

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
        axiosInstance.get('admin/system-info', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => dispatch(fetchSystemInfoSuccess(resp.data.infoData, resp.data.dbData)))
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(fetchSystemInfoFailled(error))
                }
                dispatch(fetchSystemInfoFailled(err))
                setTimeout(() => {
                    dispatch(systemInfoClearError())
                }, 2500)
            })
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
        axiosInstance.delete('admin/reset-db', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => dispatch(completeDbResetSuccess()))
        .catch(err => {
            if (err.response) {
                const error = {
                    message: err.response.data.message,
                    code: err.response.status
                }
                dispatch(completeResetDbFailled(error))
            }
            dispatch(completeResetDbFailled(err))
            setTimeout(()=>{
                dispatch(systemInfoClearError())
            }, 2500)
        })
    }
}