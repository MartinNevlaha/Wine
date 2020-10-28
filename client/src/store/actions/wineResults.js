import * as actionTypes from './actionTypes';

import axiosInstance from '../../axios-instance'; 

export const resultsClearError = () => {
    return {
        type: actionTypes.RESULT_CLEAR_ERROR
    }
};

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
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(resultsSendFailed(error));
                }
                dispatch(resultsSendFailed(err));
                setTimeout(()=>{
                    dispatch(resultsClearError());
                }, 2500)
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
                    if (err.response) {
                        const error = {
                            message: err.response.data.message,
                            code: err.response.status
                        }
                        dispatch(fetchWineInfoFailled(error))
                    } else {
                        dispatch(fetchWineInGroupFailled(err))
                        setTimeout(()=>{
                            dispatch(resultsClearError())
                        }, 2500)
                    }
                })
        }, 1000)
    }
}

export const fetchWineInGroupStart = () => {
    return {
        type: actionTypes.FETCH_WINE_IN_GROUP_START
    };
};

export const fetchWineInGroupSuccess = (wineInGroup) => {
    return {
        type: actionTypes.FETCH_WINE_IN_GROUP_SUCCESS,
        wineInGroup
    };
};

export const fetchWineInGroupFailled = (error) => {
    return {
        type: actionTypes.FETCH_WINE_IN_GROUP_FAIL,
        error
    };
};

export const fetchWineInGroup = (token) => {
    return dispatch => {
        dispatch(fetchWineInGroupStart());
        axiosInstance.get('/degustator/wine-list-group', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => {
            const wineInGroup = resp.data.wineInGroup;
            const emptyOption = {
                _id: 'empty',
                id: ''
            }
            wineInGroup.unshift(emptyOption);
            dispatch(fetchWineInGroupSuccess(wineInGroup))
        })
        .catch(err=> {
            if (err.response) {
                const error = {
                    message: err.response.data.message,
                    code: err.response.status
                }
                dispatch(fetchWineInGroupFailled(error))
            }
            dispatch(fetchWineInGroupFailled(err));
            setTimeout(()=>{
                dispatch(resultsClearError())
            }, 2500)
        })
    }
}