import jwt_decode from 'jwt-decode';
import * as actionTypes from '../actions/actionTypes';
import axiosInstance from '../../axios-instance';


export const adminLoginStart = () => {
    return {
        type: actionTypes.ADMIN_LOGIN_START,
    }
};

export const adminLoginSuccess = (token) => {
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    const { adminId, role } = decodedToken;
    return {
        type: actionTypes.ADMIN_LOGIN_SUCCESS,
        adminId,
        role,
        token
    }
};

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
                dispatch(adminLoginSuccess(res.data.token))
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