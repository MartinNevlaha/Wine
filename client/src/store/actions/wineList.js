import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const wineListErrorClear = () => {
    return {
        type: actionTypes.WINE_LIST_CLEAR_ERROR
    }
}
export const clearWineListMessage = () => {
    return {
        type: actionTypes.CLEAR_WINE_LIST_MESSAGE
    }
}

export const addWineStart = () => {
    return {
        type: actionTypes.ADD_WINE_START
    };
};
export const addWineSucces = (id, wineData, message) => {
    return {
        type: actionTypes.ADD_WINE_SUCCES,
        _id: id,
        wineData,
        message
    };
};
export const addWineFailed = (error) => {
    return {
        type: actionTypes.ADD_WINE_FAIL,
        error: error
    };
};

export const addWine = (data, token) => {
    return dispatch => {
        dispatch(addWineStart());
        axiosInstance.post('admin/wine-list', data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch(addWineSucces(response.data._id, data, response.data.message));
                setTimeout(() => {
                    dispatch(clearWineListMessage())
                }, 2500)
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(addWineFailed(error));
                }
                dispatch(addWineFailed(err));
                setTimeout(()=>{
                    dispatch(wineListErrorClear())
                }, 2500)
            })
    }
}

export const fetchWineListStart = () => {
    return {
        type: actionTypes.FETCH_WINE_LIST_START
    };
};

export const fetchWineListSucces = (wineListData) => {
    return {
        type: actionTypes.FETCH_WINE_LIST_SUCCES,
        wineListData: wineListData,
    }
};

export const fetchWineListFailed = (error) => {
    return {
        type: actionTypes.FETCH_WINE_LIST_FAIL,
        error: error
    };
};

export const fetchWineList = (token) => {
    return dispatch => {
        dispatch(fetchWineListStart());
        axiosInstance.get('admin/wine-list', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                const wineListData = [];
                for (let key in resp.data.wines) {
                    wineListData.push({
                        ...resp.data.wines[key],
                        isEditable: false
                    });
                }
                wineListData.sort((a, b) => (a.id > b.id ) ? 1 : -1)
                dispatch(fetchWineListSucces(wineListData));
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(fetchWineListFailed(error));
                }
                dispatch(fetchWineListFailed(err));
                setTimeout(()=>{
                    dispatch(wineListErrorClear())
                }, 2500);
            })
        };
};

export const deteleWineStart = () => {
    return {
        type: actionTypes.DELETE_WINE_START
    };
};

export const deleteWineFailed = (error) => {
    return {
        type: actionTypes.DELETE_WINE_FAIL,
        error: error
    };
};

export const deleteWineSucces = (wineListData, message) => {
    return {
        type: actionTypes.DELETE_WINE_SUCCES,
        wineListData: wineListData,
        message
    };
};

export const deleteWine = (_id, updatedWineList, token) => {
    return dispatch => {
        dispatch(deteleWineStart());
        axiosInstance.delete('admin/wine-list/' + _id, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                dispatch(deleteWineSucces(updatedWineList, resp.data.message))
                setTimeout(() => {
                    dispatch(clearWineListMessage())
                }, 2500)
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(deleteWineFailed(error))
                }
                dispatch(deleteWineFailed(err))
                setTimeout(wineListErrorClear())
            })
    };
};

export const editWine = (choosenWineData) => {
    return {
        type: actionTypes.EDIT_WINE,
        choosenWineData: choosenWineData
    };
};

export const saveEditWineStart = () => {
    return {
        type: actionTypes.SAVE_EDIT_WINE_START
    };
};

export const saveEditWineFailed = (error) => {
    return {
        type: actionTypes.SAVE_EDIT_WINE_FAIL,
        error: error
    };
};
export const saveEditWineSucces = (editedWineData, index, message) => {
    return {
        type: actionTypes.SAVE_EDIT_WINE_SUCCES,
        index: index,
        editedWineData: editedWineData,
        message
    };
};

export const saveEditWine = (_id, index, editedWineData, token) => {
    return dispatch => {
        dispatch(saveEditWineStart());
        axiosInstance.put('admin/wine-list/' + _id, editedWineData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                editedWineData._id = _id;
                dispatch(saveEditWineSucces(editedWineData, index, response.data.message));
                setTimeout(() => {
                    dispatch(clearWineListMessage())
                }, 2500)
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    saveEditWineFailed(error)
                }
                saveEditWineFailed(err)
                setTimeout(()=>{
                    dispatch(wineListErrorClear())
                }, 2500)
            })
    };
};

export const sortWineBy = (sortByProp) => {
    return {
        type: actionTypes.SORT_WINE_BY,
        sortByProp: sortByProp
    };
};

export const databaseDeleteStart = () => {
    return {
        type: actionTypes.DATABASE_DELETE_START
    };
};

export const databaseDeleteSucces = (message) => {
    return {
        type: actionTypes.DATABASE_DELETE_SUCCES,
        message
    };
};
export const databaseDeleteFailled = (error) => {
    return {
        type: actionTypes.DATABASE_DELETE_FAIL,
        error: error
    };
};

export const databaseDelete = (token) => {
    return dispatch => {
        dispatch(databaseDeleteStart());
        axiosInstance.delete('admin/wine-list', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch(databaseDeleteSucces(response.data.message))
                setTimeout(() => {
                    dispatch(clearWineListMessage())
                }, 2500)
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(databaseDeleteFailled(error))
                }
                dispatch(databaseDeleteFailled(err))
                setTimeout(()=>{
                    dispatch(wineListErrorClear())
                }, 2500)
            })
    };
};
export const databaseImportInit = () => {
    return {
        type: actionTypes.DATABASE_IMPORT_INIT
    }
}
export const databaseImportStart = () => {
    return {
        type: actionTypes.DATABASE_IMPORT_START
    }
}
export const databaseImportSucces = (importedWineList, message) => {
    return {
        type: actionTypes.DATABASE_IMPORT_SUCCES,
        wineData: importedWineList,
        message
    };
};

export const databaseImportFailed = (error) => {
    return {
        type: actionTypes.DATABASE_IMOPORT_FAIL,
        error: error
    };
};


export const databaseImport = (wineData, token) => {
    return dispatch => {
        dispatch(databaseImportStart());
        axiosInstance.post('admin/wine-list/import', wineData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                dispatch(databaseImportSucces(resp.data.wines, resp.data.message))
                setTimeout(() => {
                    dispatch(clearWineListMessage())
                }, 2500)
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(databaseImportFailed(error))
                }
                dispatch(databaseImportFailed(err))
                setTimeout(()=>{
                    dispatch(wineListErrorClear())
                }, 2500)
            })
    };
};