'use strict';

const express = require('express');
const router = express.Router()

const ensureAuthenticated = require('../middleware/isAuthenticated');
const requireRole = require('../middleware/requireRole');

const modelController = require('../controllers/model-controller')

router.get('/models',requireRole('administrator'), modelController.getAll)
router.post('/models',requireRole('administrator'), modelController.create)
router.delete('/models/:id',requireRole('administrator'), modelController.delate)

module.exports = router;