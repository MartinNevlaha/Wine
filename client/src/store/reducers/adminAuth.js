import { updateObj } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    adminId: '',
    isValid: false,
    token: null,
    loading: true,
    error: null
};

const adminLoginStart = (state, action) => {
    return updateObj(state, {loading: true})
}

const adminLoginSuccess = (state, action) => {
    let isAdminValid = action.role === 'admin' && action.token !== null;
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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADMIN_LOGIN_START:
            return adminLoginStart(state, action);
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return adminLoginSuccess(state, action);
        case actionTypes.ADMIN_LOGIN_FAIL:
            return adminLoginFailled(state, action);
        default:
            return state;
    }
};

export default reducer; 
