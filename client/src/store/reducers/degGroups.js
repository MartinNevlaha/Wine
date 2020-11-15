import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility';
import updateArray from 'react-addons-update';

const initialState = {
    degListGroups: [],
    degGroups: [],
    loading: false,
    isDeleting: false,
    isDeleteSucces: false,
    error: null,
    message: null,
    isSucces: false
};

const createDegGroup = (state, action) => {
    return updateObj(state, {degGroups: action.degGroups})
};

const clearDegGroupsMessage = (state, action) => {
    return updateObj(state, {message: null, isSucces: false})
}

const minimalisedGroup = (state, action) => {
    const index = action.updatedGroup.index;
    return updateArray(state, {
        degGroups: {
            [index]: {
                isMinimalised: {$set: !action.updatedGroup.isMinimalised}
            }
        }
    })
};

const fetchDegListGroupStart = (state, action) => {
    return updateObj(state, {loading: true, error: null})
};

const fetchDegListGroupSucces = (state, action) => {
    return updateObj(state, {
        loading: false,
        degListGroups: action.fetchedData
    })
};

const fetchDegListGroupFaileed = (state, action) => {
    return updateObj(state, {loading: false, error: action.error})
};



const saveDegGroupsStart = (state, action) => {
    return updateObj(state, {loading: true, error: null})
};

const saveDegGroupsSucces = (state, action) => {
    return updateObj(state, {
        loading: false,
        degGroups: action.updatedGroups,
        message: action.message,
        isSucces: true
    })
};

const saveDegGroupsFailled = (state, action) => {
    return updateObj(state, {loading: false, error: action.error})
};


const dragDegFromList = (state, action) => {
    const oldDegGroupList = [...state.degListGroups];
    const updatedGroupList = oldDegGroupList.filter(deg => deg._id !== action.id)
    return updateObj(state, {degListGroups: updatedGroupList})
};

const dropDegToGroup = (state, action) => {
    return updateArray(state, {
        degGroups: {
            [action.index]: {$set: action.data}
        }
    })
}
const dragFromGroup = (state, action) => {
    const updateGroup = {
        ...state.degGroups[action.index],
        items: action.data
    }
    return updateArray(state, {
        degGroups: {
            [action.index]: {$set: updateGroup}
        }
    })
}
const fetchDegGroupsStart = (state, action) => {
    return updateObj(state, {loading: true, error: null})
}

const fetchDegGroupsSucces = (state, action) => {
    return updateObj(state, {
        loading: false,
        degGroups: action.loadedData
    })
}

const fetchDegGroupsFailled = (state, action) => {
    return updateObj(state, {loading: false, error: action.error})
}



const deleteGroupsInit = (state, action) => {
    return updateObj(state, {
        isDeleting: true,
        isDeleteSucces: false
    })
}

const deleteGroupsCanceled = (state, action) => {
    return updateObj(state, {isDeleting: false})
}

const deleteGroupsStart = (state, action) => {
    return updateObj(state, {
        loading: true,
        isDeleting: false,
        error: null
    })
}

const deleteGroupsSucces = (state, action) => {
    return updateObj(state, {
        loading: false,
        degGroups: [],
        isDeleteSucces: true,
        isSucces: true,
        message: action.message
    })
}

const deleteGroupsFailled = (state, action) => {
    return updateObj(state, {loading: false, error: action.error})
}

const groupsErrorClear = (state, action) => {
    return updateObj(state, {error: null})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_DEG_GROUPS:
            return createDegGroup(state, action);
        case actionTypes.MINIMALISED_DEG_GROUPS:
            return minimalisedGroup(state, action);
        case actionTypes.FETCH_DEGLIST_GROUP_START:
            return fetchDegListGroupStart(state, action);
        case actionTypes.FETCH_DEGLIST_GROUP_SUCCES:
            return fetchDegListGroupSucces(state, action);
        case actionTypes.FETCH_DEGLIST_GROUP_FAIL:
            return fetchDegListGroupFaileed(state, action);
        case actionTypes.SAVE_DEG_GROUPS_START:
            return saveDegGroupsStart(state, action);
        case actionTypes.SAVE_DEG_GROUPS_SUCCES:
            return saveDegGroupsSucces(state, action);
        case actionTypes.SAVE_DEG_GROUPS_FAIL:
            return saveDegGroupsFailled(state, action);
        case actionTypes.DRAG_DEG_FROM_LIST:
            return dragDegFromList(state, action);
        case actionTypes.DROP_DEG_TO_GROUP:
            return dropDegToGroup(state, action);
        case actionTypes.DRAG_DEG_FROM_GROUP:
            return dragFromGroup(state, action);
        case actionTypes.FETCH_DEG_GROUPS_START:
            return fetchDegGroupsStart(state, action);
        case actionTypes.FETCH_DEG_GROUPS_SUCCES:
            return fetchDegGroupsSucces(state, action);
        case actionTypes.FETCH_DEG_GROUPS_FAIL:
            return fetchDegGroupsFailled(state, action);;
        case actionTypes.DELETE_GROUPS_INIT:
            return deleteGroupsInit(state, action);
        case actionTypes.DELETE_GROUPS_CANCELED:
            return deleteGroupsCanceled(state, action);
        case actionTypes.DELETE_GROUPS_START:
            return deleteGroupsStart(state, action);
        case actionTypes.DELETE_GROUPS_SUCCES:
            return deleteGroupsSucces(state, action);
        case actionTypes.DELETE_GROUPS_FAIL:
            return deleteGroupsFailled(state, action);
        case actionTypes.GROUPS_ERROR_CLEAR:
            return groupsErrorClear(state, action)
        case actionTypes.CLEAR_DEG_GROUPS_MESSAGE:
            return clearDegGroupsMessage(state, action)
        default: 
            return state;
    };
};

export default reducer;
