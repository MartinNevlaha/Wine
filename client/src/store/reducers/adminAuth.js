<<<<<<< HEAD
import { updateObj } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    adminId: '',
    isValid: false,
    token: null,
    loading: true,
    error: null
};
=======
import * as actionTypes from '../actions/actionTypes';
import { updateObj } from  '../../shared/utility';

const initialState = {
    adminId: '',
    role: '',
    token: null,
    loginSucces: false,
    loading: false,
    error: null
}
>>>>>>> 272dc2b75321a01b36985dc9559f786937f7dfbe

const adminLoginStart = (state, action) => {
    return updateObj(state, {loading: true})
}
<<<<<<< HEAD

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
=======
const adminLoginSuccess = (state, action) => {
    let isLoginValid = action.role === 'admin' && action.token; //return true or false
    return updateObj(state, {
        loading: false,
        loginSucces: isLoginValid,
        token: action.token,
        adminId: action.adminId,
        role: action.role
    })
}
const adminLoginFailled = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: action.error,
        loginSucces: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
>>>>>>> 272dc2b75321a01b36985dc9559f786937f7dfbe
        case actionTypes.ADMIN_LOGIN_START:
            return adminLoginStart(state, action);
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return adminLoginSuccess(state, action);
        case actionTypes.ADMIN_LOGIN_FAIL:
            return adminLoginFailled(state, action);
        default:
            return state;
    }
<<<<<<< HEAD
};

export default reducer; 
=======
}

export default reducer;
>>>>>>> 272dc2b75321a01b36985dc9559f786937f7dfbe
