'use strict';

const express = require('express');
const router = express.Router()

const ensureAuthenticated = require('../middleware/isAuthenticated');
const assetController = require('../controllers/asset-controller');

router.get('/assets', ensureAuthenticated, assetController.getAllAssets)
router.get('/assets/:assetId', assetController.getAssetInfo)
router.get('/assets/info/nextseq', ensureAuthenticated, assetController.getNextSequence)
router.get ('/assets/stock/', ensureAuthenticated, assetController.getStock)
router.get ('/assets/user/:userId', ensureAuthenticated, assetController.getUserAssets)

router.post('/assets', ensureAuthenticated, assetController.create)
router.post('/assets/assign', ensureAuthenticated, assetController.assign)
router.post('/assets/return', ensureAuthenticated, assetController.returnAsset)


module.exports = router;
