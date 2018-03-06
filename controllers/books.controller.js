'use strict'
const Book = require('../models/Book');

module.exports = {
    create: (req,res) => {
        const {isbn, title, author, category, stock} = req.body
        const newBook = new Book({
            isbn: isbn || '978-1-xxxxxx-xx-x',
            title: title || 'Untitled',
            author: author || 'Unkown',
            category: category || 'Unrated',
            stock: stock || 1
        });
        newBook
            .save()
            .then((response) => {
                return res.status(201).json({
                    message: "New Book Created!",
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
        Book
            .find()
            .exec()
            .then((books) => {
                res.status(200).send(books)
            })
            .catch((err) => {
                return res.status(500).json({
                    message: err
                })
            })
    },

    updateOne: (req, res) => {
        Book
            .findByIdAndUpdate(
                {_id: req.params.id},
                {$set: req.body}
            )
            .then((response) => {
                return res.status(200).json({
                    message: "Book Updated!",
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
        Book
            .remove({_id: req.params.id})
            .then((response) => {
                res.status(200).json({
                    message: 'Book Deleted',
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