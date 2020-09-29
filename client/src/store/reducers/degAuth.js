import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility';

const initialState = {
        commisionNumber: '',
        degustatorNumber: '',
        loginSucces: false
}
const degustatorLogged = (state, action) => {
    return updateObj(state, {
        commisionNumber: action.comNumber,
        degustatorNumber: action.degNumber,
        loginSucces: true
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DEGUSTATOR_LOGGED:
            return degustatorLogged(state, action);
        default:
            return state;
    }
};

export default reducer;