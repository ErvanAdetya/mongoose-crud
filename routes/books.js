'use strict'

const router = require('express').Router();
const {create ,readAll, updateOne, deleteOne} = require('../controllers/books.controller');

router.post('/', create);
router.get('/', readAll);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

module.exports = router;