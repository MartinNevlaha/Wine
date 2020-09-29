const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postAdmin = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "admin"
    }
},);

module.exports = mongoose.model('Admin', postAdmin);