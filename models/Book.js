'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('Book', schema({
    isbn: String,
    title: String,
    author: String,
    category: String,
    stock: Number
}));