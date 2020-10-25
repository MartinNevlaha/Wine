import * as actionTypes from '../actions/actionTypes';
import axiosInstance from '../../axios-instance';

export const fetchCompetitiveCategoryStart = () => {
    return {
        type: actionTypes.FETCH_COMPETITVE_CATEGORY_START
    };
};

export const fetchCompetitiveCategorySuccess = (category, results) => {
    return {
        type: actionTypes.FETCH_COMPETITVE_CATEGORY_SUCCESS,
        category,
        results
    };
};

export const fetchCompetitiveCategoryFail = (error) => {
    return {
        type: actionTypes.FETCH_COMPETITVE_CATEGORY_FAIL,
        error
    }
}

export const fetchCompetitiveCategory = (token) => {
    return dispatch => {
        dispatch(fetchCompetitiveCategoryStart());
        axiosInstance.get('/admin/final-results-category', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => dispatch(fetchCompetitiveCategorySuccess(resp.data.competitiveCategory, resp.data.results)))
        .catch(err => dispatch(fetchCompetitiveCategoryFail(err)))
    }
}

export const fetchWineResultsByComCategoryStart = () => {
    return {
        type: actionTypes.FETCH_WINE_RESULTS_BY_COM_CATEGORY_START
    };
};

export const fetchWineResultsByComCategorySuccess = (results) => {
    return {
        type: actionTypes.FETCH_WINE_RESULTS_BY_COM_CATEGORY_SUCCESS,
        results,
    };
};

export const fetchWineResultsByComCategoryFailled = (error) => {
    return {
        type: actionTypes.FETCH_WINE_RESULTS_BY_COM_CATEGORY_START,
        error
    };
};

export const fetchWineResultsByComCategory = (category, token) => {
    return dispatch => {
        dispatch(fetchWineResultsByComCategoryStart());
        axiosInstance.get(`/admin/final-results-by-category/${category}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => dispatch(fetchWineResultsByComCategorySuccess(resp.data.results)))
        .catch(err => dispatch(fetchWineResultsByComCategoryFailled(err)))
    }
}

export const fetchResultsByWineIdStart = () => {
    return {
        type: actionTypes.FETCH_RESULTS_BY_WINE_ID_START
    };
};

export const fetchResultsByWineIdSuccess = (results, wineInfo) => {
    return {
        type: actionTypes.FETCH_RESULTS_BY_WINE_ID_SUCCESS,
        results,
        wineInfo
    }
}

export const fetchResultsByWineIdFail = (error) => {
    return {
        type: actionTypes.FETCH_RESULTS_BY_WINE_ID_FAIL,
        error
    }
}

export const fetchResultsByWineId = (wineId, token) => {
    return dispatch => {
        dispatch(fetchResultsByWineIdStart())
        axiosInstance.get(`/admin/final-results/wine/${wineId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => dispatch(fetchResultsByWineIdSuccess(resp.data.results, resp.data.wineInfo)))
        .catch(err => dispatch(fetchResultsByWineIdFail(err)))
    }
}

export const fetchDegGroupsResStart = () => {
    return {
        type: actionTypes.FETCH_DEG_GROUPS_FINAL_RES_START
    }
}

export const fetchDegGroupsResSuccess = (groups) => {
    return {
        type: actionTypes.FETCH_DEG_GROUPS_FINAL_RES_SUCCESS,
        groups,
    }
}

export const fetchDegGroupsResFailled = (error) => {
    return {
        type: actionTypes.FETCH_DEG_GROUPS_FINAL_RES_FAIL,
        error
    }
}

export const fetchDegGroupsRes = (token) => {
    return dispatch => {
        dispatch(fetchDegGroupsResStart())
        axiosInstance.get('/admin//final-results-groups', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => dispatch(fetchDegGroupsResSuccess(resp.data.groups)))
        .catch(err => dispatch(fetchDegGroupsResFailled(err)))
    }
}