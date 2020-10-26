import { updateObj } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    adminId: null,
    isValid: false,
    token: null,
    loading: false,
    error: null
};

const adminLoginStart = (state, action) => {
    return updateObj(state, {loading: true, error: null})
}

const adminLoginSuccess = (state, action) => {
    const isAdminValid = action.role === 'admin' && action.token !== null;
    return updateObj(state, {
        loading: false,
        adminId: action.adminId,
        token: action.token,
        isValid: isAdminValid        
    })
}
    
const adminLoginFailled = (state, action) => {
    return updateObj(state, {
        error: action.error,
        loading: false
    })
};

const adminLoginClearError = (state, action) => {
    return updateObj(state, {
        error: null
    })
}

const adminLogout = (state, action) => {
    return updateObj(state, {
        adminId: null,
        token: null,
        isValid: false,
    })
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADMIN_LOGIN_START:
            return adminLoginStart(state, action);
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return adminLoginSuccess(state, action);
        case actionTypes.ADMIN_LOGIN_FAIL:
            return adminLoginFailled(state, action);
        case actionTypes.ADMIN_LOGOUT:
            return adminLogout(state, action);
        case actionTypes.ADMIN_LOGIN_CLEAR_ERROR:
            return adminLoginClearError(state, action)
        default:
            return state;
    }
};

export default reducer; 
