import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const fetchDegResultsStart = () => {
    return {
        type: actionTypes.FETCH_DEG_RESULTS_START
    };
};

export const fetchDegResultsSucces = (degName, results) => {
    return {
        type: actionTypes.FETCH_DEG_RESULTS_SUCCES,
        degName: degName,
        results: results
    }
}

export const fetchDegResultsFailled = (error) => {
    return {
        type: actionTypes.FETCH_DEG_RESULTS_FAIL,
        error: error
    }
}

export const fetchDegResults = (token) => {
    return dispatch => {
        dispatch(fetchDegResultsStart());
        axiosInstance.get('/degustator/results', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                console.log(resp.data)
                dispatch(fetchDegResultsSucces(resp.data.degName, resp.data.results))
            })
            .catch(error => dispatch(fetchDegResultsFailled(error)))
    }
}