import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const addDegStart = () => {
    return {
        type: actionTypes.ADD_DEGUSTATOR_START
    };
};
export const addDegSucces = (id, degData) => {
    return {
        type: actionTypes.ADD_DEGUSTATOR_SUCCES,
        _id: id,
        degData: degData
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
                dispatch(addDegSucces(response.data._id, data));
            })
            .catch(error => {
                dispatch(addDegFailled(error));
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
export const databaseDegDeleteSucces = () => {
    return {
        type: actionTypes.DATABASE_DEG_DELETE_SUCCES,
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
            .then(response => dispatch(databaseDegDeleteSucces()))
            .catch(error => dispatch(databaseDegDeleteFailled(error)))
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
export const databaseDegImportSucces = (importedDegData) => {
    return {
        type: actionTypes.DATABASE_DEG_IMPORT_SUCCES,
        degData: importedDegData
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
        dispatch(databaseDegDelete(token));
        dispatch(databaseDegImportStart());
        axiosInstance.post('admin/degustator-list/import', degData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                console.log(resp.data.degustators)
                dispatch(databaseDegImportSucces(resp.data.degustators))
            })
            .catch(error => dispatch(databaseDegImportFailled(error)))
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
            .catch(error => {
                dispatch(fetchDegListFailled(error));
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

export const saveEditDegSucces = (editedDegData, index) => {
    return {
        type: actionTypes.SAVE_EDIT_DEG_SUCCES,
        editedDegData: editedDegData,
        index: index
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
                console.log(resp.data)
                editedDegData._id = _id;
                dispatch(saveEditDegSucces(editedDegData, index));
            })
            .catch(error => saveEditDegFailled(error))
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

export const deleteDegSucces = (degListData) => {
    return {
        type: actionTypes.DELETE_DEG_SUCCES,
        degListData: degListData
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
            .then(res => dispatch(deleteDegSucces(updatedDegList)))
            .catch(error => dispatch(deleteDegFailled(error)))
    };
};



