import { updateObj } from '../../shared/utility';
import updateArray from 'react-addons-update';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    competitiveCategory: [],
    loading: false,
    error: null,
    results: [],
    resultByWineId: [],
    wineInfo: {},
    degGroups: [],
    resultsByGroup: [],
    resultsByDeg: [],
    degustators: [],
    isFinalResultWrite: false
}

const finalResultsErrorClear = (state, action) => {
    return updateObj(state, {error: null})
}

const fetchCompetitiveCategoryStart = (state, action) => {
    return updateObj(state, {loading: true, error: null})
};

const fetchCompetitiveCategorySuccess = (state, action) => {
    return updateObj(state, {
        loading: false, 
        error: null,
        competitiveCategory: action.category,
        results: action.results,
        isFinalResultWrite: action.isFinalResultWrite
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
        loading: false,
        error: null,
        results: action.results,
        isFinalResultWrite: action.isFinalResultWrite
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
        resultByWineId: action.results,
        wineInfo: action.wineInfo 
    })
}

const fetchResultsByWineIdFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
}
const fetchDegGroupsResStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: null
    })
}

const fetchDegGroupsResSuccess = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: null,
        degGroups: action.groups,
        resultsByGroup: action.results
    })
}

const fetchDegGroupsResFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
}

const fetchResultsByGroupStart = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: null
    })
}
const fetchResultsByGroupSuccess = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: null,
        resultsByGroup: action.results
    })
}

const fetchResultsByGroupFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
}

const fetchListOfDegustatorStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: null
    })
}

const fetchListOfDegustatorSuccess = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: null,
        resultsByDeg: action.results,
        degustators: action.degustators
    })
}

const fetchListOfDegustatorFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
}

const fetchResultByDegStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: null
    })
}

const fetchResultsByDegSuccess = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: null,
        resultsByDeg: action.results
    })
}
const fetchResultByDegFailled = (state, action) => {
    return updateObj(state, {
        loading: false,
        error: action.error
    })
}

const writeFinalResultsStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        error: null
    })
}

const writeFinalResultsSuccess = (state, action) => {
    const index = action.index
    return updateArray(state, {
        loading: {$set: false},
        isFinalResultWrite: {$set: true},
        competitiveCategory: {
            [index]: {$set: action.updatedData}
        }
    })
}
const writeFinalResultsFail = (state, action) => {
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
        case actionTypes.FETCH_DEG_GROUPS_FINAL_RES_START:
            return fetchDegGroupsResStart(state, action);
        case actionTypes.FETCH_DEG_GROUPS_FINAL_RES_SUCCESS:
            return fetchDegGroupsResSuccess(state, action);
        case actionTypes.FETCH_DEG_GROUPS_FINAL_RES_FAIL:
            return fetchDegGroupsResFailled(state, action)
        case actionTypes.FETCH_RESULTS_BY_GROUP_START:
            return fetchResultsByGroupStart(state, action);
        case actionTypes.FETCH_RESULTS_BY_GROUP_SUCCESS:
            return fetchResultsByGroupSuccess(state, action);
        case actionTypes.FETCH_RESULTS_BY_GROUP_FAIL:
            return fetchResultsByGroupFailled(state, action);
        case actionTypes.FETCH_LIST_OF_DEGUSTATORS_START:
            return fetchListOfDegustatorStart(state, action);
        case actionTypes.FETCH_LIST_OF_DEGUSTATORS_SUCCESS:
            return fetchListOfDegustatorSuccess(state, action)
        case actionTypes.FETCH_LIST_OF_DEGUSTATORS_FAIL:
            return fetchListOfDegustatorFailled(state, action);
        case actionTypes.FETCH_RESULTS_BY_DEG_START:
            return fetchResultByDegStart(state, action);
        case actionTypes.FETCH_RESULTS_BY_DEG_SUCCESS:
            return fetchResultsByDegSuccess(state, action);
        case actionTypes.FETCH_RESULTS_BY_DEG_FAIL:
            return fetchResultByDegFailled(state, action);
        case actionTypes.FINAL_RESULTS_CLEAR_ERROR:
            return finalResultsErrorClear(state, action);
        case actionTypes.WRITE_FINAL_RESULTS_START:
            return writeFinalResultsStart(state, action);
        case actionTypes.WRITE_FINAL_RESULTS_SUCCESS:
            return writeFinalResultsSuccess(state, action);
        case actionTypes.WRITE_FINAL_RESULTS_FAIL:
            return writeFinalResultsFail(state, action);
        default:
            return state;
    }
}

export default reducer;