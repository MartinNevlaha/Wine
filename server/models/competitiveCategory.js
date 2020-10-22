const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postCompetitiveCategory = new Schema ({
    categoryName: {
        type: String,
    }
});

module.exports = mongoose.model('CompetitiveCategory', postCompetitiveCategory);