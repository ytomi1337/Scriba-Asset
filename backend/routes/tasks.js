'use strict';

const express = require('express');
const router = express.Router()

const ensureAuthenticated = require('../middleware/isAuthenticated');
const requireRole = require('../middleware/requireRole');

const taskController = require('../controllers/task-controller')
const uploadFile = require('../middleware/uploadFile')


router.get('/tasks',ensureAuthenticated, taskController.getUserTask)
router.get('/tasks/localization',ensureAuthenticated, taskController.getLocalizationTasks)


router.post('/tasks', ensureAuthenticated, taskController.create)
router.post('/tasks/upload', ensureAuthenticated, uploadFile.single('file'), taskController.uploadFile)
router.patch('/tasks/:id/:decision', ensureAuthenticated, taskController.decide)

module.exports = router;

