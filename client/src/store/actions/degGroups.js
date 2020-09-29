import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

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

export const fetchDegListGroup = () => {
    return dispatch => {
        axiosInstance.get('admin/degustator-list')
            .then(resp => {
                dispatch(fetchDegListGroupStart());
                const degListData = resp.data.degustators;
                degListData.sort((a, b) => (a.id > b.id ) ? 1 : -1)
                dispatch(fetchDegListGroupSucces(degListData));
            })
            .catch(error => dispatch(fetchDegListGroupFailled(error)))
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
export const saveDegGroups = (data) => {
    return dispatch => {
        dispatch(saveDegGroupsStart());
        //dispatch(deleteDegGroups());
        axiosInstance.post('/admin/degustator-groups', data)
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
            .catch(error => {
                console.log(error)
                dispatch(saveDegGroupsFailled(error))
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

export const fetchDegGroups = () => {
    return dispatch => {
        dispatch(fetchDegGroupsStart());
        axiosInstance.get('admin/degustator-groups')
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
                    dispatch(fetchDegListGroup());
                }
            })
            .catch(error => {
                dispatch(fetchDegGroupsFailled(error))
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

export const deleteGroups = () => {
    return dispatch => {
        dispatch(deleteGroupsStart());
        axiosInstance.delete('admin/degustator-groups')
            .then(res => dispatch(deleteGroupsSucces()))
            .catch(err => dispatch(deleteGroupsFailled(err)))
    }
}