'use strict';

const express = require('express');
const router = express.Router()

const ensureAuthenticated = require('../middleware/isAuthenticated');
const requireRole = require('../middleware/requireRole');

const simCardController = require('../controllers/simcard-controller')

// router.get('/vendors', vendorController.getAll)

router.post('/simcards', requireRole('administrator'), simCardController.create)

// router.delete('/vendors/:id', vendorController.delate)

module.exports = router;