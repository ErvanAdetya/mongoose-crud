'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('Customer', schema({
    name: String,
    memberid: String,
    address: String,
    zipcode: String,
    phone: String
}))