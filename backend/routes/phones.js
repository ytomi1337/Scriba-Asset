'use strict';

const express = require('express');
const router = express.Router()

const phonesController = require('../controllers/phones-controller')

// router.get('/vendors', vendorController.getAll)

router.post('/phones', phonesController.create)

// router.delete('/vendors/:id', vendorController.delate)

module.exports = router;