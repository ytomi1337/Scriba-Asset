'use strict';

const express = require('express');
const router = express.Router()

const ensureAuthenticated = require('../middleware/isAuthenticated');
const requireRole = require('../middleware/requireRole');

const assetController = require('../controllers/asset-controller');

router.get('/assets', ensureAuthenticated, requireRole('administrator'), assetController.getAssets)
router.get('/assets/info/nextseq', ensureAuthenticated, requireRole('administrator'), assetController.getNextSequence)
router.get ('/assets/stock/', ensureAuthenticated, requireRole('administrator'), assetController.getStock)
router.get ('/assets/stats/categories', ensureAuthenticated, requireRole('administrator'), assetController.getCategoryStats)
router.get ('/assets/user/:userId', ensureAuthenticated, assetController.getUserAssets)
router.get('/assets/:assetId', requireRole('administrator'), assetController.getAsset)

router.post('/assets', ensureAuthenticated, requireRole('administrator'), assetController.create)
router.post('/assets/assign', ensureAuthenticated, requireRole('administrator'), assetController.assign)
router.post('/assets/return', ensureAuthenticated, assetController.returnAsset)


module.exports = router;
