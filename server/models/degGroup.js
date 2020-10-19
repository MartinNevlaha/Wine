const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postGroup = new Schema({
    groupName: {
        type: String,
        required: true,
        unique: true
    },
    index: {
        type: Number,
        required: true,
        unique: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Degustator'
    }],
    results: [{
        type: Schema.Types.ObjectId,
        ref: 'Result'
    }],
    wines: [{
        type: Schema.Types.ObjectId,
        ref: 'Wine'
    }]
}, {timestamps: true});

module.exports = mongoose.model('Group', postGroup);

