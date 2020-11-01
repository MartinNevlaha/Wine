const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSetting = new Schema({
    isValuesEliminated: {
        type: Boolean,
        default: true,
        required: true
    },
    isDegustationOpen: {
        type: Boolean,
        default: false,
        required: true
    },
    degustationName: {
        type: String,
        default: 'Zmeniť',
        require: true
    },
    competitionChairman: {
        type: String,
        default: 'Zmeniť',
        required: true
    }

})

module.exports = mongoose.model('Setting', postSetting);