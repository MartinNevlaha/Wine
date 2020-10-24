import { updateObj } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    competitiveCategory: [],
    loading: false,
    error: null,
    results: []
}

const fetchCompetitiveCategoryStart = (state, action) => {
    return updateObj(state, {loading: true, error: null})
};

const fetchCompetitiveCategorySuccess = (state, action) => {
    return updateObj(state, {
        loading: false, 
        error: null,
        competitiveCategory: action.category,
        results: action.results
    })
};

const fetchCompetitiveCategoryFail = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COMPETITVE_CATEGORY_START:
            return fetchCompetitiveCategoryStart(state, action);
        case actionTypes.FETCH_COMPETITVE_CATEGORY_SUCCESS:
            return fetchCompetitiveCategorySuccess(state, action);
        case actionTypes.FETCH_COMPETITVE_CATEGORY_FAIL:
            return fetchCompetitiveCategoryFail(state, action);
        default:
            return state;
    }
}

export default reducer;