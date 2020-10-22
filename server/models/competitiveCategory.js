const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postCompetitiveCategory = new Schema ({
    categoryName: {
        type: String,
    },
    wines: [{
        type: Schema.Types.ObjectId,
        ref: 'Wine'
    }]
});

module.exports = mongoose.model('CompetitiveCategory', postCompetitiveCategory);