const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postWineCategory = new Schema ({
    categoryName: {
        type: String,
    }
});

module.exports = mongoose.model('WineCategory', postWineCategory);