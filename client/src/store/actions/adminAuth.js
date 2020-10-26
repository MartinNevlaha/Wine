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

export const adminLogout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.ADMIN_LOGOUT
    }
}

export const checkAuthTimeout = (exp) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(adminLogout())
        }, exp * 1000)
    }
}

export const adminLoginFailled = (error) => {
    return {
        type: actionTypes.ADMIN_LOGIN_FAIL,
        error
    }
}
 
export const adminLoginClearError = () => {
    return {
        type: actionTypes.ADMIN_LOGIN_CLEAR_ERROR,
    }
}

export const adminLogin = (adminData) => {
    return dispatch => {
        dispatch(adminLoginStart());
        axiosInstance.post('/admin/login', adminData)
            .then(res => {
                const decodedToken = jwt_decode(res.data.token);
                const { adminId, role } = decodedToken;
                localStorage.setItem('token', res.data.token);
                dispatch(adminLoginSuccess(res.data.token, adminId, role))
                dispatch(checkAuthTimeout(decodedToken.exp - decodedToken.iat))
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(adminLoginFailled(error));
                } else {dispatch(adminLoginFailled(err))}

                setTimeout(() => {
                    dispatch(adminLoginClearError())
                }, 2500)
            })
    }
}

export const adminAuthCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(adminLogout());
        } else {
            const decodedToken = jwt_decode(token);
            if (decodedToken.role === 'admin') {
                const actualTime = Date.now() / 1000;
                if (decodedToken.exp > actualTime) {
                    const { adminId, role } = decodedToken;
                    dispatch(adminLoginSuccess(token, adminId, role))
                    const remainTime = decodedToken.exp - actualTime;
                    dispatch(checkAuthTimeout(remainTime))
                }
            }
        }   
    };
}