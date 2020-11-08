import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const degResultsClearError = () => {
    return {
        type: actionTypes.DEG_RESULTS_CLEAR_ERROR
    }
}

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
        axiosInstance.get('degustator/results', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                dispatch(fetchDegResultsSucces(resp.data.degName, resp.data.results))
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(fetchDegResultsFailled(error))
                }
                dispatch(fetchDegResultsFailled(err))
                setTimeout(() => {
                    dispatch(degResultsClearError());
                }, 2500)
            })
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
        axiosInstance.get(`degustator/result/${_id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                dispatch(fetchDegResultByIdSucces(resp.data))
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(fetchDegResultByIdFail(error))
                }
                dispatch(fetchDegResultByIdFail(err))
                setTimeout(() => {
                    dispatch(degResultsClearError())
                }, 2500)
            })
    }
}

export const closeDetailResult = () => {
    return {
        type: actionTypes.CLOSE_DETAIL_RESULT
    }
}