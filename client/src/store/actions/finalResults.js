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

export const fetchDegGroupsResSuccess = (groups, results) => {
    return {
        type: actionTypes.FETCH_DEG_GROUPS_FINAL_RES_SUCCESS,
        groups,
        results
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
        .then(resp => dispatch(fetchDegGroupsResSuccess(resp.data.groups, resp.data.results)))
        .catch(err => dispatch(fetchDegGroupsResFailled(err)))
    }
}

export const fetchResultsByGroupStart = () => {
    return {
        type: actionTypes.FETCH_RESULTS_BY_GROUP_START
    }
}

export const fetchResultsByGroupSuccess = (results) => {
    return {
        type: actionTypes.FETCH_RESULTS_BY_GROUP_SUCCESS,
        results
    }
}

export const fetchResultsByGroupFailled = (error) => {
    return {
        type: actionTypes.FETCH_RESULTS_BY_GROUP_FAIL,
        error
    }
}

export const fetchResultsByGroup = (groupId, token) => {
    return dispatch => {
        dispatch(fetchResultsByGroupStart())
        axiosInstance.get(`/admin/final-results/group/${groupId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => dispatch(fetchResultsByGroupSuccess(resp.data.results)))
        .catch(err => dispatch(fetchResultsByGroupFailled(err)))
    }
}

export const fetchListOfDegustatorsStart = () => {
    return {
        type: actionTypes.FETCH_LIST_OF_DEGUSTATORS_START
    }
}

export const fetchListOfDegustatorsSuccess = (degustators, results) => {
    return {
        type: actionTypes.FETCH_LIST_OF_DEGUSTATORS_SUCCESS,
        degustators,
        results
    }
}

export const fetchListOfDegustatorsFailled = (error) => {
    return {
        type: actionTypes.FETCH_LIST_OF_DEGUSTATORS_FAIL,
        error
    }
}

export const fetchListOfDegustators = (token) => {
    return dispatch => {
        dispatch(fetchListOfDegustatorsStart());
        axiosInstance.get('/admin/final-results-degustators', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => dispatch(fetchListOfDegustatorsSuccess(resp.data.degustators, resp.data.results)))
        .catch(err => dispatch(fetchListOfDegustatorsFailled(err)))
    }
}

export const fetchResultsByDegStart = () => {
    return {
        type: actionTypes.FETCH_RESULTS_BY_DEG_START
    }
}

export const fetchResultsByDegSuccess = (results) => {
    return {
        type: actionTypes.FETCH_RESULTS_BY_DEG_SUCCESS,
        results
    }
}

export const fetchResultsByDegFailled = (error) => {
    return {
        type: actionTypes.FETCH_RESULTS_BY_GROUP_FAIL,
        error
    }
}

export const fetchResultsByDeg = (degId, token) => {
    return dispatch => {
        dispatch(fetchResultsByDegStart());
        axiosInstance.get(`admin/final-results/degustator/${degId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => dispatch(fetchResultsByDegSuccess(resp.data.results)))
        .catch(err => dispatch(fetchResultsByDegFailled(err)))
    }
}