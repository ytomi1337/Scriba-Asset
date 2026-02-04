'use strict';

const express = require('express');
const router = express.Router()

const ensureAuthenticated = require('../middleware/isAuthenticated');
const assetController = require('../controllers/asset-controller');

router.get('/assets', ensureAuthenticated, assetController.getAll)
router.get('/assets/info/nextseq', ensureAuthenticated, assetController.getNextSequence)
router.get ('/assets/stock/', ensureAuthenticated, assetController.getStock)
router.get ('/assets/user/', ensureAuthenticated, assetController.getUserAssets)

router.post('/assets', ensureAuthenticated, assetController.create)
router.post('/assets/assign', ensureAuthenticated, assetController.assign)


module.exports = router;
