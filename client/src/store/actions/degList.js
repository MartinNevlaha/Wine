import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const degListErrorClear = () => {
    return {
        type: actionTypes.DEG_LIST_ERROR_CLEAR
    }
}

export const clearDegListMessage = () => {
    return {
        type: actionTypes.CLEAR_DEG_LIST_MESSAGE
    }
}

export const addDegStart = () => {
    return {
        type: actionTypes.ADD_DEGUSTATOR_START
    };
};
export const addDegSucces = (id, degData, message) => {
    return {
        type: actionTypes.ADD_DEGUSTATOR_SUCCES,
        _id: id,
        degData,
        message
    };
};

export const addDegFailled = (error) => {
    return {
        type: actionTypes.ADD_DEGUSTATOR_FAIL,
        error: error
   };
};

export const addDegustator = (data, token) => {
    return dispatch => {
        dispatch(addDegStart());
        axiosInstance.post('admin/degustator-list', data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch(addDegSucces(response.data._id, data, response.data.message));
                setTimeout(()=>{
                    dispatch(clearDegListMessage())
                }, 2500)
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(addDegFailled(error));
                }
                dispatch(addDegFailled(err));
                setTimeout(() => {
                    dispatch(degListErrorClear())
                }, 2500)
            })
    };
};

export const databaseDegDeleteInit = () => {
    return {
        type: actionTypes.DATABASE_DEG_DELETE_INIT
    };
};

export const databaseDegDeleteCanceled = () => {
    return {
        type: actionTypes.DATABASE_DEG_DELETE_CANCELED
    };
};

export const databaseDegDeleteStart = () => {
    return {
        type: actionTypes.DATABASE_DEG_DELETE_START
    };
};
export const databaseDegDeleteSucces = (message) => {
    return {
        type: actionTypes.DATABASE_DEG_DELETE_SUCCES,
        message
    };
};
export const databaseDegDeleteFailled = (error) => {
    return {
        type: actionTypes.DATABASE_DEG_DELETE_FAIL,
        error: error
    };
};

export const databaseDegDelete = (token) => {
    return dispatch => {
        dispatch(databaseDegDeleteStart());
        axiosInstance.delete('admin/degustator-list', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch(databaseDegDeleteSucces(response.data.message))
                setTimeout(()=>{
                    dispatch(clearDegListMessage())
                }, 2500)
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(databaseDegDeleteFailled(error))
                }
                dispatch(databaseDegDeleteFailled(err))
                setTimeout(() => {
                    dispatch(degListErrorClear())
                }, 2500)
            })
    };
};

export const databaseDegImportInit = () => {
    return {
        type: actionTypes.DATABASE_DEG_IMPORT_INIT
    };
};
export const databaseDegImportCanceled = () => {
    return {
        type: actionTypes.DATABASE_DEG_IMPORT_CANCELED
    };
};
export const databaseDegImportStart = () => {
    return {
        type: actionTypes.DATABASE_DEG_IMPORT_START
    };
};
export const databaseDegImportSucces = (importedDegData, message) => {
    return {
        type: actionTypes.DATABASE_DEG_IMPORT_SUCCES,
        degData: importedDegData,
        message
    };
};
export const databaseDegImportFailled = (error) => {
    return {
        type: actionTypes.DATABASE_DEG_IMPORT_FAIL,
        error: error
    };
};
export const databaseDegImport = (degData, token) => {
    return dispatch => {
        dispatch(databaseDegImportStart());
        axiosInstance.post('admin/degustator-list/import', degData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                dispatch(databaseDegImportSucces(resp.data.degustators, resp.data.message));
                setTimeout(()=>{
                    dispatch(clearDegListMessage())
                }, 2500)
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(databaseDegImportFailled(error))
                }
                dispatch(databaseDegImportFailled(err))
                setTimeout(()=>{
                    dispatch(degListErrorClear())
                }, 2500)
            })
    }
}

export const fetchDegListStart = () => {
    return {
        type: actionTypes.FETCH_DEGLIST_START
    };
};

export const fetchDegListSucces = (degData) => {
    return {
        type: actionTypes.FETCH_DEGLIST_SUCCES,
        degData: degData
    };
};
export const fetchDegListFailled = (error) => {
    return {
        type: actionTypes.FETCH_DEGLIST_FAIL,
        error: error
    };
};

export const fetchDegList = (token) => {
    return dispatch => {
        axiosInstance.get('admin/degustator-list', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                dispatch(fetchDegListStart());          
                const degListData = [];
                for (let key in resp.data.degustators) {
                    degListData.push({
                        ...resp.data.degustators[key],
                        isEditable: false
                    });
                }
                degListData.sort((a, b) => (a.id > b.id ) ? 1 : -1)
                dispatch(fetchDegListSucces(degListData));
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(fetchDegListFailled(error));
                }
                dispatch(fetchDegListFailled(err));
                setTimeout(()=> {
                    dispatch(degListErrorClear())
                }, 2500)
            })
    };
};

export const sortDegBy = (sortByProp) => {
    return {
        type: actionTypes.SORT_DEG_BY,
        sortByProp: sortByProp
    };
};

export const editDeg = (chossenDegData) => {
    return {
        type: actionTypes.EDIT_DEG,
        chossenDegData: chossenDegData
    };
};

export const saveEditDegStart = () => {
    return {
        type: actionTypes.SAVE_EDIT_DEG_START
    };
};

export const saveEditDegSucces = (editedDegData, index, message) => {
    return {
        type: actionTypes.SAVE_EDIT_DEG_SUCCES,
        editedDegData: editedDegData,
        index: index,
        message
    };
};

export const saveEditDegFailled = (error) => {
    return {
        type: actionTypes.SAVE_EDIT_DEG_FAIL,
        error: error
    };
};
export const saveEditDeg = (_id, index, editedDegData, token) => {
    return dispatch => {
        dispatch(saveEditDegStart());
        axiosInstance.put('admin/degustator-list/' + _id, editedDegData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                editedDegData._id = _id;
                dispatch(saveEditDegSucces(editedDegData, index, resp.data.message));
                setTimeout(()=>{
                    dispatch(clearDegListMessage())
                }, 2500)
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    saveEditDegFailled(error)
                }
                saveEditDegFailled(err)
                setTimeout(()=>{
                    dispatch(degListErrorClear())
                }, 2500)
            })
    };
};

export const deleteDegInit = () => {
    return {
        type: actionTypes.DELETE_DEG_INIT
    };
};

export const deleteDegCanceled = () => {
    return {
        type: actionTypes.DELETE_DEG_CANCELED
    };
};

export const deleteDegSucces = (degListData, message) => {
    return {
        type: actionTypes.DELETE_DEG_SUCCES,
        degListData: degListData,
        message
    };
};

export const deleteDegStart = () => {
    return {
        type: actionTypes.DELETE_DEG_START
    };
};

export const deleteDegFailled = (error) => {
    return {
        type: actionTypes.DELETE_DEG_FAIL,
        error: error
    };
};

export const deleteDeg = (_id, updatedDegList, token) => {
    return dispatch => {
        dispatch(deleteDegStart());
        axiosInstance.delete('admin/degustator-list/' + _id, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                dispatch(deleteDegSucces(updatedDegList, res.data.message));
                setTimeout(()=>{
                    dispatch(clearDegListMessage())
                }, 2500)
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(deleteDegFailled(error))
                }
                dispatch(deleteDegFailled(err))
                setTimeout(()=>{
                    dispatch(degListErrorClear());
                }, 2500)
            })
    };
};




