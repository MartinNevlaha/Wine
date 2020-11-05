import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';
import { isTrueCheck } from '../../shared/utility';

export const wineGroupsClearError = () => {
    return {
        type: actionTypes.WINE_GROUPS_CLEAR_ERROR
    }
}

export const fetchEditWineGroupsStart = () => {
    return {
        type: actionTypes.FETCH_EDIT_WINE_GROUP_START
    };
};

export const fetchEditWineGroupsSuccess = (wines, groups) => {
    return {
        type: actionTypes.FETCH_EDIT_WINE_GROUP_SUCCESS,
        wines,
        groups
    }
}

export const fetchEditWineGroupsFailled = (error) => {
    return {
        type: actionTypes.FETCH_EDIT_WINE_GROUP_FAIL,
        error
    }
}

export const fetchEditWineGroups = (token) => {
    return dispatch => {
        dispatch(fetchEditWineGroupsStart());
        axiosInstance.get('/admin/wine-groups-edit', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => {
            const wines = resp.data.wines;
            const groups = resp.data.groups;
            if (isTrueCheck(wines, 'group')) {
                const epmtyGroup = {
                    _id: '',
                    groupName: '',
                }
                groups.unshift(epmtyGroup)
            }
            dispatch(fetchEditWineGroupsSuccess(wines, groups))
        })
        .catch(err => {
            if (err.response) {
                const error = {
                    message: err.response.data.message,
                    code: err.response.status
                }
                dispatch(fetchEditWineGroupsFailled(error))
            }
            dispatch(fetchEditWineGroupsFailled(err))
            setTimeout(()=>{
                dispatch(wineGroupsClearError())
            }, 2500)
        })
    }
}

export const wineGroupChanged = (choosenWineData, groupDbId, groupName) => {
    const groupData = {
        _id: groupDbId,
        groupName: groupName
    }
    return {
        type: actionTypes.WINE_GROUP_CHANGED,
        choosenWineData,
        groupData
    }
}

export const sortWineGroupsBy = (sortByProp) => {
    return {
        type: actionTypes.SORT_WINE_GROUPS_BY,
        sortByProp: sortByProp
    };
};

export const saveWineGroupsStart = () => {
    return {
        type: actionTypes.SAVE_WINE_GROUPS_START
    }
}

export const saveWineGroupsSuccess = () => {
    return {
        type: actionTypes.SAVE_WINE_GROPS_SUCCESS,
    }
}

export const saveWineGroupsFailled = (error) => {
    return {
        type: actionTypes.SAVE_WINE_GROUPS_FAIL,
        error
    }
}

export const saveWineGroups = (wineGroupsData ,token) => {
    return dispatch => {
        dispatch(saveWineGroupsStart());
        axiosInstance.put('/admin/wine-groups-edit', wineGroupsData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => dispatch(saveWineGroupsSuccess()))
        .catch(err => {
            if (err.response) {
                const error = {
                    message: err.response.data.message,
                    code: err.response.status
                }
                dispatch(saveWineGroupsFailled(error))
            }
            dispatch(saveWineGroupsFailled(err))
            setTimeout(()=>{
                dispatch(wineGroupsClearError());
            }, 2500)
        })
    }
}