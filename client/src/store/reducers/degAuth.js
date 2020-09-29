import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/utility';

<<<<<<< HEAD:client/src/store/reducers/degAuth.js
const initialState = {
=======
const initialState = {   
>>>>>>> 272dc2b75321a01b36985dc9559f786937f7dfbe:client/src/store/reducers/Auth.js
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
<<<<<<< HEAD:client/src/store/reducers/degAuth.js

=======
>>>>>>> 272dc2b75321a01b36985dc9559f786937f7dfbe:client/src/store/reducers/Auth.js

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DEGUSTATOR_LOGGED:
            return degustatorLogged(state, action);
        default:
            return state;
    }
};

export default reducer;