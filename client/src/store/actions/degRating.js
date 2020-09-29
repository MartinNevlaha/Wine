import * as actionTypes from './actionTypes';

export const getWineId = (id) => {
    return {
        type: actionTypes.WINE_ID,
        wineId: id
    }
};

export const getComment = (comment) => {
    return {
        type: actionTypes.DEGUSTATOR_COMMENT,
        comment: comment
    }
}

export const getEliminatedStatus = (status) => {
    return {
        type: actionTypes.WINE_ELIMINATE,
        status: status
    }
};

export const getDegustatorBtnPress = (btnType, value) => {
    return {
        type: actionTypes.DEGUSTATOR_PRESS_BTN,
        value: value,
        btnType: btnType
    }
};
