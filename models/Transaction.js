'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('Transaction', schema({
    member: {
        type: schema.Types.ObjectId,
        ref: 'Customer'
    },
    days: Number,
    out_date : {
        type: Date,
        default: Date.now
    },
    due_date : {
        type: Date,
        default: Date.now
    },
    in_date : {
        type: Date,
        default: Date.now
    },
    fine: Number,
    booklist: [{
        type: schema.Types.ObjectId,
        ref: 'Book'
    }]
}))