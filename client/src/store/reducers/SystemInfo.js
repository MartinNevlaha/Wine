import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility';

const initialState = {
    infoData: {},
    loading: false,
    error: null,
    dbData: {}
}
const systemInfoClearError = (state, action) => {
    return updateObj(state, {error: null})
}
const fetchSystemInfoStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: null
    })
};
const fetchSystemInfoSuccess = (state, action) => {
    return updateObj(state, {
        loading: false,
        infoData: action.sysInfoData,
        dbData: action.dbData
    })
}
const fetchSystemInfoFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
}
const completeResetDbStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: null
    })
}
const completeResetDbSuccess = (state, action) => {
    return updateObj(state, {
        loading: false,
        dbData: {}
    })
}
const completeResetDbFail = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SYSTEM_INFO_START:
            return fetchSystemInfoStart(state, action)
        case actionTypes.FETCH_SYSTEM_INFO_SUCCESS:
            return fetchSystemInfoSuccess(state, action)
        case actionTypes.FETCH_SYSTEM_INFO_FAIL:
            return fetchSystemInfoFailled(state, action)
        case actionTypes.COM_RESET_DB_START:
            return completeResetDbStart(state, action);
        case actionTypes.COM_RESET_DB_SUCCESS:
            return completeResetDbSuccess(state, action);
        case actionTypes.COM_RESET_DB_FAIL:
            return completeResetDbFail(state, action);
        case actionTypes.SYSTEM_INFO_CLEAR_ERROR:
            return systemInfoClearError(state, action);
        default:
            return state;
    }
}

export default reducer;