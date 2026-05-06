'use strict';

const express = require('express');
const router = express.Router()

const ensureAuthenticated = require('../middleware/isAuthenticated');
const requireRole = require('../middleware/requireRole');

const categoryController = require('../controllers/category-controller');

router.get('/categories', requireRole('administrator'), categoryController.getAll)
router.post('/categories', requireRole('administrator'), categoryController.create)
router.delete('/categories/:id', requireRole('administrator'), categoryController.delate)

module.exports = router;