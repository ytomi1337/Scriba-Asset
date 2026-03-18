'use strict';

const express = require('express');
const router = express.Router()

const phonesController = require('../controllers/phones-controller')
const ensureAuthenticated = require('../middleware/isAuthenticated');

// router.get('/vendors', vendorController.getAll)

router.get('/phones', ensureAuthenticated , phonesController.getAllPhones)
router.post('/phones', ensureAuthenticated , phonesController.create)
router.post('/phones/assign', ensureAuthenticated, phonesController.assign)

// router.delete('/vendors/:id', vendorController.delate)

module.exports = router;