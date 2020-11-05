const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postCompetitiveCategory = new Schema ({
    categoryName: {
        type: String,
    },
    isFinalResultWrite: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('CompetitiveCategory', postCompetitiveCategory);