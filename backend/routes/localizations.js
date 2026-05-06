'use strict';

const express = require('express');
const router = express.Router()

const ensureAuthenticated = require('../middleware/isAuthenticated');
const requireRole = require('../middleware/requireRole');

const localizationController = require('../controllers/localization-controller')

router.get('/localizations', requireRole('administrator'), localizationController.getAll)
router.post('/localizations', requireRole('administrator'), localizationController.create)
router.delete('/localizations/:id', requireRole('administrator'), localizationController.delate)

module.exports = router;