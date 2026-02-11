'use strict';

const express = require('express');
const router = express.Router()

const simCardController = require('../controllers/simcard-controller')

// router.get('/vendors', vendorController.getAll)

router.post('/simcards', simCardController.create)

// router.delete('/vendors/:id', vendorController.delate)

module.exports = router;