'use strict';

const express = require('express');
const router = express.Router()

const localizationController = require('../controllers/localization-controller')

router.get('/localizations', localizationController.getAll)
router.post('/localizations', localizationController.create)
router.delete('/localizations/:id', localizationController.delate)

module.exports = router;