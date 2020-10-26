import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility';

const initialState = {
        group: null,
        degustatorNumber: null,
        degId: null,
        token: null,
        loading: null,
        isValid: false,
        groupId: null
};

const degLoginStart = (state, action) => {
    return updateObj(state, { loading: true, error: null })
}

const degLoginSucces = (state, action) => {
    const isDegValid = action.role === 'degustator' && action.role !== null;
    return updateObj(state, {
        loading: false,
        degId: action.degId,
        token: action.token,
        isValid: isDegValid,
        degustatorNumber: action.degNumber,
        group: action.group,
        groupId: action.groupId
    })
}

const degLoginFailled = (state, action) => {
    return updateObj(state, {
        error: action.error,
        loading: false
    })
}

const degLoginClearError = (state, action) => {
    return updateObj(state, {error: null})
}

const degLogout = (state, action) => {
    return updateObj(state, {
        degId: null,
        token: null,
        isValid: null,
        group: null,
        degustatorNumber: null,
        groupId: null
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DEGUSTATOR_LOGIN_START:
            return degLoginStart(state, action);
        case actionTypes.DEGUSTATOR_LOGIN_SUCCESS:
            return degLoginSucces(state, action);
        case actionTypes.DEGUSTATOR_LOGIN_FAIL:
            return degLoginFailled(state, action);
        case actionTypes.DEGUSTATOR_LOGOUT:
            return degLogout(state, action);
        case actionTypes.DEGUSTATOR_LOGIN_CLEAR_ERROR:
            return degLoginClearError(state, action)
        default:
            return state;
    }
};

export default reducer;