'use strict';

const express = require('express');
const router = express.Router()

const ensureAuthenticated = require('../middleware/isAuthenticated');
const requireRole = require('../middleware/requireRole');

const statusController = require('../controllers/status-controller')

router.get('/statuses', statusController.getAll)
router.post('/statuses', statusController.create)
router.delete('/statuses/:id', statusController.delate)

module.exports = router;