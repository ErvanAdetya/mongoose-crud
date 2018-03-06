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
    due_date : Date,
    in_date : Date,
    fine: Number,
    booklist: [{
        type: schema.Types.ObjectId,
        ref: 'Book'
    }]})
    .pre('save', function() {
        this.due_date = +new Date(this.out_date) + Number(this.days)*24*60*60*1000;
    })
    .pre("update", function() {
        console.log('=====>',this._update.$set)
        this._update.$set.in_date = new Date();
        let diffDays = this._update.$set.in_date.getDate() - this._update.$set.due_date.getDate();
        console.log(Math.abs(diffDays))
        if(diffDays<0) {
            this._update.$set.fine = Math.abs(diffDays)*1000
        } else {
            this._update.$set.fine = 0;
        }
    })
)