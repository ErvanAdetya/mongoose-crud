'use strict'
const Transaction = require('../models/Transaction');

module.exports = {
    create: (req,res) => {
        const {member, days, out_date, booklist} = req.body;
        const newTransaction = new Transaction({
            member: member || '5a9e6edb3320151b49e960b0',
            days: days || 3,
            out_date: out_date,
            booklist: booklist || []
        });
        newTransaction
            .save()
            .then((response) => {
                return res.status(201).json({
                    message: "New Transaction Created!",
                    response
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    message: err
                })
            })
    },

    readAll: (req, res) => {
        Transaction
            .find()
            .populate('member')
            .populate('booklist')
            .exec()
            .then((transactions) => {
                res.status(200).send(transactions)
            })
            .catch((err) => {
                return res.status(500).json({
                    message: err
                })
            })
    },

    updateOne: (req, res) => {
        Transaction
            .findById(req.params.id)
            .then((trans) => {
                if(trans) {
                    req.body.due_date = trans.due_date
                    Transaction
                        .update(
                            {_id: req.params.id},
                            {$set: req.body}
                        )
                        .then((data) => res.send(trans))
                } else {reject()}
            })
            .catch((err) => {
                return res.status(500).json({
                    message: 'Transaction not exist'
                })
            })
        // Transaction
        //     .findByIdAndUpdate(
        //         {_id: req.params.id},
        //         {$set: req.body}
        //     )
        //     .then((response) => {
        //         return res.status(200).json({
        //             message: "Transaction Data Updated!",
        //             response
        //         })
        //     })
        //     .catch((err) => {
        //         return res.status(500).json({
        //             message: err
        //         })
        //     })
    },

    deleteOne: (req, res) => {
        Transaction
            .remove({_id: req.params.id})
            .then((response) => {
                res.status(200).json({
                    message: 'Transaction data Deleted',
                    response
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    message: err
                })
            })
    }
}