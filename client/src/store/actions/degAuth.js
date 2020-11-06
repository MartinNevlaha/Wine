import axiosInstance from '../../axios-instance';
import jwt_decode from 'jwt-decode';

import * as actionTypes from './actionTypes';


const degLoginStart = () => {
    return {
        type: actionTypes.DEGUSTATOR_LOGIN_START
    }
};

const degLoginSuccess = (token, degId, role, degNumber, group, groupId) => {
    return {
        type: actionTypes.DEGUSTATOR_LOGIN_SUCCESS,
        token,
        degId,
        role,
        degNumber,
        group,
        groupId
    }
};

export const degLogout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.DEGUSTATOR_LOGOUT
    }
}

export const checkAuthTimeout = (exp) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(degLogout())
        }, exp * 1000)
    }
}

export const degLoginFailled = (error) => {
    return {
        type: actionTypes.DEGUSTATOR_LOGIN_FAIL,
        error
    }
}
export const degLoginClearError = () => {
    return {
        type: actionTypes.DEGUSTATOR_LOGIN_CLEAR_ERROR,
    }
}

export const degLogin = (degData) => {
    return dispatch => {
        dispatch(degLoginStart());
        console.log(degData)
        axiosInstance.post('degustator/login', degData)
            .then(res => {
                const decodedToken = jwt_decode(res.data.token);
                console.log(decodedToken)
                const { degId, role, degNumber, group, groupId } = decodedToken;
                localStorage.setItem('token', res.data.token);
                dispatch(degLoginSuccess(res.data.token, degId, role, degNumber, group, groupId));
                dispatch(checkAuthTimeout(decodedToken.exp - decodedToken.iat))
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(degLoginFailled(error));
                } else {
                    dispatch(degLoginFailled(err))
                }
                setTimeout(() => {
                    dispatch(degLoginClearError())
                }, 2500)
            })
    }
}

export const degAuthCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(degLogout());
        } else {
            const decodedToken = jwt_decode(token);
            if (decodedToken.role === 'degustator') {
                const actualTime = Date.now() / 1000;
            if (decodedToken.exp > actualTime) {
                const { degId, role, degNumber, group, groupId } = decodedToken;
                dispatch(degLoginSuccess(token, degId, role, degNumber, group, groupId))
                const remainTime = decodedToken.exp - actualTime;
                dispatch(checkAuthTimeout(remainTime))
            }
            }
        }   
    };
}