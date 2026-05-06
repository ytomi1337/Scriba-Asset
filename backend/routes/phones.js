'use strict';

const express = require('express');
const router = express.Router()

const phonesController = require('../controllers/phones-controller')

const ensureAuthenticated = require('../middleware/isAuthenticated');
const requireRole = require('../middleware/requireRole');

// router.get('/vendors', vendorController.getAll)

router.get('/phones', ensureAuthenticated, requireRole('administrator'), phonesController.getAllPhones)
router.post('/phones', ensureAuthenticated, requireRole('administrator'), phonesController.create)
router.post('/phones/assign', ensureAuthenticated, requireRole('administrator'), phonesController.assign)

// router.delete('/vendors/:id', vendorController.delate)

module.exports = router;