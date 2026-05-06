'use strict';

const express = require('express');
const router = express.Router()

const ensureAuthenticated = require('../middleware/isAuthenticated');
const requireRole = require('../middleware/requireRole');

const vendorController = require('../controllers/vendor-controller')

router.get('/vendors', vendorController.getAll)

router.post('/vendors', vendorController.create)

router.delete('/vendors/:id', vendorController.delate)

module.exports = router;