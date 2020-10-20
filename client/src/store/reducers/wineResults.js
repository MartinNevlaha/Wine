import * as actionTypes from '../actions/actionTypes';

import { updateObj } from '../../shared/utility';

const initialState = {
    results: [],
    loading: false,
    sending: false,
    fetching: false,
    wineInfo: {
        color: null,
        character: null,
        competitiveCategory: null,
        vintage: null,
        error: null
    },
    wineInGroups: []
}
const resultsSendInit = (state, action) => {
    return updateObj(state, { sending: true })
};

const resultsSendStart = (state, action) => {
    return updateObj(state, { loading: true });
};
const resultsSendSucces = (state, action) => {
    return updateObj(state, { 
        results: action.data,
        loading: false,
        sending: false
    });
};
const resultsSendFailed = (state, action) => {
    return updateObj(state, { 
        loading: false,
        sending: false
    });
};
const resultsSendCanceled = (state, action) => {
    return updateObj(state, { sending: false })
}

const fetchWineInfoStart = (state, action) => {
    const errorNull = updateObj(state.wineInfo, {error: null})
    return updateObj(state, {
        fetching: true,
        loading: true,
        wineInfo: errorNull
    })
}

const fetchWineInfoSucces = (state, action) => {
    const wineInfo = updateObj(state.wineInfo, {
        color: action.data.color,
        character: action.data.character,
        competitiveCategory: action.data.competitiveCategory,
        vintage: action.data.vintage,
        error: null 
    })
    return updateObj(state, {
        fetching: false,
        loading: false,
        wineInfo: wineInfo,
    })
}

const fetchWineInfoFailled = (state, action) => {
    const errorTrue = updateObj(state.wineInfo, {
        error: action.error,
        color: null,
        character: null,
        competitiveCategory: null,
        vintage: null,
    })
    return updateObj(state, {
        fetching: false, 
        loading: false,
        wineInfo: errorTrue
    })
}

const fetchWineInGroupStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: null
    })
}
const fetchWineInGroupSuccess = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: null,
        wineInGroups: action.wineInGroup
    })
}
const fetchWineInGroupsFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
}
const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.RESULTS_SEND_START:
            return resultsSendStart(state, action);
        case actionTypes.RESULTS_SEND_SUCCESS:
            return resultsSendSucces(state, action);
        case actionTypes.RESULTS_SEND_FAIL:
            return resultsSendFailed(state, action);
        case actionTypes.RESULTS_SEND_INIT:
            return resultsSendInit(state, action);
        case actionTypes.RESULTS_SEND_CANCELED:
            return resultsSendCanceled(state, action)
        case actionTypes.FETCH_WINE_INFO_START:
            return fetchWineInfoStart(state, action);
        case actionTypes.FETCH_WINE_INFO_SUCCES:
            return fetchWineInfoSucces(state, action);
        case actionTypes.FETCH_WINE_INFO_FAIL:
            return fetchWineInfoFailled(state, action);
        case actionTypes.FETCH_WINE_IN_GROUP_START:
            return fetchWineInGroupStart(state, action);
        case actionTypes.FETCH_WINE_IN_GROUP_SUCCESS:
            return fetchWineInGroupSuccess(state, action);
        case actionTypes.FETCH_WINE_IN_GROUP_FAIL:
            return fetchWineInGroupsFailled(state, action);
        default:
            return state;
    }
}
export default reducer;