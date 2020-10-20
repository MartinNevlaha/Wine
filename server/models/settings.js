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
        default: true,
        required: true
    }
})

module.exports = mongoose.model('Setting', postSetting);