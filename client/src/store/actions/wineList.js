import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const addWineStart = () => {
    return {
        type: actionTypes.ADD_WINE_START
    };
};
export const addWineSucces = (id, wineData) => {
    return {
        type: actionTypes.ADD_WINE_SUCCES,
        _id: id,
        wineData: wineData
    };
};
export const addWineFailed = (error) => {
    return {
        type: actionTypes.ADD_WINE_FAIL,
        error: error
    };
};

export const addWine = (data, token) => {
    console.log(token)
    return dispatch => {
        dispatch(addWineStart());
        axiosInstance.post('admin/wine-list', data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch(addWineSucces(response.data._id, data));
            })
            .catch(error => {
                dispatch(addWineFailed(error));
                console.log(error)
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
        wineListData: wineListData
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
            .catch(error => {
                dispatch(fetchWineListFailed(error));
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

export const deleteWineSucces = (wineListData) => {
    return {
        type: actionTypes.DELETE_WINE_SUCCES,
        wineListData: wineListData
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
            .then(resp => dispatch(deleteWineSucces(updatedWineList)))
            .catch(error => dispatch(deleteWineFailed(error)))
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
export const saveEditWineSucces = (editedWineData, index) => {
    return {
        type: actionTypes.SAVE_EDIT_WINE_SUCCES,
        index: index,
        editedWineData: editedWineData
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
                dispatch(saveEditWineSucces(editedWineData, index));
            })
            .catch(error => saveEditWineFailed(error))
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

export const databaseDeleteSucces = () => {
    return {
        type: actionTypes.DATABASE_DELETE_SUCCES
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
            .then(response => dispatch(databaseDeleteSucces()))
            .catch(error=> dispatch(databaseDeleteFailled(error)))
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
export const databaseImportSucces = (importedWineList) => {
    return {
        type: actionTypes.DATABASE_IMPORT_SUCCES,
        wineData: importedWineList,
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
        dispatch(databaseDelete(token));
        dispatch(databaseImportStart());
        axiosInstance.post('admin/wine-list/import', wineData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                console.log(resp.data.wines)
                dispatch(databaseImportSucces(resp.data.wines))
            })
            .catch(error => dispatch(databaseImportFailed(error)))
    };
};