import * as actionTypes from '../actions/actionTypes';
import axiosInstance from '../../axios-instance';

export const fetchCompetitiveCategoryStart = () => {
    return {
        type: actionTypes.FETCH_COMPETITVE_CATEGORY_START
    };
};

export const fetchCompetitiveCategorySuccess = (category) => {
    return {
        type: actionTypes.FETCH_COMPETITVE_CATEGORY_SUCCESS,
        category
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
        .then(resp => dispatch(fetchCompetitiveCategorySuccess(resp.data.competitiveCategory)))
        .catch(err => dispatch(fetchCompetitiveCategoryFail(err)))
    }
}