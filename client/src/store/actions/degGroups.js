import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

export const groupsErrorClear = () => {
    return {
        type: actionTypes.GROUPS_ERROR_CLEAR
    }
}

export const createDegGroups = (degGroups) => {
    return {
        type: actionTypes.CREATE_DEG_GROUPS,
        degGroups: degGroups
    };
};

export const minimalisedGroup = (updatedGroup) => {
    return {
        type: actionTypes.MINIMALISED_DEG_GROUPS,
        updatedGroup: updatedGroup,
    };
};

export const fetchDegListGroupStart = () => {
    return {type: actionTypes.FETCH_DEGLIST_GROUP_START};
};

export const fetchDegListGroupSucces = (data) => {
    return {
        type: actionTypes.FETCH_DEGLIST_GROUP_SUCCES,
        fetchedData: data
    };
};

export const fetchDegListGroupFailled = (error) => {
    return {
        type: actionTypes.FETCH_DEGLIST_GROUP_FAIL,
        error: error
    };
};


export const fetchDegListGroup = (token) => {
    return dispatch => {
        axiosInstance.get('admin/degustator-list', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                dispatch(fetchDegListGroupStart());
                const degListData = resp.data.degustators;
                degListData.sort((a, b) => (a.id > b.id ) ? 1 : -1)
                dispatch(fetchDegListGroupSucces(degListData));
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(fetchDegListGroupFailled(error))
                }
                dispatch(fetchDegListGroupFailled(err))
                setTimeout(() => {
                    dispatch(groupsErrorClear())
                }, 2500)
            })
    };
};

export const saveDegGroupsStart = () => {
    return {type: actionTypes.SAVE_DEG_GROUPS_START}
};

export const saveDegGroupsSucces = (data) => {
    return {
        type: actionTypes.SAVE_DEG_GROUPS_SUCCES,
        updatedGroups: data
    }
}

export const saveDegGroupsFailled = (error) => {
    return {
        type: actionTypes.SAVE_DEG_GROUPS_FAIL,
        error: error
    }
};

export const saveDegGroups = (data, token) => {
    return dispatch => {
        dispatch(saveDegGroupsStart());
        //dispatch(deleteDegGroups());
        axiosInstance.post('admin/degustator-groups', data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                let createdGroups = [];
                resp.data.groups.forEach(group => {
                    let newGroup = null;
                    newGroup = {
                        ...group,
                        isMinimalised: false
                    }
                    createdGroups.push(newGroup);
                })
                dispatch(saveDegGroupsSucces(createdGroups));
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(saveDegGroupsFailled(error))
                }
                dispatch(saveDegGroupsFailled(err))
                setTimeout(()=>{
                    dispatch(groupsErrorClear())
                }, 2500)
            })
    };
};

export const dragDegFromList = (id) => {
    return {
        type: actionTypes.DRAG_DEG_FROM_LIST,
        id: id 
    };
};

export const dropDegToGroup = (index ,data) => {
    return {
        type: actionTypes.DROP_DEG_TO_GROUP,
        data: data,
        index: index
    };
};

export const dragDegFromGroup = (index ,data) => {
    return {
        type: actionTypes.DRAG_DEG_FROM_GROUP,
        data: data,
        index: index
    };
};

export const fetchDegGroupsStart = () => {
    return {
        type: actionTypes.FETCH_DEG_GROUPS_START
    };
};

export const fetchDegGroupsSucces = (data) => {
    return {
        type: actionTypes.FETCH_DEG_GROUPS_SUCCES,
        loadedData: data
    };
};

export const fetchDegGroupsFailled = (error) => {
    return {
        type: actionTypes.FETCH_DEG_GROUPS_FAIL,
        error: error
    };
};


export const fetchDegGroups = (token) => {
    return dispatch => {
        dispatch(fetchDegGroupsStart());
        axiosInstance.get('admin/degustator-groups', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => {
                let groupData = [];
                resp.data.groups.forEach(group => {
                    let newGroup = null;
                    newGroup = {
                        ...group,
                        isMinimalised: false
                    }
                    groupData.push(newGroup);
                })
                groupData.sort((a, b) => (a.groupName > b.groupName ) ? 1 : -1)
                dispatch(fetchDegGroupsSucces(groupData));
                if (!groupData.length) {
                    dispatch(fetchDegListGroup(token));
                }
            })
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(fetchDegGroupsFailled(error))
                }
                dispatch(fetchDegGroupsFailled(err))
                setTimeout(()=>{
                    dispatch(groupsErrorClear())
                }, 2500)
            }) 
    }
}

export const deleteGroupsInit = () => {
    return {
        type: actionTypes.DELETE_GROUPS_INIT
    };
};

export const deleteGroupsCanceled = () => {
    return {
        type: actionTypes.DELETE_GROUPS_CANCELED
    };
};

export const deleteGroupsStart = () => {
    return {
        type: actionTypes.DELETE_GROUPS_START
    };
};

export const deleteGroupsSucces = () => {
    return {
        type: actionTypes.DELETE_GROUPS_SUCCES
    };
};

export const deleteGroupsFailled = (error) => {
    return {
        type: actionTypes.DELETE_GROUPS_FAIL,
        error: error
    };
};


export const deleteGroups = (token) => {
    return dispatch => {
        dispatch(deleteGroupsStart());
        axiosInstance.delete('admin/degustator-groups', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => dispatch(deleteGroupsSucces()))
            .catch(err => {
                if (err.response) {
                    const error = {
                        message: err.response.data.message,
                        code: err.response.status
                    }
                    dispatch(deleteGroupsFailled(error))
                }
                dispatch(deleteGroupsFailled(err))
                setTimeout(()=>{
                    dispatch(groupsErrorClear())
                }, 2500)
            })
    }
}