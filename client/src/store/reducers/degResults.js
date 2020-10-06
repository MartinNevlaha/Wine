import * as actionTypes from '../actions/actionTypes';
import {updateObj} from '../../shared/utility';

const initialState = {
    degName: null,
    results: [],
    loading: false,
    error: null
}

const fetchDegResultsStart = (state, action) => {
    return updateObj(state, {loading: true, error: null})
};

const fetchDegResultsSucces = (state, action) => {
    return updateObj(state, {
        loading: false,
        degName: action.degName,
        results: action.results
    })
};

const fetchDegResultsFail = (state, action) => {
    return updateObj(state, {loading: false, error: action.error})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DEG_RESULTS_START:
            return fetchDegResultsStart(state, action);
        case actionTypes.FETCH_DEG_RESULTS_SUCCES:
            return fetchDegResultsSucces(state, action);
        case actionTypes.FETCH_DEG_RESULTS_FAIL:
            return fetchDegResultsFail(state, action)
        default:
            return state;
    }
}

export default reducer;

