'use strict'
const Customer = require('../models/Customer');

module.exports = {
    create: (req,res) => {
        const {name, memberid, address, zipcode, phone} = req.body
        const newCustomer = new Customer({
            name: name || 'No name',
            memberid: memberid || 'CLXXX',
            address: address || 'Nomad',
            zipcode: zipcode || 'xxxxx',
            phone: phone || '911'
        });
        newCustomer
            .save()
            .then((response) => {
                return res.status(201).json({
                    message: "New Customer Created!",
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
        Customer
            .find()
            .exec()
            .then((customers) => {
                res.status(200).send(customers)
            })
            .catch((err) => {
                return res.status(500).json({
                    message: err
                })
            })
    },

    updateOne: (req, res) => {
        Customer
            .findByIdAndUpdate(
                {_id: req.params.id},
                {$set: req.body}
            )
            .then((response) => {
                return res.status(200).json({
                    message: "Customer Data Updated!",
                    response
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    message: err
                })
            })
    },

    deleteOne: (req, res) => {
        Customer
            .remove({_id: req.params.id})
            .then((response) => {
                res.status(200).json({
                    message: 'Customer data Deleted',
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