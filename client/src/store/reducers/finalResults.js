import { updateObj } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    competitiveCategory: [],
    loading: false,
    error: null,
    results: [],
    resultByWineId: []
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

const fetchWineResultsByComCategoryStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: null
    })
}

const fetchWineResultsByComCategorySuccess = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: null,
        results: action.results
    })
}

const fetchWineResultsByComCategoryFailled = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: action.error
    })
}

const fetchResultsByWineIdStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: null
    })
}

const fetchResultsByWineIdSuccess = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: null,
        resultByWineId: action.results
    })
}

const fetchResultsByWineIdFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COMPETITVE_CATEGORY_START:
            return fetchCompetitiveCategoryStart(state, action);
        case actionTypes.FETCH_COMPETITVE_CATEGORY_SUCCESS:
            return fetchCompetitiveCategorySuccess(state, action);
        case actionTypes.FETCH_COMPETITVE_CATEGORY_FAIL:
            return fetchCompetitiveCategoryFail(state, action);
        case actionTypes.FETCH_WINE_RESULTS_BY_COM_CATEGORY_START:
            return fetchWineResultsByComCategoryStart(state, action);
        case actionTypes.FETCH_WINE_RESULTS_BY_COM_CATEGORY_SUCCESS:
            return fetchWineResultsByComCategorySuccess(state, action);
        case actionTypes.FETCH_WINE_RESULTS_BY_COM_CATEGORY_FAIL:
            return fetchWineResultsByComCategoryFailled(state, action);
        case actionTypes.FETCH_RESULTS_BY_WINE_ID_START:
            return fetchResultsByWineIdStart(state, action);
        case actionTypes.FETCH_RESULTS_BY_WINE_ID_SUCCESS:
            return fetchResultsByWineIdSuccess(state, action);
        case actionTypes.FETCH_RESULTS_BY_WINE_ID_FAIL:
            return fetchResultsByWineIdFailled(state, action);
        default:
            return state;
    }
}

export default reducer;