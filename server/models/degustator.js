const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postDegustator = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    password: {
        type: String,
        required: true,
        default: "default"
    },
    role: {
        type: String,
        default: 'degustator',
    },
    results: [{
        type: Schema.Types.ObjectId,
        ref: 'Result'
    }]

}, {timestamps: true});

module.exports = mongoose.model('Degustator', postDegustator);