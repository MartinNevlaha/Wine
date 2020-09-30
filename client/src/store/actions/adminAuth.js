import jwt_decode from 'jwt-decode';
import * as actionTypes from '../actions/actionTypes';
import axiosInstance from '../../axios-instance';


export const adminLoginStart = () => {
    return {
        type: actionTypes.ADMIN_LOGIN_START,
    }
};

export const adminLoginSuccess = (token, adminId, role) => {
    return {
        type: actionTypes.ADMIN_LOGIN_SUCCESS,
        adminId,
        role,
        token
    }
};

export const adminLogOut = () => {
    return {
        type: actionTypes.ADMIN_LOGOUT
    }
}

export const checkAuthTimeout = (exp) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(adminLogOut())
        }, exp * 1000)
    }
}

export const adminLoginFailled = (error) => {
    return {
        type: actionTypes.ADMIN_LOGIN_FAIL,
        error
    }
}

export const adminLogin = (adminData) => {
    return dispatch => {
        dispatch(adminLoginStart());
        axiosInstance.post('/admin/login', adminData)
            .then(res => {
                const decodedToken = jwt_decode(res.data.token);
                const { adminId, role } = decodedToken;
                dispatch(adminLoginSuccess(res.data.token, adminId, role))
                dispatch(checkAuthTimeout(decodedToken.exp - decodedToken.iat))
            })
            .catch(err => {
                const error = {
                    message: err.response.data.message,
                    code: err.response.status
                }
                dispatch(adminLoginFailled(error));
            })
    }
}