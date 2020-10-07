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

export const fetchDegResultByIdStart = () => {
    return {
        type: actionTypes.FETCH_DEG_RESULT_BY_ID_START
    };
};

export const fetchDegResultByIdSucces = (result) => {
    return {
        type: actionTypes.FETCH_DEG_RESULT_BY_ID_SUCCES,
        result: result
    }
};

export const fetchDegResultByIdFail = (error) => {
    return {
        type: actionTypes.FETCH_DEG_RESULT_BY_ID_FAIL,
        error: error
    }
};

export const fetchDegResultById = (_id, token) => {
    return dispatch => {
        dispatch(fetchDegResultByIdStart());
        axiosInstance.get(`/degustator/result/${_id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                dispatch(fetchDegResultByIdSucces(resp.data))
            })
            .catch(error => dispatch(fetchDegResultByIdFail(error)))
    }
}

export const closeDetailResult = () => {
    return {
        type: actionTypes.CLOSE_DETAIL_RESULT
    }
}