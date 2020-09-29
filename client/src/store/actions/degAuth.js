import * as actionTypes from './actionTypes';

export const degustatorLogged = (comNumber, degNumber) => {
    return {
        type: actionTypes.DEGUSTATOR_LOGGED,
        comNumber: comNumber,
        degNumber: degNumber
    };
};
