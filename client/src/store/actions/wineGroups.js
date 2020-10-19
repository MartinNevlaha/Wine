import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-instance';

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
            const wines = resp.data.wines.map(wine => {
                return {
                    ...wine,
                    isTouch: false
                }
            })
            const epmtyGroup = {
                _id: '',
                groupName: '',
            }
            const groups = resp.data.groups;
            groups.unshift(epmtyGroup)
            dispatch(fetchEditWineGroupsSuccess(wines, groups))
        })
        .catch(err => dispatch(fetchEditWineGroupsFailled(err)))
    }
}

export const wineGroupChanged = (choosenWineData, groupDbId) => {
    return {
        type: actionTypes.WINE_GROUP_CHANGED,
        choosenWineData,
        groupDbId
    }
}