import * as actionTypes from './actionTypes';

import axiosInstance from '../../axios-instance'; 

export const resultsSendInit = () => {
    return {
        type: actionTypes.RESULTS_SEND_INIT
    }
};

export const resultsSendStart = () => {
    return {
        type: actionTypes.RESULTS_SEND_START
    }
};

export const resultsSendSucces = (id, data) => {
    return {
        type: actionTypes.RESULTS_SEND_SUCCESS,
        resultsId: id,
        data: data 
    };
};

export const resultsSendFailed = (e) => {
    return {
        type: actionTypes.RESULTS_SEND_FAIL,
        error: e
    };
};
export const resultsSendCanceled = () => {
    return {
        type: actionTypes.RESULTS_SEND_CANCELED
    }
};
export const resetResults = () => {
    return {
        type: actionTypes.RESET_RESULTS
    }
}

export const resultsSend = (data, token) => {
    return dispatch => {
        dispatch(resultsSendStart());
        axiosInstance.post('degustator/results', data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch(resultsSendSucces(response.data.name, data));
                dispatch(resetResults())
            })
            .catch(error => {
                dispatch(resultsSendFailed(error));
            })
    }
}

export const fetchWineInfoStart = () => {
    return {
        type: actionTypes.FETCH_WINE_INFO_START
    }
}

export const fetchWineInfoSucces = (wineInfoData) => {
    return {
        type: actionTypes.FETCH_WINE_INFO_SUCCES,
        data: wineInfoData
    }
}

export const fetchWineInfoFailled = (error) => {
    return {
        type: actionTypes.FETCH_WINE_INFO_FAIL,
        error: error
    }
}

export const fetchWineInfo = (wineId, token) => {
    console.log(token)
    return dispatch => {
        setTimeout(()=>{
            dispatch(fetchWineInfoStart())
            axiosInstance.get(`/degustator/wine-list/${wineId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(resp => {
                    dispatch(fetchWineInfoSucces(resp.data.wine));
                })
                .catch(err => {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(fetchWineInfoFailled(error))
                })
        }, 1000)
    }
}