const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postResult = new Schema({
    wineId: {
        type: Number,
        required: true
    },
    wineDbId: {
        type: Schema.Types.ObjectId,
        ref: 'Wine'
    },
    degId: {
        type: Schema.Types.ObjectId,
        ref: 'Degustator',
        required: true
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    eliminated: {
        type: Boolean,
        required: true
    },
    comment: {
        type: String,
    },
    wineCategory: {
        type: String,
        required: function() {return this.eliminated === false}
    },
    totalSum: {
        type: Number,
        required: function() {return this.eliminated === false}
    },
    results: {
        lookClarity: {
            type: Number,
            required: function() {return this.eliminated === false}
        },
        lookOutOfClarity: {
            type: Number,
            required: function() {return this.eliminated === false}
        },
        smellPurity: {
            type: Number,
            required: function() {return this.eliminated === false}
        },
        smellPossitiveIntesity: {
            type: Number,
            required: function() {return this.eliminated === false}
        },
        smellQuality: {
            type: Number,
            required: function() {return this.eliminated === false}
        },
        tastePurity: {
            type: Number,
            required: function() {return this.eliminated === false}
        },
        tastePossitiveIntesity: {
            type: Number,
            required: function() {return this.eliminated === false}
        },
        tasteHarmonicPersistence: {
            type: Number,
            required: function() {return this.eliminated === false}
        },
        tasteQuality: {
            type: Number, 
            required: function() {return this.eliminated === false}
        },
        generalImpresion: {
            type: Number,
            required: function() {return this.eliminated === false}
        }
    }
}, {timestamps: true});

module.exports = mongoose.model('Result', postResult);