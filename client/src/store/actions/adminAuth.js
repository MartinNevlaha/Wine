<<<<<<< HEAD
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
=======
import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const adminLoginStart = () => {
    return {
        type: actionTypes.ADMIN_LOGIN_START
    }
}

export const adminLoginSuccess = (token) => {
    //first decode token using "jwt-decode" and extract adminId and role
    const {adminId, role} = token; //temporary
    return {
        type: actionTypes.ADMIN_LOGIN_SUCCESS,
        adminId: adminId,
        role: role,
        token: token
    }
}
>>>>>>> 272dc2b75321a01b36985dc9559f786937f7dfbe

export const adminLoginFailled = (error) => {
    return {
        type: actionTypes.ADMIN_LOGIN_FAIL,
<<<<<<< HEAD
        error
=======
        error: error
>>>>>>> 272dc2b75321a01b36985dc9559f786937f7dfbe
    }
}

export const adminLogin = (adminData) => {
    return dispatch => {
<<<<<<< HEAD
        dispatch(adminLoginStart);
        axiosInstance.post('/admin/login', adminData)
            .then(res => {
                dispatch(adminLoginSuccess(res.data.token))
=======
        dispatch(adminLoginStart());
        axiosInstance.post('admin/login', adminData)
            .then(resp => {
                dispatch(adminLoginSuccess(resp.data.token))
>>>>>>> 272dc2b75321a01b36985dc9559f786937f7dfbe
            })
            .catch(err => dispatch(adminLoginFailled(err)))
    }
}