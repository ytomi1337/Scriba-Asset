'use strict';

const express = require('express');
const router = express.Router()

const categoryController = require('../controllers/category-controller');

router.get('/categories', categoryController.getAll)
router.post('/categories', categoryController.create)
router.delete('/categories/:id', categoryController.delate)

module.exports = router;