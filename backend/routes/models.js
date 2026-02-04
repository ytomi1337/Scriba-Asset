'use strict';

const express = require('express');
const router = express.Router()

const modelController = require('../controllers/model-controller')

router.get('/models', modelController.getAll)
router.post('/models', modelController.create)
router.delete('/models/:id', modelController.delate)

module.exports = router;