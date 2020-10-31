const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postWine = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    competitiveCategory: {
        type: String,
        required: true
    },
    competitiveCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'CompetitiveCategory'
    },
    name: {
        type: String,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    vintage: {
        type: Number,
        required: true
    },
    clasification: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    character: {
        type: String,
        required: true
    },
    finalResult: {
        type: Number,
        default: 0    
    },
    wineCategory: {
        type: String,
        default: "Nehodnotené"
    },
    results: [{
        type: Schema.Types.ObjectId,
        ref: 'Result'
    }],
    totalResults: [{
        type: Number,
        min: 0,
        max: 100
    }],
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    isComplete: {
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Wine', postWine);